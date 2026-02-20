/**
 * lesson.js — Scroll progress bar + Finish Lesson logic
 */
(function () {
    'use strict';

    /* ---------- Safe localStorage wrapper ---------- */
    var storageAvailable = false;
    var storage = (function () {
        try {
            localStorage.setItem('__maimi_test__', '1');
            localStorage.removeItem('__maimi_test__');
            storageAvailable = true;
            console.log('[MaiMi] localStorage is available ✓');
            return localStorage;
        } catch (e) {
            console.warn('[MaiMi] localStorage is BLOCKED — progress will not persist. Error:', e.message);
            showStorageWarning();
            var mem = {};
            return {
                getItem: function (k) { return mem[k] !== undefined ? mem[k] : null; },
                setItem: function (k, v) { mem[k] = String(v); },
                removeItem: function (k) { delete mem[k]; }
            };
        }
    })();

    function showStorageWarning() {
        var banner = document.createElement('div');
        banner.style.cssText =
            'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);' +
            'background:#F85149;color:#fff;padding:12px 20px;border-radius:10px;' +
            'font-size:0.85rem;font-weight:600;z-index:9999;max-width:90vw;text-align:center;' +
            'box-shadow:0 4px 20px rgba(0,0,0,0.5);';
        banner.textContent = '⚠ Storage blocked! Open the site via http://localhost:1313 — not as a file. Progress cannot be saved.';
        document.body.appendChild(banner);
        setTimeout(function () { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 8000);
    }

    /* ---------- DOM refs ---------- */
    var bar = document.getElementById('lesson-progress-bar');
    var finishBtn = document.getElementById('finish-btn');
    var modal = document.getElementById('celebration-modal');
    var overlay = document.getElementById('celebration-overlay');
    var continueBtn = document.getElementById('celebration-continue');
    var xpEl = document.getElementById('celebration-xp');

    if (!bar || !finishBtn) return;

    var THRESHOLD = 95;
    var unlocked = false;

    /* ---------- Scroll progress ---------- */
    function getScrollPct() {
        var total = document.documentElement.scrollHeight - window.innerHeight;
        return total <= 0 ? 100 : Math.min(100, (window.scrollY / total) * 100);
    }

    function onScroll() {
        var pct = getScrollPct();
        bar.style.width = pct + '%';
        if (!unlocked && pct >= THRESHOLD) {
            unlocked = true;
            finishBtn.disabled = false;
            finishBtn.classList.add('ready');
            if (finishBtn.animate) {
                finishBtn.animate(
                    [{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }],
                    { duration: 500, iterations: 2 }
                );
            }
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Finish Lesson click ---------- */
    finishBtn.addEventListener('click', function () {
        var lessonId = finishBtn.dataset.lessonId;
        var lessonTitle = finishBtn.dataset.lessonTitle;
        var xp = parseInt(finishBtn.dataset.xp, 10) || 10;
        var redirect = finishBtn.dataset.redirect || '/courses/';

        var raw;
        try { raw = storage.getItem('user_progress'); } catch (e) { raw = null; }
        var progress;
        try { progress = raw ? JSON.parse(raw) : {}; } catch (e) { progress = {}; }

        progress[lessonId] = {
            lessonId: lessonId,
            title: lessonTitle,
            completed: true,
            xp: xp,
            completedAt: new Date().toISOString()
        };

        var saved = JSON.stringify(progress);
        storage.setItem('user_progress', saved);

        // Verify the save
        var verify = storage.getItem('user_progress');
        console.log('[MaiMi] Saved progress for "' + lessonId + '"');
        console.log('[MaiMi] Stored in ' + (storageAvailable ? 'localStorage ✓' : 'MEMORY (will be lost on redirect) ✗'));
        console.log('[MaiMi] Full data:', verify);

        if (xpEl) xpEl.textContent = '+' + xp + ' XP';
        showCelebration(redirect);
    });

    /* ---------- Celebration modal ---------- */
    function showCelebration(redirectUrl) {
        if (!modal || !overlay) { window.location.href = redirectUrl; return; }
        modal.classList.add('show');
        overlay.classList.add('show');
        modal.removeAttribute('aria-hidden');
        spawnConfetti();
        function doRedirect() { window.location.href = redirectUrl; }
        if (continueBtn) continueBtn.addEventListener('click', doRedirect, { once: true });
        overlay.addEventListener('click', doRedirect, { once: true });
    }

    /* ---------- Confetti ---------- */
    function spawnConfetti() {
        var container = document.getElementById('confetti-container') || document.body;
        var colors = ['#F0B429', '#58A6FF', '#3FB950', '#ff9f43', '#ffffff'];
        for (var i = 0; i < 32; i++) {
            (function (idx) {
                var dot = document.createElement('div');
                dot.style.cssText =
                    'position:absolute;width:8px;height:8px;border-radius:50%;' +
                    'background:' + colors[idx % colors.length] + ';' +
                    'top:50%;left:' + (10 + Math.random() * 80) + '%;' +
                    'animation:confetti-fall ' + (0.8 + Math.random()) + 's ease-out forwards;' +
                    'animation-delay:' + (Math.random() * 0.4) + 's;';
                container.appendChild(dot);
                setTimeout(function () { if (dot.parentNode) dot.parentNode.removeChild(dot); }, 2000);
            })(i);
        }
        if (!document.getElementById('confetti-style')) {
            var s = document.createElement('style');
            s.id = 'confetti-style';
            s.textContent = '@keyframes confetti-fall{from{transform:translateY(0) rotate(0deg);opacity:1}to{transform:translateY(120px) rotate(360deg);opacity:0}}';
            document.head.appendChild(s);
        }
    }

})();
