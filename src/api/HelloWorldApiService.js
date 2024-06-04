import { apiClient } from "./ApiClient";

export function retrieveHelloWorldBean() {
  return apiClient.get("/hello-world-bean");
}

//Response to preflight request doesn't pass access control check => Authorization header
export function retrieveHelloWorldPathVariable(username, token) {
  return apiClient.get(
    `/hello-world/path-variable/${username}` /* , {
    headers: {
      Authorization: token,
    },
  } */
  );
}
