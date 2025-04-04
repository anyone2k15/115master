# 115Master

115Master 是一个 115 网盘的 Tampermonkey 脚本，旨在提升 `115网盘` 的浏览体验。

![preview](./docs/images/preview.png)

## 功能

### 文件列表

- 👀 预览番号信息
- 📷 预览视频缩略图
- 📄 文件列表点击鼠标中键打开文件夹新标签页
- ⌚ Tab 标题上显示当前目录路径
- 📥 支持文件下载（仅支持单文件）

### 播放器

- 🎨 `Ultra原画`
- 👁 视频缩略图
- 🤖 在线外挂字幕
- 🎉 支持一键唤起 [IINA](https://iina.io/) 播放
- 🎭 剧院模式
- 🖼 画中画
- 🔍 番号信息展示
- ⌚ 播放列表展示
- ⌨️ [快捷键](#播放器快捷键)
- 🎨 视频调色

## 开发

### 环境

- Node.js v20.x.x
- pnpm v9.x.x

### 安装依赖

```sh
pnpm install
```

### 运行开发环境

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

## 使用安装

### 运行环境基准

- 浏览器：Chrome 130+ 或 115Browser 35.x.x
- 浏览器扩展：Tampermonkey v5.3.3+
- 网络环境：需要科学上网才能使用完整功能

### 安装步骤

1. 安装 [Tampermonkey](https://www.tampermonkey.net/)。

2. 开启 [浏览器扩展开发者模式](https://www.tampermonkey.net/faq.php#Q209)。

3. 一键安装 [115master.user.js](https://github.com/cbingb666/115master/releases/latest/download/115master.user.js) 安装 【115Master】脚本。

4. 油猴面板勾选启动 【115Master】脚本，刷新页面开始使用。

5. 安装完成后如果没有看到文件列表中有【master播放】的按钮，请检查有没有其他脚本导致冲突或重启浏览器。

<img width="329" alt="image" src="https://github.com/user-attachments/assets/189ac578-0592-43bd-ab75-b62cbe6f5170" />

👆上面一通操作后，还是无法使用的话请进入 [TG群](https://t.me/+EzfL2xXhlOA4ZjBh) 反馈或提交 [Issues](https://github.com/cbingb666/115master/issues)，请说明你的详情操作！

## 播放器快捷键

| 快捷键    | 替代键  | 功能          | 备注                       |
| --------- | ------- | ------------- | -------------------------- |
| `Space`   | -       | 播放/暂停     | -                          |
| ` ← / → ` | `A / D` | 快退/快进     | 长按 → 15 倍速播放         |
| ` ↑ / ↓ ` | `W / S` | 倍速          | 长按在 1-15 倍之间快速调整 |
| ` - / = ` | -       | 音量          | -                          |
| `0-9`     | -       | 跳转进度      | -                          |
| `M`       | -       | 切换静音      | -                          |
| `C`       | -       | 切换字幕开关  | -                          |
| `F`       | -       | 切换全屏      | -                          |
| `P`       | -       | 切换画中画    | -                          |
| `V`       | -       | 切换剧院模式  | -                          |
| ` [ / ] ` | `L / R` | 向左/向右旋转 | -                          |
| ` \ `     | -       | 重置旋转      | -                          |
| `H`       | -       | 水平翻转      | -                          |
| `J`       | -       | 垂直翻转      | -                          |

## 常见问题

### Q: 为什么会弹出提示删除 User-Agent Switcher and Manager 插件？

    A: 因为现在不需要修改 User-Agent 了，所以请删除这个插件并重启浏览器。

### Q: 为什么我没有安装过 User-Agent Switcher and Manager 插件，也会提示删除？

    A: 因为你是 【115Browser浏览器v27.x.x】 版本，请升级浏览器的版本。

### Q: 为什么 【Ultra原画】 部分视频无法播放、黑屏、没有声音？

    A: 因为部分视频格式浏览器不支持播放。如：常见的 `.mkv` 可能没有声音，部分 `.mp4` 由于视频内部编码不兼容也会有些意外的情况。

      1. 请降低画质播放
      2. 使用 IINA 本地播放（仅支持 MacOS 系统）
      3. Windows 系统用户，请关注项目更新，后续会支持

### Q: 为什么有些视频没有字幕？

    A: 因为现在只支持了绝大部分番号的识别。

### Q: 啊啊啊我想要这个功能那个功能，能不能支持呀？

    A：你有想法很好！请提交到 [Issues](https://github.com/cbingb666/115master/issues)，作者脑容量有限，挂在 Issues 的会优先考虑解决。

### Q: 我已经有 Emby、Jellyfin 为啥还要这个插件呀？

    A: 因为这是个下载、播放、字幕、预览一条龙的插件（你会体会不一样的快乐的）。常见的影库从下载、试看、播放，整个过程还是比较割裂不方便，影库更适合做为影片收藏归档方便以后反复品味~
