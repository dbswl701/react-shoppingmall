import React from 'react'
import Cart from "../asests/icons/cart.svg";
import Private from "../asests/icons/private.svg";
import Login from "../asests/icons/login.svg";
import Logout from "../asests/icons/logout.svg";
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  return (
    <nav style={{display: 'flex', justifyContent: 'space-between', padding: '0px 20px', height: '65px', boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px'}}>
      <div>
        <h1 style={{color: 'rgb(63,31,96)', marginLeft: '20px', margin: '0px', lineHeight: '65px', cursor: 'pointer'}} onClick={() => navigate('./#')}>Shop</h1>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
        <Cart height="24px" onClick={() => navigate('./basket')}/>
        <Private width="24px" height="24px" />
        <Login width="24px" height="24px" onClick={() => navigate('./login')} />
        <Logout width="24px" height="24px" />
      </div>
    </nav>
  )
}
