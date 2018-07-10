import { connect } from 'react-redux';
import { logIn } from '../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
  const errors =  state.errors || [];
  return {formType: 'login', errors};
};


const mapDispatchToProps = (dispatch) => ({
  processForm: (user) => dispatch(logIn(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
