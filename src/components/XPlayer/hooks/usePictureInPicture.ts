import { useEventListener } from "@vueuse/core";
import { shallowRef } from "vue";
import type { PlayerContext } from "./usePlayerProvide";

export const usePictureInPicture = (ctx: PlayerContext) => {
	const videoElementRef = ctx.refs.videoElementRef;

	const isPip = shallowRef(!!document.pictureInPictureElement);

	const isSupport = "pictureInPictureEnabled" in document;

	const toggle = async () => {
		try {
			if (isPip.value && document.pictureInPictureElement) {
				await document.exitPictureInPicture();
			} else {
				await videoElementRef.value?.requestPictureInPicture();
			}
		} catch (error) {
			console.error("Failed to toggle picture in picture:", error);
		}
	};

	const close = async () => {
		if (isPip.value && document.pictureInPictureElement) {
			await document.exitPictureInPicture();
		}
	};

	// 监听画中画变化
	const handlePipChange = () => {
		isPip.value = !!document.pictureInPictureElement;
	};
	useEventListener(document, "enterpictureinpicture", handlePipChange);
	useEventListener(document, "leavepictureinpicture", handlePipChange);

	return {
		/** 当前浏览器是否支持画中画 */
		isSupport,
		/** 当前是否处于画中画模式 */
		isPip,
		/** 切换画中画模式 */
		toggle,
		/** 关闭画中画模式 */
		close,
	};
};
