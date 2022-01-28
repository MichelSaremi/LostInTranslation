import logo from './logo.svg';
import './App.css';
import LoginView from "./views/LoginView";
import TranslationView from "./views/TranslationView";
import ProfileView from "./views/ProfileViev";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />}/>
        <Route path="/translation" element={<TranslationView/>}/>
        <Route path="/profile" element={<ProfileView/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
