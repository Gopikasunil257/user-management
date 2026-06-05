import "../style/UserCard.css";
import type {User} from "../types/Data";
import { Link } from "react-router-dom";
interface UserCardProps{
    user:User;
}
function UserCard({user}:UserCardProps){
    return(
        <div className="user-card">
            <div className="avatar">
        {user.name.charAt(0)}
      </div>
        <h2>{user.name}</h2>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.website}</p>
        <p>{user.company.name}</p>
        <p>{user.address.city}</p>
        <Link to={`/users/${user.id}`}
          className="details-btn">
        View Details
       </Link>
        </div>
    );
}
export default UserCard;``