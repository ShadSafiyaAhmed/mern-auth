import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo : localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
}

const AdminAuthSlice = createSlice({
    name:'adminAuth', 
    initialState,
    reducers:{
        adminSetCredentials:(state,action)=>{
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        adminLogout : (state,action)=>{
            state.adminInfo = null;
            localStorage.removeItem('adminInfo')
        }
    }
})

export  const  {adminSetCredentials,adminLogout} = AdminAuthSlice.actions

export default AdminAuthSlice.reducer