import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../actions';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  renderField(field) {
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger': ''}`;

    let type = 'text';
    if (field.input.name.startsWith('password')) {
      type = 'password';
    }
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          type={type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createUser(values, (err, response) => {
      if (err) {
        if (err.message.includes(406))
          this.setState({errorMsg: "Username already exists. Please choose another one!"});
        else
          this.setState({errorMsg: err.message});
      }
      else {
        this.props.history.push('/');
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return(
      <div className="col-md-6 col-md-offset-3">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2>Register new user</h2>
          <RenderError errorMsg={this.state.errorMsg} />
          <Field
            name="firstName"
            label="First Name"
            component={this.renderField}
          />
          <Field
            name="lastName"
            label="Last name"
            component={this.renderField}
          />
          <Field
            name="userName"
            label="Username"
            component={this.renderField}
          />
          <Field
            name="password"
            label="Password"
            component={this.renderField}
          />
          <Field
            name="password2"
            label="Confirm Password"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-secondary">Cancel</Link>
        </form>
      </div>
    );
  }
}

function RenderError(props) {
  if (!props.errorMsg) {
    return <div></div>;
  }
  return (
    <p className='alert alert-danger'>
      {props.errorMsg}
    </p>
  );
}

// Form validation
function validate(values) {

  const errors = {};

  if (!values.firstName ) {
    errors.firstName = 'Enter a first name';
  }
  if (!values.lastName ) {
    errors.lastName = 'Enter a last name';
  }
  if (!values.userName || values.userName.length < 4) {
    errors.userName = 'Enter a username at least 4 characters long';
  }
  if (!values.password || values.password.length < 6) {
    errors.password = 'Enter a password at least 6 characters long';
  }
  if (values.password !== values.password2) {
    errors.password2 = "Password don't match";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'RegisterUserForm'
})(
  connect(null, { createUser })(RegisterUser)
);
