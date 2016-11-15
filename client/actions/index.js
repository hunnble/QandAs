export const CLICK_MENU_OPENER = 'clickMenuOpener';
export const HIDE_PASSWORD = 'hidePassword';
export const TOGGLE_PASSWORD = 'togglePassword';
export const TOGGLE_SWITCHER = 'toggleSwitcher';
export const TOGGLE_SETTINGS_VISIBLE = 'toggleSettingsVisible';
export const START_SIGN_UP = 'startSignUp';
export const FINISH_SIGN_UP = 'finishSignUp';
export const START_SIGN_IN = 'startSignIn';
export const FINISH_SIGN_IN = 'finishSignIn';
export const REQUEST_USER_INFO = 'requestUserInfo';
export const RECEIVE_USER_INFO = 'receiveUserInfo';
export const REMOVE_USER_INFO = 'removeUserInfo';
export const START_UPDATE_USER_INFO = 'startUpdateUserInfo';
export const FINISH_UPDATE_USER_INFO = 'finishUpdateUserInfo';
export const CHANGE_MSG_VISIBLE = 'changeMsgVisible';
export const CHANGE_ERR_MSG = 'changeErrMsg';
export const SET_CALENDAR = 'setCalendar';
export const CHANGE_CALENDAR = 'changeCalendar';
export const CHANGE_CALENDAR_VISIBLE = 'changeCalendarVisible';
export const CHANGE_QUESTION_TITLE = 'changeQuestionTitle';
export const CHANGE_QUESTION_DETAIL = 'changeQuestionDetail';
export const CREATE_QUESTION = 'createQuestion';
export const EDIT_QUESTION = 'editQuestion';
export const REMOVE_QUESTION = 'removeQuestion';
export const CHANGE_QUESTION_INDEX = 'changeQuestionIndex';
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
export const START_PUBLISH_PAPER = 'startPublishPaper';
export const FINISH_PUBLISH_PAPER = 'finishPublishPaper';
export const START_REMOVE_PAPER = 'startRemovePaper';
export const FINISH_REMOVE_PAPER = 'finishRemovePaper';
export const CHANGE_PROFILE_TAB_OPEN = 'changeProfileTabOpen';
export const CHANGE_PROFILE_TAB_INDEX = 'changeProfileTabIndex';
export const CHANGE_SEARCHED_PAPER_PAGE = 'changeSearchedPaperPage';
export const CHANGE_PUBLISHED_PAGE = 'changePublishedPage';
export const CHANGE_PAPER_SAVED = 'changePaperSaved';
export const CHANGE_PUBLISH_CONFIRM = 'changePublishConfirm';
export const CHANGE_ISEDITING = 'changeIsEditing';

import { browserHistory } from 'react-router';
import { TOKEN_NAME } from '../../configs/config';

export function initialPageState () {
  return (dispatch) => {
    dispatch(handleMenuClose());
    dispatch(hidePassword());
    dispatch(closeSettings());
    dispatch(changeCalendarVisible(false));
    dispatch(changeKeywords(''));
    dispatch(changeProfileTabIndex(0));
    dispatch(changeSearchStep(1));
    dispatch(changeSearchedPaperPage(0));
    dispatch(changePublishedPage(0));
    dispatch(changePaperSaved(false));
    dispatch(changePublishConfirm(false));
    dispatch(changePapers([]));
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

export function handleSignUp (data) {
  return (dispatch) => {
    dispatch(startSignUp());
    return fetch('/signUp', {
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
    .then((resBody) => {
      dispatch(finishSignUp());
      if (resBody.success) {
        dispatch(changeErrMsg('注册成功'));
        browserHistory.replace('/');
      } else {
        dispatch(changeErrMsg(resBody.errMsg));
      }
    })
    .catch((err) => {
      dispatch(changeErrMsg('注册失败,请重试'));
    });
  };
}

export function startSignUp () {
  return {
    type: START_SIGN_UP,
    isFetching: true
  };
}

export function finishSignUp () {
  return {
    type: FINISH_SIGN_UP,
    isFetching: false
  };
}

export function handleSignIn (data, destroy) {
  return (dispatch) => {
    dispatch(startSignIn());
    return fetch('/signIn', {
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
    .then((resBody) => {
      dispatch(finishSignIn());
      if (resBody.token) {
        window.localStorage.setItem(TOKEN_NAME, resBody.token);
        dispatch(getUserInfo(resBody.token));
        browserHistory.replace('/');
      } else {
        destroy();
        dispatch(changeErrMsg(resBody.errMsg));
      }
    })
    .catch((err) => {
      dispatch(finishSignIn());
      destroy();
      dispatch(changeErrMsg('登录失败，请重试'));
    });
  };
}

export function startSignIn () {
  return {
    type: START_SIGN_IN,
    isFetching: true
  };
}

export function finishSignIn () {
  return {
    type: FINISH_SIGN_IN,
    isFetching: false
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
      for (let key in res) {
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
  if (!res.verify && replace) {
    browserHistory.replace('/signIn');
  }
  return Object.assign({
    type: RECEIVE_USER_INFO,
    isFetching: false,
    replace: replace
  }, res);
}

export function removeUserInfo () {
  return Object.assign({
    type: REMOVE_USER_INFO
  });
};

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
      dispatch(changeErrMsg(res.errMsg));
      dispatch(finishUpdateUserInfo(res));
      dispatch(getUserInfo(data.token));
    })
    .catch((err) => {
      dispatch(changeErrMsg(res.errMsg));
      dispatch(finishUpdateUserInfo({ success: false }));
      dispatch(getUserInfo(data.token));
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
  };
}

export function changeQuestionDetail (detail) {
  return {
    type: CHANGE_QUESTION_DETAIL,
    detail: detail
  };
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

export function changeQuestionIndex (lastIndex, newIndex) {
  return {
    type: CHANGE_QUESTION_INDEX,
    lastIndex: lastIndex,
    newIndex: newIndex
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
      dispatch(changeErrMsg(res.errMsg));
      dispatch(finishCreatePaper(res));
      browserHistory.replace('/archives');
    })
    .catch((err) => {
      dispatch(changeErrMsg('保存失败,请重试'));
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

export function searchPaper (keywords, token) {
  return (dispatch) => {
    dispatch(startSearchPaper());
    return fetch('/papers/search', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ keywords: keywords, token: token })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(finishSearchPaper(res));
      if (res.success) {
        dispatch(changeSearchStep(0));
        dispatch(changePapers(res.papers));
      }
    })
    .catch((err) => {
      dispatch(changeErrMsg('查询试卷失败, 请重试'));
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
      if (res.success) {
        dispatch(changePaper({}));
        browserHistory.replace('/');
      }
    })
    .catch((err) => {
      dispatch(changeErrMsg('提交失败,请重试'));
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

export function publishPaper (_id, token) {
  return (dispatch) => {
    dispatch(startPublishPaper());
    return fetch('/papers/paper', {
      method: 'put',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: _id, token: token })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(changeErrMsg(res.errMsg));
      dispatch(finishPublishPaper(_id));
      dispatch(getUserInfo(token));
    })
    .catch((err) => {
      dispatch(changeErrMsg('发布失败, 请重试'));
      dispatch(finishPublishPaper(null));
    })
  };
}

export function startPublishPaper () {
  return {
    type: START_PUBLISH_PAPER,
    isFetching: true
  };
}

export function finishPublishPaper (_id) {
  return Object.assign({
    type: FINISH_PUBLISH_PAPER,
    isFetching: false
  });
}

export function removePaper (_id, token) {
  return (dispatch) => {
    dispatch(startRemovePaper());
    return fetch('/papers/paper', {
      method: 'delete',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: _id, token: token })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(changeErrMsg(res.errMsg));
      dispatch(finishRemovePaper(_id));
      dispatch(getUserInfo(token));
    })
    .catch((err) => {
      dispatch(changeErrMsg('删除失败, 请重试'));
      dispatch(finishRemovePaper(null));
    })
  };
}

export function startRemovePaper () {
  return {
    type: START_REMOVE_PAPER,
    isFetching: true
  };
}

export function finishRemovePaper (_id) {
  return Object.assign({
    type: FINISH_REMOVE_PAPER,
    isFetching: false
  });
}

export function changeProfileTabIndex (index) {
  return {
    type: CHANGE_PROFILE_TAB_INDEX,
    index: index
  }
}

export function changeProfileTabOpen (isOpen) {
  return {
    type: CHANGE_PROFILE_TAB_OPEN,
    isOpen: isOpen
  }
}

export function changeSearchedPaperPage (page) {
  return {
    type: CHANGE_SEARCHED_PAPER_PAGE,
    page: page
  }
}

export function changePublishedPage (page) {
  return {
    type: CHANGE_PUBLISHED_PAGE,
    page: page
  }
}

export function changePaperSaved (saved) {
  return {
    type: CHANGE_PAPER_SAVED,
    saved: saved
  }
}

export function changePublishConfirm (open) {
  return {
    type: CHANGE_PUBLISH_CONFIRM,
    publishConfirmOpen: open
  }
}

export function changeIsEditing (isEditing) {
  return {
    type: CHANGE_ISEDITING,
    isEditing: isEditing
  }
}
