import React from 'react'

let Not_Found = require("../Assets/Images/Not_found.png");
function NotFound() {
  return (
    <div className='container text-center'>
        <img style={{width:"400px" }} src={Not_Found} alt="" />
    </div>
  )
}

export default NotFound