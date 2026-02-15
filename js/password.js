/**
 * 通關密語 - 簡單前端密碼驗證
 * 密碼通過後存入 localStorage，下次不用再輸入
 * 支援 URL 參數自動解鎖：?code=0613
 */
(function () {
  // 密碼設定（替換為真實密碼）
  const CORRECT_PASSWORD = '0613';
  const STORAGE_KEY = 'wedding_auth_v2';

  const gate = document.getElementById('password-gate');
  const app = document.getElementById('app');
  const input = document.getElementById('password-input');
  const submitBtn = document.getElementById('password-submit');
  const errorMsg = document.getElementById('password-error');

  function unlock() {
    gate.style.opacity = '0';
    gate.style.transition = 'opacity 0.5s ease';
    setTimeout(function () {
      gate.hidden = true;
      app.hidden = false;
      // Trigger AOS refresh after app is visible
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 500);
    localStorage.setItem(STORAGE_KEY, 'true');
  }

  // Check URL parameter for auto-unlock (?code=0613)
  var urlParams = new URLSearchParams(window.location.search);
  var codeParam = urlParams.get('code');
  if (codeParam === CORRECT_PASSWORD) {
    gate.hidden = true;
    app.hidden = false;
    localStorage.setItem(STORAGE_KEY, 'true');
    // Strip code parameter from URL to prevent leaking in referrer/history
    history.replaceState(null, '', window.location.pathname + window.location.hash);
    return;
  }

  // Check if already authenticated
  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    gate.hidden = true;
    app.hidden = false;
    return;
  }

  function tryPassword() {
    var value = input.value.trim();
    if (value === CORRECT_PASSWORD) {
      errorMsg.hidden = true;
      unlock();
    } else {
      errorMsg.hidden = false;
      input.value = '';
      input.focus();
      // Shake animation
      input.style.animation = 'shake 0.3s ease';
      setTimeout(function () {
        input.style.animation = '';
      }, 300);
    }
  }

  submitBtn.addEventListener('click', tryPassword);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      tryPassword();
    }
  });

  // Auto focus
  input.focus();
})();
