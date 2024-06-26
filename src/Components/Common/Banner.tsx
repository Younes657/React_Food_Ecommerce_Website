import React, { useState } from 'react'
import "./banner.css"
import { useDispatch } from 'react-redux'
import { setSearchItem } from '../../Storage/Redux/Slice/MenuItemSlice';
function Banner() {

    const [searchVal , setSearchVal] = useState("")
    const dispatch = useDispatch();

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
       dispatch(setSearchItem(e.target.value))
       setSearchVal(e.target.value)
    }
  return (
    <div className="custom-banner">
      <div
        className="m-auto d-flex align-items-center"
        style={{
          width: "400px",
          height: "50vh",
        }}
      >
        <div className="d-flex align-items-center" style={{ width: "100%" }}>
          <input
            type={"text"}
            className="form-control rounded-pill"
            style={{
              width: "100%",
              padding: "20px 20px",
            }}
            placeholder="Search for Food Items!"
            value = {searchVal}
            onChange={handleSearch}
          />
          <span style={{ position: "relative", left: "-43px" }}>
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Banner