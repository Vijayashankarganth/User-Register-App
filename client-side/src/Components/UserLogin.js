import React,{useState} from 'react'
import validator from 'validator'
import '../CSS/login.css'
import { startUserLogin} from '../Redux/Action/userAction'

const UserLogin = (props) => {
    const {logStatus} = props
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState({})
    const errors = {}
   
    const redirect = () => {
        props.history.push('/user')
        logStatus(true)
    }

    const validateForm = () =>{
        if(!validator.isEmail(login)){
            errors.email = 'Invalid Email Format'
        }
         if(validator.isEmpty(login)){
            errors.email=`Email cannot be Empty`
        }
         if (validator.isEmpty(password)){
            errors.password='passowrd cannot empty'
        }
    }

    const handleFormChange = (e) =>{
        if(e.target.name === 'userInput') {
            setLogin(e.target.value)
        }
        else if (e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validateForm()
        setError(errors)
        if(Object.keys(errors).length === 0){
            const formData = {
                email:login,
                password:password
            }
            startUserLogin(formData,redirect)
            setLogin('')
            setPassword('')
        }
       
    }

    return (
        <div className='login'>
            <form onSubmit = {handleSubmit}>
                <label>UserEmail</label><br/>
                <input type='email' placeholder='Enter Your Email' onChange={handleFormChange} name='userInput' value={login}  /><br/>
                {error.email && <span>{error.email}</span>}<br/>
                <label>Password</label><br/>
                <input type='password' placeholder='Enter Your Password' onChange={handleFormChange} name='password' value={password} /><br/>
                {error.password && <span>{error.password}</span>}<br/>
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default UserLogin