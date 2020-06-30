import Axios from "axios";

export const getStarWarPerson = () => {
  return Axios.get("/face/v1/framework/platform_console/license_status").then(d => {
    if (d.status === 200) {
      return d.data;
    }
  });
};

export const getGithubInfo = () => {
  return Axios.get("https://api.github.com").then(d => {
    if (d.status === 200) {
      return d.data;
    }
  });
};
