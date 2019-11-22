import * as actionTypes from '../actions/actionTypes';

import { updatedObject } from '../../utils';

const initialState = {
    members: [],
    loading: true
}
const data = (state = initialState, action) => {

    switch (action.type) {
        
        case actionTypes.FETCH_MEMBERS_START:
            return updatedObject(state, { loading: true});
        case actionTypes.FETCH_MEMBERS_SUCCESS:
            return updatedObject(state, { members: action.members, loading: false});
        case actionTypes.FETCH_MEMBERS_FAILED:
            return updatedObject(state, { loading: true});

      default:
        return state;
    }
    };
  
  export default data;