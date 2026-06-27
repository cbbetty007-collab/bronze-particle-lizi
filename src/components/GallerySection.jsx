import React, { useState } from 'react';
import GalleryParticleViewer, { PALETTES } from './GalleryParticleViewer.jsx';

const relics = [
  {
    shape: 'mask',
    name: '三星堆青铜面具',
    meta: 'Mask',
    desc: '突出宽阔面部、夸张眼部和神秘凝视感。',
  },
  {
    shape: 'tree',
    name: '青铜神树',
    meta: 'Sacred Tree',
    desc: '用垂直生长的粒子结构表现神树枝干与祭祀意象。',
  },
  {
    shape: 'standing',
    name: '青铜立人',
    meta: 'Figure',
    desc: '用粒子重构立人姿态、手臂动作与仪式感。',
  },
  {
    shape: 'bird',
    name: '神鸟纹样',
    meta: 'Solar Bird',
    desc: '呈现展开、飞升、环绕的动态粒子纹样。',
  },
  {
    shape: 'vessel',
    name: '青铜尊器型',
    meta: 'Vessel',
    desc: '通过旋转粒子形成青铜容器的轮廓与厚重感。',
  },
  {
    shape: 'taotie',
    name: '兽面纹重构',
    meta: 'Pattern',
    desc: '强调对称、秩序和青铜纹样的装饰张力。',
  },
];

export default function GallerySection() {
  const [galleryShape, setGalleryShape] = useState('vessel');
  const [palette, setPalette] = useState('patina');
  const [autoRotate, setAutoRotate] = useState(true);
  const [disturbLevel, setDisturbLevel] = useState(1.2);
  const [explodeSignal, setExplodeSignal] = useState(0);
  const activeRelic = relics.find((item) => item.shape === galleryShape) ?? relics[0];

  return (
    <section className="section gallery-section" data-shape="vessel" id="gallery">
      <div className="section-copy panel glass-panel wide-copy">
        <p className="eyebrow">Digital Relic Gallery</p>
        <h2>数字藏品展厅</h2>
        <p>
          这里是单独的粒子青铜器展示板块。它不跟随页面滚动自动切换，而是像一个独立展柜一样，
          由你在展厅内选择器型、颜色、旋转和扩散效果。
        </p>
      </div>

      <div className="gallery-exhibit">
        <div className="gallery-visual panel">
          <div className="gallery-stage-header">
            <div>
              <small>{activeRelic.meta}</small>
              <strong>{activeRelic.name}</strong>
            </div>
            <span>{PALETTES[palette].name}</span>
          </div>

          <GalleryParticleViewer
            shape={galleryShape}
            palette={palette}
            autoRotate={autoRotate}
            disturbLevel={disturbLevel}
            explodeSignal={explodeSignal}
            onExplode={() => setExplodeSignal((value) => value + 1)}
          />

          <div className="gallery-methods">
            <span>移动鼠标：扰动粒子</span>
            <span>点击展台：扩散再聚合</span>
            <span>拖拽展台：手动旋转</span>
            <span>切换色彩：观察不同材质感</span>
          </div>
        </div>

        <div className="gallery-controls panel">
          <div>
            <p className="eyebrow">Exhibit Control</p>
            <h3>粒子青铜器控制台</h3>
            <p>{activeRelic.desc}</p>
          </div>

          <div className="gallery-toolbar">
            <button className="primary-btn" onClick={() => setExplodeSignal((value) => value + 1)}>
              扩散粒子
            </button>
            <button className="ghost-btn" onClick={() => setAutoRotate((value) => !value)}>
              {autoRotate ? '暂停旋转' : '开启旋转'}
            </button>
          </div>

          <label className="range-control compact-range">
            <span>扰动强度：{disturbLevel.toFixed(1)}</span>
            <input
              type="range"
              min="0.4"
              max="2.4"
              step="0.2"
              value={disturbLevel}
              onChange={(event) => setDisturbLevel(Number(event.target.value))}
            />
          </label>

          <div className="palette-row" aria-label="展厅颜色方案">
            {Object.entries(PALETTES).map(([key, item]) => (
              <button
                key={key}
                className={palette === key ? 'is-active' : ''}
                onClick={() => setPalette(key)}
                aria-label={item.name}
              >
                <span style={{ background: `rgb(${item.colors[0].map((c) => Math.round(c * 255)).join(',')})` }} />
                <span style={{ background: `rgb(${item.colors[1].map((c) => Math.round(c * 255)).join(',')})` }} />
                <span style={{ background: `rgb(${item.colors[2].map((c) => Math.round(c * 255)).join(',')})` }} />
              </button>
            ))}
          </div>

          <div className="gallery-thumbnail-grid">
            {relics.map((item) => (
              <button
                key={item.shape}
                className={`gallery-thumb ${galleryShape === item.shape ? 'is-active' : ''}`}
                onClick={() => {
                  setGalleryShape(item.shape);
                  setExplodeSignal((value) => value + 1);
                }}
              >
                <span className={`thumb-image thumb-${item.shape}`} />
                <small>{item.meta}</small>
                <strong>{item.name}</strong>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
