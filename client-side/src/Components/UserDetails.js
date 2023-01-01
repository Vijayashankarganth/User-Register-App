import React,{useEffect}  from "react";
import {useSelector,useDispatch} from 'react-redux'
import { startUserList } from "../Redux/Action/userAction";
const UserDetails = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startUserList())
    },[dispatch])

    const userDetails = useSelector((state) => {
            return state.user
    })
   
    return (
        <div>
            {Object.values(userDetails).length > 0 && (
                <>
                <h4>Welcome-User({userDetails.name}) !!!</h4>
                <p style={{fontSize:'25px'}}>Name:{userDetails.name}</p>
                <p style={{fontSize:'25px'}}>Email:{userDetails.email}</p>
                <p style={{fontSize:'25px'}}>Mobile:{userDetails.mobile}</p>
                <p style={{fontSize:'25px'}}>Country:{userDetails.country}</p>
                <p style={{fontSize:'25px'}}>State:{userDetails.state}</p>
                <p style={{fontSize:'25px'}}>City:{userDetails.city}</p>
                </>
              
            )}
               
                
            
        </div>
    )
}

export default UserDetails