import React from "react";
import UserGreeting from "../components/UserGreeting";
import AccountSection from "../components/AccountSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { isEmpty } from "../../utils/isEmpty";
import { useNavigate } from "react-router-dom";

export function User() {
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const form = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isEmpty(user.user) && user.token) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
      navigate("/sign-in");
    }
  }, []);

  return (
    isConnected && (
      <main className="main bg-dark">
        <UserGreeting
          userName={user.user.body.firstName + " " + user.user.body.lastName}
        />
        <h2 className="sr-only">Accounts</h2>
        <AccountSection
          accountTitle="Argent Bank Checking (x8349)"
          accountAmount="$2,082.79"
          accountDescription="Available Balance"
        />
        <AccountSection
          accountTitle="Argent Bank Savings (x6712)"
          accountAmount="$10,928.42"
          accountDescription="Available Balance"
        />
        <AccountSection
          accountTitle="Argent Bank Credit Card (x8349)"
          accountAmount="$184.30"
          accountDescription="Current Balance"
        />
      </main>
    )
  );
}

export default User;
