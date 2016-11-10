import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


class ProfileForm extends Component {
  render () {
    const {
      fields,
      cancelButton,
      onSubmit,
      changeIsEditing,
      handleSubmit,
      submitting,
      pristine
    } = this.props;
    return (
      <form className='profileForm' onSubmit={handleSubmit(onSubmit)}>
        <div className='profileWrapper'>
          {fields}
        </div>
        <div className='profileBtnWrapper fr'>
          <RaisedButton
            type='submit'
            primary={true}
            label='修改'
            disabled={submitting || pristine}
          />
          {cancelButton}
        </div>
      </form>
    );
  }
}

ProfileForm.PropTypes = {
  fields: PropTypes.node,
  cancelButton: PropTypes.node,
  onSubmit: PropTypes.func,
  changeIsEditing: PropTypes.func
};

export default ProfileForm;
