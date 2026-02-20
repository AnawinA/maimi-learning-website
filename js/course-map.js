/**
 * course-map.js — Marks completed lesson nodes gold from localStorage
 */
(function () {
    'use strict';
    var raw = null;
    try {
        raw = localStorage.getItem('user_progress');
        console.log('[MaiMi] course-map.js read from localStorage:', raw);
    } catch (e) {
        console.warn('[MaiMi] course-map.js: localStorage blocked:', e.message);
    }
    var progress = {};
    try { progress = raw ? JSON.parse(raw) : {}; } catch (e) { }

    var nodes = document.querySelectorAll('.lesson-node');
    console.log('[MaiMi] Found', nodes.length, 'lesson nodes');
    nodes.forEach(function (node) {
        var id = node.dataset.lessonId;
        console.log('[MaiMi] Node ID:', id, '| completed:', !!(progress[id] && progress[id].completed));
        if (id && progress[id] && progress[id].completed) {
            node.classList.add('completed');
        }
    });
})();
