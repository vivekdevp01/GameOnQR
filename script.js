/* ============================================================================
   GAMEON INDIA — QR LANDING PAGE · LAUNCH SWITCHES
   ----------------------------------------------------------------------------
   THIS IS THE ONLY PART OF THIS FILE YOU EVER NEED TO EDIT.

   When your store status changes: flip the boolean, paste the store URL,
   save, and redeploy. Every message, button and highlight on the page
   updates automatically. Nothing below the line ever needs touching.
============================================================================ */

/* ---- TEMPORARY TEST LINKS (Clash of Clans) — flip back when done ----
   Real GameOn links are kept below as comments, ready to restore:
   const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.emergent.rfidcompanion.pbctn5";
   const IOS_URL = "";
--------------------------------------------------------------------- */
const ANDROID_LIVE = true;

// TEMPORARY: Clash of Clans on Google Play
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.supercell.clashofclans";

const IOS_LIVE = true;

// TEMPORARY: Clash of Clans on the App Store
const IOS_URL = "https://apps.apple.com/in/app/clash-of-clans/id529479190";

/* =========================  NO EDITING BELOW THIS LINE  ==================== */
(function () {
  "use strict";

  /* ---- Device detection (never asks the customer to choose) ---- */
  var ua = navigator.userAgent || "";
  var isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var isMobile = isAndroid || isIOS;

  /* ---- A platform is only truly live when the flag AND a URL exist ---- */
  var androidReady = ANDROID_LIVE && typeof ANDROID_URL === "string" && ANDROID_URL.trim() !== "";
  var iosReady = IOS_LIVE && typeof IOS_URL === "string" && IOS_URL.trim() !== "";

  /* ---- Grab the page pieces ---- */
  var pill = document.getElementById("status-pill");
  var pillText = document.getElementById("status-pill-text");
  var sub = document.getElementById("status-message");
  var cards = {
    android: document.querySelector('[data-platform="android"]'),
    ios: document.querySelector('[data-platform="ios"]')
  };

  function applyPlatform(el, live, url) {
    var chip = el.querySelector(".store-chip");
    if (live) {
      el.href = url;
      el.classList.add("is-live");
      el.classList.remove("is-soon");
      el.setAttribute("aria-label", el.getAttribute("data-live-label"));
      chip.textContent = "LIVE NOW";
      chip.classList.add("chip-live");
      chip.setAttribute("data-testid", chip.getAttribute("data-testid") + "-live");
    } else {
      el.removeAttribute("href");
      el.classList.add("is-soon");
      el.classList.remove("is-live");
      el.setAttribute("aria-disabled", "true");
      chip.textContent = "COMING SOON";
      chip.classList.remove("chip-live");
    }
  }

  applyPlatform(cards.android, androidReady, ANDROID_URL);
  applyPlatform(cards.ios, iosReady, IOS_URL);

  /* ---- Smart ordering: the customer's own store comes first ---- */
  if (isIOS) {
    cards.ios.style.order = "0";
    cards.android.style.order = "1";
  } else {
    cards.android.style.order = "0";
    cards.ios.style.order = "1";
  }

  /* ---- Recommendation tag only on a device whose app is really live ---- */
  if (isAndroid && androidReady) cards.android.classList.add("recommended");
  if (isIOS && iosReady) cards.ios.classList.add("recommended");

  /* ---- Honest status copy, derived only from the four values above ---- */
  var anyLive = androidReady || iosReady;
  var bothLive = androidReady && iosReady;
  var pillMsg, subMsg;

  if (bothLive) {
    pill.classList.add("is-live");
    if (isAndroid) {
      pillMsg = "NOW LIVE ON GOOGLE PLAY";
      subMsg = "You\u2019re on Android \u2014 one tap below and the arcade is in your pocket.";
    } else if (isIOS) {
      pillMsg = "NOW LIVE ON THE APP STORE";
      subMsg = "You\u2019re on iPhone \u2014 one tap below and the arcade is in your pocket.";
    } else {
      pillMsg = "NOW LIVE ON BOTH STORES";
      subMsg = "Pick your store below \u2014 your GameOn membership card pairs right inside the app.";
    }
  } else if (androidReady) {
    pill.classList.add("is-live");
    pillMsg = "NOW LIVE ON GOOGLE PLAY";
    if (isAndroid) {
      subMsg = "You\u2019re on Android \u2014 grab the app and link your membership card in seconds.";
    } else {
      subMsg = "Our Android app is live on Google Play. The iPhone version is coming soon.";
    }
  } else if (iosReady) {
    pill.classList.add("is-live");
    pillMsg = "NOW LIVE ON THE APP STORE";
    if (isIOS) {
      subMsg = "You\u2019re on iPhone \u2014 grab the app and link your membership card in seconds.";
    } else {
      subMsg = "Our iPhone app is live on the App Store. The Android version is coming soon.";
    }
  } else {
    pillMsg = "LAUNCHING SOON";
    subMsg = "We\u2019re putting the finishing touches on the GameOn India app. Check back in a couple of weeks \u2014 your membership card is about to level up.";
  }

  pillText.textContent = pillMsg;
  sub.textContent = subMsg;

  /* ---- Subtle desktop-only parallax on the marquee frame ---- */
  var frame = document.querySelector(".marquee-frame");
  if (frame && window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("pointermove", function (e) {
      var dx = e.clientX / window.innerWidth - 0.5;
      var dy = e.clientY / window.innerHeight - 0.5;
      frame.style.transform =
        "perspective(900px) rotateX(" + (-dy * 3.5).toFixed(2) + "deg) rotateY(" + (dx * 4.5).toFixed(2) + "deg)";
    });
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById("footer-year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();