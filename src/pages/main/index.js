import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Item from './Item';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Snipper } from "../../asests/icons/snipper.svg";

const Radio = styled.input`
  display: none;
  &:checked + label {
    background-color: rgb(120, 122, 137);
    color: white;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  background-color: transparent;
  width: 130px;
  height: 50px;
  border: 1px solid rgb(120, 122, 137);
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const RadioText = styled.span`

`;

// 라디오 버튼 객체 생성 -> map 으로 돌기
const radioTItle = [
  {
    id: 1,
    title: '모두',
    value: 'all',
  },
  {
    id: 2,
    title: '전자기기',
    value: 'electronics',
  },
  {
    id: 3,
    title: '쥬얼리',
    value: 'jewelery',
  },
  {
    id: 4,
    title: '남성의류',
    value: "men's clothing",
  },
  {
    id: 5,
    title: '여성의류',
    value: "women's clothing",
  },
]
function Main() {

  const [select, setSelect] = useState('all');
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try{
      if (select !== 'all') {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${select}`);
        setItemList(response.data);
      } else {
        const response = await axios.get(`https://fakestoreapi.com/products/`);
        setItemList(response.data);
      }
      setIsLoading(false);
    } catch{
      console.log('err');
      setIsLoading(false);
    }
  }

  useEffect( () => {
    setIsLoading(true);
    fetchData();
  }, [select]);

  console.log(isLoading);

  const handleRadioSelect = async (e) => {
    setSelect(e.target.id);
  }
  console.log(itemList);
  console.log(select);

  // 어디까지 올라가서 선언해야하는지 아직도 감을 못잡겠다.
  const handleItemClick = (id) => {
    // /items/:id로 이동
    navigate(`./items/${id}`);
  }
  return (
    <>
    {
      isLoading ? <Snipper style={{display: 'flex', margin: '100px auto'}} /> : (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h1>Products</h1>
              <div style={{display: 'flex', gap: '20px'}}>
                {
                  radioTItle.map((item) => (
                    // fragmentation에는 key만 넣는게 안되는듯
                    <div key = {item.id}>
                      <Radio type="radio" id={item.value} name="select" onChange={handleRadioSelect} checked={select === item.value}/>
                      <RadioLabel htmlFor={item.value}>
                        <RadioText>{item.title}</RadioText>
                      </RadioLabel>
                    </div>
                  ))
                }
              </div>
              <div>
                <p style={{color: '#7F7F7F', fontWeight: '600'}}>Showing: {itemList.length} items</p>
                <div style={{display: 'flex', gap: '10px', width: '1080px', flexWrap: 'wrap'}}>
                  {
                    itemList.map((item) => <Item key={item.id} item={item} handleItemClick={handleItemClick}/>)
                  }
                </div>
              </div>
            </div>
      )
    }
    </>
  )
}

export default React.memo(Main);
