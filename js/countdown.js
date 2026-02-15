/**
 * 倒數計時器
 * 修改 WEDDING_DATE 為實際婚禮日期時間
 */
(function () {
  // 婚禮日期（替換為真實日期）
  var WEDDING_DATE = new Date('2026-06-13T12:00:00+08:00');

  var daysEl = document.getElementById('countdown-days');
  var hoursEl = document.getElementById('countdown-hours');
  var minutesEl = document.getElementById('countdown-minutes');
  var secondsEl = document.getElementById('countdown-seconds');

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function update() {
    var now = new Date();
    var diff = WEDDING_DATE - now;

    if (diff <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      clearInterval(timerId);
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  update();
  var timerId = setInterval(update, 1000);
})();
