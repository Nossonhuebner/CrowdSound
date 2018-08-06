import React from 'react';
import { closeModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import Login from './login_form_container';
import SignUp from './sign_up_form_container';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Modal = ({ modal, closeModal }) => {
  if (!modal) {
    return null
  }
  let component;
  if (modal === 'signup') {
    component = <SignUp />;
  } else if (modal === 'login') {
    component = <Login />;
  } else {
    component = null;
  }

  return (


      <div className="modal-background" onClick={closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          { component }
        <p className="legal">We may use your email and devices for updates and tips on CrowdSound's
           products and services, and for activities notifications. You can
           unsubscribe for free at any time in your notification settings.</p>
       </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {modal: state.ui.modal}
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
