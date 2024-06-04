import "./App.css";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Error from "./components/Error";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListTodos from "./components/ListTodos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import AuthProvider, { useAuth } from "./security/AuthContext";
import TodoComponent from "./components/TodoComponent";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return children;

  return <Navigate to="/" />;
}

function App() {
  return (
    <div className="todoApp roboto-regular">
      <AuthProvider>
        {" "}
        {/* wrapping around all children using AuthProvider */}
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodos />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <TodoComponent />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <Logout />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
