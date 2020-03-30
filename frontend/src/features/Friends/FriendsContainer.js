import React, { useState, useEffect } from "react";
import FriendsView from "./FriendsView";
import {connect} from 'react-redux';
import {getUserFriends} from '../../redux/modules/friends'

const FriendsContainer = ({user,friends,getUserFriends}) => {
    useEffect(()=> {
        if(user.friends){
            getUserFriends(user._id)
        }
    },
    [user])


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
        getUserFriends: userId => dispatch(getUserFriends(userId))
    };
  };
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FriendsContainer);