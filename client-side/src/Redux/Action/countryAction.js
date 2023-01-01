import axios from 'axios'

export const startGetCountries = () => {
    axios.get(`https://www.universal-tutorial.com/api/getaccesstoken`,{
        headers:{
        "Accept": "application/json",
        "api-token": " Epg9CasLLvll8ykkD-5yNZLM7XoXJxbVUcWy3c9t4jhTUedyuQ1uwF3VwGr_95RJtpE",
        "user-email": "visaikant@gmail.com"
        }
    })
        .then((response)=>{
            const result = response.data
            localStorage.setItem('country-token',`Bearer ${result.auth_token}`)
        })
        .catch((error)=>{
            alert(error)
        })

}

export const startCountriesList = () => {
    return(dispatch)=>{
        axios.get(`https://www.universal-tutorial.com/api/countries`,{
        headers:{
            "Authorization":localStorage.getItem('country-token') ,
            "Accept": "application/json"
        }
    })   
        .then((response)=>{
            const result = response.data
            dispatch(countriesList(result))
        }) 
        .catch((error)=>{
            alert(error)
        })
    }
}

export  const countriesList = (data) =>{
    return {
        type:"COUNTRIES_LIST",
        payload:data
    }
}


