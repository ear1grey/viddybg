const TOGGLE_KEY = 'KeyK';
const FLIP_KEY = 'KeyX';
const CONSTRAINTS = { audio: false, video: { width: 1280, height: 720 } };
const STYLE_OFF = 'opacity: 0.0;';

const IS_MAC = navigator.platform?.toLowerCase().includes('mac')
  || navigator.userAgentData?.platform?.toLowerCase().includes('mac');

let video;
let isOn = false;
let isFlipped = true;

const styleOn = () => {
  const midImg = video.clientWidth / 2;
  const midPage = document.body.clientWidth / 2;
  const xOff = midPage - midImg;
  const transform = isFlipped ? 'transform: scaleX(-1);' : '';
  return `opacity:1.0; min-width:100%; min-height:100%; z-index:-1; position: absolute; top: 0; left: ${xOff}px; ${transform}`;
};

const resizer = () => {
  if (!video || !isOn) return;
  video.setAttribute('style', styleOn());
};

const injectVid = () => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute(
    'style',
    'overflow: hidden; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1;',
  );

  const v = document.createElement('video');
  v.id = 'viddybg';
  v.setAttribute('style', STYLE_OFF);

  wrapper.append(v);
  document.body.prepend(wrapper);

  v.addEventListener('playing', () => {
    setTimeout(resizer, 50);
  });

  return v;
};

const startStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    video.srcObject = stream;
    video.addEventListener(
      'loadedmetadata',
      () => {
        video.play();
        resizer();
      },
      { once: true },
    );
  } catch (err) {
    console.log('Media Error', err);
  }
};

const togglePlayer = () => {
  if (isOn) {
    video.setAttribute('style', STYLE_OFF);
    video.pause();
  } else {
    startStream();
  }
  isOn = !isOn;
};

const toggleFlip = () => {
  isFlipped = !isFlipped;
  if (isOn) resizer();
};

// Accept Ctrl+Alt on any platform, plus Cmd+Alt on macOS.
const hasModifiers = (e) => e.altKey && (e.ctrlKey || (IS_MAC && e.metaKey));

const keyHandler = (e) => {
  if (!hasModifiers(e)) return;
  if (e.code === TOGGLE_KEY) {
    togglePlayer();
  } else if (e.code === FLIP_KEY) {
    toggleFlip();
  }
};

const init = () => {
  video = injectVid();
  window.addEventListener('keydown', keyHandler);
  window.addEventListener('resize', resizer);
  togglePlayer();
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

export { togglePlayer, toggleFlip, init };
