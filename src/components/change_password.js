import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePassword } from '../actions';
import NavBar from './nav_bar.js';

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {
    if (!localStorage.getItem('userId')) {
      this.props.history.push('/');
    }
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
    this.props.changePassword(values, (err, response) => {
      if (err) {
        this.setState({errorMsg: 'Server Error occurred!'});
      }
      else {
        this.props.history.push('/charities');
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <NavBar/>
        <div className="col-md-6 col-md-offset-3">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <h2>Change Password</h2>
              <RenderError errorMsg={this.state.errorMsg} />
              <Field
                name="password"
                label="New Password"
                component={this.renderField}
              />
              <Field
                name="password2"
                label="Confirm new Password"
                component={this.renderField}
              />
              <button type="submit" className="btn btn-primary">Change Password</button>
              <Link to="/charities" className="btn btn-secondary">Cancel</Link>

            </form>
        </div>
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

// Form Validation
function validate(values) {
  const errors = {};
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
  form: 'ChangePasswordForm'
})(
  connect(null, { changePassword })(ChangePassword)
);
