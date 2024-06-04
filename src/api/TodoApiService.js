import { apiClient } from "./ApiClient";

export function retrieveAllTodosForUsernameApi(username) {
  return apiClient.get(`/users/${username}/todos`);
}

export function deleteTodoApi(username, id) {
  return apiClient.delete(`/users/${username}/todos/${id}`);
}

export function retrieveTodoApi(username, id) {
  apiClient.get(`/users/${username}/todos/${id}`);
}

export function updateTodoApi(username, id, todo) {
  apiClient.put(`/users/${username}/todos/${id}`, todo);
}

export function createTodoApi(username, todo) {
  apiClient.post(`/users/${username}/todos`, todo);
}
