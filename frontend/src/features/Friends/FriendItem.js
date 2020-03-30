import React from 'react';
import styled from 'styled-components';
import StatusPill from "../Shared/StatusPill";

const FriendsView = ({ name, email, registered, ilnesses }) => {
    return (
        <div>
            <HistoryItem>
                <Patient>
                    <Name>{name}</Name>
                    <Email href={`mailto:${email}`}>{email}</Email>
                </Patient>
                <Registered>
                    <RegisterIndicator>Registered</RegisterIndicator>
                    <StatusPill type={registered ? 'positive' : 'default'}>{registered ? 'Yes' : 'No'}</StatusPill>
                    
                </Registered>
                <Registered>
                    <RegisterIndicator>Ilness</RegisterIndicator>
                    <StatusPill type={ilnesses.length === 0 ? 'positive' : 'danger'}>{ilnesses.length === 0 ? 'No' : 'Yes'}</StatusPill>
                   
                </Registered>
                <LastMeet>
                    
                </LastMeet>
            </HistoryItem>
        </div>
    )
}

export default FriendsView;

const LastMeet = styled.div`

`;


const RegisterIndicator = styled.p`
text-align: center;
`


const HistoryItem = styled.li`
    padding:20px;
    margin:10px;
    display:grid;
    align-items:center;
    grid-template-columns: 3fr 2fr 3fr;
    max-width:740px;
    gap:10px;
    border:1px solid #eee;
    box-shadow: 0 2px 8px #f6f5f8;
    position:relative;
`;

// primary: '#2a73b9',
// secondary: '#3E64FF',
// danger: '#C75454',
// lightDanger: '#ffc4c4',
// black: '#212121',
// lightBlack: '#595959',
// grey: '#f6f5f8',
// darkGrey: "#C4C4C4",
// background: '#FAFCFF',

const Patient = styled.div``;

const Registered = styled.div``;

const Name = styled.p`
    font-size:22px;
    font-weight:600;
`;

const Email = styled.a`
    font-size:14px;
    color:#aaa;
    text-decoration:none;
    transition:300ms;
    &:hover{
        color:#2a73b9;
    }
`;