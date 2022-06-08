import React from 'react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <section className='card-display'>

    <h1 className='home-title'>Welcome to Indecisive!</h1>
    <p>If you can't decide what to make for dinner, this site is for you!</p>
    <p>Choose from a couple of options and we will tell you what to cook, it's that simple.</p>
    <br />
    <Link to='/search' className='myButton'>Let's Get Started!</Link>
    </section>
  )
}
