import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'; // Firebase 모듈 가져오기
import { ReactComponent as Cart } from '../../asests/icons/cartBig.svg';
import styled from 'styled-components';
import Item from './Item';

const Title = styled.h1`
  font-size: 3rem;
  margin: 1rem;
`;

const Text = styled.p`
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

const TotalCostBtn = styled.div`
  background-color: rgb(241,234,222);
  width: 200px; 
  display: flex;
  justify-content: center;
`;

export default function Basket() {
  const [carts, setCarts] = useState({});
  const uid = JSON.parse(localStorage.getItem('user')).uid;
  const [totalCost, setTotalCost] = useState(0); // 이거 그냥 변수로 선언 안하고 state로 선언하는게 맞나...?
  console.log(uid);
  // 디비에서 들고와서 cart.map 돌리기
  useEffect(() => {
    const getData = async () => {
      try{
        const dbRef = firebase.database().ref();
        const snapshot = await dbRef.child("users").child(uid).get();
        if (snapshot.exists()) { // cart에 저장된게 있을 때
          console.log(snapshot.val().carts);
          setCarts(snapshot.val().carts);
          setTotalCost(Object.values(snapshot.val().carts).reduce((prev, cur) => prev.price + cur.price))
        }
        else { // 장바구니 비어있을 때
          console.log('empty!');
        }
      }
      catch(err) {
        console.error(err);
      }
    }
    getData();
  }, [])

  const noItem = (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px'}}>
      {/* <h1>장바구니</h1> */}
      <Cart width="400" />
      <Title>Cart가 비어있습니다.</Title>
      <h2>Cart에 상품을 넣어주세요.</h2>
      <Text>계속 쇼핑하기</Text>
    </div>
  )
  const printItems = (
    <div>
      <h1>장바구니</h1>
      <div style={{display: 'flex', flexDirection: 'column', gap:'20px'}}>
        {
          Object.values(carts).map(item => <Item key={item.id} item={item} />)
        }
      </div>
      <div style={{display: 'flex', justifyContent: 'end', gap: '20px', marginTop: '50px'}}>
        <TotalCostBtn>
          <p style={{fontWeight: '600'}}>합계: $ {totalCost}</p>
        </TotalCostBtn>
        {/* div 밑에 이렇게 div로 감싸지 않은 button이나 Img 넣는게 바람직한가? */}
        <button style={{border: '1px solid rgb(160,160,167)', backgroundColor: 'transparent', width: '150px'}}>계산하기</button>
      </div>
    </div>
  )
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {carts === undefined ? noItem : printItems}
    </div>
  )
}
