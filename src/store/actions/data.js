// import React from 'react';
import axios from 'axios';

import * as actionTypes from './actionTypes';


export const fetchMembersSuccess = (members) => {
  return {
      type: actionTypes.FETCH_MEMBERS_SUCCESS,
      members: members
  }
}
export const fetchMembersFail = (error) => {
  return {
      type: actionTypes.FETCH_MEMBERS_FAILED,
      error: error
  }
}

export const fetchMembersStart = () => {
  return {
      type: actionTypes.FETCH_MEMBERS_START
  }
}

export const fetchMembers = (congress, chamber) => {
  return dispatch => {
      dispatch(fetchMembersStart());
      axios.get("https://api.propublica.org/congress/v1/"+congress+"/"+chamber+"/members.json", { 'headers': { 'X-API-Key': '5og6CCG0fxLBhSoanWGSMFsr7FDIs609Mvrg8r6n' } })
        .then((response => {
            const members = response.data.results[0].members
            dispatch(fetchMembersSuccess(members))
        }))
        .catch(err => {
            dispatch(fetchMembersFail(err))
            // this.setState({loading: false});
        });
  }
};