
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';


export function NotFoundPage() {

  return (
    <div>
      This page doesn't exist. Go <Link to='/'> main page</Link> 
    </div>)
    
}