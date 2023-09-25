import React from 'react'
import styled from 'styled-components';
import firebase from '../../firebase'; // Firebase 모듈 가져오기

const Button = styled.button`
  background-color: transparent;
  border: 1.5px solid #afafaf;
  border-radius: 5px;
  width: 110px;
  height: 40px;
`;

const PriceValue = styled.p`
  margin: 0px;
  line-height: 40px;
  font-size: 13px;
`;

export default function Item({item, handleItemClick}) {
  const getData = JSON.parse(localStorage.getItem('user'));

  const truncate = (text) => {
    return text.length > 15 ? text.substr(0, 15) + '...' : text;
  }

  // 장바구니에 추가 시 호출되는 이벤트 핸들러
  const UpdateCartData = (e, uid) => {
    e.stopPropagation()
    firebase.database().ref('users').child(uid).child('carts').child(item.id).set({
      id: item.id,
      category: item.category,
      title: item.title,
      price: item.price,
      image: item.image,
      count: 1,
    });
    console.log(item);
  }

  return (
    <div style={{width: '180px', border: '1px solid #c7c7c7', padding: '40px'}} onClick={() => handleItemClick(item.id)}>
      {/* 사진 이쁘게 조정하고 싶다... */}
      <img src={item.image} style={{ height: '200px', width: '100%' }} />
      <p style={{textAlign: 'center', fontWeight: '600'}}>{truncate(item.title)}</p>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '40px'}}>
        <Button onClick={(e) => UpdateCartData(e, getData.uid)}>장바구니에 담기</Button>
        <PriceValue>$ {item.price}</PriceValue>
      </div>
    </div>
  )
}
