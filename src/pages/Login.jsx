import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { login, logout } from "../store/actions/userActions"
import {userService} from "../services/user-service"

export const Login = () => {
  const [userInfo, handleChange, setUserInfo] = useForm(null)
  const [isSignup, setIsSignup] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [currUser, setCurrUser] = useState(null)
  const [loginFailed, setLoginFailed] = useState(false)


  const dispatch = useDispatch()

  useEffect(() => {
    const currUser = userService.getLoggedinUser()
    setCurrUser(currUser)
  }, [isLoggedIn])

  useEffect(() => {
    setUserInfo({ username: "", password: "", fullname: "" })
  }, [])

  const onLogin = async (ev) => {
    ev.preventDefault()
    try {
      await dispatch(login({ ...userInfo }))
      setIsLoggedIn(true)
    } catch (error) {
      console.log("could not log in right now")
      setLoginFailed(true)
    }
  }

  const onLogout = async () => {
    await dispatch(logout())
    setUserInfo({ username: "", password: "", fullname: "" })
    setCurrUser(null)
    setIsLoggedIn(false)
  }

  const onTryAgain = () => {
    setLoginFailed(false)
  }

  const onDoSignup = () => {
    setIsSignup(true)
  }

  const onDoSignin = () => {
    setIsSignup(false)
  }

  if (!userInfo) return <div className="card-display">Loading...</div>
  if (loginFailed)
    return (
      <section className="card-display">
        <h3>Login failed, please try again</h3>
        <button onClick={onTryAgain} className="myButton">
          Back To Login
        </button>
      </section>
    )
  if (currUser || isLoggedIn)
    return (
      <section className="card-display">
        <h3>You are logged in as {currUser?.fullname || ""}</h3>
        <button className="myButton" onClick={onLogout}>
          Logout
        </button>
      </section>
    )
  return (
    <section className="card-display">
      <h1>{isSignup ? "Sign Up!" : "Sign In"}</h1>
      <form className="login-form flex column space-between align-center" onSubmit={onLogin}>
        <section>
          <label htmlFor="username">Username </label>
          <input
            onChange={handleChange}
            value={userInfo.username}
            type="text"
            name="username"
            id="username"
          />
        </section>
        <section>
          <label htmlFor="password">Password </label>
          <input
            onChange={handleChange}
            value={userInfo.password}
            type="password"
            name="password"
            id="password"
          />
        </section>
        {isSignup && (
          <section>
            <label htmlFor="fullname">Full Name </label>
            <input
              onChange={handleChange}
              value={userInfo.fullname}
              type="text"
              name="fullname"
              id="fullname"
            />
          </section>
        )}
        <button className="myButton">{isSignup ? "Sign Up!" : "Login"}</button>
      </form>
        {isSignup && <button className="myButton" onClick={onDoSignin}>Back to Login</button>}
      {!isSignup && (
        <section className="flex column align-center">
        <p>No account yet?</p>
        <button className="myButton" onClick={onDoSignup}>Sign me up!</button>
        </section>
      )}
    </section>
  )
}
