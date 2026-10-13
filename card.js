// 휴대폰용 결과 카드: 이미지 표시 + 저장
const NAMES = {
  cup: '기댈 곳이 되어주는 컵',
  plate: '좋은 것을 건네는 접시',
  doorbell: '작은 것을 기억해주는 도어벨',
  umbrella: '함께 들어주는 우산',
  chair: '곁을 내어주는 의자',
  light: '상대에게 맞춰주는 조명',
};

const key = new URLSearchParams(location.search).get('r');
if (!NAMES[key]) {
  location.replace('index.html');
} else {
  const src = `assets/card/${key}.webp`;
  const fileName = `FIND-YOUR-SSEUM_${key}.png`;
  const img = document.querySelector('.card__img');
  img.src = src;
  img.alt = `당신은 ‘${NAMES[key]}’ 같은 사람입니다.`;
  document.title = `${NAMES[key]} — FIND YOUR SSEUM`;

  document.querySelector('.card__save').addEventListener('click', async () => {
    try {
      // 사진첩 호환을 위해 PNG로 변환해서 저장
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
      const file = new File([blob], fileName, { type: 'image/png' });
      // iOS·안드로이드: 공유 시트에서 '이미지 저장'
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] });
        return;
      }
      // 그 외: 바로 다운로드
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    } catch (e) {
      if (e.name !== 'AbortError') window.open(src, '_blank');
    }
  });
}
