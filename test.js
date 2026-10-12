// FIND YOUR SSEUM — 테스트 진행
// 좌표는 Figma 프레임(1440×1024) 기준: 도형 중심(x, y), 크기(w, h), 회전(r, deg)

// 선택지 → 제품 타입 (결과 계산용 키, 계산은 result.js)
// cup: 컵 / plate: 접시 / doorbell: 도어벨 / umbrella: 우산 / chair: 의자 / light: 조명

// 화면 위 6개 자리. 배열 순서 = 겹침 순서 (뒤에 올수록 위)
const SLOTS = {
  A: { x: 229.3, y: 567.9, w: 355.4, h: 149.8, r: -11.33 }, // 왼쪽 위
  B: { x: 330.8, y: 728.3, w: 353.5, h: 149.6, r: 7.49 },   // 왼쪽 아래
  D: { x: 721.8, y: 700.2, w: 389.5, h: 150.5, r: 0 },      // 가운데 아래
  C: { x: 675.4, y: 540.2, w: 355.0, h: 149.0, r: -12.65 }, // 가운데 위
  E: { x: 1060.9, y: 557.6, w: 355.6, h: 150.5, r: 6.16 },  // 오른쪽 위
  F: { x: 1212.5, y: 712.4, w: 355.0, h: 149.0, r: -3.95 }, // 오른쪽 아래
};

// shape: 'rect' | 'pill', tone: 'dark' | 'line'
const QUESTIONS = [
  {
    q: '가까운 사람이 오늘따라 많이 지쳐 보여요. 나는 어떻게 할까요?',
    options: {
      A: { shape: 'rect', tone: 'dark', type: 'cup', text: '굳이 묻지 않고 편하게 기대어\n쉴 수 있게 해준다.' },
      B: { shape: 'pill', tone: 'line', type: 'plate', text: '좋아하는 간식이나 음료를\n슬쩍 건넨다.' },
      D: { shape: 'pill', tone: 'dark', type: 'doorbell', text: '전에 힘들다고 했던 일을 기억하고\n먼저 괜찮은지 묻는다.' },
      C: { shape: 'rect', tone: 'line', type: 'umbrella', text: '혼자 하고 있는 일이 있다면\n자연스럽게 같이 해준다.' },
      E: { shape: 'rect', tone: 'dark', type: 'chair', text: '특별한 말을 하지 않아도\n곁에 머물러준다.' },
      F: { shape: 'rect', tone: 'line', type: 'light', text: '지금 무엇이 가장 편할지 살피고\n상대의 상태에 맞춰준다.' },
    },
  },
  {
    q: '좋아하는 사람에게 작은 선물을 주고 싶어요. 가장 먼저 떠오르는 건?',
    options: {
      A: { shape: 'pill', tone: 'dark', type: 'cup', text: '지치거나 힘들 때\n편하게 쉴 수 있는 것' },
      B: { shape: 'rect', tone: 'line', type: 'plate', text: '내가 좋아해서\n꼭 같이 나누고 싶은 것' },
      D: { shape: 'pill', tone: 'dark', type: 'umbrella', text: '둘이 함께\n사용할 수 있는 것' },
      C: { shape: 'rect', tone: 'line', type: 'doorbell', text: '상대가 예전에 갖고 싶다고\n지나가듯 말했던 것' },
      E: { shape: 'rect', tone: 'dark', type: 'chair', text: '물건보다 같이 보낼 수 있는\n시간을 만든다' },
      F: { shape: 'pill', tone: 'line', type: 'light', text: '내 취향보다 상대의 취향에\n꼭 맞는 것을 고른다' },
    },
  },
  {
    q: '친구와 오랜만에 만나기로 했어요. 약속 장소를 정한다면?',
    options: {
      A: { shape: 'pill', tone: 'dark', type: 'cup', text: '마음 놓고 편하게\n이야기할 수 있는 곳' },
      B: { shape: 'pill', tone: 'line', type: 'plate', text: '맛있는 걸 같이\n먹고 나눌 수 있는 곳' },
      D: { shape: 'rect', tone: 'dark', type: 'umbrella', text: '둘이 같이 무언가\n해볼 수 있는 곳' },
      C: { shape: 'rect', tone: 'line', type: 'doorbell', text: '친구가 전에 가보고\n싶다고 했던 곳' },
      E: { shape: 'rect', tone: 'dark', type: 'chair', text: '오래 머물며\n시간을 보낼 수 있는 곳' },
      F: { shape: 'pill', tone: 'line', type: 'light', text: '친구의 동선과 시간, 취향을\n고려해 가장 편한 곳' },
    },
  },
  {
    q: '가까운 사람과 작은 갈등이 생겼어요. 나는 보통 어떻게 하나요?',
    options: {
      A: { shape: 'rect', tone: 'dark', type: 'cup', text: '일단 감정이 가라앉을 때까지\n이야기를 들어준다' },
      B: { shape: 'rect', tone: 'line', type: 'plate', text: '작은 행동이나 무언가를 건네며\n먼저 분위기를 풀어본다' },
      D: { shape: 'pill', tone: 'dark', type: 'umbrella', text: '누구의 잘못인지보다\n같이 해결할 방법을 찾는다' },
      C: { shape: 'rect', tone: 'line', type: 'doorbell', text: '상대가 전에 했던 말을 떠올리며\n무엇이 서운했을지 생각한다' },
      E: { shape: 'rect', tone: 'dark', type: 'chair', text: '당장 해결되지 않더라도 관계에서\n멀어지지는 않는다' },
      F: { shape: 'rect', tone: 'line', type: 'light', text: '내 방식만 고집하기보다 상대가\n편한 방식과 속도에 맞춰 대화한다',
           slot: { x: 1203.1, y: 713.2, w: 374.4 } },
    },
  },
  {
    q: '내가 아끼는 사람이 새로운 도전을 시작했어요. 나는?',
    options: {
      A: { shape: 'rect', tone: 'dark', type: 'cup', text: '힘들 때 언제든 기대도\n된다는 걸 알려준다' },
      B: { shape: 'pill', tone: 'line', type: 'plate', text: '필요한 게 보이면\n말하기 전에 먼저 챙겨준다' },
      D: { shape: 'pill', tone: 'dark', type: 'umbrella', text: '준비할 일이 있다면 같이 알아보고\n직접 도와준다' },
      C: { shape: 'rect', tone: 'line', type: 'doorbell', text: '중요한 일정이나 결과가\n나오는 날을 기억해두고 연락한다' },
      E: { shape: 'rect', tone: 'dark', type: 'chair', text: '자주 만나지 못해도\n꾸준히 곁에서 응원한다' },
      F: { shape: 'rect', tone: 'line', type: 'light', text: '내가 원하는 도움보다\n상대가 원하는 방식으로 도와준다' },
    },
  },
  {
    q: '나는 언제 가장 ‘사랑받고 있다’고 느끼나요?',
    options: {
      A: { shape: 'rect', tone: 'dark', type: 'cup', text: '힘들 때 마음 놓고\n누군가에게 기댈 수 있을 때' },
      B: { shape: 'pill', tone: 'line', type: 'plate', text: '좋은 것을 아낌없이\n나와 나눠줄 때' },
      D: { shape: 'pill', tone: 'dark', type: 'umbrella', text: '힘든 일을 혼자 두지 않고\n함께해줄 때' },
      C: { shape: 'rect', tone: 'line', type: 'doorbell', text: '내가 무심코 했던 말이나\n작은 일을 기억해줄 때' },
      E: { shape: 'rect', tone: 'dark', type: 'chair', text: '특별한 말을 하지 않아도\n곁에 있어줄 때' },
      F: { shape: 'rect', tone: 'line', type: 'light', text: '내 상황과 마음을 살피고\n나에게 맞춰줄 때' },
    },
  },
];

const STAGE_W = 1440;
const STAGE_H = 1024;
const stage = document.querySelector('.stage');
const numEl = document.querySelector('.q-num');
const titleEl = document.querySelector('.q-title');
const optsEl = document.querySelector('.q-options');

const answers = [];
let current = 0;
let locked = false;

function fitStage() {
  const s = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
  stage.style.setProperty('--scale', s);
}

function render(index) {
  const { q, options } = QUESTIONS[index];
  numEl.textContent = String(index + 1).padStart(2, '0');
  titleEl.textContent = q;
  optsEl.replaceChildren();

  Object.keys(SLOTS).forEach((key, i) => {
    const opt = options[key];
    const pos = { ...SLOTS[key], ...opt.slot };
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `opt opt--${opt.shape} opt--${opt.tone}`;
    btn.style.setProperty('--x', `${pos.x}px`);
    btn.style.setProperty('--y', `${pos.y}px`);
    btn.style.setProperty('--w', `${pos.w}px`);
    btn.style.setProperty('--h', `${pos.h}px`);
    btn.style.setProperty('--r', `${pos.r}deg`);
    btn.style.setProperty('--delay', `${i * 50}ms`);
    btn.innerHTML = `<span>${opt.text.replace(/\n/g, '<br>')}</span>`;
    btn.addEventListener('click', () => choose(btn, opt.type));
    optsEl.appendChild(btn);
  });

  stage.classList.remove('is-leaving');
  stage.classList.add('is-entering');
  void stage.offsetWidth; // 시작 상태를 먼저 그린 뒤 전환
  stage.classList.remove('is-entering');
}

function choose(btn, type) {
  if (locked) return;
  locked = true;
  answers[current] = type;
  btn.classList.add('is-picked');

  setTimeout(() => {
    stage.classList.add('is-leaving');
    setTimeout(() => {
      current += 1;
      if (current < QUESTIONS.length) {
        render(current);
        locked = false;
      } else {
        try { sessionStorage.setItem('sseum-answers', JSON.stringify(answers)); } catch (e) {}
        location.href = 'result.html';
      }
    }, 320);
  }, 260);
}

window.addEventListener('resize', fitStage);
fitStage();
render(current);
