import React from "react";
import styled from "styled-components";

const Input = ({
  type,
  name,
  variant,
  label,
  size,
  onChange,
  value,
  placeholder,
  error,
  min,
  max,
  step,
  className,
  checkboxText,
  radioOptions,
  disabled,
  direction,
  hideError,
  color
}) => (
    <InputWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      {type === 'radio' && radioOptions ?
        <RadioWrapper direction={direction}>
          {radioOptions.map(({ label, value: radioVal, disabled }) => (
            <RadioItem size={size}>
              <StyledInput
                id={radioVal}
                name={name}
                type={type ? type : "text"}
                variant={error ? "danger" : variant ? variant : "default"}
                size={size}
                onChange={() => onChange(name, radioVal)}
                value={value}
                placeholder={placeholder}
                className={className}
                disabled={disabled}
              />
              <RadioLabel disabled={disabled} htmlFor={radioVal}>{label}</RadioLabel>
              <RadioOverlay
                disabled={disabled}
                size={size ? size : '16px'}
                variant={error ? "danger" : variant ? variant : "default"}
                checked={radioVal === value}
              />
            </RadioItem>
          ))}
        </RadioWrapper>
        :
        <>
          <StyledInput
            name={name}
            type={type ? type : "text"}
            variant={error ? "danger" : variant ? variant : "default"}
            size={size}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
            min={min}
                max={max}
                step={step}
          />
          {type === 'checkbox' &&
            <>
              <CheckboxOverlay color={color} size={size} variant={variant} checked={value} disabled={disabled} />
              <CheckboxText size={size}>
                {checkboxText}
              </CheckboxText>
            </>
          }
        </>
      }
      {!hideError && <ErrorInfo error={error}>{error}</ErrorInfo>}
    </InputWrapper>
  );

export default Input;

const InputWrapper = styled.div`
      position:relative;
      display: flex;
      flex-direction: column;
    `;

const StyledInput = styled.input`
      border-radius: 4px;
      font-size: 14px;
      margin: 0 2px;
      min-height: ${({ size, type }) => type !== 'checkbox' && type !== 'radio' ? size ? size : '38px' : 'auto'};
      padding-left: 10px;
      outline: none;
      transition: all 100ms ease 0s;
      width: ${({ size }) => size ? size : '100%'};
      height: ${({ size }) => size};
      margin: 2px 0 2px 0;
      min-width: 80px;
  &:focus {
      border-color: ${({ theme }) => theme.primary};
      border-width: 2px;
      padding-left: 9px;
    }
  ${({ variant, theme }) =>
    variant === "default"
      ? `
      border: 1px solid rgb(204, 204, 204);
`
      : variant === "primary"
        ? `
    border: 1px solid ${theme.primary};
`
        : variant === "danger"
          ? `
    border: 1px solid ${theme.danger};
`
          : variant === "dark"
            ? `
    border: 1px solid ${theme.darkGrey};
`
            : ``}
      ${({ size }) =>
    size === "small"
      ? `
    min-height: 28px;
`
      : size === "big"
        ? `
    min-height: 46px;
`
        : ``}
        ${({ disabled }) =>
    disabled &&
    `
        user-select:none;
        opacity:.3;
        cursor: not-allowed; 
      `}

      ${({ type, size }) =>
    type === 'radio' && (
      size === 'big' ?
        `
          height:32px;
          width:32px;
          `
        :
        size === 'medium' ?
          `
          height:24px;
          width:24px;
          `
          :
          `
          height:16px;
          width:16px;
          `
    )
  }

      &[type='checkbox'], &[type='radio']{
        opacity: 0;
        cursor: pointer;
        width: ${({ size }) => size ? size : '18px'};
        height: ${({ size }) => size ? size : '18px'};
        position:absolute;
        margin:auto;
        z-index: 9;
        ${({ disabled }) =>
    disabled &&
    `
            user-select:none;
            opacity:.3;
            cursor: not-allowed; 
          `}
    }
    &[type='radio']{
        top: auto;
        left:0;
      ${({ disabled }) =>
    disabled &&
    `
        user-select:none;
        opacity:.3;
        cursor: not-allowed; 
      `}
    }
    
`;
const CheckboxText = styled.p`
  position:absolute;
  padding-left:5px;
  left:${({ size }) => size ? size : '18px'};
  top:2px;
  font-size:14px;
`;

const CheckboxOverlay = styled.div`
      width: ${({ size }) => size ? size : '18px'};
      height: ${({ size }) => size ? size : '18px'};
      border-radius: 4px;
      transition:300ms;
      position: relative;
    ${({ variant, theme, checked,color }) =>
    color ? 
      checked ? 
        `border: 1px solid ${color};
        background-color: ${color};`
        :
        `border: 1px solid ${color};`
    : variant === "default"?
      checked ?
        `
        border: 1px solid rgb(204, 204, 204);
        background-color:rgb(204,204,204)
      `: `
      border: 1px solid rgb(204, 204, 204);
      `:
      variant === "primary"
        ? checked ?
          `
      border: 1px solid ${theme.primary};
      background-color: ${theme.primary};
      `: `
      border: 1px solid ${theme.primary};
      `:
        variant === "danger"
          ? checked ?
            `
        border: 1px solid ${theme.danger};
        background-color: ${theme.danger};
        `: `
        border: 1px solid ${theme.danger};
        `
          : variant === "dark"
            ? checked ?
              `
            border: 1px solid ${theme.darkGrey};
            background-color: ${theme.darkGrey};
      `: `
            border: 1px solid ${theme.darkGrey};
      `
            : ``}
    ${({ disabled }) =>
    disabled &&
    `
        user-select:none;
        opacity:.3;
        cursor: not-allowed;
      `}
      &::after{
        content:'';
        position: absolute;
        left: 23%;
        top: 57%;
        margin: auto;
        display:block;
        width:25%;
        height:50%;
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
        transform: scaleX(-1) rotate(140deg);
        transform-origin: left top;
      ${({ disabled }) =>
    disabled &&
    `
        user-select:none;
        opacity:.3;
        cursor: not-allowed; 
      `}
      ${({ checked }) =>
    checked && 'animation: check 800ms'
  };
    @keyframes check {
      0% {
        height: 0;
        width: 0;
      }
      25% {
         height: 0;
         width: 25%;
      }
      50% {
         height: 50%;
         width: 25%;
      }
    }
`;

/* ${({color, checked }) => color && checked ?
          `
      border: 1px solid ${color};
      background-color: ${color};
      `: `
      border: 1px solid ${color};
      `} */

const RadioWrapper = styled.div`
  display:flex;
  flex-direction:${({ direction }) => direction ? direction : 'column'};
  justify-content: space-around;
`

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  min-height: 38px;
  padding:5px 0;
  padding-left: ${({ size }) =>
    size === 'big' ?
      `
        32px
        `
      :
      size === 'medium' ?
        `
          24px
        `
        :
        `
          16px;
        `
  };
    `

const RadioLabel = styled.label`
  display:flex;
  padding-left:5px;
  font-size:12px;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
    user-select:none;
    opacity:.3;
    cursor: not-allowed; 
  `
  };
    `

const RadioOverlay = styled.div`
    ${({ size }) =>
    size === 'big' ?
      `
          width: 32px; 
          height: 32px; 
        `
      :
      size === 'medium' ?
        `
          width:24px;
          height:24px;
        `
        :
        `
          width:16px;
          height:16px;
        `
  };
    border-radius: 50%;
    transition:300ms;
    position: absolute;
    left:0;
    display:flex;
    justify-content:center;
    align-items:center;
    ${({ disabled }) =>
    disabled &&
    `
      user-select:none;
      opacity:.3;
      cursor: not-allowed; 
    `
  };
    ${({ variant, theme }) =>
    variant === "default"
      ? `
      border: 2px solid rgb(204, 204, 204);
`
      : variant === "primary"
        ? `
    border: 2px solid ${theme.primary};
`
        : variant === "danger"
          ? `
    border: 2px solid ${theme.danger};
`
          : variant === "dark"
            ? `
    border: 2px solid ${theme.darkGrey};
`
            : ``}
      &::after{
        ${({ size }) =>
    size === 'big' ?
      `
                width: 16px; 
                height: 16px; 
              `
      :
      size === 'medium' ?
        `
                width:12px;
                height:12px;
              `
        :
        `
                width:8px;
                height:8px;
              `
  };
        position:absolute;
        margin:auto;
        content:'';
        transition: 300ms;
        display:block;
        border-radius: 50%;
        transform-origin: center;
        transform: scale(0);
        ${({ variant, theme }) =>
    variant === "default"
      ? `
          background-color: rgb(204, 204, 204);
            `
      : variant === "primary"
        ? `
            background-color: ${theme.primary};
            `
        : variant === "danger"
          ? `
              background-color: ${theme.danger};
            `
          : variant === "dark"
            ? `
                background-color: ${theme.darkGrey};
            ` : ``}
      ${({ checked }) =>
    checked && `
        transform: scale(1);
        animation: grow 400ms;
      `
  };
      }
    @keyframes grow {
        0% {
          transform: scale(0);
        }
        100% {
        transform: scale(1);
        }
   }
`;

const Label = styled.label`
 margin-left: 5px;
`;

const ErrorInfo = styled.p`
 font-size: 10px;
  color: ${({ theme }) => theme.danger};
      text-align: right;
      margin-bottom: 5px;
      visibility: hidden;
  ${({ error }) =>
    error
      ? `
visibility: visible;`
      : `
height: 13px;
`}
      `;