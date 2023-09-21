import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Input = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  margin-bottom: 10px;
  padding-left: 10px;
  &:focus {
    background-color: rgb(228, 235, 248);
  }
`;

const Button = styled.button`
  background-color: rgb(117, 118, 131);
  color: white;
  height: 45px;
  cursor: pointer;
  margin-top: 10px;
`;
export default function Signup() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    id: '',
    pw: '',
    pwCheck: '',
  })
  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    setInfo({...info, [name]: value});
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '150px'}}>
      <div style={{display: 'flex', flexDirection: 'column', width: '450px', justifyContent: 'center', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '20px 10px'}}>
        <h1>회원가입</h1>
        <form style={{display: 'flex', flexDirection: 'column'}}>
          <Input name="id" value={info.id} onChange={handleChange} placeholder='Email' />
          <Input name="pw" value={info.pw} onChange={handleChange} type="password" placeholder='Password'/>
          <Input name="pwCheck" value={info.pwCheck} onChange={handleChange} type="password" placeholder='Password Check'/>
          <Button>로그인</Button>
        </form>
        <p><b>계정이 없습니까?</b><span onClick={() => navigate('../signup')}>  가입하기</span></p>
      </div>
    </div>
  )
}
