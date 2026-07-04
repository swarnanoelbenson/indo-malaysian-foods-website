import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar      from './components/common/Navbar';
import Footer      from './components/common/Footer';
import Home        from './components/pages/Home';
import About       from './components/pages/About';
import Workshops   from './components/pages/Workshops';
import ExpertTalks from './components/pages/ExpertTalks';
import FoodRecipes from './components/pages/FoodRecipes';
// import ContactUs   from './components/pages/ContactUs';
import Admin               from './components/pages/Admin';
import TestGoogleSheets    from './components/pages/TestGoogleSheets';
import NotFound            from './components/pages/NotFound';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/workshops"    element={<Workshops />} />
            <Route path="/expert-talks" element={<ExpertTalks />} />
            <Route path="/food-recipes" element={<FoodRecipes />} />
            {/* <Route path="/contact-us"   element={<ContactUs />} /> */}
            <Route path="/admin"        element={<Admin />} />
            <Route path="/test-sheets"  element={<TestGoogleSheets />} />
            <Route path="*"             element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
