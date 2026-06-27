import React from 'react';

const steps = [
  { title: '01 制范', text: '从器型轮廓开始建立模具结构，页面中可对应“青铜尊器型”粒子。', shape: 'vessel' },
  { title: '02 熔铜', text: '以流动粒子模拟金属熔液，营造暗金色能量与高温感。', shape: 'tree' },
  { title: '03 浇铸', text: '粒子从散点向中心聚合，形成青铜器的基本体量。', shape: 'mask' },
  { title: '04 成器', text: '表面纹样、铭文与器型逐步显现，完成数字文物展示。', shape: 'standing' },
];

export default function CraftSection({ onSelectShape }) {
  return (
    <section className="section content-section craft-section" data-shape="tree" id="craft">
      <div className="section-copy panel glass-panel">
        <p className="eyebrow">Bronze Casting</p>
        <h2>铸造工艺动态演示</h2>
        <p>
          这里不是严格的考古复原，而是面向 UI / UX 课程展示的视觉化叙事：把制范、熔铜、浇铸、成器转换为可滚动、可点击的粒子动画流程。
        </p>
      </div>
      <div className="timeline panel">
        {steps.map((step) => (
          <button key={step.title} onClick={() => onSelectShape(step.shape)} className="timeline-item">
            <b>{step.title}</b>
            <span>{step.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
