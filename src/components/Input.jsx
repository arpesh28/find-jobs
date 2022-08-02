import React, { useCallback } from "react";
import "include/sass/search.scss";
import _, { debounce } from "lodash";

//  Images
import SearchIcon from "include/images/search.png";

const Input = (props) => {
  const { placeholder, setValue, value, getData } = props;
  const handleChange = (e) => {
    setValue(e);
  };
  return (
    <div className="search_container">
      <input
        className="search"
        placeholder={placeholder}
        type="text"
        name="search"
        id="search"
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <img src={SearchIcon} alt="" />
    </div>
  );
};

export default Input;
