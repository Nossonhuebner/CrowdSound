import { connect } from 'react-redux';
import { logIn } from '../actions/session_actions';
import SessionForm from './session_form';
import React from 'react';
import { openModal, closeModal } from '../actions/modal_actions';


const mapStateToProps = (state) => {
  const errors =  Object.values(state.errors);
  return {formType: 'Sign In', errors};
};


const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(logIn(user)),
    otherForm: (
      <button className="alt-session" onClick={() => dispatch(openModal('signup'))}>
        Sign Up
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
