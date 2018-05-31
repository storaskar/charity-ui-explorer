import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {  };
  }

  componentWillMount() {
    const userId = localStorage.getItem('loggedUser');
    this.setState({loggedUser: userId});
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('loggedUser');
    console.log('Cleared userid/name');
  }

  render() {

      return (
        <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/charities">Charity Explorer</a>

          <div className="navbar-nav">
              <div className="pull-xs-right">
                <Link to="/user/changePassword" className="nav-item nav-link">Change Password </Link>
                <Link to="/" className="nav-item nav-link" onClick={this.logout}>Logout</Link>
              </div>
          </div>
        </nav>
        <div className="welcome pull-xs-right">Welcome, {this.state.loggedUser} !</div>
        </div>
      );
  }
}
