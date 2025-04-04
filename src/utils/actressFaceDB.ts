import { GM_notification } from "$";
import type { ActressImageInfo, ActressImageMap } from "../types/actress";
import { actressFaceCache } from "./cache/actressFaceCache";

export class ActressFaceDB {
	private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 1天的毫秒数
	private static readonly API_URL =
		"https://raw.githubusercontent.com/gfriends/gfriends/refs/heads/master/Filetree.json";

	private imageMap: ActressImageMap;
	private lastUpdateTime = -1;
	private updateTimer: number | null;
	private initPromise: Promise<ActressFaceDB> | null = null;

	constructor() {
		this.imageMap = new Map();
		this.updateTimer = null;
		this.init();
	}

	/**
	 * 初始化数据库
	 */
	async init(): Promise<ActressFaceDB> {
		// biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
		const promise = new Promise<ActressFaceDB>(async (resolve) => {
			this.lastUpdateTime = await actressFaceCache.getLastUpdateTime();
			await this.loadFromCache();
			if (await this.checkUpdate()) {
				await this.updateDB();
			}
			resolve(this);
		});
		this.initPromise = promise;
		await promise;
		return this;
	}

	/**
	 * 从远程更新数据库
	 */
	public async updateDB(): Promise<void> {
		try {
			GM_notification("️正在更新头像数据库...");
			const response = await fetch(ActressFaceDB.API_URL);
			if (!response.ok) {
				// @ts-ignore
				throw new Error(response.status);
			}
			const data: ActressImageInfo = await response.json();
			await this.processAndSaveData(data);
			GM_notification("✅ 头像数据库更新完成");
		} catch (error) {
			// @ts-ignore
			GM_notification(`❌ 更新头像数据库失败 ${error.message}`);
			console.error("更新头像数据库失败:", error);
			throw error;
		}
	}

	/**
	 * 检查是否需要更新
	 */
	public async checkUpdate(): Promise<boolean> {
		const now = Date.now();
		return now - this.lastUpdateTime >= ActressFaceDB.CACHE_DURATION;
	}

	/**
	 * 查找演员头像信息
	 */
	public async findActress(
		name: string,
	): Promise<
		| { folder: string; filename: string; timestamp: number; url: string }
		| undefined
	> {
		await this.initPromise;
		const actress = this.imageMap.get(name);
		if (!actress) {
			return undefined;
		}
		const file = actress[0];
		return {
			...file,
			url: `https://raw.githubusercontent.com/gfriends/gfriends/refs/heads/master/Content/${file.folder}/${file.filename}`,
		};
	}

	/**
	 * 获取所有演员数据
	 */
	public getAllActresses(): ActressImageMap {
		return this.imageMap;
	}

	/**
	 * 销毁实例
	 */
	public destroy(): void {
		if (this.updateTimer) {
			window.clearInterval(this.updateTimer);
			this.updateTimer = null;
		}
	}

	/**
	 * 从缓存加载数据
	 */
	private async loadFromCache(): Promise<boolean> {
		try {
			const cachedData = await actressFaceCache.getActressData();

			if (cachedData) {
				const now = Date.now();
				if (now - cachedData.timestamp < ActressFaceDB.CACHE_DURATION) {
					this.imageMap = new Map(cachedData.imageMap);
					this.lastUpdateTime = cachedData.timestamp;
					return true;
				}
			}
			return false;
		} catch (error) {
			console.error("从缓存加载数据失败:", error);
			return false;
		}
	}

	/**
	 * 处理并保存数据
	 */
	private async processAndSaveData(data: ActressImageInfo): Promise<void> {
		const newMap: ActressImageMap = new Map();

		// 处理数据并构建查找映射
		Object.entries(data.Content).forEach(([folder, files]) => {
			Object.entries(files).forEach(([originalName, filePath]) => {
				const [, timestampStr] = filePath.split("?t=");
				const timestamp = parseInt(timestampStr, 10);
				const actressName = originalName.replace(".jpg", "");
				const file = {
					folder,
					filename: filePath,
					timestamp,
				};
				const files = newMap.get(actressName);
				if (files && files?.length > 0) {
					files.push(file);
					newMap.set(actressName, files);
				} else {
					newMap.set(actressName, [file]);
				}
			});
		});

		// 更新状态
		this.imageMap = newMap;
		this.lastUpdateTime = Date.now();

		// 保存到缓存
		await Promise.all([
			actressFaceCache.saveActressData(
				Array.from(newMap.entries()),
				this.lastUpdateTime,
			),
		]);
	}
}

const actressFaceDB = new ActressFaceDB();

export default actressFaceDB;
