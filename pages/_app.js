import '../styles/globals.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth , db } from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import firebase from 'firebase';
import {useEffect} from 'react';
import styled from 'styled-components';



function MyApp({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user) {
      db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL
      }, 
      {merge: true}
      )
    }
  }, [user])

  if(loading) return <Loading></Loading>

  if(!user) return <Login />
  
  return (
    <Container>
      <Top>

      </Top>
      <WhatsAppWindow>
      <Component {...pageProps} />
      </WhatsAppWindow>
     
      
    </Container> 
       
  )
}

export default MyApp

const Top = styled.div`
 position: absolute;
 top: 0;
  
  background-color: #4A4B6F;
  width: 100%;
  height: 20%;

`;

const Container = styled.div`
display: flex;

/* place-items: centre;  */
position: relative;
height: 100vh;
width: 100vw;
  background-color: #dddbd1;
  background-image: linear-gradient(180deg, #dddcdf, #d2dbdc);
  
`;

const WhatsAppWindow = styled.div`
    position: relative;
    /* display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox; */
    display: flex;
    top: 5vh;
    left: 8vw;
    height: 91vh;
    width: 84vw;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgb(0 0 0 / 70%);
    background-color: white;
`;
