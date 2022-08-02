import React, { useEffect, useState } from "react";
import { getData, getJobs } from "api/api";
import _ from "lodash";

//  Images
import closeIcon from "include/images/close.png";

//  Components
import Input from "components/Input";
import Select from "components/Select";
import Jobs from "components/Jobs";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState({
    search: "",
    location: "",
    department: "",
    function: "",
  });
  const [locationsList, setLocationsList] = useState([]);
  const [loadingLocationList, setLoadingLocationsList] = useState(false);
  const [functionsList, setFunctionsList] = useState([]);
  const [loadingFunctionsList, setLoadingFunctionList] = useState(false);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [loadingDepartmentsList, setLoadingDepartmentsList] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  //    Mounting
  useEffect(() => {
    const loadFilters = async () => {
      setLoadingLocationsList(true);
      const locations = await getData("locations");
      setLocationsList(locations);
      setLoadingLocationsList(false);
      setLoadingFunctionList(true);
      const functions = await getData("functions");

      setFunctionsList(functions);
      setLoadingFunctionList(false);
      setLoadingDepartmentsList(true);
      const departments = await getData("departments");

      setDepartmentsList(departments);
      setLoadingDepartmentsList(false);
    };
    const filters = JSON.parse(localStorage.getItem("filters"));
    if (filters) {
      setData(filters);
    }
    loadFilters();
  }, []);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const payload = {
        q: data.search,
        loc: data.location.id,
        dept: data.department.id,
        fun: data.function.id,
      };
      var params = _.pickBy(payload, function (value, key) {
        return !(
          value === undefined ||
          value == null ||
          value == {} ||
          value == ""
        );
      });
      const jobs = await getJobs(params);
      setJobs(jobs);

      const groups = _.groupBy(jobs, (job) => job.department.title);
      setGroups(groups);
      setLoading(false);
    };
    localStorage.setItem("filters", JSON.stringify(data));
    loadJobs();
  }, [data]);

  const onChange = (e) => {
    const allData = { ...data };
    allData[e.name] = e.currentTarget;
    console.log("target:", allData);
    setData(allData);
  };
  const clearFilters = (key) => {
    if (key === "all") {
      setData({
        search: "",
        location: "",
        department: "",
        function: "",
      });
    } else {
      setData({ ...data, [key]: "" });
    }
  };
  return (
    <div className="container">
      <div className="filter_container">
        <Input
          placeholder="Search for Jobs"
          value={data.search}
          setValue={(val) => {
            setData({ ...data, search: val });
          }}
        />

        <div className="dropdown_container">
          <Select
            placeholder="Location"
            onChange={onChange}
            name="location"
            value={data.location}
            options={locationsList}
            isLoading={loadingLocationList}
          />
          <Select
            placeholder="Department"
            onChange={onChange}
            name="department"
            value={data.department}
            options={departmentsList}
            isLoading={loadingDepartmentsList}
          />
          <Select
            placeholder="Function"
            onChange={onChange}
            name="function"
            value={data.function}
            options={functionsList}
            isLoading={loadingFunctionsList}
          />
        </div>
      </div>
      {(data.search ||
        !_.isEmpty(data.location) ||
        !_.isEmpty(data.function) ||
        !_.isEmpty(data.department)) && (
        <div className="drop_values">
          <div className="filters">
            {Object.keys(data).map((key) => {
              return (
                !_.isEmpty(data[key]) &&
                (key !== "search" ? (
                  <p>
                    {data[key].title}{" "}
                    <span
                      onClick={(e) => {
                        clearFilters(key);
                      }}
                    >
                      <img src={closeIcon} />
                    </span>
                  </p>
                ) : (
                  <p>
                    {data[key]}
                    <span
                      onClick={(e) => {
                        clearFilters(key);
                      }}
                    >
                      <img src={closeIcon} />
                    </span>
                  </p>
                ))
              );
            })}
          </div>
          <div
            className="clear_all"
            onClick={() => {
              clearFilters("all");
            }}
          >
            <p>Clear All</p>
          </div>
        </div>
      )}

      {Object.keys(groups).map((key) => (
        <Jobs data={groups} key={key} cat={key} />
      ))}
    </div>
  );
}
export default Home;
