/**
 * profile.js — Renders user stats and completed lesson list from localStorage
 */
(function () {
    'use strict';

    var raw;
    try { raw = localStorage.getItem('user_progress'); } catch (e) { raw = null; }
    var progress = {};
    try { progress = raw ? JSON.parse(raw) : {}; } catch (e) { }

    var lessons = Object.values(progress).filter(function (l) { return l.completed; });
    var totalXP = lessons.reduce(function (s, l) { return s + (l.xp || 0); }, 0);
    var totalCompleted = lessons.length;
    var total = typeof TOTAL_LESSONS !== 'undefined' ? TOTAL_LESSONS : 0;
    var pct = total > 0 ? Math.round((totalCompleted / total) * 100) : 0;

    function calcStreak(ls) {
        if (!ls.length) return 0;
        var days = ls.map(function (l) { return l.completedAt ? l.completedAt.slice(0, 10) : null; })
            .filter(Boolean);
        days = Array.from(new Set(days)).sort().reverse();
        var streak = 1;
        for (var i = 1; i < days.length; i++) {
            var diff = (new Date(days[i - 1]) - new Date(days[i])) / 86400000;
            if (diff === 1) streak++; else break;
        }
        var today = new Date().toISOString().slice(0, 10);
        var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (days[0] !== today && days[0] !== yesterday) streak = 0;
        return streak;
    }

    function setEl(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }
    setEl('stat-completed', totalCompleted);
    setEl('stat-xp', totalXP);
    setEl('stat-streak', '🔥' + calcStreak(lessons));
    setEl('stat-pct', pct + '%');

    var listEl = document.getElementById('completed-list');
    var emptyEl = document.getElementById('profile-empty');
    if (!listEl) return;

    if (!lessons.length) { if (emptyEl) emptyEl.style.display = 'block'; return; }
    if (emptyEl) emptyEl.remove();

    lessons
        .sort(function (a, b) { return new Date(b.completedAt) - new Date(a.completedAt); })
        .forEach(function (lesson) {
            var date = lesson.completedAt
                ? new Date(lesson.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                : '';
            var item = document.createElement('div');
            item.className = 'completed-item';
            item.innerHTML =
                '<span class="check">✓</span>' +
                '<span>' + (lesson.title || lesson.lessonId) + '</span>' +
                '<span class="completed-date">' + date + '</span>' +
                '<span class="item-xp">+' + (lesson.xp || 0) + ' XP</span>';
            listEl.appendChild(item);
        });
})();
