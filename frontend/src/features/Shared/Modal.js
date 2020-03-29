import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({
    show,
    exitButton,
    onCancel,
    title,
    children
}) => {
    const [isShown, setShown] = useState(show);

    useEffect(() => {
        setShown(show);
    }, [show]);

    return isShown
        ? ReactDOM.createPortal(
            <ModalBackground>
                <ModalContainer>
                    {title && <Title>{title}</Title>}
                    {exitButton && (
                        <ExitButton
                            onClick={() => {
                                onCancel(show);
                                setShown(show);
                            }}
                        />
                    )}

                    {children}

                </ModalContainer>
            </ModalBackground>,
            document.getElementById("modal-root")
        )
        : null;
};

export default Modal;

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100vh;
  position: fixed;
  display: block;
  left: 0;
  top: 0;
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 2rem;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 2px solid #f6f5f8;
  border-radius: 6px;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.14);
  max-height: 90%;
`;

const ExitButton = styled.button`
  border: none;
  background: none;
  padding: 12px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  &::before,
  &::after {
    content: "";
    height: 20px;
    width: 2px;
    background-color: #b5b5b5;
    position: absolute;
    top: 0;
    border-radius: 5px;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

const Title = styled.p`
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: 10px;
  text-transform: uppercase;
  font-size: 14px;
`;