import { combineReducers } from 'redux';
import CharityReducer from './reducer_charities';
import DonationReducer from './reducer_donations';
import UserReducer from './reducer_users';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  users: UserReducer,
  charities: CharityReducer,
  donations: DonationReducer,
  form: formReducer
});

export default rootReducer;
