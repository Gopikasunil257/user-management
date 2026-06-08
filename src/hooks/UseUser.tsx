import { useEffect,useState } from "react";
import { getUsers } from "../api/UserApi";
import type {User} from "../types/Data";
export const useUser =()=>{
    const[user,setUser]=useState<User[]>([]);
    const [loading,setLoading]=useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUser(data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
    },[]);
    return{user,loading,error};
};