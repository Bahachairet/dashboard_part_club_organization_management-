import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom"; // Add useParams here
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";

import { tableConfig } from "./datasource"; // Import tableConfig
import "./style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const SingleWrapper = () => {
    const { tableType, itemId } = useParams(); // Use useParams here

    return <Single tableType={tableType} itemId={itemId} />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />

          {/* Users Routes */}
          <Route
            path="users"
            element={
              <RequireAuth>
                <List tableType="users" />
              </RequireAuth>
            }
          />
          <Route
            path="users/new"
            element={
              <RequireAuth>
                <New tableType="users" />
              </RequireAuth>
            }
          />
          <Route
            path="users/:itemId"
            element={
              <RequireAuth>
                <SingleWrapper />
              </RequireAuth>
            }
          />

          {/* Actualites Routes */}
          <Route
            path="actualites"
            element={
              <RequireAuth>
                <List tableType="actualites" />
              </RequireAuth>
            }
          />
          <Route
            path="actualites/new"
            element={
              <RequireAuth>
                <New tableType="actualites" />
              </RequireAuth>
            }
          />
          <Route
            path="actualites/:itemId"
            element={
              <RequireAuth>
                <SingleWrapper />
              </RequireAuth>
            }
          />

          {/* Projects Routes */}
          <Route
            path="projects"
            element={
              <RequireAuth>
                <List tableType="projects" />
              </RequireAuth>
            }
          />
          <Route
            path="projects/new"
            element={
              <RequireAuth>
                <New tableType="projects" />
              </RequireAuth>
            }
          />
          <Route
            path="projects/:itemId"
            element={
              <RequireAuth>
                <SingleWrapper />
              </RequireAuth>
            }
          />

          {/* Offers Routes */}
          <Route
            path="offers"
            element={
              <RequireAuth>
                <List tableType="offers" />
              </RequireAuth>
            }
          />
          <Route
            path="offers/new"
            element={
              <RequireAuth>
                <New tableType="offers" />
              </RequireAuth>
            }
          />
          <Route
            path="offers/:itemId"
            element={
              <RequireAuth>
                <SingleWrapper />
              </RequireAuth>
            }
          />

          {/* Teams Routes */}
          <Route
            path="teams"
            element={
              <RequireAuth>
                <List tableType="teams" />
              </RequireAuth>
            }
          />
          <Route
            path="teams/new"
            element={
              <RequireAuth>
                <New tableType="teams" />
              </RequireAuth>
            }
          />
          <Route
            path="teams/:itemId"
            element={
              <RequireAuth>
                <SingleWrapper />
              </RequireAuth>
            }
          />

          {/* Sponsors Routes */}
          <Route
            path="sponsors"
            element={
              <RequireAuth>
                <List tableType="sponsors" />
              </RequireAuth>
            }
          />
          <Route
            path="sponsors/new"
            element={
              <RequireAuth>
                <New tableType="sponsors" />
              </RequireAuth>
            }
          />
          <Route
            path="sponsors/:itemId"
            element={
              <RequireAuth>
                <SingleWrapper />
              </RequireAuth>
            }
          />

          {/* Redirect to home if no route matches */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
