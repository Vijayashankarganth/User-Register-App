const initialValue ={}

const userReducer = (state=initialValue,action) => {
    switch(action.type){
        case "ADD_USER":{
            return {...state,...action.payload}
        }
        case "USER_LIST":{
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }

}   

export default userReducer