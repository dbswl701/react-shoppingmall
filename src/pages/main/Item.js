import React from 'react'
import styled from 'styled-components';

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
  const truncate = (text) => {
    return text.length > 15 ? text.substr(0, 15) + '...' : text;
  }
  return (
    <div style={{width: '180px', border: '1px solid #c7c7c7', padding: '40px'}} onClick={() => handleItemClick(item.id)}>
      {/* 사진 이쁘게 조정하고 싶다... */}
      <img src={item.image} style={{ height: '200px', width: '100%' }} />
      <p style={{textAlign: 'center', fontWeight: '600'}}>{truncate(item.title)}</p>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '40px'}}>
        <Button>장바구니에 담기</Button>
        <PriceValue>$ {item.price}</PriceValue>
      </div>
    </div>
  )
}
