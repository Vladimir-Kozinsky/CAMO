import s from './app.module.css';
import FooterApp from './footer/Footer';
import HeaderApp from './header/Header';
import SideMenuApp from './sideMenu/SideMenu';
import { Route, Routes } from 'react-router-dom';
import LegsContainer from './content/Legs/LegsContainer';
import AircraftsContainer from './content/Aircrafts/AircraftsContainer';

function App() {
  return (
    <div className={s.app}>
      <div className={s.appContainer} >
        <SideMenuApp />
        <div className={s.contentApp}>
          <Routes>
            <Route exact path="/legs" element={<LegsContainer />} />
            <Route exact path="/aircrafts" element={<AircraftsContainer />} />
          </Routes>
        </div>
        <FooterApp />
        <HeaderApp />
      </div>

    </div>
  );
}

export default App;
