import { TOGGLE_SWITCHER } from '../actions';

const initialState = {
  options: ['全屏'],
  isOpens: [false]
};

/*
 * http://stackoverflow.com/questions/1125084/how-to-make-in-javascript-full-screen-windows-stretching-all-over-the-screen
 */
function cancelFullScreen(el) {
  var requestMethod = el.cancelFullScreen||el.webkitExitFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen;
  if (requestMethod) {
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

function requestFullScreen(el) {
  var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

  if (requestMethod) {
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
  return false;
}

function toggleFull() {
  var elem = document.body;
  var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);

  if (isInFullScreen) {
    cancelFullScreen(document);
  } else {
    requestFullScreen(elem);
  }
  return false;
}

export default function settings (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCHER:
      let changingOptionIndex = state.options.indexOf(action.option);
      if (changingOptionIndex === 0) {
        toggleFull();
      }
      let isOpens = state.isOpens.concat();
      isOpens[changingOptionIndex] = action.isOpen;
      return Object.assign({}, state, { isOpens: isOpens });
    default:
      return state;
  }
};
