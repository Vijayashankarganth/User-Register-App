import React,{useState} from 'react'
import '../CSS/adminLogin.css'
import { StartAdminLogin } from '../Redux/Action/adminAction'
const AdminLogin = (props) => {
    const {logStatus} = props
    const [key,setKey] = useState('')

    const redirect = () =>{
        props.history.push('/adminDash')
        logStatus(true)
    }
    const handleFormChange = (e) =>{
        setKey(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = {
                key:key
        }
        StartAdminLogin(formData,redirect)
    }
    return (
        <div className='adminLogin'>
            <form onSubmit={handleFormSubmit}>
                <label>Admin Key</label><br/>
                <input type='password' placeholder='Enter Admin Key' value={key} onChange={handleFormChange}  /> <br/>
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default AdminLogin