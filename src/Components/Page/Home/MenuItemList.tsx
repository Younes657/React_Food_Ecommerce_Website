import React from 'react'
import { useEffect, useState } from 'react';
import { MenuItemModel } from '../../../Interfaces';
import MenuItemCart from './MenuItemCart';
function MenuItemList() {
    const [menuItems , setMenuItems] = useState<MenuItemModel[]>(() => [])
  useEffect(() =>{
    fetch("https://localhost:7034/api/MenuItem").then((response) =>{
      console.log(response)
      return response.json()
    }).then((data) => {
      console.log(data)
      setMenuItems(data.result)
    })
  }, [])


  return (
    <div className='container row'>
        {
            menuItems.length > 0 && menuItems.map((menu , index) => (
                <MenuItemCart key={index} menuItem={menu} />
            ) )
        }
    </div>
  )
}

export default MenuItemList