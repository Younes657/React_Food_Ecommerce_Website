import React from 'react'

let Access_Denied = require("../Assets/Images/accessDenied.jpg");
function AccessDenied() {
  return (
    <div className='container text-center'>
        <img style={{width:"400px" }} src={Access_Denied} alt="" />
    </div>
  )
}

export default AccessDenied