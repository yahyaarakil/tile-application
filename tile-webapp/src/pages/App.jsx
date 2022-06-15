import LoginPage from './LoginPage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { MainPage } from './MainPage';
import { RecipePage } from './RecipePage/RecipePage';
import { ManageUsers } from './ManageUsers';
import { ManageMaterials } from './ManageMaterials';
import ApprovedRecipes from './ApprovedRecipes'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/createrecipe" element={<RecipePage />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/managematerials" element={<ManageMaterials />} />
        <Route path="/approvedrecipes" element={<ApprovedRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
