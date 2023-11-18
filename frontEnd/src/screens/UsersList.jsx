import React from "react";
import axios from "axios";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import TableComponent from "../components/TableComponent";


const UsersList = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/usersList ");
        toast.success(response.data.message);
        setUser(response.data.users);
        setLoading(false); 
      } catch (error) {
        toast.error(error);
        console.error("Error fetching users:", error);
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>USER DATA</h1>
      {loading ? <Loader/> : null}
      <TableComponent users={user} />
    </div>
  );
};

export default UsersList;