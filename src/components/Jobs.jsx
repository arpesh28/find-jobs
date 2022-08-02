import React from "react";
import { Link } from "react-router-dom";
import "include/sass/card.scss";
import buildingIcon from "include/images/building.png";
import locationPinIcon from "include/images/location-pin.png";

const index = ({ data, cat }) => {
  return (
    <div className="function_container">
      <h2 className="section_heading">{cat}</h2>
      {data[cat] &&
        data[cat].map((item, key) => {
          return (
            <div className="card_container" key={key}>
              <div className="job_data">
                <div className="job_title">{item.title}</div>{" "}
                <div className="description">
                  <span>
                    <img src={buildingIcon} />
                  </span>{" "}
                  <span>{item.company}</span>
                  <span className="ml-20">
                    <img src={locationPinIcon} />
                  </span>{" "}
                  <span>{item.location.title}</span>
                  <span className="job_type ml-20">{item.type}</span>
                </div>
              </div>
              <div className="button_container">
                <button className="button">
                  <a href={item.applyUrl} target="_blank">
                    Apply
                  </a>
                </button>
                <Link to={`/${item.id}`} className="link ml-20">
                  View
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default index;
