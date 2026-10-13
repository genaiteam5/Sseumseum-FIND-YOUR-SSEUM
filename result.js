// FIND YOUR SSEUM — 결과 계산 & 표시
// 가장 많이 고른 타입이 결과. 동점이면 6번 문항의 답을 최종 결과로 사용.
// 미리보기: result.html?r=cup (cup | plate | doorbell | umbrella | chair | light)

const RESULTS = {
  cup: {
    title: ['당신은 ', '‘기댈 곳이 되어주는’ 컵', ' 같은 사람입니다.'],
    body: '당신은 누군가가 힘들 때 문제를 대신 해결해주기보다, 마음 놓고 기대어 쉴 수 있는 사람이 되어주는 편입니다.\n상대가 흔들리는 순간 곁에서 안정감을 주고, 서로 의지할 수 있을 때 관계가 더 단단해진다고 느낍니다.',
    image: 'assets/result/cup.webp',
    alt: '기울어진 노란 컵과 흰 컵. 당신에게 사랑은 편하게 기대어도 괜찮은 사람이 되어주는 것',
  },
  plate: {
    title: ['당신은 ', '‘좋은 것을 건네는’ 접시', ' 같은 사람입니다.'],
    body: '맛있는 것을 먹거나 좋은 것을 발견하면 자연스럽게 누군가가 떠오르는 사람입니다. 당신에게 마음은 생각하는 것에\n그치지 않고 나누고, 건네고, 더 주고 싶은 행동으로 나타납니다. 내가 가진 좋은 것을 상대와 함께할 때 가장 큰 애정을 느낍니다.',
    image: 'assets/result/plate.webp',
    alt: '겹쳐 놓인 하트 모양 접시 두 개. 당신에게 사랑은 좋은 것을 아낌없이 나누는 것',
  },
  doorbell: {
    title: ['당신은 ', '‘작은 것을 기억해주는’ 도어벨', ' 같은 사람입니다.'],
    body: '당신은 상대가 무심코 했던 말이나 작은 취향, 중요한 일정을 잘 기억하는 편입니다. 거창하게 마음을 표현하기보다 필요한 순간\n먼저 알아보고 챙겨주는 행동으로 애정을 보여줍니다. 누군가를 계속 마음에 두고 있다는 것 자체가 당신의 사랑 방식입니다.',
    image: 'assets/result/doorbell.webp',
    alt: '하트 고리가 달린 흰 도어벨. 당신에게 사랑은 작은 것까지 기억하고 챙겨주는 것',
  },
  umbrella: {
    title: ['당신은 ', '‘함께 들어주는’ 우산', ' 같은 사람입니다.'],
    body: '당신은 누군가가 무언가를 혼자 감당하고 있을 때 그냥 바라보기보다 자연스럽게 옆으로 다가가 손을 보태는 사람입니다.\n완벽한 해결책을 주기보다 같은 방향을 바라보고, 힘든 순간을 함께 나누는 행동에서 사랑을 표현합니다.',
    image: 'assets/result/umbrella.webp',
    crop: 470, // 손잡이가 다른 제품보다 위에서 시작
    alt: '하트 모양 손잡이가 달린 분홍 우산. 당신에게 사랑은 혼자 두지 않고 같이 해주는 것',
  },
  chair: {
    title: ['당신은 ', '‘곁을 내어주는’ 의자', ' 같은 사람입니다.'],
    body: '당신에게 친밀함은 특별한 이벤트보다 같은 공간에 머물고, 가까운 거리를 편안하게 나누는 것에 가깝습니다. 굳이 많은 말을\n하지 않아도 함께 있는 시간 자체에서 마음을 느끼며, 좋아하는 사람에게 자신의 곁을 기꺼이 내어줍니다.',
    image: 'assets/result/chair.webp',
    alt: '나란히 놓인 주황·파랑 곡선 의자 두 개. 당신에게 사랑은 가까운 곳에 오래 머물러주는 것',
  },
  light: {
    title: ['당신은 ', '‘상대에게 맞춰주는’ 조명', ' 같은 사람입니다.'],
    body: '당신은 내 방식대로 해주는 것보다 지금 상대에게 무엇이 가장 편한지 먼저 살피는 사람입니다. 상황과 기분에 따라\n자신의 행동을 조금씩 조율하며, 상대가 편안할 수 있도록 자연스럽게 방향을 맞춥니다.',
    image: 'assets/result/light.webp',
    alt: '곡선 홈을 따라 주황 공이 움직이는 연두색 조명. 당신에게 사랑은 상대가 편한 방향으로 나를 맞춰주는 것',
  },
};

function pickResult(answers) {
  const counts = {};
  answers.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
  const max = Math.max(...Object.values(counts));
  const top = Object.keys(counts).filter((t) => counts[t] === max);
  return top.length === 1 ? top[0] : answers[answers.length - 1];
}

function getResultKey() {
  const preview = new URLSearchParams(location.search).get('r');
  if (preview && RESULTS[preview]) return preview;
  try {
    const answers = JSON.parse(sessionStorage.getItem('sseum-answers'));
    if (Array.isArray(answers) && answers.length === 6) return pickResult(answers);
  } catch (e) {}
  return null;
}

const key = getResultKey();
const isPhone = matchMedia('(max-width: 720px) and (orientation: portrait)').matches;
if (!key) {
  location.replace('index.html');
} else if (isPhone) {
  // 휴대폰에서는 세로형 결과 카드로
  location.replace(`card.html?r=${key}`);
} else {
  const r = RESULTS[key];
  const titleEl = document.querySelector('.r-title');
  titleEl.replaceChildren(
    document.createTextNode(r.title[0]),
    Object.assign(document.createElement('strong'), { textContent: r.title[1] }),
    document.createTextNode(r.title[2]),
  );
  document.querySelector('.r-body').innerHTML = r.body.replace(/\n/g, '<br>');
  const visual = document.querySelector('.r-visual');
  const img = visual.querySelector('img');
  img.src = r.image;
  img.alt = r.alt;
  if (r.crop) visual.style.setProperty('--crop', r.crop);

  // 휴대폰 저장용 QR → card.html?r=<key>
  const cardUrl = new URL(`card.html?r=${key}`, location.href).href;
  const qrBox = document.querySelector('.r-qr__code');
  if (window.qrcode) {
    const qr = qrcode(0, 'M');
    qr.addData(cardUrl);
    qr.make();
    qrBox.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
  } else {
    document.querySelector('.r-qr').hidden = true;
  }
  document.title = `${r.title[1].replace(/[‘’]/g, '')} — FIND YOUR SSEUM`;
}

// 1440×1024 프레임을 화면에 맞춰 축소/확대
const stage = document.querySelector('.stage');
function fitStage() {
  stage.style.setProperty('--scale', Math.min(innerWidth / 1440, innerHeight / 1024));
}
addEventListener('resize', fitStage);
fitStage();
