import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getDonations, deleteDonation } from '../actions';

class DonationHistory extends Component {

  componentDidMount() {
    const userId = localStorage.getItem('userId');
    this.props.getDonations(userId);
  }

  onDeleteClick(donation) {

    this.props.deleteDonation(donation._id, (err, response) => {
      if (!err) {
        const userId = localStorage.getItem('userId');
        this.props.getDonations(userId);
      }
    });
  }

  renderDonations() {
    return _.map(this.props.donations, donation=> {
      return (
        <div className="list-group-item flex-column align-items-start" key={donation._id}>
          <div className="mb-1">
            {donation.charityName}
            <small className='font-weight-bold'>  ( ${donation.amount} )</small>
            <button
              className="btn btn-danger pull-xs-right"
              onClick={()=>this.onDeleteClick(donation)}>
              Delete
            </button>
          </div>
          <small className="text-muted">{new Date(donation.date).toLocaleString()}</small>

        </div>

      );
    });
  }

  render() {

    if (_.isEmpty(this.props.donations)) {
      return (
        <div> </div>
      );
    }
    return (
      <div className='charity-container'>
        <h3>My Donations History</h3>
        <div className="list-group">
          {this.renderDonations()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { donations: state.donations };
}

export default connect(mapStateToProps, { getDonations, deleteDonation })(DonationHistory);
