import React, { useEffect, useState } from 'react';
import ParticleSanxingdui from './components/ParticleSanxingdui.jsx';
import HeroSection from './components/HeroSection.jsx';
import PatternSection from './components/PatternSection.jsx';
import CraftSection from './components/CraftSection.jsx';
import InscriptionSection from './components/InscriptionSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import { RELIC_OPTIONS } from './lib/particleShapes.js';

export default function App() {
  const [activeShape, setActiveShape] = useState('mask');
  const [explodeSignal, setExplodeSignal] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [particleCount, setParticleCount] = useState(6200);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-shape]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.dataset?.shape) {
          setActiveShape(visible.target.dataset.shape);
        }
      },
      { threshold: [0.35, 0.55, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleExplode = () => setExplodeSignal((value) => value + 1);

  return (
    <div className="app-shell">
      <ParticleSanxingdui
        activeShape={activeShape}
        particleCount={particleCount}
        explodeSignal={explodeSignal}
        autoRotate={autoRotate}
        onExplode={handleExplode}
      />

      <header className="site-header">
        <a href="#home" className="brand">青铜幻境</a>
        <nav>
          <a href="#patterns">纹样</a>
          <a href="#craft">工艺</a>
          <a href="#inscription">铭文</a>
          <a href="#gallery">展厅</a>
        </nav>
      </header>

      <main>
        <HeroSection
          onSelectShape={setActiveShape}
          onExplode={handleExplode}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
        />

        <section className="section controls-section" data-shape="mask">
          <div className="control-panel panel glass-panel">
            <div>
              <p className="eyebrow">Manual Control</p>
              <h2>手动粒子控制台</h2>
              <p>选择不同的三星堆文化灵感造型，观察粒子如何重新聚合。粒子数量越高，视觉越丰富；如果电脑配置较低，建议适当调低。</p>
            </div>
            <div className="shape-buttons">
              {RELIC_OPTIONS.map((item) => (
                <button
                  key={item.key}
                  className={activeShape === item.key ? 'is-active' : ''}
                  onClick={() => setActiveShape(item.key)}
                >
                  <span>{item.tag}</span>
                  {item.label}
                </button>
              ))}
            </div>
            <label className="range-control">
              <span>粒子数量：{particleCount}</span>
              <input
                type="range"
                min="2500"
                max="10000"
                step="500"
                value={particleCount}
                onChange={(event) => setParticleCount(Number(event.target.value))}
              />
            </label>
          </div>
        </section>

        <PatternSection activeShape={activeShape} onSelectShape={setActiveShape} />
        <CraftSection onSelectShape={setActiveShape} />
        <InscriptionSection onSelectShape={setActiveShape} />
        <GallerySection activeShape={activeShape} onSelectShape={setActiveShape} onExplode={handleExplode} />
      </main>
    </div>
  );
}
