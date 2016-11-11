import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field } from 'redux-form';
import { blueGrey700 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

import ActionFace from 'material-ui/svg-icons/action/face';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import ActionDescription from 'material-ui/svg-icons/action/description';
import { TOKEN_NAME } from '../../configs/config';

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
        <Subheader style={{
          display: 'inline-block',
          marginRight: 6,
          width: 'auto',
          minWidth: 72
        }}>
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
      handleSubmit,
      submitting,
      pristine
    } = this.props;
    const iconStyle = {
      verticalAlign: 'middle'
    };
    let renderInput = this.renderInput;
    return (
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
    );
  }
}

ProfileForm.PropTypes = {

  changeIsEditing: PropTypes.func,
  updateUserInfo: PropTypes.func
};

export default ProfileForm;
