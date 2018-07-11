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
    if (this.props.isLoggedIn){
      return <Redirect to="/"/>;
    }

    const errors = this.props.errors.map((error, idx) => {
      return (<li key={idx}>{error}</li>);
    });

    return(
      <div>
        <h2>{this.props.formType}</h2>
        {this.props.otherForm}
          <ul className="modal-errors">
            {errors}
          </ul>
        <form className="model-form" onSubmit={this.handleSubmit}>
            <input placeholder="Your Username *" className="modal-input" type="text" onChange={this.handleChange('username')} value={this.state.username} />
          <br></br>
            <input placeholder="Your Password *" className="modal-input" type="password" onChange={this.handleChange('password')} value={this.state.password} />
          <br></br>
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
    const user = { user: Object.assign({}, this.state) };
    this.props.processForm(user);
    this.setState(this.state = {username: '', password: ''});
  }

}

export default sessionForm;
