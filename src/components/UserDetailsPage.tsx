import {useParams, Link,} from "react-router-dom";
import { useUser}  from "../hooks/UseUser";
import "../style/UserDetailPage.css";
function UserDetailPage() {
  const { id } = useParams();
  const { user:users, loading } = useUser();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  const user = users.find(
    (user) => user.id === Number(id)
  );
  if (!user) {
    return <h1>User Not Found</h1>;
  }
  return (
  <div className="user-details">
  <div className="profile-header">
    <div className="profile-avatar">
      {user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)}
    </div>
    <h1>{user.name}</h1>
    <p>{user.username}</p>
  </div>
  <div className="details-grid">
    <div className="detail-card">
      <h2>📧 Contact Info</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
    </div>
    <div className="detail-card">
      <h2>📍 Address</h2>
      <p>{user.address.street}</p>
      <p>{user.address.suite}</p>
      <p>{user.address.city}</p>
      <p>{user.address.zipcode}</p>
    </div>
    <div className="detail-card">
      <h2>🏢 Company</h2>
      <p>{user.company.name}</p>
      <p>{user.company.catchPhrase}</p>
      <p>{user.company.bs}</p>
    </div>
<Link to="/" className="back-btn">
 ← Back to Users
</Link>
  </div>
</div>
  );
}
export default UserDetailPage;