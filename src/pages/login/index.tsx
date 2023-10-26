import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../../firebase';
import { useDispatch } from 'react-redux';
import { cartIn, login } from '../../reducers/user';

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
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: '',
    pw: ''
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name, value} = e.target;
    setInfo({...info, [name]:value});
  }
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log(info);
    firebase.auth().signInWithEmailAndPassword(info.email, info.pw)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // 로그인하면 장바구니 목록도 같이 불러온다.
      dispatch(login(user!.uid));
      const dbRef = firebase.database().ref();
      dbRef.child("users").child(user!.uid).child('carts').get().then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(cartIn(snapshot.val()));
        }
      }).catch((error) => {
        console.error(error);
      });

      navigate('../');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '150px'}}>
      <div style={{display: 'flex', flexDirection: 'column', width: '450px', justifyContent: 'center', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '20px 10px'}}>
        <h1>로그인</h1>
        <Input name="email" value={info.email} onChange={handleChange} placeholder='Email' />
        <Input name="pw" value={info.pw} onChange={handleChange} type="password" placeholder='Password'/>
        <Button onClick={handleSubmit}>로그인</Button>
        <p><b>계정이 없습니까?</b><span onClick={() => navigate('../signup')}>  가입하기</span></p>
      </div>
    </div>
  )
}
