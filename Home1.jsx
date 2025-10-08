//import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
        <h1>Home page opened</h1>
        <Link to="/about" title="about">
          About
        </Link><br />
        <Link to ="/support">Support</Link>
    </>
  )
}