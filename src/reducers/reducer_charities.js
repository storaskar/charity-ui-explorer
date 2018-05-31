import { GET_CHARTITIES, GET_CHARITY } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CHARTITIES:
      return _.mapKeys(action.payload.data, '_id');
    case GET_CHARITY:

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
