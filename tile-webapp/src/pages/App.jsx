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
import ApprovedRecipes from './ApprovedRecipes';
import UnapprovedRecipes from './UnapprovedRecipes';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/createrecipe" element={<RecipePage />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/managematerials" element={<ManageMaterials />} />
        <Route path="/approvedrecipes" element={<ApprovedRecipes />} />
        <Route path="/unapprovedrecipes" element={<UnapprovedRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
