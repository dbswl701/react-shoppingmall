import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import { ReactComponent as Snipper } from "../../asests/icons/snipper.svg";

import firebase from '../../firebase'; // Firebase 모듈 가져오기
import { useDispatch, useSelector } from 'react-redux';
import { cartIn } from '../../reducers/user';


// 이런 네이밍이 적절한가?
const CategoryText = styled.p`
  color: rgb(201,201,201);
  font-size: 30px;
  font-weight: 600;
`;

const TitleText = styled.p`
  font-size: 45px;
`;

const PriceText = styled.p`
  font-size: 50px;
  font-weight: 700;
`;

const DescText = styled.p`
  color: rgb(148,148,148);
`;

const ButtonInCart = styled.button`
  // styled-component에 Prop 전달
  background-color: ${(props) => props.$isInCart ? 'rgb(114, 116, 129)': 'transparent'};
  color: ${(props) => props.$isInCart ? 'white' : 'rgb(114, 116, 129)'};
  width: 200px;
  height: 50px;
  border: 1px solid rgb(114, 116, 129);
  cursor: pointer;
  &:hover {
    background-color: rgb(114, 116, 129);
    color: white;
    border: none;
  }
`;

const ButtonGoCart = styled.button`
  background-color: rgb(114, 116, 129);
  color: white;
  width: 200px;
  height: 50px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: rgb(114, 116, 129);
    border: 1px solid rgb(114, 116, 129);
  }
`;
export default React.memo(function Detail() {
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.user);

  const params = useParams();
  const navigate = useNavigate();
  console.log(params.itemId);
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  // const getData = JSON.parse(localStorage.getItem('user'));
  // dispatch(cartIn)
  console.log(getData);

  // 장바구니에 담긴 제품인지 확인 -> 처음 들어올 때 디비에 있는지 확인, 추가 시 업데이트
  const checkInCart = () => {
    const dbRef = firebase.database().ref();
    dbRef.child("users").child(getData.uid).get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log('is in cart?', snapshot.val());
        // carts에 item.id를 key로 가지는게 있는지 확인
        console.log(Object.keys(snapshot.val().carts).includes(`${params.itemId}`))
        if (Object.keys(snapshot.val().carts).includes(`${params.itemId}`)) setIsInCart(true);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const UpdateCartData = (uid) => {
    firebase.database().ref('users').child(uid).child('carts').child(item.id).set({
      id: item.id,
      category: item.category,
      title: item.title,
      price: item.price,
      image: item.image,
      count: 1,
    });
  }

  const handleInCart = () => {
    // id, 카테고리, 이름, 가격, 개수

    const data = [
      ...getData.carts,
      {
        id: item.id,
        category: item.category,
        title: item.title,
        price: item.price,
        image: item.image,
        count: 1,
      }
    ]
    const setData = {
      uid: getData.uid,
      carts: data,
    }
    // localStorage.setItem("user", JSON.stringify(setData));
    dispatch(cartIn(data));
    console.log(setData);
    UpdateCartData(getData.uid);
    setIsInCart(true);
    // 이런 형태로 저장 예정
    // {
    //   uid: '123123';
    //   carts: [
    //     [
    //       category,
    //       title,
    //       price,
    //       count
    //     ],
    //     [
    //       category,
    //       title,
    //       price,
    //       count
    //     ]
    //   ]
    // }
  }

  useEffect(() => {
    async function fetchData() { //근데 왜 항상 이렇게 함수를 선언하고 사용하지?
      try {
        const itemData = await axios.get(`https://fakestoreapi.com/products/${params.itemId}`);
        setItem(itemData.data);
        console.log(itemData.data);
        setIsLoading(false); 
      } catch {
        console.log('err');
        setIsLoading(false); 
      }
    }
    setIsLoading(true);
    checkInCart();
    fetchData();
    // setIsLoading(false); // fetchData() 함수는 비동기이기에 호출하고 바로 그 다음줄을 실행해서 함수 실행이 끝나지 않았는데도 이게 실행되기에 원하는대로 동작하지 않음.
  }, [params])
  return (
    <>
      {
        isLoading ? <Snipper style={{display: 'flex', margin: '100px auto'}} /> : (
          <div style={{ display: 'flex', paddingTop: '40px', padding: '100px', gap: '100px'}}>
            <div style={{ paddingLeft: '50px'}}>
              <img src={item.image} style={{width: '400px'}} />
            </div>
            <div>
              {/* h1은 하나만 존재하는게 좋다고 들은 기억이 있어서 h1은 반복될 것 같아 안적었는데, 그렇다고 p 태그를 적는것도 적절한지 의문 */}
              <CategoryText>{item.category}</CategoryText>
              <TitleText>{item.title}</TitleText>
              <PriceText>$ {item.price}</PriceText>
              <DescText>{item.description}</DescText>
              <div style={{display: 'flex', gap: '50px', marginTop: '100px'}}>
                {/* props에 대문자 지정 시 에러 발생. 소문자로 적거나 props dkvdp $ 붙이면 해결 */}
                <ButtonInCart $isInCart={isInCart} onClick={handleInCart}>{isInCart ? '장바구니에 담긴 제품' : '장바구니에 담기'}</ButtonInCart>
                <ButtonGoCart onClick={()=>navigate('../basket')}>장바구니로 이동</ButtonGoCart>
              </div>
            </div>
          </div>
        )
      }
    </>
    
  )
})
