const TWO_PI = Math.PI * 2;

export const RELIC_OPTIONS = [
  { key: 'mask', label: '三星堆青铜面具', tag: 'Mask' },
  { key: 'tree', label: '青铜神树', tag: 'Sacred Tree' },
  { key: 'standing', label: '青铜立人', tag: 'Standing Figure' },
  { key: 'bird', label: '神鸟纹样', tag: 'Solar Bird' },
  { key: 'taotie', label: '兽面纹重构', tag: 'Pattern' },
  { key: 'vessel', label: '青铜尊器型', tag: 'Vessel' },
  { key: 'inscription', label: '金文铭文', tag: 'Inscription' },
];
function rand(i, salt = 0) {
  const n = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function strokePoint(i, strokes, scale = 1) {
  const s = strokes[Math.floor(rand(i, 8) * strokes.length) % strokes.length];
  const t = rand(i, 9);
  const wobble = (rand(i, 10) - 0.5) * 0.035;
  return [
    lerp(s[0], s[2], t) * scale + wobble,
    lerp(s[1], s[3], t) * scale + wobble,
    (rand(i, 11) - 0.5) * 0.08,
  ];
}

function ovalFace(i) {
  const t = rand(i, 1);
  const u = rand(i, 2);
  const v = rand(i, 3);

  if (t < 0.42) {
    const angle = TWO_PI * u;
    const r = Math.sqrt(v);
    const x = Math.cos(angle) * r * 1.18;
    const y = Math.sin(angle) * r * 1.58 - 0.08;
    const edge = Math.pow(Math.abs(x) / 1.18, 2) + Math.pow((y + 0.08) / 1.58, 2);
    const z = 0.18 * Math.cos(edge * Math.PI) + (rand(i, 4) - 0.5) * 0.1;
    return [x, y, z];
  }

  if (t < 0.58) {
    const side = rand(i, 4) > 0.5 ? 1 : -1;
    const lens = rand(i, 5);
    const height = (rand(i, 6) - 0.5) * 0.22;
    const x = side * (0.55 + lens * 1.18);
    const y = 0.42 + Math.sin(lens * Math.PI) * 0.18 + height;
    const z = 0.38 + (rand(i, 7) - 0.5) * 0.12;
    return [x, y, z];
  }

  if (t < 0.68) {
    const y = lerp(0.75, -0.7, u);
    const width = 0.08 + Math.abs(Math.sin(u * Math.PI)) * 0.12;
    return [(rand(i, 8) - 0.5) * width, y, 0.48 + (rand(i, 9) - 0.5) * 0.08];
  }

  if (t < 0.78) {
    const side = rand(i, 10) > 0.5 ? 1 : -1;
    const a = TWO_PI * u;
    return [side * (1.34 + Math.cos(a) * 0.24), -0.02 + Math.sin(a) * 0.64, 0.04 + (rand(i, 11) - 0.5) * 0.12];
  }

  if (t < 0.88) {
    const side = rand(i, 12) > 0.5 ? 1 : -1;
    const y = lerp(1.35, 2.1, u);
    const x = side * (0.2 + u * 0.6 + (rand(i, 13) - 0.5) * 0.09);
    return [x, y, 0.16 + (rand(i, 14) - 0.5) * 0.12];
  }

  const a = lerp(-1.9, 1.9, u);
  const y = -0.92 + Math.sin(u * Math.PI) * 0.18;
  return [a, y + (rand(i, 15) - 0.5) * 0.06, 0.32 + (rand(i, 16) - 0.5) * 0.07];
}

function sacredTree(i) {
  const t = rand(i, 21);
  const u = rand(i, 22);
  const v = rand(i, 23);

  if (t < 0.42) {
    const y = lerp(-1.8, 1.75, u);
    const radius = 0.08 + 0.05 * Math.sin((y + 1.8) * 2.4);
    const angle = TWO_PI * v;
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
  }

  if (t < 0.78) {
    const level = Math.floor(rand(i, 24) * 6);
    const side = rand(i, 25) > 0.5 ? 1 : -1;
    const y0 = lerp(-1.0, 1.55, level / 5);
    const progress = u;
    const length = lerp(0.62, 1.25, rand(level, 26));
    const bend = Math.sin(progress * Math.PI) * 0.22;
    const x = side * progress * length;
    const y = y0 + progress * 0.34 + bend;
    const z = (rand(i, 27) - 0.5) * 0.32;
    return [x, y, z];
  }

  if (t < 0.9) {
    const crown = Math.floor(rand(i, 28) * 5);
    const side = crown % 2 === 0 ? 1 : -1;
    const baseY = lerp(-0.6, 1.6, crown / 4);
    const a = TWO_PI * u;
    const r = 0.18 + 0.16 * v;
    return [side * (0.82 + Math.cos(a) * r), baseY + Math.sin(a) * r, (rand(i, 29) - 0.5) * 0.35];
  }

  const a = TWO_PI * u;
  return [Math.cos(a) * 0.58 * v, -1.88 + Math.sin(a) * 0.16, (rand(i, 30) - 0.5) * 0.28];
}

function standingFigure(i) {
  const t = rand(i, 41);
  const u = rand(i, 42);
  const v = rand(i, 43);
  if (t < 0.18) {
    const a = TWO_PI * u;
    const r = Math.sqrt(v) * 0.32;
    return [Math.cos(a) * r, 1.36 + Math.sin(a) * r * 1.15, (rand(i, 44) - 0.5) * 0.16];
  }
  if (t < 0.52) {
    const y = lerp(-0.7, 1.03, u);
    const width = lerp(0.64, 0.38, (y + 0.7) / 1.73);
    return [(rand(i, 45) - 0.5) * width, y, (rand(i, 46) - 0.5) * 0.2];
  }
  if (t < 0.72) {
    const side = rand(i, 47) > 0.5 ? 1 : -1;
    const p = u;
    return [side * (0.28 + p * 0.95), 0.58 - p * 0.16 + (rand(i, 48) - 0.5) * 0.08, (rand(i, 49) - 0.5) * 0.18];
  }
  if (t < 0.9) {
    const side = rand(i, 50) > 0.5 ? 1 : -1;
    return [side * (0.18 + u * 0.18), -0.75 - u * 1.0, (rand(i, 51) - 0.5) * 0.16];
  }
  return [(rand(i, 52) - 0.5) * 1.2, -1.8 + (rand(i, 53) - 0.5) * 0.12, (rand(i, 54) - 0.5) * 0.18];
}

function solarBird(i) {
  const t = rand(i, 61);
  const u = rand(i, 62);
  const v = rand(i, 63);
  if (t < 0.25) {
    const a = TWO_PI * u;
    const r = Math.sqrt(v);
    return [Math.cos(a) * r * 0.48, Math.sin(a) * r * 0.32, (rand(i, 64) - 0.5) * 0.1];
  }
  if (t < 0.65) {
    const side = rand(i, 65) > 0.5 ? 1 : -1;
    const p = u;
    const x = side * (0.22 + p * 1.72);
    const y = Math.sin(p * Math.PI) * (0.42 + v * 0.38) - 0.1 * p;
    return [x, y, (rand(i, 66) - 0.5) * 0.12];
  }
  if (t < 0.82) {
    const p = u;
    return [lerp(-0.18, -1.05, p), lerp(-0.18, -1.18, p) + (v - 0.5) * 0.16, (rand(i, 67) - 0.5) * 0.1];
  }
  const a = TWO_PI * u;
  return [1.05 + Math.cos(a) * 0.2, 0.1 + Math.sin(a) * 0.17, (rand(i, 68) - 0.5) * 0.1];
}

function taotiePattern(i) {
  const t = rand(i, 71);
  const u = rand(i, 72);
  const side = rand(i, 73) > 0.5 ? 1 : -1;
  if (t < 0.32) {
    const a = TWO_PI * u;
    const r = 0.18 + rand(i, 74) * 0.16;
    return [side * (0.62 + Math.cos(a) * r), 0.38 + Math.sin(a) * r, 0.12];
  }
  if (t < 0.62) {
    const p = u;
    return [side * (0.22 + p * 1.25), 0.95 - Math.sin(p * Math.PI) * 0.46, 0.05 + (rand(i, 75) - 0.5) * 0.08];
  }
  if (t < 0.8) {
    return [side * (0.15 + u * 0.42), lerp(0.2, -0.85, u), 0.18];
  }
  return [lerp(-1.45, 1.45, u), -0.95 + Math.sin(u * Math.PI * 2) * 0.18, 0.1];
}

function bronzeVessel(i) {
  const u = rand(i, 81);
  const v = rand(i, 82);
  const y = lerp(-1.62, 1.52, u);
  const h = (y + 1.62) / 3.14;
  const flareTop = Math.pow(Math.max(0, h - 0.65) / 0.35, 1.8) * 0.75;
  const foot = Math.pow(Math.max(0, 0.2 - h) / 0.2, 1.3) * 0.25;
  const belly = Math.sin(h * Math.PI) * 0.38;
  const radius = 0.33 + belly + flareTop + foot;
  const a = TWO_PI * v;
  const surfaceNoise = (rand(i, 83) - 0.5) * 0.035;
  return [Math.cos(a) * (radius + surfaceNoise), y, Math.sin(a) * (radius + surfaceNoise)];
}

function inscription(i) {
  const strokes = [
    [-0.92, 0.95, -0.2, 0.95], [-0.92, 0.95, -0.92, 0.22], [-0.2, 0.95, -0.2, 0.22], [-0.92, 0.22, -0.2, 0.22],
    [0.18, 1.05, 0.92, 1.05], [0.55, 1.05, 0.55, 0.22], [0.28, 0.62, 0.82, 0.62],
    [-0.72, -0.05, -0.72, -1.0], [-1.04, -0.4, -0.4, -0.4], [-0.96, -0.98, -0.34, -0.98],
    [0.18, -0.02, 0.98, -0.02], [0.58, -0.02, 0.42, -0.92], [0.58, -0.02, 0.86, -0.92], [0.22, -0.72, 0.98, -0.72],
  ];
  return strokePoint(i, strokes, 1.28);
}

function randomNebulaPoint(i) {
  const u = rand(i, 91);
  const v = rand(i, 92);
  const w = rand(i, 93);
  const r = 1.4 + u * 1.8;
  const theta = TWO_PI * v;
  const phi = Math.acos(2 * w - 1);
  return [
    Math.sin(phi) * Math.cos(theta) * r,
    Math.cos(phi) * r * 0.85,
    Math.sin(phi) * Math.sin(theta) * r,
  ];
}

export function createShapePoints(shape, count) {
  const data = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    let p;
    switch (shape) {
      case 'tree':
        p = sacredTree(i);
        break;
      case 'standing':
        p = standingFigure(i);
        break;
      case 'bird':
        p = solarBird(i);
        break;
      case 'taotie':
        p = taotiePattern(i);
        break;
      case 'vessel':
        p = bronzeVessel(i);
        break;
      case 'inscription':
        p = inscription(i);
        break;
      case 'mask':
      default:
        p = ovalFace(i);
        break;
    }
    const nebula = randomNebulaPoint(i);
    const blend = rand(i, 99) < 0.08 ? 0.4 : 0;
    data[i * 3] = lerp(p[0], nebula[0], blend);
    data[i * 3 + 1] = lerp(p[1], nebula[1], blend);
    data[i * 3 + 2] = lerp(p[2], nebula[2], blend);
  }
  return data;
}

export function createInitialPoints(count) {
  const data = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const p = randomNebulaPoint(i + 999);
    data[i * 3] = p[0] * 1.4;
    data[i * 3 + 1] = p[1] * 1.4;
    data[i * 3 + 2] = p[2] * 1.4;
  }
  return data;
}

export function createColors(shape, count) {
  const data = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const t = rand(i, 110);
    const highlight = rand(i, 111) > 0.82;
    let r = 0.28 + t * 0.16;
    let g = 0.62 + t * 0.22;
    let b = 0.54 + t * 0.12;
    if (highlight) {
      r = 0.95;
      g = 0.72 + t * 0.16;
      b = 0.28;
    }
    if (shape === 'inscription') {
      r = 0.9;
      g = 0.7 + t * 0.18;
      b = 0.34;
    }
    if (shape === 'tree') {
      r += 0.12;
      g += 0.06;
      b -= 0.04;
    }
    data[i * 3] = Math.min(r, 1);
    data[i * 3 + 1] = Math.min(g, 1);
    data[i * 3 + 2] = Math.min(b, 1);
  }
  return data;
}

export function randomUnit(i) {
  const u = rand(i, 140);
  const v = rand(i, 141);
  const theta = TWO_PI * u;
  const z = v * 2 - 1;
  const radial = Math.sqrt(1 - z * z);
  return [Math.cos(theta) * radial, Math.sin(theta) * radial, z];
}

