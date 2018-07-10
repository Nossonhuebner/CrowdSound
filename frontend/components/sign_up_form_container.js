import { connect } from 'react-redux';
import { createUser } from '../actions/user_actions';
import SessionForm from './session_form';


const mapStateToProps = (state) => {
  const errors =  state.errors || [];
  return {formType: 'signup', errors};
};


const mapDispatchToProps = (dispatch) => ({
  processForm: (user) => dispatch(createUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
