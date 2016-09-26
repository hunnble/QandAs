export const CLICK_MENU_OPENER = 'clickMenuOpener';
export const HIDE_PASSWORD = 'hidePassword';
export const TOGGLE_PASSWORD = 'togglePassword';
export const TOGGLE_SWITCHER = 'toggleSwitcher';
export const TOGGLE_SETTINGS_VISIBLE = 'toggleSettingsVisible';
export const REQUEST_USER_INFO = 'setUserInfo';
export const RECEIVE_USER_INFO = 'getUserInfo';
export const START_UPDATE_USER_INFO = 'startUpdateUserInfo';
export const FINISH_UPDATE_USER_INFO = 'finishUpdateUserInfo';
export const CHANGE_MSG_VISIBLE = 'changeMsgVisible';
export const CHANGE_ERR_MSG = 'changeErrMsg';
export const SET_CALENDAR = 'setCalendar';
export const CHANGE_CALENDAR = 'changeCalendar';
export const CHANGE_CALENDAR_VISIBLE = 'changeCalendarVisible';
export const CHANGE_QUESTION_TITLE = 'changeQuestionTitle';
export const CREATE_QUESTION = 'createQuestion';
export const EDIT_QUESTION = 'editQuestion';
export const REMOVE_QUESTION = 'removeQuestion';
export const START_CREATE_PAPER = 'startCreatePaper';
export const FINISH_CREATE_PAPER = 'finishCreatePaper';
export const CHANGE_KEYWORDS = 'changeKeywords';
export const START_SEARCH_PAPER = 'startSearchPaper';
export const FINISH_SEARCH_PAPER = 'finishSearchPaper';
export const CHANGE_SEARCH_STEP = 'changeSearchStep';
export const CHANGE_PAPER = 'changePaper';
export const CHANGE_PAPERS = 'changePapers';
export const START_SUBMIT_ANSWER = 'startSubmitAnswer';
export const FINISH_SUBMIT_ANSWER = 'finishSubmitAnswer';

export function initialPageState () {
  return (dispatch) => {
    dispatch(handleMenuClose());
    dispatch(hidePassword());
    dispatch(closeSettings());
    dispatch(changeCalendarVisible(false));
    dispatch(changeKeywords(''));
  };
}

export function handleMenuOpen (currentTarget) {
  return {
    type: CLICK_MENU_OPENER,
    isOpen: true,
    anchorEl: currentTarget
  };
}

export function handleMenuClose () {
  return {
    type: CLICK_MENU_OPENER,
    isOpen: false
  };
}

export function hidePassword () {
  return {
    type: HIDE_PASSWORD
  };
}

export function togglePassword () {
  return {
    type: TOGGLE_PASSWORD
  };
}

export function handleChangeSwitcher (isOpen, option) {
  return {
    type: TOGGLE_SWITCHER,
    isOpen: !isOpen,
    option: option
  };
}

export function toggleSettingsVisible (visible) {
  return {
    type: TOGGLE_SETTINGS_VISIBLE,
    visible: !visible
  };
}

export function openSettings () {
  return {
    type: TOGGLE_SETTINGS_VISIBLE,
    visible: true
  };
}

export function closeSettings () {
  return {
    type: TOGGLE_SETTINGS_VISIBLE,
    visible: false
  };
}

export function getUserInfo (token, replace) {
  return (dispatch) => {
    dispatch(requestUserInfo(token));
    return fetch('/verify', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'token': token })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      for (let key in res){
        if (key !== 'user' && key !== 'verify' && !res.user[key]) {
          res.user[key] = res[key];
          delete res[key];
        }
      }
      dispatch(receiveUserInfo(res, replace));
    })
    .catch((err) => {
      dispatch(receiveUserInfo({ verify: false }, replace));
    })
  };
}

export function requestUserInfo (token) {
  return {
    type: REQUEST_USER_INFO,
    isFetching: true
  };
}

export function receiveUserInfo (res, replace) {
  return Object.assign({
    type: RECEIVE_USER_INFO,
    isFetching: false,
    replace: replace,
  }, res);
}

export function updateUserInfo (data) {
  return (dispatch) => {
    dispatch(startUpdateUserInfo());
    return fetch('/profile', {
      method: 'put',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.success) {
        res.errMsg = '更改信息成功';
      }
      dispatch(changeErrMsg(res.errMsg));
      dispatch(finishUpdateUserInfo(res));
    })
    .catch((err) => {
      dispatch(changeErrMsg('更改信息失败'));
      dispatch(finishUpdateUserInfo({ success: false }));
    })
  };
}

export function startUpdateUserInfo () {
  return {
    type: START_UPDATE_USER_INFO,
    isFetching: true
  };
}

export function finishUpdateUserInfo (res) {
  return Object.assign({
    type: FINISH_UPDATE_USER_INFO,
    isFetching: false
  }, res);
}

export function changeMsgVisible (visible) {
  return {
    type: CHANGE_MSG_VISIBLE,
    visible: visible
  };
}

export function changeErrMsg (newErrMsg) {
  return {
    type: CHANGE_ERR_MSG,
    errMsg: newErrMsg,
    visible: true
  };
}

export function setCalendar (year, month) {
  return {
    type: SET_CALENDAR,
    year: year,
    month: month
  };
}

export function changeCalendar (newTime) {
  return {
    type: CHANGE_CALENDAR,
    time: newTime
  };
}

export function changeCalendarVisible (visible) {
  return {
    type: CHANGE_CALENDAR_VISIBLE,
    visible: visible
  };
}

export function changeQuestionTitle (title) {
  return {
    type: CHANGE_QUESTION_TITLE,
    title: title
  }
}

export function createQuestion (question) {
  return {
    type: CREATE_QUESTION,
    question: question
  };
}

export function removeQuestion (removeAll, index) {
  return {
    type: REMOVE_QUESTION,
    removeAll: removeAll,
    index: index
  };
}

export function editQuestion (question, index) {
  return {
    type: EDIT_QUESTION,
    question: question,
    index: index
  }
}

export function submitPaper (data) {
  return (dispatch) => {
    dispatch(startCreatePaper());
    return fetch('/papers/edit', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.success) {
        res.errMsg = '编辑成功';
      }
      dispatch(changeErrMsg(res.errMsg));
      dispatch(finishCreatePaper(res));
    })
    .catch((err) => {
      dispatch(changeErrMsg('网络错误，请重试'));
      dispatch(finishCreatePaper({ success: false }));
    })
  };
}

export function startCreatePaper () {
  return {
    type: START_CREATE_PAPER,
    isFetching: true
  };
}

export function finishCreatePaper (res) {
  return Object.assign({
    type: FINISH_CREATE_PAPER,
    isFetching: false
  }, res);
}

export function changeKeywords (keywords) {
  return {
    type: CHANGE_KEYWORDS,
    keywords: keywords
  };
}

export function searchPaper (keywords, account) {
  return (dispatch) => {
    dispatch(startSearchPaper());
    return fetch('/papers/search', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ keywords: keywords, account: account })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(changeErrMsg(res.errMsg));
      dispatch(finishSearchPaper(res));
      if (res.success) {
        dispatch(changeSearchStep(0));
        dispatch(changePapers(res.papers));
      }
    })
    .catch((err) => {
      dispatch(changeErrMsg('查询试卷失败，请重试'));
      dispatch(finishSearchPaper({ success: false }));
    })
  };
}

export function startSearchPaper () {
  return {
    type: START_SEARCH_PAPER,
    isFetching: true
  };
}

export function finishSearchPaper (res) {
  return Object.assign({
    type: FINISH_SEARCH_PAPER,
    isFetching: false
  }, res);
}

export function changeSearchStep (stepIndex) {
  return {
    type: CHANGE_SEARCH_STEP,
    stepIndex: (stepIndex + 1) % 2
  };
}

export function changePaper (paper) {
  return {
    type: CHANGE_PAPER,
    paper: paper
  }
}

export function changePapers (papers) {
  return {
    type: CHANGE_PAPERS,
    papers: papers
  };
}

export function submitAnswer (data) {
  return (dispatch) => {
    dispatch(startSubmitAnswer());
    return fetch('/papers/answer', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(changeErrMsg(res.errMsg));
      dispatch(finishSubmitAnswer(res));
    })
    .catch((err) => {
      dispatch(changeErrMsg('出错了，请重试'));
      dispatch(finishSubmitAnswer({ success: false }));
    })
  };
}

export function startSubmitAnswer () {
  return {
    type: START_SUBMIT_ANSWER,
    isFetching: true
  };
}

export function finishSubmitAnswer (res) {
  return Object.assign({
    type: FINISH_SUBMIT_ANSWER,
    isFetching: false
  }, res);
}
