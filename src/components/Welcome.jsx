import React, { useState } from "react";

import { useParams, Link } from "react-router-dom";
import {
  retrieveHelloWorldBean,
  retrieveHelloWorldPathVariable,
} from "../api/HelloWorldApiService";
import { useAuth } from "../security/AuthContext";

const Welcome = () => {
  const { username } = useParams();

  const [message, setMessage] = useState(null);

  const authContext = useAuth();

  function callHelloWorldRestApi() {
    /* axios
      .get("http://localhost:8080/hello-world", {
        headers: {
          Origin: "http://localhost:3000",
        },
      })
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup")); */

    /* retrieveHelloWorldBean()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup")); */

    retrieveHelloWorldPathVariable(
      username,
      /* "Basic c291bWlrc2VuMjAwMzpkdW1teQ==" */
      authContext.token
    )
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function successfulResponse(response) {
    console.log(response);
    //setMessage(response.data);
    setMessage(response.data.message);
  }

  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        Manage your todos - <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
          Call Hello World
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
};

export default Welcome;
