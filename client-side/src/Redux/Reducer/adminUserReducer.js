
const adminUserReducer = (state=[],action) =>{
    switch(action.type){
        case "ADMIN_USER_LIST" :{
            return [...action.payload]
        }
        case "USER_DELETE":{
          return state.filter((ele)=>{
               return ele._id !== action.payload._id
            })
         }
         case "UPDATE_USER":{
            return state.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele,...action.payload}
                }
                else{
                    return {...ele}
                }
             })
         }
     default:{
         return [...state]
     }
 }
}

export default adminUserReducer
                    
                