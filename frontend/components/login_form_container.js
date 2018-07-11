import { connect } from 'react-redux';
import { logIn } from '../actions/session_actions';
import SessionForm from './session_form';
import React from 'react';
import { openModal, closeModal } from '../actions/modal_actions';


const mapStateToProps = (state) => {
  const errors =  Object.values(state.errors);
  return {formType: 'login', errors};
};


const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(logIn(user)),
    otherForm: (
      <button onClick={() => dispatch(openModal('signup'))}>
        Signup
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
