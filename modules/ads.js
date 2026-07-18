/**
 * ads.js — Google AdSense Slot Manager
 * Manages ad placeholder divs and loads AdSense script.
 * In development: shows styled placeholder blocks.
 * In production: replace YOUR_PUBLISHER_ID and slot IDs.
 *
 * Slot sizes used:
 *   #ad-slot-leaderboard  → 728x90  (top of content)
 *   #ad-slot-rectangle    → 300x250 (sidebar / between content)
 *   #ad-slot-banner       → 468x60  (between sections)
 */

const AdsModule = (() => {
  // ── Config ── Replace with real AdSense IDs before going live ──
  const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX';
  const SLOTS = {
    leaderboard: 'XXXXXXXXXX',  // 728x90
    rectangle:   'XXXXXXXXXX',  // 300x250
    banner:      'XXXXXXXXXX',  // 468x60
  };

  const IS_DEV = !window.location.hostname.includes('.vercel.app') &&
                 !window.location.hostname.includes('aptitudemaster');

  function injectAdSenseScript() {
    if (IS_DEV) return; // Don't load in localhost dev
    if (document.querySelector('script[data-adsense]')) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
    s.crossOrigin = 'anonymous';
    s.dataset.adsense = 'true';
    document.head.appendChild(s);
  }

  function renderSlot(containerId, type) {
    const el = document.getElementById(containerId);
    if (!el) return;

    if (IS_DEV) {
      // Show dev placeholder
      const sizes = {
        leaderboard: '728x90',
        rectangle:   '300x250',
        banner:      '468x60',
      };
      el.innerHTML = `
        <div class="ad-placeholder" data-size="${sizes[type] || ''}">
          <span>Ad Slot — ${sizes[type] || type}</span>
          <small>Replace publisher ID in modules/ads.js</small>
        </div>`;
      return;
    }

    // Production AdSense tag
    el.innerHTML = `
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="${PUBLISHER_ID}"
           data-ad-slot="${SLOTS[type] || ''}"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>`;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
    catch(e) { console.warn('AdSense push failed:', e); }
  }

  function initAll() {
    injectAdSenseScript();
    renderSlot('ad-slot-leaderboard', 'leaderboard');
    renderSlot('ad-slot-rectangle',   'rectangle');
    renderSlot('ad-slot-banner',       'banner');
  }

  return { initAll, renderSlot };
})();

if (typeof module !== 'undefined') module.exports = AdsModule;
