import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
    <h1>About page opened</h1>
      <Link to = "/support">Support</Link><br />
      <Link to ="/">Home</Link>
    </>
  )
}
