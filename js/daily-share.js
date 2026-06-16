// JamiaPrep — Daily Challenge share cards. Draws a portrait PNG on an
// offscreen canvas and shares via Web Share API, falling back to a PNG
// download + WhatsApp text link. Brand: green #1b6e3c / gold #d4a017.
(function () {
  'use strict';
  var GREEN = '#1b6e3c', GREEN_D = '#0e3d20', GOLD = '#d4a017', CREAM = '#f6f1e4', INK = '#16241c';
  var W = 1080, H = 1350, SITE = 'jamiaprep.com';

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // Wrap text to a max width, return array of lines.
  function wrap(ctx, text, maxW) {
    var words = String(text).split(/\s+/), lines = [], line = '';
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = words[i]; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }

  function newCanvas() {
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    return c;
  }

  function drawDare(puzzle, stats) {
    var c = newCanvas(), ctx = c.getContext('2d');
    ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = GREEN; ctx.fillRect(0, 0, W, 150);
    ctx.fillStyle = '#fff'; ctx.font = '700 56px system-ui, sans-serif'; ctx.textBaseline = 'middle';
    ctx.fillText('JamiaPrep', 70, 78);
    ctx.fillStyle = GOLD; ctx.font = '700 34px system-ui, sans-serif'; ctx.textAlign = 'right';
    ctx.fillText('DAILY CHALLENGE', W - 70, 78); ctx.textAlign = 'left';
    ctx.fillStyle = GREEN; ctx.font = '800 34px system-ui, sans-serif';
    var TRACK_LABEL = { general: 'JMI ENTRANCE', mba: 'JMI MBA', ballb: 'JMI BA LLB', mca: 'JMI MCA', rca: 'JMI RCA' };
    var trackLabel = TRACK_LABEL[puzzle.track] || ('JMI ' + puzzle.track.toUpperCase());
    ctx.fillText(trackLabel + ' · ' + puzzle.subject.toUpperCase(), 70, 250);
    ctx.fillStyle = INK; ctx.font = '800 62px system-ui, sans-serif';
    var lines = wrap(ctx, puzzle.text, W - 140), y = 360;
    lines.slice(0, 5).forEach(function (ln) { ctx.fillText(ln, 70, y); y += 78; });
    ctx.fillStyle = '#c0392b'; ctx.font = '900 180px system-ui, sans-serif';
    ctx.fillText(stats.pctWrong + '%', 70, y + 160);
    ctx.fillStyle = '#5a6b62'; ctx.font = '600 40px system-ui, sans-serif';
    ctx.fillText('of aspirants got this WRONG today', 70, y + 280);
    ctx.strokeStyle = GOLD; ctx.lineWidth = 4; ctx.setLineDash([14, 10]);
    roundRect(ctx, 70, H - 320, W - 140, 130, 24); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = GREEN; ctx.font = '800 52px system-ui, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Can you solve it? 👀', W / 2, H - 255);
    ctx.fillStyle = '#5a6b62'; ctx.font = '700 38px system-ui, sans-serif';
    ctx.fillText(stats.solved + ' solved today  ·  ' + SITE, W / 2, H - 110);
    ctx.textAlign = 'left';
    return c;
  }

  function drawFlex(streak, pctCorrect) {
    var c = newCanvas(), ctx = c.getContext('2d');
    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, GREEN); g.addColorStop(1, GREEN_D);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = GOLD; ctx.font = '900 48px system-ui, sans-serif';
    ctx.fillText('JAMIAPREP', W / 2, 150);
    ctx.font = '400 240px system-ui, sans-serif'; ctx.fillStyle = '#fff';
    ctx.fillText('🔥', W / 2, 430);
    ctx.font = '900 220px system-ui, sans-serif';
    ctx.fillText(String(streak), W / 2, 680);
    ctx.font = '600 56px system-ui, sans-serif';
    ctx.fillText('day JMI prep streak', W / 2, 820);
    ctx.fillStyle = 'rgba(255,255,255,0.12)'; roundRect(ctx, 120, 920, W - 240, 230, 28); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '600 46px system-ui, sans-serif';
    ctx.fillText('Today only ' + pctCorrect + '% cracked it.', W / 2, 1010);
    ctx.fillText('I’m one of them. ✅', W / 2, 1075);
    ctx.fillStyle = GOLD; ctx.font = '800 44px system-ui, sans-serif';
    ctx.fillText(SITE, W / 2, 1240);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    return c;
  }

  function canvasToFile(canvas, name) {
    return new Promise(function (resolve) {
      canvas.toBlob(function (blob) {
        resolve(new File([blob], name, { type: 'image/png' }));
      }, 'image/png');
    });
  }

  function deliver(canvas, name, text) {
    canvasToFile(canvas, name).then(function (file) {
      var shareData = { files: [file], text: text, title: 'JamiaPrep Daily Challenge' };
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share(shareData).catch(function () { /* user cancelled */ });
      } else {
        var url = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = url; a.download = name; document.body.appendChild(a); a.click();
        a.remove(); URL.revokeObjectURL(url);
        window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + SITE), '_blank');
      }
    });
  }

  function shareDare(puzzle, stats) {
    var c = drawDare(puzzle, stats);
    deliver(c, 'jamiaprep-challenge.png',
      stats.pctWrong + '% of aspirants got today’s JMI challenge wrong — can you crack it?');
  }

  function offerFlex(streak, pctCorrect) {
    var c = drawFlex(streak, pctCorrect);
    deliver(c, 'jamiaprep-streak.png',
      'I’m on a ' + streak + '-day JMI prep streak on JamiaPrep! 🔥');
  }

  window.dailyShare = { shareDare: shareDare, offerFlex: offerFlex };
})();
