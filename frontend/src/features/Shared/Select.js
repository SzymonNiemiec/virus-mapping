import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { default as ReactSelect } from 'react-select';
import { theme } from '../Shared/theme'

const Select = forwardRef(({
  name,
  options,
  onChange,
  value,
  placeholder,
  className,
  isDisabled,
  isLoading,
  isClearable,
  isMulti,
  styles = {},
  error,
  label,
  noOptionsMessage,
  isSearchable,
  onInputChange,
  center
}, ref) => {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      outline: 'none',
      ...styles.container,
    }),
    control: (provided, { isFocused }) => ({
      ...provided,
      border: error ? `1px solid ${theme.danger}` : isFocused ? `1px solid ${theme.primary}` : `1px solid rgb(204, 204, 204)`,
      boxShadow: isFocused ? 'none' : 'none',
      fontSize: '14px',
      margin: '0 auto 10px',
      ...styles.control,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#bfbfbf',
      ...styles.placeholder,
    }),
    input: (provided) => ({
      ...provided,
      ...styles.input,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      cursor: 'pointer',
      ...styles.dropdownIndicator,
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      ...styles.loadingIndicator,
    }),
    menu: (provided) => ({
      ...provided,
      ...styles.menu,
    }),
    option: (provided, { isFocused, isSelected, isDisabled }) => ({
      ...provided,
      backgroundColor: isFocused ? '#D9D9D9' : null,
      fontWeight: isSelected ? '600' : 'normal',
      color: isDisabled ? '#ccc' : '#212121',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      ...styles.option,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1,
        transition = 'opacity 300ms',
        color = "#bfbfbf";
      return { ...provided, opacity, transition, color };
    }
  };

  return (
    <SelectWrapper label={label} center={center}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <ReactSelect
        ref={ref}
        name={name}
        options={options}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={className}
        isLoading={isLoading}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isMulti={isMulti}
        styles={{ ...customStyles, ...styles }}
        noOptionsMessage={noOptionsMessage}
        isSearchable={isSearchable}
        onInputChange={onInputChange}
      />
      <ErrorInfo error={error}>{error}</ErrorInfo>
    </SelectWrapper>
  )
})

export default Select;

const SelectWrapper = styled.div`
    display:block;
    flex-direction:row;
    max-width: 240px;
    min-width: 100px;
    ${({ label }) => !label && `
      height: 38px;`
  }
    ${({ center }) => center && `
      margin: 0 auto;
    `}
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

const Label = styled.label`
 margin-left: 5px;
 margin-bottom: 2px;
`;