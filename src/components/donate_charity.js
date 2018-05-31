import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCharity, donate } from '../actions';
import NavBar from './nav_bar.js';


class DonateToCharity extends Component {

  constructor(props) {
    super(props);
    this.onDonateClick = this.onDonateClick.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem('userId')) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getCharity(id);
  }

  onDonateClick(amount) {
    const { charity } = this.props;
    const userId = localStorage.getItem('userId');

    this.props.donate(userId, charity, amount, (err, response) => {
      if (!err) {
        this.props.history.push('/charities');
      }
    });
  }


  render() {
    const { charity } = this.props;
    if (!charity) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <NavBar/>
        <div className='charity-container'>
          <h3>Donate</h3>

          <div className='donationSection'>
            <p>Please choose the amount you would like to donate for charity:</p>

            <div className='card'>
              <div className="card-body">
                <h5 className="card-title">{charity.name}</h5>
                <p className="card-text">{charity.city}, {charity.state}</p>
              </div>
              <button type="button" className="btn btn-info" value='10' onClick={()=>this.onDonateClick(10)}>$10</button>
              <button type="button" className="btn btn-info" value='25' onClick={()=>this.onDonateClick(25)}>$25</button>
              <button type="button" className="btn btn-info" value='50' onClick={()=>this.onDonateClick(50)}>$50</button>
              <button type="button" className="btn btn-info" value='100' onClick={()=>this.onDonateClick(100)}>$100</button>
            </div>
          </div>
        </div>

        <Link to="/charities" className="btn btn-secondary">Cancel</Link>
      </div>
    );

  }
}


function mapStateToProps( { charities } , ownProps ) {
  return { charity: charities[ownProps.match.params.id] };

}

export default connect(mapStateToProps, { getCharity, donate })(DonateToCharity);
