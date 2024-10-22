import React from 'react'
import Header from '../Components/Header'
import SignupSigninComponent from '../Components/Signup_Signin'

function Signup() {
  return (
    <div>
      <Header/>
      <div className="wrapper">
        <SignupSigninComponent/>
      </div>
    </div>
  )
}

export default Signup