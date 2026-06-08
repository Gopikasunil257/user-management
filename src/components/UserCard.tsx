import "../style/UserCard.css";
import type { User } from "../types/Data";
import { Link } from "react-router-dom";
interface UserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}
function UserCard({
  user,
  isFavorite,
  onToggleFavorite,
}: UserCardProps) {
  return (
    <div className="user-card">
      <button
        className="favorite-btn"
        onClick={() => onToggleFavorite(user.id)}
      >
        {isFavorite ? "⭐" : "☆"}
      </button>

      <div className="avatar">
        {user.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)}
      </div>
      <h2>{user.name}</h2>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.company.name}</p>
      <p>{user.address.city}</p>
      <Link
        to={`/users/${user.id}`}
        className="details-btn"
      >
        View Details
      </Link>
    </div>
  );
}

export default UserCard;