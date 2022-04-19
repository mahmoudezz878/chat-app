import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/reducer/app'
import { RootState } from '../../redux/store';
import * as api from "../../api";

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.app.token);
  async function fetchUser(token: string){
      const response = await api.getUser(token)
      dispatch(setUser(response.data.user));
  }
  
  const localToken = token || localStorage.getItem("token") || ""
  useEffect(()=>{fetchUser(localToken)}, [])

  const user = useSelector((state: RootState) => state.app.user);
  console.log(user);
  return (
    <div>
       <h1>HomePage</h1> 
       <h4>{token || localStorage.getItem("token")}</h4>
       {/* {JSON.stringify(user)} */}
       <h6>{user?.name}</h6>
    </div>
  )
}

export default HomePage