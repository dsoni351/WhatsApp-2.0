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
        // name: "",
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
      <Top></Top>
      <WhatsAppWindow>
      <Component {...pageProps} />
      </WhatsAppWindow>
     
      
    </Container>
       
  )
}

export default MyApp

const Top = styled.div`
  
  background-color: #4A4B6F;
  width: 100%;
  height: 21%;

`;

const Container = styled.div`
display: grid;
place-items: centre; 
height: 100vh;

  
`;

const WhatsAppWindow = styled.div`
    position: absolute;
    top: 27px;
    left: 107px;
    height: 92vh;
    width: 85vw;
    border-radius: 5px;
    /* color: #4a4a4a; */
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0,0.7);
    background-color: white;
`;
