import React from 'react';

const patterns = [
  {
    shape: 'taotie',
    title: '兽面纹重构',
    desc: '将青铜器中常见的对称兽面纹转译为粒子纹样，强调神秘、庄严与礼制秩序感。',
  },
  {
    shape: 'bird',
    title: '神鸟纹样',
    desc: '以三星堆文化中强烈的神鸟想象为灵感，形成展开、飞升、环绕的粒子视觉。',
  },
  {
    shape: 'inscription',
    title: '金文铭文',
    desc: '使用线性粒子模拟古文字结构，适合后续替换为课程需要的铭文、题签或展览说明。',
  },
];

export default function PatternSection({ activeShape, onSelectShape }) {
  return (
    <section className="section content-section" data-shape="taotie" id="patterns">
      <div className="section-copy panel glass-panel">
        <p className="eyebrow">Pattern Exploration</p>
        <h2>纹样探索</h2>
        <p>
          本模块用于表现青铜器表面纹样的数字化转译。你可以把它理解为“把传统纹样拆解成粒子，再通过交互重新组织成新的视觉符号”。
        </p>
      </div>

      <div className="card-grid">
        {patterns.map((item) => (
          <button
            className={`relic-card ${activeShape === item.shape ? 'is-active' : ''}`}
            key={item.shape}
            onClick={() => onSelectShape(item.shape)}
          >
            <span>{item.shape}</span>
            <strong>{item.title}</strong>
            <p>{item.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
