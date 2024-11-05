"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useLoginState from "../hooks/useLoginState";

const backendAPI = process.env.NEXT_PUBLIC_BACKEND_URL;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { updateLoginState } = useLoginState();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endPoint = `${backendAPI}/user/login`;
    const data = JSON.stringify({
      email,
      password,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: endPoint,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res.data);
        setLoginSuccess(true);
        updateLoginState({
          token: res.data.token,
          loggedIn: true,
          email: email,
        });
        router.push("/create");
      })
      .catch((err) => {
        setLoginFailed(true);
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {loginFailed && (
          <div className="p-4 text-red-500 bg-red-100 rounded-md">
            Login failed. Please try again.
          </div>
        )}
        {loginSuccess && (
          <div className="p-4 text-green-600 bg-green-100 rounded-md">
            Login successful, redirecting...
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              className="text-indigo-600 hover:underline cursor-pointer"
              onClick={() => {
                router.push("/register");
              }}
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
