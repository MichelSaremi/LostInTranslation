import './App.css';
import LoginView from "./views/LoginView";
import TranslationView from "./views/TranslationView";
import ProfileView from "./views/ProfileView";
import NotFound from './views/NotFound';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>    
          <Route path="/" element={<LoginView />}/>
          <Route path="/translation/:username/:userId" element={<TranslationView />}/>
          <Route path="/profile/:username/:userId" element={<ProfileView/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
