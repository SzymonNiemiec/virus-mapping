import React from 'react';
import FriendItem from './FriendItem'
import styled from 'styled-components'

const FriendsView = ({friends}) => {
    return (
        <FriendsWrapper>
            <FriendsList>
                {friends?.map( friend => <FriendItem name={friend?.name} registered={friend?.registered} email={friend?.email} ilnesses={friend?.illnesses}/>)}
            </FriendsList>
            

        </FriendsWrapper>
    )
}

export default FriendsView;

const FriendsList = styled.ul``;

const FriendsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    flex-direction: column

`