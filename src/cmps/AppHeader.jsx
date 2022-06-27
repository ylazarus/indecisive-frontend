import React from "react"
import { NavLink } from "react-router-dom"

export function AppHeader() {
  return (
    <header className="app-header flex justify-center">
      <nav className="header-nav flex align-center space-around">
          {/* <h3>App Logo</h3> */}
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/search">
          Search
        </NavLink>
        <NavLink to="/login">
          Login
        </NavLink>
        <NavLink to="/about">
          About
        </NavLink>
      </nav>
    </header>
  )
}
