import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import "firebase/auth";
import "firebase/database";
import firebase from '../../firebase'; // Firebase 모듈 가져오기

const Input = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  margin-top: 10px;
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
  margin-top: 20px;
  width: 316px;
`;

const InfoText = styled.p`
  margin: 0px;
  font-size: 13px;
  color: #d52e2e;
  margin-top: 2px;
`;

export default function Signup() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: '',
    pw: '',
    pwCheck: '',
  })

  const [state, setState] = useState({
    emailIsValid: true,
    pwIsValid: true,
    pwCheck: true,
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    setInfo({...info, [name]: value}); // 잉 비번 복붙해서 pwCheck에 넣으면 input name 이 복사되네...?
  }

  // DB에 uid 기준으로 저장
  const writeUserData = (userId, email) => {
    firebase.database().ref('users').child(userId).set({
      email: email,
    });
  }
  

  const fetchData = async () => {
    firebase.auth().createUserWithEmailAndPassword(info.email, info.pw)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      writeUserData(user.uid, info.email);
      alert('회원가입에 성공하였습니다.');
      navigate('../login');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // 한 함수에서 setState 여러번 사용하면 최종본만 반영되는듯 -> 변수 따로 지정해서 저장한 다음 마지막에 set해보자
    let emailIsValid = true;
    let pwIsValid = true;
    let pwCheck = true;

    // 이메일 유효성 검사
    const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!emailRegExp.test(info.email)) emailIsValid = false;
    else emailIsValid = true;

    // 비밀번호 유효성 검사
    const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!pwRegExp.test(info.pw)) pwIsValid = false;
    else pwIsValid = true;

    // 비밀번호 확인
    if (info.pw !== info.pwCheck) pwCheck = false;
    else pwCheck = true;

    // 유효성 검사 후, 서버에 요청
    if(emailIsValid && pwIsValid && pwCheck) {
      console.log(1111111);
      fetchData();
    }

    setState({...state, pwIsValid, emailIsValid, pwCheck});
  }
  console.log(state);
  console.log(info);
  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '150px'}}>
      <div style={{display: 'flex', flexDirection: 'column', width: '450px', justifyContent: 'center', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '20px 10px'}}>
        <h1>회원가입</h1>
        <Input name="email" value={info.email} onChange={handleChange} placeholder='Email' />
        { !state.emailIsValid && <InfoText>유효한 이메일 형식이 아닙니다.</InfoText> }
        <Input name="pw" value={info.pw} onChange={handleChange} type="password" placeholder='Password'/>
        { !state.pwIsValid && <InfoText>영문자, 숫자, 특수문자를 사용해 8~25자의 비밀번호를 입력해주세요.</InfoText> }
        <Input name="pwCheck" value={info.pwCheck} onChange={handleChange} type="password" placeholder='Password Check'/>
        { !state.pwCheck && <InfoText>비밀번호를 확인해주세요.</InfoText> }
        <Button onClick={handleSubmit}>회원가입</Button>
        <p><b>계정이 있습니까?</b><span onClick={() => navigate('../signup')}>  로그인하기</span></p>
      </div>
    </div>
  )
}
