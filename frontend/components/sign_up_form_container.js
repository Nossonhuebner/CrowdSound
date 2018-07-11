import { connect } from 'react-redux';
import { createUser } from '../actions/user_actions';
import SessionForm from './session_form';
import React from 'react';
import { openModal, closeModal } from '../actions/modal_actions';



const mapStateToProps = (state) => {
  const errors =  Object.values(state.errors);
  return {formType: 'signup', errors};
};


const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(createUser(user)),
    otherForm: (
      <button onClick={() => dispatch(openModal('login'))}>
        Log In
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
