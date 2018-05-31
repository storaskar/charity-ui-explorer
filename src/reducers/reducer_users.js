import { GET_USER } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER:

          const user = action.payload.data;
          const newState =  { ...state };
          newState[user._id] = user;
          return newState;
          // console.log("in reducer", action.payload.data.id);
          // return { ...state, [action.payload.data.id] : action.payload.data
    default:
      return state;

  }
}
