/**
 * @file i18n.js
 * @brief Переключение языка RU/EN с автоопределением по IP
 */
(function (global) {
  'use strict';

  var CIS = ['RU', 'BY', 'KZ', 'UA', 'UZ', 'TJ', 'KG', 'AM', 'AZ', 'MD', 'GE', 'TM', 'LT', 'LV', 'EE'];

  var STRINGS = {
    ru: {
      'nav.wheel': 'Колесо',
      'nav.cases': 'Кейсы',
      'nav.battle': 'Батл',
      'nav.scratch': 'Скретч',
      'nav.coinflip': 'Монетка',
      'nav.inventory': 'Инвентарь',
      'online': 'онлайн',
      'login': 'Войти через Roblox',
      'logout': 'Выйти',
      'hero.tag': 'Эксклюзивная раздача 2026',
      'hero.title': 'Крути колесо — <span class="chroma-text">выиграй Chroma</span>',
      'hero.sub': '1 крутка в сутки · Шанс на Corrupt — 1%',
      'spin.text': 'КРУТИТЬ',
      'spin.sub': 'удача ждёт',
      'spin.subDaily': '1 раз в сутки',
      'spin.wait': 'ЖДИ',
      'panel.how': 'Как получить приз?',
      'step.group.title': 'Вступи в группу {brand}',
      'step.group.desc': 'Без вступления колесо не запустится',
      'step.nick.title': 'Введи ник Roblox',
      'step.nick.desc': 'Без ника колесо не запустится',
      'step.spin.title': 'Крути колесо',
      'step.spin.desc': '1 крутка в сутки — не упусти шанс!',
      'step.vip.title': 'Зайди на VIP-сервер',
      'step.vip.desc': 'Приватный сервер MM2 — забери приз у бота',
      'username.label': 'Твой ник Roblox',
      'username.placeholder': 'Например: Player123',
      'cooldown.title': 'Следующая крутка через',
      'stat.spins': 'круток сегодня',
      'stat.chance': 'шанс Corrupt',
      'stat.winners': 'победителей',
      'history.title': 'Мои выигрыши',
      'history.sub': 'История сохраняется — ссылка не потеряется, даже если закроешь окно',
      'history.empty': 'Пока нет выигрышей',
      'history.emptySub': 'Крути колесо — приз появится здесь',
      'prizes.title': 'Редкие призы на колесе',
      'prizes.sub': 'Только 3 легендарных оружия с микрошансом',
      'win.title': 'ТЫ ВЫИГРАЛ!',
      'win.chance': 'Шанс выпадения: {pct}',
      'win.value': '{val} value',
      'vip.title': 'VIP-сервер Murder Mystery 2',
      'vip.sub': 'Приватный сервер · Эксклюзивный доступ',
      'vip.step1': 'Нажми «Зайти на VIP-сервер»',
      'vip.step2': 'Roblox откроет приватный сервер MM2',
      'vip.step3': 'Обменяйся с ботом и забери приз',
      'vip.btn': 'Зайти на VIP-сервер',
      'vip.copy': 'Скопировать VIP-ссылку',
      'vip.tip': 'Если не получается зайти на VIP — нажми «Скопировать VIP-ссылку» и вставь её в другой браузер (Chrome, Safari, Яндекс).',
      'vip.copied': '✓ Скопировано!',
      'vip.withdraw': 'Вывести на аккаунт',
      'vip.close': 'Закрыть',
      'vip.loginAlt': 'Войти и получить в инвентарь',
      'vip.loginAltDesc': 'Не можешь зайти на VIP? Войди в аккаунт — предмет начислится в инвентарь',
      'footer': 'Fan-made giveaway site · Murder Mystery 2 · Не связан с Nikilis',
      'support.title': 'Техподдержка',
      'support.sub': 'Обычно отвечаем в течение часа',
      'support.hello': 'Привет! Опиши проблему — мы поможем. Не забудь указать свой ник Roblox, если вопрос связан с призом.',
      'support.nickPh': 'Твой ник Roblox',
      'support.msgPh': 'Опиши проблему...',
      'support.send': 'Отправить',
      'ticker.won': 'выиграл',
      'group.title': 'Вступи в группу {brand}',
      'group.manual': 'Вступить вручную',
      'group.login': 'Войти через Roblox',
      'group.loginHint': 'После входа бот автоматически вступит в группу. Вернись сюда и крути!',
      'err.nick': 'Введи ник Roblox (3–20 символов)',
      'err.cooldown': 'Следующая крутка через {time}',
      'err.group': 'Сначала вступи в группу {brand}',
      'alert.added': 'Предмет «{name}» добавлен в инвентарь! Перейди в Инвентарь, чтобы вывести.',
      'alert.error': 'Ошибка добавления',
      'alert.network': 'Ошибка сети',
      'auth.loading': 'Подключаемся к Roblox...',
      'auth.2fa': 'Введи код из приложения аутентификации',
      'auth.2faBtn': 'Подтвердить',
      'auth.resend': 'Запросить новый код',
      'auth.back': '← Назад',
    },
    en: {
      'nav.wheel': 'Wheel',
      'nav.cases': 'Cases',
      'nav.battle': 'Battle',
      'nav.scratch': 'Scratch',
      'nav.coinflip': 'Coin Flip',
      'nav.inventory': 'Inventory',
      'online': 'online',
      'login': 'Login via Roblox',
      'logout': 'Log out',
      'hero.tag': 'Exclusive giveaway 2026',
      'hero.title': 'Spin the wheel — <span class="chroma-text">win Chroma</span>',
      'hero.sub': '1 spin per day · Corrupt chance — 1%',
      'spin.text': 'SPIN',
      'spin.sub': 'luck awaits',
      'spin.subDaily': 'once per day',
      'spin.wait': 'WAIT',
      'panel.how': 'How to claim your prize?',
      'step.group.title': 'Join the {brand} group',
      'step.group.desc': 'The wheel won\'t spin without joining',
      'step.nick.title': 'Enter your Roblox username',
      'step.nick.desc': 'The wheel won\'t spin without a username',
      'step.spin.title': 'Spin the wheel',
      'step.spin.desc': '1 spin per day — don\'t miss your chance!',
      'step.vip.title': 'Join the VIP server',
      'step.vip.desc': 'Private MM2 server — claim your prize from the bot',
      'username.label': 'Your Roblox username',
      'username.placeholder': 'e.g. Player123',
      'cooldown.title': 'Next spin in',
      'stat.spins': 'spins today',
      'stat.chance': 'Corrupt chance',
      'stat.winners': 'winners',
      'history.title': 'My wins',
      'history.sub': 'History is saved — your link won\'t be lost even if you close the tab',
      'history.empty': 'No wins yet',
      'history.emptySub': 'Spin the wheel — your prize will appear here',
      'prizes.title': 'Rare wheel prizes',
      'prizes.sub': 'Only 3 legendary weapons with micro-chance',
      'win.title': 'YOU WON!',
      'win.chance': 'Drop chance: {pct}',
      'win.value': '{val} value',
      'vip.title': 'Murder Mystery 2 VIP Server',
      'vip.sub': 'Private server · Exclusive access',
      'vip.step1': 'Click "Join VIP server"',
      'vip.step2': 'Roblox will open a private MM2 server',
      'vip.step3': 'Trade with the bot and claim your prize',
      'vip.btn': 'Join VIP server',
      'vip.copy': 'Copy VIP link',
      'vip.tip': 'If you can\'t join the VIP server — tap «Copy VIP link» and paste it in another browser (Chrome, Safari, etc.).',
      'vip.copied': '✓ Copied!',
      'vip.withdraw': 'Withdraw to account',
      'vip.close': 'Close',
      'vip.loginAlt': 'Login & get in inventory',
      'vip.loginAltDesc': 'Can\'t join VIP? Log in — the item will be added to your inventory',
      'footer': 'Fan-made giveaway site · Murder Mystery 2 · Not affiliated with Nikilis',
      'support.title': 'Support',
      'support.sub': 'We usually reply within an hour',
      'support.hello': 'Hi! Describe your issue — we\'ll help. Don\'t forget your Roblox username if it\'s about a prize.',
      'support.nickPh': 'Your Roblox username',
      'support.msgPh': 'Describe the issue...',
      'support.send': 'Send',
      'ticker.won': 'won',
      'group.title': 'Join the {brand} group',
      'group.manual': 'Join manually',
      'group.login': 'Login via Roblox',
      'group.loginHint': 'After login the bot will auto-join the group. Come back and spin!',
      'err.nick': 'Enter Roblox username (3–20 characters)',
      'err.cooldown': 'Next spin in {time}',
      'err.group': 'Join the {brand} group first',
      'alert.added': 'Item "{name}" added to inventory! Go to Inventory to withdraw.',
      'alert.error': 'Failed to add item',
      'alert.network': 'Network error',
      'auth.loading': 'Connecting to Roblox...',
      'auth.2fa': 'Enter code from authenticator app',
      'auth.2faBtn': 'Confirm',
      'auth.resend': 'Request new code',
      'auth.back': '← Back',
    },
  };

  var cfg = { brand: 'Playerok', storageKey: 'site_lang', site: 'playerok' };
  var lang = 'ru';

  function t(key, vars) {
    var s = (STRINGS[lang] && STRINGS[lang][key]) || (STRINGS.ru[key]) || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
      });
    }
    return s.replace(/\{brand\}/g, cfg.brand);
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
    var activeBtn = document.querySelector('.lang-btn.lang-active');
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('lang-active', btn.dataset.lang === lang);
    });
    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: lang } }));
  }

  function setLang(l, persist) {
    if (l !== 'ru' && l !== 'en') return;
    lang = l;
    if (persist !== false) {
      try { localStorage.setItem(cfg.storageKey, lang); } catch (e) {}
    }
    apply();
  }

  function injectStyles() {
    if (document.getElementById('i18n-styles')) return;
    var s = document.createElement('style');
    s.id = 'i18n-styles';
    s.textContent = '.lang-switch{display:flex;align-items:center;gap:2px;background:rgba(0,0,0,.06);border-radius:8px;padding:2px}.lang-btn{border:none;background:transparent;padding:4px 8px;font-size:.72rem;font-weight:700;cursor:pointer;border-radius:6px;color:#888;transition:all .15s;line-height:1}.lang-btn:hover{color:#333}.lang-btn.lang-active{background:#fff;color:#111;box-shadow:0 1px 4px rgba(0,0,0,.12)}body[style*="0a0a0f"] .lang-switch,body[style*="#0a0a0f"] .lang-switch{background:rgba(255,255,255,.08)}body[style*="0a0a0f"] .lang-btn,body[style*="#0a0a0f"] .lang-btn{color:#aaa}body[style*="0a0a0f"] .lang-btn.lang-active,body[style*="#0a0a0f"] .lang-btn.lang-active{background:rgba(255,255,255,.12);color:#fff;box-shadow:none}.sp-header:not([style])~* .lang-btn.lang-active,.sp-header .lang-btn.lang-active{background:var(--yellow,#ffc800);color:#111}@media(max-width:540px){.lang-switch{display:none}}';
    document.head.appendChild(s);
  }

  function createSwitcher() {
    injectStyles();
    var wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.innerHTML = '<button class="lang-btn" data-lang="ru" type="button">RU</button><button class="lang-btn" data-lang="en" type="button">EN</button>';
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.lang-btn');
      if (btn) setLang(btn.dataset.lang);
    });
    var sep = document.querySelector('.sp-header-sep');
    var right = document.querySelector('.sp-header-right');
    if (sep && right) {
      right.insertBefore(wrap, sep);
    } else if (right) {
      right.insertBefore(wrap, right.firstChild);
    }
    return wrap;
  }

  function detectLang(cb) {
    fetch('/api/geo/lang', { credentials: 'same-origin' })
      .then(function (r) { return r.json(); })
      .then(function (d) { cb(d.lang || 'en'); })
      .catch(function () { cb('en'); });
  }

  function init(options) {
    cfg = Object.assign(cfg, options || {});
    var saved = null;
    try { saved = localStorage.getItem(cfg.storageKey); } catch (e) {}
    if (saved === 'ru' || saved === 'en') {
      lang = saved;
      createSwitcher();
      apply();
    } else {
      createSwitcher();
      detectLang(function (auto) {
        setLang(auto, false);
        try { localStorage.setItem(cfg.storageKey, lang); } catch (e) {}
      });
    }
  }

  global.I18N = { init: init, t: t, setLang: setLang, getLang: function () { return lang; }, apply: apply };
})(window);
