import { apiSlice } from "./apislice"; 

const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        adminLogin : builder.mutation({
            query:(data)=>({
                url : `${ADMIN_URL}/auth`,
                method : 'POST',
                body : data
            })
        }),
        adminRegister : builder.mutation({
            query:(data)=>({
                url : `${ADMIN_URL}`,
                method : 'POST',
                body : data
            })
        }),
        adminLogout : builder.mutation({
            query : ()=>({
                url : `${ADMIN_URL}/logout`,
                method : 'POST'
            })
        }),
        adminUpdateUser : builder.mutation({
            query:(data)=>({
                url : `${ADMIN_URL}/profile`,
                method : 'PUT',
                body : data
            })
        }),
        updateUserByAdmin: builder.mutation({
            
            query: (data) => ({
                url: `${ADMIN_URL}/update-user`,
                method: 'PUT',
                body: data
            })

        }),
        deleteUser: builder.mutation({
            
            query: (data) => ({
                url: `${ADMIN_URL}/delete-user`,
                method: 'POST',
                body: data
            })

        }),

    })
})

export const  {
    useAdminLoginMutation,
    useAdminLogoutMutation,
    useAdminRegisterMutation,
    useAdminUpdateUserMutation,
    useUpdateUserByAdminMutation,
    useDeleteUserMutation
} = adminApiSlice