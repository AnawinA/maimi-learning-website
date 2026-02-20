/**
 * settings.js — Export / Import / Clear localStorage progress as JSON
 */
(function () {
    'use strict';
    var KEY = 'user_progress';

    function safeGet() {
        try { return localStorage.getItem(KEY) || '{}'; } catch (e) { return '{}'; }
    }
    function safeSet(val) {
        try { localStorage.setItem(KEY, val); return true; } catch (e) { return false; }
    }
    function safeRemove() {
        try { localStorage.removeItem(KEY); return true; } catch (e) { return false; }
    }

    function showAlert(id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.classList.add('show');
        setTimeout(function () { el.classList.remove('show'); }, 3500);
    }

    var exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function () {
            var data = safeGet();
            var blob = new Blob([JSON.stringify(JSON.parse(data), null, 2)], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url; a.download = 'maimi-progress.json'; a.click();
            URL.revokeObjectURL(url);
            showAlert('export-alert');
        });
    }

    var importInput = document.getElementById('import-file-input');
    if (importInput) {
        importInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function (ev) {
                try {
                    var parsed = JSON.parse(ev.target.result);
                    if (typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('bad format');
                    if (safeSet(JSON.stringify(parsed))) showAlert('import-success');
                    else showAlert('import-error');
                } catch (err) { showAlert('import-error'); }
            };
            reader.readAsText(file);
            importInput.value = '';
        });
    }

    var clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            if (!confirm('Delete ALL progress? This cannot be undone.')) return;
            safeRemove();
            showAlert('clear-alert');
        });
    }
})();
