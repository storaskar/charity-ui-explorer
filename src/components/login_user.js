import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate } from '../actions';


class AuthenticateUser extends Component {

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
    this.setState({progressMsg: 'Authenticating...'});
    this.props.authenticate(values, (err, response) => {
      if (err) {
        this.setState({progressMsg: ''});
        this.setState({errorMsg: 'Wrong Username/Password !'});
      }
      else {
        this.setState({progressMsg: ''});

        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("loggedUser", response.data.userName);

        this.props.history.push('/charities');
      }
    });
  }


  render() {
      const { handleSubmit } = this.props;

      return (
          <div className="col-md-6 col-md-offset-3">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h2>Login</h2>
                <RenderError errorMsg={this.state.errorMsg} />
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
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to="/user/register" className="btn btn-secondary">Register</Link>
              </form>
              <RenderProgress progressMsg={this.state.progressMsg} />
          </div>
      );
    }
}

function RenderProgress(props) {
  if (!props.progressMsg) {
    return <div></div>;
  }
  return (
    <p className='alert-info'>
      {props.progressMsg}
    </p>
  );
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

// Form Validation
function validate(values) {
  const errors = {};

  if (!values.username ) {
    errors.username = 'Enter a userName';
  }
  if (!values.password) {
    errors.password = 'Enter a password';
  }


  return errors;
}

export default reduxForm({
  validate,
  form: 'AuthenticateUserForm'
})(
  connect(null, { authenticate }) (AuthenticateUser)
);
