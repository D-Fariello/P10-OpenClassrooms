import React from "react";
import UserGreeting from "../components/UserGreeting";
import AccountSection from "../components/AccountSection";

const User = () => {
  return (
    <main className="main bg-dark">
      <UserGreeting userName="Tony Jarvis" />
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
  );
};

export default User;
