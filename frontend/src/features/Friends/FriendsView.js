import React from "react";
import FriendItem from "./FriendItem";
import styled from "styled-components";
import AddFriendModal from "./Modals/AddFriendModal";
import Button from "../Shared/Button";

const FriendsView = ({ friends, isFriendModalOn, setFriendModal, user, addUserFriend }) => {
  return (
    <FriendsWrapper>
        <AddFriendModal 
        isFriendModalOn={isFriendModalOn}
        setFriendModal={setFriendModal}
        user={user}
        addUserFriend={addUserFriend}
        />
      <FriendsTitle>Your Friendlist:</FriendsTitle>
      <FriendsList>
        {friends?.map(friend => (
          <FriendItem
            name={friend?.name}
            registered={friend?.registered}
            email={friend?.email}
            ilnesses={friend?.illnesses}
          />
        ))}
      </FriendsList>
      <AddFriendButton onClick={()=> setFriendModal(true)}>Add new Friend</AddFriendButton>
     
    </FriendsWrapper>
  );
};

export default FriendsView;

const FriendsList = styled.ul``;

const FriendsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const FriendsTitle = styled.h1``;

const AddFriendButton = styled(Button)`
position: absolute;
top: 20px;
right: 20px;
`
