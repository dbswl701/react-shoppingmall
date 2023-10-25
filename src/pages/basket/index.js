import React, { useDebugValue, useEffect, useState } from 'react'
import firebase from '../../firebase'; // Firebase 모듈 가져오기
import { ReactComponent as Cart } from '../../asests/icons/cartBig.svg';
import styled from 'styled-components';
import Item from './Item';
import {ReactComponent as Snipper} from '../../asests/icons/snipper.svg';
import { useDispatch, useSelector } from 'react-redux';
import { cartIn } from '../../reducers/user';

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

const CalBtn = styled.button`
  border: 1px solid rgb(160,160,167);
  background-color: transparent;
  width: 150px;
  cursor: pointer;
  &:hover {
    background-color: rgb(114, 116, 129);
    color: white;
  }

`;
export default function Basket() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.user.carts);
  const uid = useSelector((state) => state.user.uid);

  const [isLoading, setIsLoading] = useState(false);
  // const [carts, setCarts] = useState(null);
  // const uid = JSON.parse(localStorage.getItem('user')).uid;
  const [totalCost, setTotalCost] = useState(0); // 이거 그냥 변수로 선언 안하고 state로 선언하는게 맞나...?
  console.log(uid);
  // 디비에서 들고와서 cart.map 돌리기
  useEffect(() => {
    const getData = () => {
      try{
        const CartsRef = firebase.database().ref(`users/${uid}/carts`);
        console.log(CartsRef);
        CartsRef.on('value', (snapshot) => { // 아 변경할 때 마다 바로바로 반영하려고 이런건가?
          const data = snapshot.val();
          if (data === null) {
            console.log('삭제??')
            // setCarts(null);
            dispatch(cartIn([]));
            setTotalCost(0);
            return;
          }
          console.log(data);
          console.log(Object.keys(data));
          console.log(Object.values(data));
          console.log(Object.values(data).reduce((prev, cur) => prev + cur.price * cur.count, 0));
          setTotalCost(Object.values(data).reduce((prev, cur) => prev + cur.price * cur.count, 0));
          dispatch(cartIn(data));
          // setCarts(data);
        });
      }
      catch(err) {
        console.error(err);
      }
    }
    setIsLoading(true);
    getData(); // firebase는 비동기적으로 동작안하나...?
    setIsLoading(false);

  }, [])
  console.log(carts);
  console.log(totalCost)
  const handleCalculate = () => {
    // db에서 carts 다 지우기
    const removeData = async () => {
      try{
        const CartsRef = await firebase.database().ref(`users/${uid}/carts/`).set([]);
      }
      catch(err) {
        console.error(err);
      }
    }
    removeData();
  }

  const noItem = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px'}}>
        {console.log(22222)}

        {/* <h1>장바구니</h1> */}
        <Cart width="400" />
        <Title>Cart가 비어있습니다.</Title>
        <h2>Cart에 상품을 넣어주세요.</h2>
        <Text>계속 쇼핑하기</Text>
      </div>
    )
  };
  const printItems = () => { // 함수가 아닌 변수로 선언하면 일단 평가되기에 한번 실행된다 -> 에러 발생
    return (
      <div>
        {console.log(11111)}
        {console.log(carts)}
        <h1>장바구니</h1>
        <div style={{display: 'flex', flexDirection: 'column', gap:'20px'}}>
          {
            Object.values(carts).map(item => <Item key={item.id} item={item} />)
          }
        </div>
        <div style={{display: 'flex', justifyContent: 'end', gap: '20px', marginTop: '50px'}}>
          <TotalCostBtn>
            <p style={{fontWeight: '600'}}>합계: $ {totalCost.toFixed(2)}</p>
          </TotalCostBtn>
          {/* div 밑에 이렇게 div로 감싸지 않은 button이나 Img 넣는게 바람직한가? */}
          <CalBtn onClick={handleCalculate}>계산하기</CalBtn>
        </div>
      </div>
    )
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {isLoading ? <Snipper style={{display: 'flex', margin: '100px auto'}} /> : carts === null ? noItem() : printItems()}
    </div>
  )
}
