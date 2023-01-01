import axios from 'axios'

export const StartAdminLogin = (data,redirect) =>{
    axios.post(`http://localhost:3322/api/admin/login`,data)
         .then((response)=>{
         
            const result = response.data
            if(result.hasOwnProperty('error')){
                alert(result.error)
            }
            else{
                localStorage.setItem('admin-token',result)
                redirect()
            }
            
         })
         .catch((error)=>{
            alert(error)
         })
}   


export const StartAdminUserList = () =>{
    return(dispatch)=>{
        axios.get(`http://localhost:3322/api/admin/show`,{
                    headers:{
                        'X-Auth':localStorage.getItem('admin-token')
                    }
                })
                     .then((response)=>{
                        dispatch(adminUserList(response.data))
                     })
                     .catch((error)=>{
                        alert(error)
                     })
    }
}

export const adminUserList = (data) =>{
    return {
        type:"ADMIN_USER_LIST",
        payload:data
    }
}


export const startAdminUserDelete = (id) =>{
    return(dispatch) =>{
        axios.delete(`http://localhost:3322/api/admin/user/${id}`,{
            headers:{
                'X-Auth':localStorage.getItem('admin-token')
            }
        })
            .then((response)=>{
                const result = response.data
                dispatch(userDelete(result))
            })
            .catch((error)=>{
                alert(error)
            })
    }
}

export const userDelete = (data) =>{
    return {
        type:"USER_DELETE",
        payload:data
    }
}

export const startUpdateUser=(id,data)=>{

    return(dispatch)=>{
        axios.put(`http://localhost:3322/api/admin/update/${id}`,data,{
            headers:{
                'X-Auth':localStorage.getItem('admin-token')
            }
        })
            .then((response)=>{
                const result = response.data
                dispatch(updateUser(result))
            })
            .catch((error)=>{
                alert(error)
            })
    }
}

export const  updateUser = (data) =>{
    return {
        type:"UPDATE_USER",
        payload:data
    }
}