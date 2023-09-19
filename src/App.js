import { Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import Detail from './pages/detail';
import Busket from './pages/basket';
import Nav from './Components/Nav';

function Layout () {
  return (
    <div>
      <Nav />
      <Outlet />
      {/* <Footer /> */}
      {/* Footer */}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />}/>
          <Route path="login" element={<Login />} />
          <Route path="/items/:itemId" element={<Detail />} />
          <Route path="/busket" element={<Busket />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
