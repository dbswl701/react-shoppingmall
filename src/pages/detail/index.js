import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import { ReactComponent as Snipper } from "../../asests/icons/snipper.svg";


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

const Button = styled.button`
  // background-color: rgb(114, 116, 129);
  background-color: transparent;
  color: rgb(114, 116, 129);
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
  const params = useParams();
  console.log(params.itemId);
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() { //근데 왜 항상 이렇게 함수를 선언하고 사용하지?
      try {
        const item = await axios.get(`https://fakestoreapi.com/products/${params.itemId}`);
        setItem(item.data);
        console.log(item.data);
        setIsLoading(false); 
      } catch {
        console.log('err');
        setIsLoading(false); 
      }
    }
    setIsLoading(true);
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
                <Button>장바구니에 담기</Button>
                <ButtonGoCart>장바구니로 이동</ButtonGoCart>
              </div>
            </div>
          </div>
        )
      }
    </>
    
  )
})
