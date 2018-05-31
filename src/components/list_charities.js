import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCharities } from '../actions';
import NavBar from './nav_bar.js';
import DonationHistory from './donation_history.js';
import _ from 'lodash';

class ListCharities extends Component {

  componentWillMount() {

    console.log("list_chartities->UserID:", localStorage.getItem('userId'));

    if (!localStorage.getItem('userId')) {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    this.props.getCharities();
  }

  renderCharities() {
    return _.map(this.props.charities, charity => {
      return (
        <div className="col-sm-4" key={charity._id}>
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">{charity.name}</h5>
              <p className="card-text">{charity.city}, {charity.state}</p>
              <Link to={`/donation/${charity._id}`} className="btn btn-primary">Donate</Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>

        <NavBar/>

        <DonationHistory/>

        <div className='charity-container'>
          <h3>Charities</h3>
          <div className="row">
            {this.renderCharities()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { charities: state.charities };
}

export default connect(mapStateToProps, { getCharities })(ListCharities);
