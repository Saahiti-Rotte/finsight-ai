import { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

export default function AuthPage({
  setUser,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isLogin, setIsLogin] =
    useState(true);

  const handleAuth = async () => {
    try {
      let userCredential;

      // LOGIN
      if (isLogin) {
        userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
      }

      // SIGNUP
      else {
        userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
      }

      setUser(
        userCredential.user
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background: "#f8f7f4",
      }}
    >
      <div
        className="card"
        style={{
          width: "420px",
        }}
      >
        <div className="card-title">
          {isLogin
            ? "Login to FinSight AI"
            : "Create FinSight Account"}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* EMAIL */}
          <input
            className="txn-input"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          {/* PASSWORD */}
          <input
            className="txn-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {/* BUTTON */}
          <button
            className="txn-btn"
            onClick={handleAuth}
          >
            {isLogin
              ? "Login"
              : "Create Account"}
          </button>

          {/* SWITCH */}
          <button
            className="nav-item"
            style={{
              color: "#111",
            }}
            onClick={() =>
              setIsLogin(
                !isLogin
              )
            }
          >
            {isLogin
              ? "Create new account"
              : "Already have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
}