import React from 'react';
import { Link, Redirect } from 'react-router-dom';


class sessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
            <input placeholder="Username *" className="modal-input" type="text" onChange={this.handleChange('username')} value={this.state.username} />

            <input placeholder="Password *" className="modal-input" type="password" onChange={this.handleChange('password')} value={this.state.password} />

            <button className="modal-submit">{this.props.formType}</button>
        </form>
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
    const user =  Object.assign({}, this.state);
    this.props.processForm(user).then
    // this.setState(this.state = {username: '', password: '', forgot: 'Forgot password?'});
  }

  forgotPassword(e) {
    e.preventDefault();
    this.setState({forgot: 'That sucks'});
  }

}

export default sessionForm;
