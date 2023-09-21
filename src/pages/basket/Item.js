import React, { useState } from 'react'
import styled from 'styled-components';
import {ReactComponent as Trash} from '../../asests/icons//trash.svg';
import firebase from '../../firebase';

const Wrapper = styled.div`
  display: flex;
  // border: 1px solid black;
  border-bottom: 1px solid gray;
  width: 1000px;
  height: 130px;
  justify-content: space-between;
  // background-color: green;
  align-items: center;
  padding-bottom: 15px;
`;

const Img = styled.img`
  width: 90px;
  height: 110px;
`;

const CategoryText = styled.p`
  color: rgb(200, 200, 200);
  font-weight: 600;
  margin: 0px;
`;

const TitleText = styled.p`
  font-weight: 600;
  margin: 10px 0px;
  font-size: 1.5rem;
  width: 400px;
  margin-right: 130px;
`;

const PriceText = styled.p`
  margin: 0px;
`;

const CountBox = styled.div`
  border: 1.5px solid rgb(235,235,235);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${prop => prop.$isSign ? 'pointer' : 'auto'}
`;

export default function Item({item}) {
  // 장바구니 페이지의 경우, 데이터를 어떻게 관리해야하는지.
  // 각 아이템의 count를 증가, 감소 시 state만 관리, 언마운트나 결제시에만 db에 저장하는 방식
  // 또는 증가, 감소때마다 db도 같이 변경시켜줘야하는지.
  const uid = JSON.parse(localStorage.getItem('user')).uid;
  console.log(item);

  const handleCount = (sign) => { // 변수명이 애매하다?
    if (sign === '-') {
      if (item.count === 0) return;
      firebase.database().ref(`users/${uid}/carts/${item.id}`).update({
        count: item.count-1,
      });

    }
    if (sign === '+') {
      firebase.database().ref(`users/${uid}/carts/${item.id}`).update({
        count: item.count+1,
      });
    }
  }
  return (
    <Wrapper>
      <Img src={item.image} alt="상품 이미지" />
      <div>
        <CategoryText>{item.category}</CategoryText>
        <TitleText>{item.title}</TitleText>
        <PriceText>{item.price} X {item.count} = $ {(item.price * item.count).toFixed(2)}</PriceText>
      </div>
      <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <CountBox $isSign={true} onClick={() => handleCount('-')}>-</CountBox>
        <CountBox $isSign={false}>{item.count}</CountBox>
        <CountBox $isSign={true} onClick={() => handleCount('+')}>+</CountBox>
      </div>
      <div>
        <Trash style={{ marginBottom: '100px'}} />
      </div>
    </Wrapper>
  )
}
