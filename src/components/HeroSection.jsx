import React from 'react';

export default function HeroSection({ onSelectShape, onExplode, autoRotate, setAutoRotate }) {
  return (
    <section className="section hero" data-shape="mask" id="home">
      <div className="hero-content panel glass-panel">
        <p className="eyebrow">Sanxingdui Digital Relic · Particle WebGL</p>
        <h1>青铜幻境</h1>
        <h2>以粒子重构三星堆青铜文明</h2>
        <p className="hero-text">
          这是一个面向课程展示、作品集和数字文博体验的交互式网站。页面中的青铜器造型不是图片，而是由数千个粒子动态聚合而成，可通过鼠标移动、点击、拖拽与滚动触发变化。
        </p>
        <div className="hero-actions">
          <button onClick={() => onSelectShape('mask')} className="primary-btn">查看青铜面具</button>
          <button onClick={() => onExplode()} className="ghost-btn">点击粒子扩散</button>
          <button onClick={() => setAutoRotate(!autoRotate)} className="ghost-btn">
            {autoRotate ? '暂停自动旋转' : '开启自动旋转'}
          </button>
        </div>
      </div>

      <aside className="interaction-card panel">
        <strong>交互方式</strong>
        <span>移动鼠标：扰动粒子</span>
        <span>点击画布：扩散再聚合</span>
        <span>拖拽画布：旋转观察</span>
        <span>滚动页面：切换文化模块</span>
      </aside>
    </section>
  );
}
