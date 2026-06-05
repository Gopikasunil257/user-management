import { useState } from "react";
import UserCard from "../components/UserCard";
import { useUser } from "../hooks/UseUser";
import SearchBar from "../components/SearchBar";
import "../style/UsersPage.css";
function UsersPage() {
  const { user, loading,error } = useUser();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [company]
  const [currentPage, setCurrentPage] = useState(1);
  const filteredUser = user.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.username
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  const sortedUsers = [...filteredUser];
  if (sortBy === "name-asc") {
    sortedUsers.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
  if (sortBy === "name-desc") {
    sortedUsers.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }
  if (sortBy === "username-asc") {
    sortedUsers.sort((a, b) =>
      a.username.localeCompare(b.username)
    );
  }
  if (sortBy === "username-desc") {
    sortedUsers.sort((a, b) =>
      b.username.localeCompare(a.username)
    );
  }
  if (sortBy === "email-asc") {
    sortedUsers.sort((a, b) =>
      a.email.localeCompare(b.email)
    );
  }
  if (sortBy === "email-desc") {
    sortedUsers.sort((a, b) =>
      b.email.localeCompare(a.email)
    );
  }
  const usersPerPage = 5;
  const lastUserIndex =currentPage * usersPerPage;
  const firstUserIndex =lastUserIndex - usersPerPage;
  const currentUsers = sortedUsers.slice(
    firstUserIndex,
    lastUserIndex
  );
  const totalPages = Math.ceil(
    sortedUsers.length / usersPerPage
  );
  if (error) {
  return <h1>{error}</h1>;
}
  if (loading) {
  return (
    <div className="loading">
      Loading Users...
    </div>
  );
}
  return (
    
    <div className="dashboard">
      <h1>User Dashboard</h1>

      <div className="controls">
        <SearchBar
  search={search}
  setSearch={(value) => {
    setSearch(value);
    setCurrentPage(1);
  }}
/>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="">Sort By</option>

          <option value="name-asc">
            Name (A-Z)
          </option>

          <option value="name-desc">
            Name (Z-A)
          </option>

          <option value="username-asc">
            Username (A-Z)
          </option>

          <option value="username-desc">
            Username (Z-A)
          </option>

          <option value="email-asc">
            Email (A-Z)
          </option>

          <option value="email-desc">
            Email (Z-A)
          </option>
        </select>
      </div>

      {filteredUser.length === 0 ? (
        <h2>No users found</h2>
      ) : (
        <>
          <div className="user-grid">
            {currentUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
              />
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() =>
                setCurrentPage(
                  (prev) => prev - 1
                )
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="page-info">
              Page {currentPage} of{" "}
              {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage(
                  (prev) => prev + 1
                )
              }
              disabled={
                currentPage === totalPages
              }
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default UsersPage;