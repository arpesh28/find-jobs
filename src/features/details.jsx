import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, getJobs } from "api/api";
import _ from "lodash";

//  Images
import buildingIcon from "include/images/building.png";
import locationPinIcon from "include/images/location-pin.png";
import facebookIcon from "include/images/facebook.png";
import linkedinIcon from "include/images/linkedin.png";
import twitterIcon from "include/images/twitter.png";

function Details() {
  const [jobDetails, setJobDetails] = useState(null);
  const [jobs, setJobs] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const getDetails = async () => {
      const details = await getData(`jobs/${id}`);
      const jobs = await getJobs({ dept: details.department.id });
      setJobs(jobs);
      setJobDetails(details);
    };
    getDetails();
  }, [id]);
  if (!jobDetails) {
    return null;
  }
  return (
    <div>
      {" "}
      <div className="header_section">
        <h4>
          {jobDetails.department.title} Department At Teknorix Systems{" "}
          {jobDetails.location.state}
        </h4>
        <h2>{jobDetails.title}</h2>
        <p>
          <span>
            <img src={buildingIcon} />
          </span>{" "}
          <span>{jobDetails.function.title}</span>{" "}
          <span className="ml-20">
            <img src={locationPinIcon} />
          </span>{" "}
          <span>{jobDetails.location.title}</span>
          <span className="job_type ml-20">{jobDetails.type}</span>
        </p>
        <button className="button">
          <a rel="noreferrer" href={jobDetails.applyUrl} target="_blank">
            Apply
          </a>
        </button>
      </div>
      <br />
      <br />
      <hr />
      <div className="body_section">
        <div
          className="main_section"
          dangerouslySetInnerHTML={{ __html: jobDetails.description }}
        ></div>
        <div className="sidebar_section">
          <div className="other_jobs_container">
            <h3 className="section_heading">Other Openings</h3>
            {jobs &&
              jobs.map((item, index) => {
                return (
                  <>
                    <div className="card_container">
                      <div className="description">
                        <h4>{item.title}</h4>
                        <span>
                          <img src={buildingIcon} />
                        </span>
                        <span className="title_job">
                          {item.department.title}
                        </span>
                        <span className="ml-20">
                          <img src={locationPinIcon} />
                        </span>
                        <span className="title_job">{item.location.title}</span>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          <div className="social_container">
            <h3 className="section_heading">Share on Social</h3>
            <div className="icons">
              <div>
                <a href="https://www.facebook.com/">
                  <img src={facebookIcon} className="social-icons" />
                </a>
              </div>
              <div>
                <a href="https://twitter.com/login">
                  <img src={twitterIcon} className="social-icons" />
                </a>
              </div>
              <div>
                <a href="https://www.linkedin.com/signup">
                  <img src={linkedinIcon} className="social-icons" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Details;
