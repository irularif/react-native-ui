import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";
import session from "@src/store/session";
const config = require("../../../settings.json");

export interface IApi {
  config: AxiosRequestConfig;
  onError?: (e) => void;
  auth?: boolean;
}

export default (e: IApi) => {
  let url = e.config.url;
  const headers = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    ..._.get(e, "headers", {})
  };
  if (e.config.url.indexOf("http") !== 0) {
    url = `${config.backend.protocol}://${config.backend.host}:${config.backend.port}${e.config.url}`;
  }
  if (e.auth) {
    headers["Authorization"] = `Bearer ${session.jwt}`;
  }
  let onError;
  if (e.onError) {
    onError = e.onError;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        ...e.config,
        url,
        headers
      });
      if (res.status >= 200 && res.status < 300) {
        if (res.data) resolve(res.data);
        else resolve(res);
      } else {
        if (res.data) onError(res.data);
        else onError(res);
        resolve();
      }
    } catch (e) {
      if (onError) {
        if (e.response && e.response.data) onError(e.response.data);
        else onError(e.response);
        resolve();
      } else {
        if (e.response && e.response.data) resolve(e.response.data);
        else resolve(e.response);
      }
    }
  });
};
