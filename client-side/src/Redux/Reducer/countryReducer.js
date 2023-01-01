
const countryReducer = (state=[],action) => {
    switch(action.type){
        case "COUNTRIES_LIST":{
            return [...action.payload]
        }
        default:{
            return [...state]
        }
    }
}

export default countryReducer