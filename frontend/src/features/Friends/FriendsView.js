import React from 'react';
import FriendItem from './FriendItem'

const FriendsView = ({friends}) => {
    return (
        <div>
            {friends?.map( friend => <FriendItem name={friend?.name}/>)}

        </div>
    )
}

export default FriendsView;