import React, {useState} from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import Detail from './pages/detail';
import Busket from './pages/basket';
import Nav from './Components/Nav';
import { ReactComponent as Snipper } from "./asests/icons/snipper.svg";

function Layout ({isLoading}) {
  return (
    <div>
      <Nav />
      {/* <Snipper style={{display: 'flex', margin: '100px auto'}} />  */}
      {/* { // 여기서 로딩스피너 관리하면 무한 리렌더링 발생 -> React.memo 이용해도 마찬가지.
        isLoading ? <Snipper style={{display: 'flex', margin: '100px auto'}} />  : <Outlet />
      } */}
      <Outlet />
      {/* <Footer /> */}
      {/* Footer */}
    </div>
  )
}

function App() {
  // const [isLoading, setIsLoading] = useState(false);
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
