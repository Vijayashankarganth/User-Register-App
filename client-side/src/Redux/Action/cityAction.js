import axios from "axios";

export const startGetCities = (data,getCities) => {
    axios.get(`https://www.universal-tutorial.com/api/cities/${data}`,{
        headers:{
            "Authorization":localStorage.getItem('country-token') ,
            "Accept": "application/json"
        }
    })
        .then((response)=>{
            const result = response.data
            getCities(result)
        })
        .catch((error)=>{
            alert(error)
        })
}