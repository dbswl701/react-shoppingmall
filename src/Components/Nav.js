import React from 'react'
import { ReactComponent as Cart } from "../asests/icons/cart.svg";
import { ReactComponent as Private } from "../asests/icons/private.svg";
import { ReactComponent as Login } from "../asests/icons/login.svg";
import { ReactComponent as Logout } from "../asests/icons/logout.svg";
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  return (
    <nav style={{display: 'flex', justifyContent: 'space-between', padding: '0px 20px', height: '65px', boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px'}}>
      <div>
        <h1 style={{color: 'rgb(63,31,96)', marginLeft: '20px', margin: '0px', lineHeight: '65px'}}>Shop</h1>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
        <Cart height="24px" />
        <Private width="24px" height="24px" />
        <Login width="24px" height="24px" onClick={() => navigate('./login')} />
        <Logout width="24px" height="24px" />
      </div>
    </nav>
  )
}
