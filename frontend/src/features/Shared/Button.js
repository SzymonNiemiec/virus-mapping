import React from "react";
import styled from "styled-components";

const Button = ({ type, variant, size, onClick, children, className,  }) => (
    <StyledButton className={className} type={type ? type : "button"} variant={variant ? variant : "default"} size={size} onClick={onClick}>
    {children}
    </StyledButton>
);

export default Button;

const StyledButton = styled.button`
    border-radius: 5px;
    padding: 12px 15px;
    font-size: 14px;
    cursor: pointer;
    margin: 0 2px;
${({ variant, theme }) => variant === "default" ? `
    background-color: #fff;
    border: 1px solid ${theme.grey};
    color: ${theme.lightBlack};
` : variant === "primary" ? `
    background-color: ${theme.primary};
    border: 1px solid ${theme.primary};
    color: #fff;
` : variant === "secondary" ? `
    background-color: ${theme.secondary};
    border: 1px solid ${theme.secondary};
    color: #fff;
` : variant === "danger" ? `
    background-color: ${theme.danger};
    border: 1px solid ${theme.danger};
    color: #fff;
` : variant === "dark" ? `
    background-color: ${theme.darkGrey};
    border: 1px solid ${theme.darkGrey};
    color: #fff;
` : variant === "orange" ? `
background-color: #ff9800;
    border: 1px solid #ff9800;
    color: #fff;
`:``}
${({ size }) => size === "small" ? `
    padding: 6px 8px;
` : size === "big" ? `
    padding: 16px 20px;
` : ``}
`;
