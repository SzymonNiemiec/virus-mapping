  
import React from "react";
import styled from "styled-components";

const StatusPill = ({ type, children, className }) => (
  <Wrapper type={type} className={className}>
    {children}
  </Wrapper>
);

export default StatusPill;

const Wrapper = styled.div`
  background-color: red;
  padding: 5px 8px;
  border-radius: 16px;
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  text-align:center;
  width: 80px;
  margin: 3px auto 0;
  ${({ type, theme }) => (type === "positive" ? `
  background-color: #57C754
  ` : type === "default" ? `
  background-color: #CCC
  ` : `
  background-color: ${theme.danger}
  `)}
`;