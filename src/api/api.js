const axios = require("axios").default;

export const getData = async (url) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}` + url,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
export const getJobs = async (params) => {
  try {
    const response = await axios({
      method: "get",
      params,
      url: `${process.env.REACT_APP_BASE_URL}/jobs`,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
