import { useState } from "react";
import UserCard from "../components/UserCard";
import { useUser } from "../hooks/UseUser";
import SearchBar from "../components/SearchBar";
import "../style/UsersPage.css";
function UsersPage() {
  const { user, loading,error } = useUser();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [companyFilter,setCompanyFilter]=useState("");
  const[cityFilter,setCityFilter]=useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] =useState(false);
  const [activeStat, setActiveStat] = useState("");
  const[darkMode,setDarkMode]=useState(localStorage.getItem("theme")=="dark");
  const companies=[
    ...new Set(user.map((u)=>u.company.name)
    ),
  ];
const cities=[ ...new Set(user.map((u)=> u.address.city)),];
const filteredUser = user.filter((user) => {
  const matchesSearch =user.name.toLowerCase().includes(search.toLowerCase()) ||user.username.toLowerCase().includes(search.toLowerCase()) ||
  user.email.toLowerCase().includes(search.toLowerCase());
  const matchesCompany =companyFilter === "" ||user.company.name === companyFilter;
const matchesCity =cityFilter === "" ||user.address.city === cityFilter;
const matchesFavorite =!showFavorites ||favorites.includes(user.id);
  return (
    matchesSearch &&
    matchesCompany &&
    matchesCity&& matchesFavorite
  );
});
const uniqueCities = new Set(filteredUser.map((user) => user.address.city)).size;
const uniqueCompanies = new Set(filteredUser.map((user) => user.company.name)).size;
const sortedUsers = [...filteredUser];
  if (sortBy === "name-asc") {
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name)
    );
  }
  if (sortBy === "name-desc") {
    sortedUsers.sort((a, b) =>b.name.localeCompare(a.name)
    );
  }
  if (sortBy === "username-asc") {
    sortedUsers.sort((a, b) =>a.username.localeCompare(b.username)
    );
  }
  if (sortBy === "username-desc") {
    sortedUsers.sort((a, b) =>b.username.localeCompare(a.username)
    );
  }
  if (sortBy === "email-asc") {
    sortedUsers.sort((a, b) => a.email.localeCompare(b.email)
    );
  }
  if (sortBy === "email-desc") {
    sortedUsers.sort((a, b) => b.email.localeCompare(a.email)
    );
  }
  const usersPerPage = 5;
  const lastUserIndex =currentPage * usersPerPage;
  const firstUserIndex =lastUserIndex - usersPerPage;
  const currentUsers = sortedUsers.slice(firstUserIndex,lastUserIndex);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
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
const toggleTheme = () => {
  const newTheme = !darkMode;
setDarkMode(newTheme);

  localStorage.setItem( "theme",newTheme ? "dark" : "light" );
};
const toggleFavorite = (userId: number) => {
  setFavorites((prev) =>prev.includes(userId)? prev.filter((id) => id !== userId): [...prev, userId]);
};
const exportToCSV = () => {
  const headers = ["Name","Username","Email","Phone","Website","Company","City",];
  const rows = filteredUser.map((user) => [ user.name,user.username, user.email,user.phone,user.website,user.company.name,user.address.city,]);
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");
  const blob = new Blob(
    [csvContent],
    { type: "text/csv;charset=utf-8;" }
  );
  const url =window.URL.createObjectURL(blob);
  const link =document.createElement("a");
  link.href = url;
  link.download = "users.csv";
  link.click();
  window.URL.revokeObjectURL(url);
};
  return (    
  <div className={darkMode ? "dashboard dark" : "dashboard light"}>
     <div className="dashboard-shell"></div>
 <div className="top-bar">
  <div className="dashboard-title">
    <div className="profile-icon">👤</div>
    <h1>User Dashboard</h1>
  </div>

  <details className="stats-dropdown">
    <summary>Dashboard Stats ▾</summary>

  <div className="stats-content">
  <button
    className="stat-item"
  onClick={() => {
    setShowFavorites(true);setActiveStat("favorites");
}}
  >
    ❤️ Favorites: {favorites.length}
  </button>

  <button
    className="stat-item"
    onClick={() => setActiveStat("users")}
  >
    👥 Users: {filteredUser.length}
  </button>

  <button
    className="stat-item"
    onClick={() => setActiveStat("companies")}
  >
    🏢 Companies: {uniqueCompanies}
  </button>

  <button
    className="stat-item"
    onClick={() => setActiveStat("cities")}
  >
    📍 Cities: {uniqueCities}
  </button>
</div>
  </details>
</div>
  <button
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {darkMode
        ? "☀️ Light Mode"
        : "🌙 Dark Mode"}
    </button>
 <div className="controls">
<button
  className="stat-item"
  onClick={() => {
    setShowFavorites(true);
    setCurrentPage(1);
  }}
>
  ❤️ Favorites: {favorites.length}
</button>
  <button
    className="export-btn"
    onClick={exportToCSV}
  >
    Export CSV
  </button>

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
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="">Sort By</option>
    <option value="name-asc">Name (A-Z)</option>
    <option value="name-desc">Name (Z-A)</option>
    <option value="username-asc">Username (A-Z)</option>
    <option value="username-desc">Username (Z-A)</option>
    <option value="email-asc">Email (A-Z)</option>
    <option value="email-desc">Email (Z-A)</option>
  </select>

 <select
  className="sort-select"
  value={companyFilter}
  onChange={(e) => {
    setCompanyFilter(e.target.value);
    setCurrentPage(1);
  }}
>
  <option value="">All Companies</option>

  {companies.map((company) => (
    <option key={company} value={company}>
      {company}
    </option>
  ))}
</select>

<select
  className="sort-select"
  value={cityFilter}
  onChange={(e) => {
    setCityFilter(e.target.value);
    setCurrentPage(1);
  }}
>
  <option value="">All Cities</option>
  {cities.map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}
</select>
</div>
{filteredUser.length === 0 ? (
        <h2>No users found</h2>
      ) : (
       
       <>
  {showFavorites && (
  <div className="favorites-header">
    <h2>Favorite Users</h2>

    <button
      className="back-home-btn"
      onClick={() => {
        setShowFavorites(false);
        setCurrentPage(1);
      }}
    >
      🏠 Back to All Users
    </button>
  </div>
)}
<div className="user-grid">
{currentUsers.map((user) => (
                <UserCard
                key={user.id}
                user={user}
                isFavorite={favorites.includes(user.id)}
  onToggleFavorite={toggleFavorite}
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