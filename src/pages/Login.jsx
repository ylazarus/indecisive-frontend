import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { login, logout } from "../store/actions/userActions"

export const Login = () => {
  const [userInfo, handleChange, setUserInfo] = useForm(null)
  const [isSignup, setIsSignup] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  const { loggedInUser } = useSelector((state) => state.userModule)
  const dispatch = useDispatch()

  useEffect(() => {
    setUserInfo({username: '', password: '', fullname: ''})
  }, [])

  const onLogin = async (ev) => {
    ev.preventDefault()
    try {
      await dispatch(login({ ...userInfo }))
      setIsLoggedIn(true)
    } catch (error) {
      console.log("could not log in right now")
    }
  }

  const onLogout = async () => {
    await dispatch(logout())
    setUserInfo({username: '', password: '', fullname: ''})
    setIsLoggedIn(false)
  }
 if (!userInfo)  return <div>Loading...</div>
  if (isLoggedIn)
    return (
      <section>
        <h1>You are currently logged in as {loggedInUser}</h1>
        <button className="myButton" onClick={onLogout}>
          Logout
        </button>
      </section>
    )
  return (
    <section className="card-display">
      <h1>Login</h1>
      <form onSubmit={onLogin}>
        <section>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChange}
            value={userInfo.username}
            type="text"
            name="username"
            id="username"
          />
        </section>
        <section>
          <label htmlFor="password">Password</label>
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
            <label htmlFor="fullname">Full Name</label>
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
      {!isSignup && (
        <button className="myButton" onClick={setIsSignup(true)}></button>
      )}
    </section>
  )
}
