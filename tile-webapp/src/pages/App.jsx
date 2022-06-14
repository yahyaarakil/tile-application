import LoginPage from './LoginPage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { MainPage } from './MainPage';
import { RecipePage } from './RecipePage';
import { ManageUsers } from './ManageUsers';
import { ManageMaterials } from './ManageMaterials';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/createrecipe" element={<RecipePage />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/managematerials" element={<ManageMaterials />} />
      </Routes>
    </Router>
  );
}

export default App;
