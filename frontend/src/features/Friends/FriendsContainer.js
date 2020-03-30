import React, { useState, useEffect } from "react";
import FriendsView from "./FriendsView";
import {connect} from 'react-redux';
import {getUserFriends,getLastSurvey} from '../../redux/modules/friends'

const FriendsContainer = ({user,friends,getUserFriends,getLastSurvey}) => {
    useEffect(()=> {
        if(user.friends){
            getUserFriends(user._id)
        }
    },
    [user])

    useEffect(()=> {
        if(friends.length > 0){
            friends.forEach(friend => getLastSurvey(friend._id))
        }
    },
    [friends])


    return (
        <FriendsView friends={friends}/>
    )
}

const mapStateToProps = state => ({
    friends: state.friends.friends,
    user: state.authentication.user
  });
  
  const mapDispatchToProps = dispatch => {
    return {
        getUserFriends: userId => dispatch(getUserFriends(userId)),
        getLastSurvey: friendId => dispatch(getLastSurvey(friendId))
    };
  };
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FriendsContainer);