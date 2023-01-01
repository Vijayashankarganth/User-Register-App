import {Route,Redirect} from 'react-router-dom'


const AdminRouter = ({component:Component,...rest}) => {
    return(
            <Route {...rest}  render={(props) => {
                return (localStorage.getItem('admin-token') ? 
                        <Component {...props} /> :
                        <Redirect to={{pathname:'/admin'}} />
                       )
            }} />
      
    )
}

export default AdminRouter