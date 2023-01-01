import React,{useRef,useState,useEffect} from "react";
import {useSelector,useDispatch} from 'react-redux'
import { StartAdminUserList,startAdminUserDelete} from "../Redux/Action/adminAction";
import UserRegisterForm from "./UserRegisterForm";
import {useReactToPrint} from "react-to-print";
import {Popconfirm,Modal} from 'antd'

import '../CSS/adminDash.css'

const AdminDashBoard = (props) => {
    const dispatch = useDispatch()
    const [editData,setEditData] = useState('')
    const [toggleEdit,setToggleEdit] = useState(false)
    useEffect(()=>{
        dispatch(StartAdminUserList())
    },[dispatch])

    const handleToggle=()=>{
        setToggleEdit(!toggleEdit)
    }
    const userList = useSelector((state)=>{
        return state.userList
    })
    
    const handleDelete = (id) => {
        
        dispatch(startAdminUserDelete(id))
    }

    const handleEdit = (user) => {
       setEditData(user)
       handleToggle()
    }

    const  componentRef=useRef();
    const handlePrint=useReactToPrint({
        content : ()=> componentRef.current,
        documentTitle:'table',
        onAfterPrint:()=> alert('success')
    })
    return (
        <div>
         {toggleEdit &&  
          <div>
             <Modal open={toggleEdit} okButtonProps={{disabled:true}} cancelButtonProps={{disabled:true}} width={1000}  >
             <UserRegisterForm {...editData} status='update' handleToggle={handleToggle} />
             </Modal>
          </div>
         }
            
            <button  className="print" onClick={handlePrint}>Print</button>
            <div  ref={componentRef}> 
            <h3>Welcome Admin !!!</h3>
            <table   className="table table-hover">
                <thead>
                    <tr>
                        <th>s.no</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {userList.map((ele,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.mobile}</td>
                                    <td>{ele.email}</td>
                                    <td><img src={`http://localhost:3322/${ele.file}`} height='75' alt="data"/></td>
                                    <td>
                                        <Popconfirm
                                             title="Sure to Edit?" 
                                            onConfirm={() => handleEdit(ele)}>
                                        <button className="btn btn-info">
                                        Edit </button>
                                        </Popconfirm>
                                        <Popconfirm
                                            title="Sure to Edit?" 
                                            onConfirm={() => handleDelete(ele._id)}>
                                        <button className="btn btn-danger">Delete</button>
                                        </Popconfirm>
                                    </td>
                                    
                                </tr>
                            )
                    })}
                </tbody>
            </table>
         </div>         
        </div>
    )
}

export default AdminDashBoard


                        