import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import '../CSS/registerForm.css'
import validator from 'validator'
import { startUserRegister } from '../Redux/Action/userAction'
import { startGetCountries,startCountriesList } from '../Redux/Action/countryAction'
import { startUpdateUser } from '../Redux/Action/adminAction'
import { startGetStates } from '../Redux/Action/statesAction'
import { startGetCities } from '../Redux/Action/cityAction'
import '../CSS/registerForm.css'
const UserRegisterForm = (props) =>{
    const {_id,name:Name,email:Email,mobile:Mobile,country:Country,state:State,city:City,description:Description,status,handleToggle}=props
  
    const [name,setName] = useState(Name || '')
    const [email,setEmail] = useState(Email || '')
    const [mobile,setMobile] = useState(Mobile || '')
    const [country,setCountry] = useState(Country || '')
    const [state,setState] = useState(State || '')
    const [city,setCity] = useState(City || '')
    const [password,setPassword] = useState('')
    const [stateList,setStateList] = useState([])
    const [cityList,setCityList] = useState([])
    const [description,setDescription] = useState(Description || '')
    const [file,setFile] = useState('')
    const [error,setError] = useState({})
    const errors = {}
    const dispatch = useDispatch()
    
    useEffect(()=>{
        startGetCountries()
        dispatch(startCountriesList())
    },[dispatch])
    
    useEffect(()=>{
        const getState = (states) =>{
            setStateList(states)
        }
        if(country){
            startGetStates(country,getState)  
        }
    },[country])
    useEffect(()=>{
        const getCities = (cities) => {
            setCityList(cities)
        }
        if(state){
            startGetCities(state,getCities)
        }
    },[state])
    const redirect = () =>{
        props.history.push('/login')
    }

    const countries = useSelector((state)=>{
        return state.country
    })

    
    
    
   
    const validateForm = () => {
        if(validator.isEmpty(name)){
            errors.name='Name Cannot Be Empty'
        }
        if(!validator.isEmail(email)){
            errors.email='Invalid Email Format'
        }   
        if(validator.isEmpty(email)){
            errors.email = 'Email Cannot Be Empty'
        }
        if(validator.isEmpty(mobile)){
            errors.mobile = 'Mobile Number Cannot Be Empty'
        }
        if(validator.isEmpty(country)){
            errors.country = 'Country Cannot Be Empty'
        }
        if(validator.isEmpty(state)){
            errors.state = 'State Cannot Be Empty'
        }
        if(validator.isEmpty(city)){
            errors.city = 'City Cannot Be Empty'
        }
        if(validator.isEmpty(password) && !status){
            errors.password = 'Password Cannot Be Empty'
        }
        if(validator.isEmpty(description)){
            errors.description = 'Description Cannot Be Empty'
        }
        if(file === '' && !status){
            errors.file='File Cannot be Empty'
        }
    }
    const handleFormChange = (e) =>{
        if(e.target.name === 'name'){
            setName(e.target.value)
        }
        else if (e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if (e.target.name === 'mobile'){
            setMobile(e.target.value)
        }
        else if (e.target.name === 'country'){
            setCountry(e.target.value)   
            
        }
        else if (e.target.name === 'state'){
            setState(e.target.value)
            
        }
        else if (e.target.name === 'description'){
            setDescription(e.target.value)
        }
        else if (e.target.name === 'city'){
            setCity(e.target.value)
        }
        else if (e.target.name === 'password'){
            setPassword(e.target.value)
        }
        else if(e.target.name === 'file'){
            setFile(e.target.files[0])
        }
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        validateForm()
        setError(errors)
     
        if(Object.keys(errors).length === 0 && !status){
            const formData={
                name:name,
                mobile:mobile,
                country:country,
                state:state,
                city:city,
                description:description,
                email:email,
                password:password,
                file:file
            }
          
            startUserRegister(formData,redirect)
            setName('')
            setMobile('')
            setCountry('')
            setState('')
            setCity('')
            setEmail('')
            setPassword('')
    
        }
        else if(Object.keys(errors).length === 0 && status){
            const formData={
                name:name,
                mobile:mobile,
                country:country,
                state:state,
                city:city,
                description:description,
                email:email,
            }
            dispatch(startUpdateUser(_id,formData))
            handleToggle()
        }
       
    }
    
    return (
        <div className='register'>
            <form onSubmit={handleFormSubmit}>
               
                <input type='text' placeholder='Enter Your Name' value={name} name='name' onChange={handleFormChange}/><br/>
                {error.name && <span>{error.name}</span>}<br/>
                
                <input type='text' placeholder='Enter Your Mobile Number' value={mobile} name='mobile' onChange={handleFormChange}/><br/>
                {error.mobile && <span>{error.mobile}</span>}<br/>

                <input type='email' placeholder='Enter Your Email' value={email} name='email' onChange={handleFormChange} /><br/>
                {error.email && <span>{error.email}</span>}<br/>

                {!status &&
                <>
                <input type='password' placeholder='Enter Your Password' value={password} name='password' onChange={handleFormChange} /> <br/>
                {error.password && <span>{error.password}</span>}<br/>
                </>}
                
                <select name='country' onChange={handleFormChange} value={country}>
                    <option>Choose Your Country</option>
                    {countries.map((ele,i)=>{
                        return <option value={ele.country_name} key={i}>{ele.country_name}</option>
                    })}
               </select><br/>
                {error.country && <span>{error.country}</span>}<br/>
                
                <select name='state' onChange={handleFormChange} value={state}>
                    <option  >Choose Your State</option>
                    {stateList.map((ele,i)=>{
                        return <option value={ele.state_name} key={i}>{ele.state_name}</option>
                    })}
                </select><br/>
                {error.state && <span>{error.state}</span>}<br/>
               
                <select name='city' onChange={handleFormChange} value={city}>
                    <option>Choose Your City</option>
                    {cityList.map((ele,i)=>{
                        return <option value={ele.city_name} key={i}>{ele.city_name}</option>
                    })}
                </select><br/>
                {error.city && <span>{error.city}</span>}<br/>
               
                <textarea value={description} placeholder='About YourSelf' onChange={handleFormChange} name='description'/><br/>
                {error.description && <span>{error.description}</span>}<br/>
               
                {!status &&
                <>
                <input type='file' name='file' onChange={handleFormChange} /><br/>
                {error.file && <span>{error.file}</span>}<br/>
                </>}
                <input type='submit' value={status ? 'Update' : 'Register'} />
            </form>
            {status && <button onClick={handleToggle} className='btn btn-danger'>Cancel</button>}
        </div>
    )
}

export default UserRegisterForm
                
                
              
                
              