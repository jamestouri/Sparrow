import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    formType: 'login',
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // debugger
  return {
    processForm: (user) => {
      return dispatch(login(
        {
          username: user.username,
          password: user.password,
        }));
    },
    login: (user) => {
      return dispatch(login(
        {
          username: user.username,
          password: user.password,
        }
      ));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
