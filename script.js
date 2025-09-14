async function fillTank() {
  const url = 'member_count.json';

  try {
    const res = await fetch(url);
    const data = await res.json();

    const number = data.count; // JSON内の数字
    let ratio = number * 0.1; // 0.1倍 → 900なら90%
    if (ratio > 100) ratio = 100; // 上限100%
    
    const svgHeight = 400;
    const waterY = svgHeight - (svgHeight * ratio / 100);

    const path = document.getElementById('waterPath');
    const label = document.getElementById('waterLabel');
    label.textContent = `${Math.round(ratio)}%`;

    // 波アニメーション
    let waveOffset = 0;
   // 波アニメーション（小さく、ゆっくり）
let waveOffset = 0;
function animateWave() {
  const waveHeight = 5; // 波の高さを小さく
  const waveLength = 80; // 波の幅を長くしてゆったり感
  const speed = 0.02; // 波の進むスピードを遅く
  const d = `
    M0,${waterY} 
    Q${waveLength/2},${waterY + Math.sin(waveOffset)*waveHeight} ${waveLength},${waterY} 
    T200,${waterY} 
    L200,400 L0,400 Z
  `;
  path.setAttribute('d', d);
  waveOffset += speed;
  requestAnimationFrame(animateWave);
}

animateWave();


  } catch (err) {
    console.error('JSON取得エラー:', err);
    document.getElementById('waterLabel').textContent = 'Error';
  }
}

fillTank();
