import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicNavbar } from "./components/PublicNavbar";
import { PrivateNavbar } from "./components/PrivateNavbar";
import { Home } from "./Authpages/Home";
import { Login } from "./Authpages/Login";
import { Signup } from "./Authpages/Signup";
import { Dashboard } from "./Pages/Dashboard";
import { Profile } from "./Pages/Profile";
import { Notifications } from "./Pages/Notifications";
import { Deposit } from "./Pages/Deposit";
import { Transfer } from "./Pages/Transfer";
import { Password } from "./Pages/Password";
import { Pin } from "./Pages/Pin";

import { NotFound } from "./Pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PublicNavbar />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <PublicNavbar />
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PublicNavbar />
              <Signup />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <PrivateNavbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PrivateNavbar />
              <Profile />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <PrivateNavbar />
              <Notifications />
            </>
          }
        />
        <Route
          path="/deposit"
          element={
            <>
              <PrivateNavbar />
              <Deposit />
            </>
          }
        />
        <Route
          path="/transfer"
          element={
            <>
              <PrivateNavbar />
              <Transfer />
            </>
          }
        />
        <Route
          path="/password"
          element={
            <>
              <PrivateNavbar />
              <Password />
            </>
          }
        />
        <Route
          path="/pin"
          element={
            <>
              <PrivateNavbar />
              <Pin />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <PublicNavbar />
              <NotFound />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
