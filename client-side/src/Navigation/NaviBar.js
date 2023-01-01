import React,{useState} from "react";
import {Link,Route} from 'react-router-dom';
import UserLogin from "../Components/UserLogin";
import UserRegisterForm from "../Components/UserRegisterForm";
import UserDetails from "../Components/UserDetails";
import AdminLogin from "../Components/AdminLogin";
import AdminDashBoard from "../Components/AdminDashBoard";
import PrivateRouter from "./PrivateRouter";
import AdminRouter from "./AdminRouter";
import '../CSS/navibar.css'
import swal from 'sweetalert'

const NaviBar = (props) => {

    const [logChecker,setLogChecker] = useState(Boolean(localStorage.getItem('token' || 'admin-token')))

    const logStatus = (status) =>{
        setLogChecker(status)
    }

    const handleLogOut = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('admin-token')
        localStorage.removeItem('country-token')
        swal('successfully LogOut')
        logStatus(false)
        
    }
    return (
        <div >
        <div className="navigation">
            {logChecker || localStorage.getItem('admin-token') ? 
            (
                <div>
                    <Link to='/admin' onClick={handleLogOut} className="link">Logout</Link>
                </div>
            ):
            (
                <div>
                <Link to='/admin' className="link">Admin</Link>
                <Link to='/login' className="link">Login</Link>
                <Link to='/register' className="link">Register</Link>
                </div>

            )
            }
                        
        </div>

            <Route path='/login' render={(props)=>{
                 return  <UserLogin {...props} logStatus={logStatus} />
            }} />
            <Route path='/register' component={UserRegisterForm} exact={true} />
            <Route path='/admin' render={(props)=>{
                 return  <AdminLogin {...props} logStatus={logStatus} />
            }} />

            <PrivateRouter path='/user' component={UserDetails} exact={true} />
            <AdminRouter path='/adminDash' component={AdminDashBoard} exact={true} />
        </div>
    )
}

export default NaviBar