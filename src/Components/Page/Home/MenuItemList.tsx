import React from 'react'
import { useEffect } from 'react';
import { MenuItemModel } from '../../../Interfaces';
import MenuItemCart from './MenuItemCart';
import { useGetAllMenuItemsQuery } from '../../../Api/MenuItemApi';
import {useDispatch } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/Slice/MenuItemSlice';
import { MainLoader } from '../../Common';
function MenuItemList() {
    //const [menuItems , setMenuItems] = useState<MenuItemModel[]>(() => [])
    const dispatch = useDispatch();
    const { data, isLoading } = useGetAllMenuItemsQuery(null);
  
    useEffect(()=>{
      if(!isLoading){
        dispatch(setMenuItem(data.result))
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]) //we add the dispatch and data.result because of the warning 
    //warning : React Hook useEffect has missing dependencies: 'data.result' and 'dispatch'. Either include 
    //them or remove the dependency array.
    if(isLoading){
      return <MainLoader></MainLoader>
    }
  // useEffect(() =>{
  //   fetch("https://localhost:7034/api/MenuItem").then((response) =>{
  //     console.log(response)
  //     return response.json()
  //   }).then((data) => {
  //     console.log(data)
  //     setMenuItems(data.result)
  //   })
  // }, [])
  return (
    <div className='container row'>
        {
            data.result.length > 0 && data.result.map((menu:MenuItemModel , index:number) => (
                <MenuItemCart key={index} menuItem={menu} />
            ) )
        }
    </div>
  )
}

export default MenuItemList