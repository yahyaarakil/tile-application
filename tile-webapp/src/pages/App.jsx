import LoginPage from './LoginPage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { MainPage } from './MainPage';
import { RecipePage } from './RecipePage';
import { GlazeItem } from './GlazeItem';
import PaintItem from './PaintItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/createrecipe" element={<RecipePage />} />
        <Route path="/test" element={<PaintItem />} />
      </Routes>
    </Router>
  );
}

export default App;
