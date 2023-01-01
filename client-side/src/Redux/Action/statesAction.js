import axios from "axios"
export const startGetStates=(data,getState)=>{
    axios.get(`https://www.universal-tutorial.com/api/states/${data}`,{
        headers:{
            "Authorization":localStorage.getItem('country-token'),
            "Accept": "application/json"
        }
    })
    .then((response)=>{
      const result = response.data
      getState(result)
    })
    .catch((error)=>{
       alert(error)
    })
}