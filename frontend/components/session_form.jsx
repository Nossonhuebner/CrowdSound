import React from 'react';
import { Link, Redirect } from 'react-router-dom';


class sessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: '', forgot: 'forgot password?'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  render() {

    const errors = this.props.errors.map((error, idx) => {
      return (<li key={idx}>{error}</li>);
    });

    return(
      <div>

        <div className="form-header">
          <div className="form-type">{this.props.formType}</div>

          <div className="alt-form">or {this.props.otherForm}</div>
        </div>

          <ul className="modal-errors">
            {errors}
          </ul>
        <form className="modal-form" onSubmit={this.handleSubmit}>
            <input placeholder="Your Username *" className="modal-input" type="text" onChange={this.handleChange('username')} value={this.state.username} />

            <input placeholder="Your Password *" className="modal-input" type="password" onChange={this.handleChange('password')} value={this.state.password} />

            <button className="modal-submit">{this.props.formType}</button>
        </form>
        <Link className="forgot" to="/" onClick={this.forgotPassword} >{this.state.forgot}</Link>
      </div>
    );
  }

  handleChange(field) {
    return e => {
    this.setState({[field]: e.target.value});
   };
  }

  handleSubmit(e){
    e.preventDefault();
    const user = { user: Object.assign({}, this.state) };
    this.props.processForm(user);
    // this.setState(this.state = {username: '', password: '', forgot: 'Forgot password?'});
  }

  forgotPassword(e) {
    e.preventDefault();
    this.setState({forgot: 'That sucks'});
  }

}

export default sessionForm;
