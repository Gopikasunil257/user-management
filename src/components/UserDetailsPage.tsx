import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
      <div className="user-detail">
      <Link to="/" className="back-btn">
  </Link>

      <h1>{user.name}</h1>
      <h2>Basic Information</h2>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>

      <h2>Address</h2>
      <p>{user.address.street}</p>
      <p>{user.address.suite}</p>
      <p>{user.address.city}</p>
      <p>{user.address.zipcode}</p>

      <h2>Company</h2>
      <p>{user.company.name}</p>
      <p>{user.company.catchPhrase}</p>
      <p>{user.company.bs}</p>
    </div>
  );
}
export default UserDetailPage;