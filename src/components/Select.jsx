import React, { useEffect, useState } from "react";
import Select from "react-select";
import "include/sass/select.scss";

const Dropdown = ({
  onChange,
  placeholder,
  name,
  value,
  options,
  isLoading,
  isDisabled,
}) => {
  const customStyles = {
    indicatorSeparator: (styles) => ({ display: "none" }),
    indicatorContainer: (styles) => ({ color: "red", backgroundColor: "red" }),
    option: (provided, state) => ({
      ...provided,
      "&:hover": {
        color: "#ffffff",
        backgroundColor: "#26bf94",
        cursor: "pointer",
      },
      backgroundColor: state.isSelected ? "#26bf94" : "#212a28",
      color: state.isSelected ? "white" : "white",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: "all .2s ease",
      transform: state.isFocused ? "rotate(180deg)" : "rotate(270deg)",
    }),
    valueContainer: (base, state) => ({
      ...base,
      color: "#ffffff",
    }),
    control: (base, state) => ({
      ...base,
      color: state.isSelected ? "red" : "blue",
      backgroundColor: state.isSelected ? "#fff" : "#fff",
      width: "100%",
      borderColor: "transparent",
    }),
    singleValue: (base, state) => ({
      ...base,
      color: state.isSelected ? "#000" : "#000",
      fontSize: "17px",
    }),
    menuList: (base, state) => ({
      ...base,
      paddingTop: "0",
      paddingBottom: "0",
      zIndex: "3",
      backgroundColor: "black",
    }),
  };
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange({
          name,
          currentTarget: { id: e.id, title: e.title, data: e },
        });
      }}
      options={isLoading ? [] : options}
      getOptionLabel={(option) => option.title}
      getOptionValue={(option) => option.id}
      className="select"
      styles={customStyles}
      isLoading={isLoading}
      isDisabled={isDisabled}
    />
  );
};

export default Dropdown;
