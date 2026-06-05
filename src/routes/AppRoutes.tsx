import {Routes,Route} from "react-router-dom";
import UserPage from "../pages/UsersPage";
import UserDetailsPage from "../components/UserDetailsPage";
function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<UserPage/>}/>
            <Route
        path="/users/:id"
        element={<UserDetailsPage />}
      />
        </Routes>
    );
}
export default AppRoutes;