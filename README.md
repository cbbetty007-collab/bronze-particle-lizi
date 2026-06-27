# 青铜幻境 · Sanxingdui Particle Relic

这是一个使用 Vite、React、Three.js 和 React Three Fiber 制作的交互式粒子网页。

项目主题为三星堆青铜器数字展厅。页面中的青铜面具、青铜神树、青铜立人、神鸟纹样、兽面纹和青铜尊并不是普通图片，而是由数千个粒子动态聚合形成的数字展品。

## 主要功能

- 全屏 WebGL 粒子背景
- 三星堆青铜器粒子造型切换
- 独立的数字藏品展厅模块
- 展厅内单独的粒子青铜器展示台
- 鼠标扰动粒子、点击扩散粒子、拖拽旋转观察
- 多种粒子颜色方案切换
- 适配桌面端和移动端

## 本地运行

安装依赖：

```bash
npm install
```

启动开发预览：

```bash
npm run dev
```

打包网页：

```bash
npm run build
```

## GitHub Pages 部署

本项目已经配置 GitHub Actions。上传到 GitHub 后，在仓库的 Settings > Pages 中把 Source 设置为 GitHub Actions，即可自动发布到 GitHub Pages。

如果仓库名不是 `bronze-particle-relic-sxd`，请同步修改 `vite.config.js` 里的 `base` 路径。

## 项目结构

```text
src/
  App.jsx
  main.jsx
  components/
    ParticleSanxingdui.jsx
    GallerySection.jsx
    GalleryParticleViewer.jsx
  lib/
    particleShapes.js
  styles/
    global.css
```

## 说明

当前版本中的青铜器为粒子抽象表达，不是考古复原模型。后续可以接入真实 glTF / GLB 三维模型，让粒子采样模型表面，从而获得更接近真实展品的效果。
