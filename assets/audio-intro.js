/* Landing-page intro: gate the page behind a click, then start the track 3s later.
   Browsers block autoplay with sound until the visitor interacts, so the
   "Enter" click is what unlocks audio. */

const VIDEO_ID = '0JinfFfDahQ';
const START_DELAY = 3000; // 3 seconds after entering

const overlay = document.getElementById('intro');
const enterBtn = document.getElementById('enter');
const frame = document.getElementById('intro-audio');
const soundBtn = document.getElementById('sound-toggle');

let muted = false;

function command(func, args = []) {
  if (!frame || !frame.contentWindow) return;
  frame.contentWindow.postMessage(
    JSON.stringify({ event: 'command', func, args }),
    '*'
  );
}

function play() {
  command('playVideo');
  if (soundBtn) soundBtn.hidden = false;
}

if (overlay && enterBtn) {
  document.body.classList.add('locked');

  enterBtn.addEventListener('click', () => {
    overlay.classList.add('is-hidden');
    document.body.classList.remove('locked');
    overlay.setAttribute('aria-hidden', 'true');
    setTimeout(play, START_DELAY);
  });
}

if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    muted = !muted;
    command(muted ? 'mute' : 'unMute');
    soundBtn.textContent = muted ? 'Sound off' : 'Sound on';
    soundBtn.setAttribute('aria-pressed', String(!muted));
  });
}
