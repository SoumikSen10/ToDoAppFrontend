import { apiClient } from "./ApiClient";

export function executeBasicAuthenticationService(token) {
  return apiClient.get(`/basicauth`, {
    headers: {
      Authorization: token,
    },
  });
}

export function executeJwtAuthenticationService(username, password) {
  return apiClient.post(`/authenticate`, { username, password });
}
