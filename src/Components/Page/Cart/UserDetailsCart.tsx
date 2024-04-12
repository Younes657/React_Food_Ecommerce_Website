import React, { useState } from 'react'
import { inputHelper } from '../../../Helper';
type Props ={
  grandTotal:number,
  totalItems:number
}
function UserDetailsCart(props:Props) {

  const initialUserData = {
    name:'',
    email:'',
    phoneNumber:'',
  }
  const [userInput , setUserInput] = useState(initialUserData);
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
      let tempData =  inputHelper(e , userInput)
      setUserInput(tempData)
  }
  return (
    <form className="col-10 mx-auto">
    <div className="form-group mt-3">
      Pickup Name
      <input
        type="text"
        value= {userInput.name}
        onChange={handleUserInput}
        className="form-control"
        placeholder="name..."
        name="name"
        required
      />
    </div>
    <div className="form-group mt-3">
      Pickup Email
      <input
        type="email"
        value= {userInput.email}
        onChange={handleUserInput}
        className="form-control"
        placeholder="email..."
        name="email"
        required
      />
    </div>

    <div className="form-group mt-3">
      Pickup Phone Number
      <input
        type="number"
        value= {userInput.phoneNumber}
        onChange={handleUserInput}
        className="form-control"
        placeholder="phone number..."
        name="phoneNumber"
        required
      />
    </div>
    <div className="form-group mt-3">
      <div className="card p-3" style={{ background: "ghostwhite" }}>
        <h5>Grand Total : ${props.grandTotal.toFixed(2) }</h5>
        <h5>No of items : {props.totalItems}</h5>
      </div>
    </div>
    <button
      type="submit"
      className="btn btn-lg btn-success form-control mt-3"
    >
      Looks Good? Place Order!
    </button>
  </form>
  )
}

export default UserDetailsCart