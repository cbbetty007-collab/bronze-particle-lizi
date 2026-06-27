import React from 'react';

const inscriptions = [
  { glyph: '目', title: '神目意象', text: '呼应三星堆青铜面具夸张的眼部造型，可用于表现凝视、守护与祭祀感。' },
  { glyph: '礼', title: '礼制秩序', text: '用金文式线条表现权力、礼仪与文明结构，适合作为展览信息入口。' },
  { glyph: '鸟', title: '神鸟崇拜', text: '将鸟形符号转化为粒子轨迹，形成飞升、环绕、光晕般的动态效果。' },
];

export default function InscriptionSection({ onSelectShape }) {
  return (
    <section className="section content-section inscription-section" data-shape="inscription" id="inscription">
      <div className="section-copy panel glass-panel">
        <p className="eyebrow">Inscription Decode</p>
        <h2>铭文数字解码</h2>
        <p>
          本模块适合放置展览说明、文物题签、古文字解读或课程作品说明。点击任意文字卡片，中央粒子会切换为“金文铭文”结构。
        </p>
      </div>
      <div className="glyph-list">
        {inscriptions.map((item) => (
          <button className="glyph-card panel" key={item.title} onClick={() => onSelectShape('inscription')}>
            <span className="glyph">{item.glyph}</span>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
