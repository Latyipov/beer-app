
import React from 'react'
import { Link } from 'react-router-dom'

export function NotFoundPage () {
  return (
    <div>
      This page doesn&apos;t exist. Go <Link to='/'> main page</Link>
    </div>)
}
