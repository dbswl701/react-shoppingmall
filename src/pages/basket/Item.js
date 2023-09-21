import React, { useState } from 'react'
import styled from 'styled-components';
import {ReactComponent as Trash} from '../../asests/icons//trash.svg';

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
  cursor: ${prop => prop.isSign ? 'pointer' : 'auto'}
`;

export default function Item({item}) {
  const [count, setCount] = useState(1);

  console.log(item);
  return (
    <Wrapper>
      <Img src={item.image} alt="상품 이미지" />
      <div>
        <CategoryText>{item.category}</CategoryText>
        <TitleText>{item.title}</TitleText>
        <PriceText>{item.price} X {item.count} = $ {item.price * item.count}</PriceText>
      </div>
      <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <CountBox isSign={true} onClick={() => setCount((prev) => prev - 1)}>-</CountBox>
        <CountBox isSign={false}>{count}</CountBox>
        <CountBox isSign={true} onClick={() => setCount((prev) => prev + 1)}>+</CountBox>
      </div>
      <div>
        <Trash style={{ marginBottom: '100px'}} />
      </div>
    </Wrapper>
  )
}
