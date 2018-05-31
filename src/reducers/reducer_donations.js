import { GET_DONATIONS, GET_DONATION, DELETE_DONATION } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_DONATION:
      return _.omit(state, action.payload);
    case GET_DONATIONS:
      return _.mapKeys(action.payload.data, '_id');
    case GET_DONATION:
          const charity = action.payload.data;
          const newState =  { ...state };
          newState[charity._id] = charity;
          return newState;
          // console.log("in reducer", action.payload.data.id);
          // return { ...state, [action.payload.data.id] : action.payload.data
    default:
      return state;

  }
}
