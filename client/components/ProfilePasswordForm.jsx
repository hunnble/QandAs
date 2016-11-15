import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field } from 'redux-form';
import { blueGrey700 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';
import ActionLockOutline from 'material-ui/svg-icons/action/lock-outline';
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
    return (
      <div className={long ? 'profileText profileTextLong' : 'profileText'}>
        {icon}
        <Subheader style={{
          display: 'inline-block',
          marginRight: 6,
          width: 'auto',
          minWidth: 72,
          verticalAlign: 'middle'
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
    const { updateUserInfo, destroy } = this.props;
    data.token = window.localStorage.getItem(TOKEN_NAME);
    updateUserInfo(data);
    destroy();
  }
  render () {
    const {
      changeIsEditing,
      user,
      handleSubmit,
      submitting,
      pristine,
      destroy
    } = this.props;
    const iconStyle = {
      verticalAlign: 'middle'
    };
    let renderInput = this.renderInput;
    return (
      <form className='profileForm' onSubmit={handleSubmit(this.onSubmit)}>
        <div className='profileWrapper'>
          <Field
            type='password'
            name='curPassword'
            long={false}
            icon={<ActionLock color={blueGrey700} style={iconStyle} />}
            component={renderInput}
          />
          <Field
            type='password'
            name='password'
            long={false}
            icon={<ActionLockOutline color={blueGrey700} style={iconStyle} />}
            component={renderInput}
          />
          <Field
            type='password'
            name='password2'
            long={false}
            icon={<ActionLockOpen color={blueGrey700} style={iconStyle} />}
            component={renderInput}
          />
        </div>
        <div className='profileBtnWrapper fr'>
          <RaisedButton
            type='submit'
            label='修改'
            disabled={submitting || pristine}
          />
          <RaisedButton
            label='重置'
            disabled={submitting}
            onTouchTap={destroy}
          />
        </div>
      </form>
    );
  }
}

ProfileForm.PropTypes = {
  user: PropTypes.object,
  labelMap: PropTypes.object,
  updateUserInfo: PropTypes.func
};

export default ProfileForm;
