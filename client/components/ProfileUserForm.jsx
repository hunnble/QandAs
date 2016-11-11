import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field } from 'redux-form';
import { blueGrey700 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import ActionFace from 'material-ui/svg-icons/action/face';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationVoicemail from 'material-ui/svg-icons/communication/voicemail';
import ActionDescription from 'material-ui/svg-icons/action/description';
import { TOKEN_NAME } from '../../configs/config';

const subHeaderStyle = {
  display: 'inline-block',
  marginRight: 6,
  width: 'auto',
  minWidth: 72,
  verticalAlign: 'middle'
};

class ProfileForm extends Component {
  renderInput = ({
    input,
    name,
    type,
    multiLine,
    fullWidth,
    long,
    hint,
    icon,
    meta: { touched, error }
  }) => {
    if (!multiLine) {
      multiLine = false;
    }
    let renderInput = this.renderInput;
    return (
      <div className={long ? 'profileText profileTextLong' : 'profileText'}>
        {icon}
        <Subheader style={subHeaderStyle}>
          {this.props.labelMap.get(name)}
        </Subheader>
        <TextField {...input}
          className='profileTextInput'
          type={type}
          name={name}
          hintText={hint}
          floatingLabelText={hint}
          multiLine={multiLine}
          fullWidth={fullWidth || false}
          errorText={touched && error}{...error}
        />
      </div>
    );
  }
  onSubmit = (data) => {
    const { changeIsEditing, updateUserInfo } = this.props;
    data.token = window.localStorage.getItem(TOKEN_NAME);
    changeIsEditing(false);
    updateUserInfo(data);
  }
  render () {
    const {
      changeIsEditing,
      user,
      labelMap,
      isEditing,
      handleSubmit,
      submitting,
      pristine
    } = this.props;
    const iconStyle = {
      verticalAlign: 'middle'
    };
    let renderInput = this.renderInput;
    return (
      <div>
        {
          !isEditing &&
          <div className='profileWrapper'>
            <div className='profileText'>
              <CommunicationVoicemail color={blueGrey700} style={iconStyle} />
              <Subheader style={subHeaderStyle}>
                {labelMap.get('account')}:
              </Subheader>
              {user.account}
            </div>
            <div className='profileText'>
              <ActionFace color={blueGrey700} style={iconStyle} />
              <Subheader style={subHeaderStyle}>
                {labelMap.get('nickname')}:
              </Subheader>
              {user.nickname}
            </div>
            <div className='profileText'>
              <CommunicationEmail color={blueGrey700} style={iconStyle} />
              <Subheader style={subHeaderStyle}>
                {labelMap.get('mail')}:
              </Subheader>
              {user.mail}
            </div>
            <div className='profileText'>
              <ActionDescription color={blueGrey700} style={iconStyle} />
              <Subheader style={subHeaderStyle}>
                {labelMap.get('info')}:
              </Subheader>
              {user.info}
            </div>
            <div className='profileBtnWrapper fr'>
              <RaisedButton
                primary={true}
                label='修改个人信息'
                onTouchTap={() => {
                  changeIsEditing(true);
                }}
              />
            </div>
          </div>
        }
        {
          isEditing &&
          <form className='profileForm' onSubmit={handleSubmit(this.onSubmit)}>
            <div className='profileWrapper'>
              <Field
                type='text'
                name='nickname'
                long={false}
                hint={user.nickname}
                icon={<ActionFace color={blueGrey700} style={iconStyle} />}
                component={renderInput}
              />
              <Field
                type='email'
                name='mail'
                long={false}
                hint={user.mail}
                icon={<CommunicationEmail color={blueGrey700} style={iconStyle} />}
                component={renderInput}
              />
              <Field
                type='text'
                name='info'
                hint={user.info}
                long={false}
                icon={<ActionDescription color={blueGrey700} style={iconStyle} />}
                component={renderInput}
              />
            </div>
            <div className='profileBtnWrapper fr'>
              <RaisedButton
                type='submit'
                primary={true}
                label='修改'
                disabled={submitting || pristine}
              />
              <RaisedButton
                label='取消'
                onTouchTap={() => {
                  changeIsEditing(false);
                }}
              />
            </div>
          </form>
        }
      </div>
    );
  }
}

ProfileForm.PropTypes = {
  isEditing: PropTypes.boolean,
  user: PropTypes.object,
  labelMap: PropTypes.object,
  changeIsEditing: PropTypes.func,
  updateUserInfo: PropTypes.func
};

export default ProfileForm;
