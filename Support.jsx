import React from 'react';
import { Link } from 'react-router-dom'

export default function Support() {
  return (
    <>
      <h1>Support page opened</h1>
        <Link to="/">Home</Link><br />
        <Link to="/about">About</Link>
    </>
  )
}
