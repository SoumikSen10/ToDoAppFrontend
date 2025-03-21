import React, { useEffect, useState } from "react";
import {
  deleteTodoApi,
  retrieveAllTodosForUsernameApi,
} from "../api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

const ListTodos = () => {
  const today = new Date();

  const authContext = useAuth();

  const username = authContext.username;

  const navigate = useNavigate();

  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  /* const todos = [
     { id: 1, description: "Learn AWS", done: false, targetDate: targetDate },
    { id: 2, description: "Learn Devops", done: false, targetDate: targetDate },
    { id: 3, description: "Learn Spring", done: false, targetDate: targetDate },
    { id: 4, description: "Learn React", done: false, targetDate: targetDate }, 
  ]; */

  //useEffect - tell React that your component needs to do something after render.

  useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    console.log(username);
    retrieveAllTodosForUsernameApi(username)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  function deleteTodo(id) {
    deleteTodoApi(username, id)
      .then(
        //1. Display message
        //2. Update Todos List
        () => {
          setMessage(`Deleted todo with id = ${id}`);
          refreshTodos();
        }
      )
      .catch((error) => console.log(error));
  }

  function updateTodo(id) {
    console.log("Clicked " + id);
    navigate(`/todo/${id}`);
  }

  function addNewTodo() {
    navigate(`/todo/-1`);
  }

  return (
    <div className="container boxy">
      <h1>List down the things to be done</h1>
      {message && <div className="alert alert-warning">{message}</div>}

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DESCRIPTION</th>
              <th>IS DONE ?</th>
              <th>TARGET DATE</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                {/* <td>{todo.targetDate.toDateString()}</td> */}
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  );
};

export default ListTodos;
