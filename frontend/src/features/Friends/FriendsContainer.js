import React, { useState, useEffect } from "react";
import FriendsView from "./FriendsView";
import { connect } from "react-redux";
import { getUserFriends, getLastSurvey } from "../../redux/modules/friends";
import { addUserFriend } from "../../redux/modules/authentication";

const FriendsContainer = ({ user, friends, getUserFriends, addUserFriend, getLastSurvey }) => {
  const [isFriendModalOn, setFriendModal] = useState(false);

  useEffect(() => {
    if (user.friends) {
      getUserFriends(user._id);
    }
  }, [user]);

  useEffect(()=> {
    if(friends.length > 0){
        friends.forEach(friend => getLastSurvey(friend._id))
    }
},
[friends])
  return (
    <FriendsView
      friends={friends}
      isFriendModalOn={isFriendModalOn}
      setFriendModal={setFriendModal}
      user={user}
      addUserFriend={addUserFriend}
    />
  );
};

const mapStateToProps = state => ({
  friends: state.friends.friends,
  user: state.authentication.user
});

const mapDispatchToProps = dispatch => {
  return {
    getUserFriends: userId => dispatch(getUserFriends(userId)),
    addUserFriend: friendId => dispatch(addUserFriend(friendId)),
    getLastSurvey: friendId => dispatch(getLastSurvey(friendId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
