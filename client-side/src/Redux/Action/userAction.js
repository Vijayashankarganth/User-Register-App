import axios from 'axios'

export const startUserRegister = (formData,redirect) =>{
        console.log(formData)
        axios.post(`http://localhost:3322/api/user/register`,formData,
        {
            headers:{'Content-Type' : 'multipart/form-data'
        }
        })
             .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.message)
                }
                else if (result.hasOwnProperty('keyValue')){
                    alert('Email Already Exists')
                }
                else{
                    alert('Successfully Registerd')
                    redirect()
                }
             })
             .catch((error)=>{
                alert(error)
             })
    
}




export const startUserLogin = (formData,redirect) => {

    console.log('loginAction',formData)
    axios.post(`http://localhost:3322/api/user/login`,formData)
            .then((response)=>{
            const result = response.data

            if(result.hasOwnProperty('error')){
                alert(result.error)
            }
            else{
                localStorage.setItem('token',result.token)
                redirect()
            }
         })
         .catch((error)=>{
            alert(error)
         })
}

export const startUserList = () => {
    return (dispatch) => {
        axios.get(`http://localhost:3322/api/user/details`,{
            headers:{
                'X-auth':localStorage.getItem('token')
            }
        })
            .then((response)=>{
                const result = response.data
                dispatch(userList(result))
            })
            .catch((error)=>{
                alert(error)
            })
    }
}

export const userList = (data) =>{
    return {
        type:"USER_LIST",
        payload:data
    }
}