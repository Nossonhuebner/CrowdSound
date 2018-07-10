import { connect } from 'react-redux';
import { createUser } from '../actions/user_actions';
import SessionForm from './session_form';


const mapStateToProps = (state) => ({
  formType: 'signup',
  errors: state.errors
});


const mapDispatchToProps = (dispatch) => ({
  processForm: (user) => dispatch(createUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
