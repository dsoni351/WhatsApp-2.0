import { Avatar, IconButton, Button } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from 'email-validator';
import {auth, db} from '../firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from './Chat'
import {useState} from 'react' 
import {useRouter} from 'next/router';



function Sidebar() {

     const router = useRouter();

    const [search, setSearch] = useState("");

    const [user] = useAuthState(auth);

    const userChatRef= db.collection('chats').where('users', 'array-contains', user.email);   

    const [chatsSnapshot] = useCollection(userChatRef);

         const searchChatRef= db.collection('chats').where('users', 'array-contains',search);
         const [searchchatSnapshot] = useCollection(searchChatRef);

         const handleKeypress = (e) => {
      console.log(e.keyCode);
    
  if (e.keyCode === 13) {
    searchChat;
  }
  
};
    
    

    const createChat = () => {
        const input = prompt('Please enter a email address for the user you wish to chat with: ');
  
        if(!input) return null;
        
        if(EmailValidator.validate(input) && input !== user.email && !chatAlreadyExists(input) ) {
          
            db.collection('chats').add({
              users: [user.email, input],
              
            })
        }
    }
    

    const chatAlreadyExists = (recipientEmail) => 
       !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user=== recipientEmail)?.length > 0 );

       const enterChat = (id) => {
         console.log(8);
        router.push(`/chat/${id}`)
    }

    const searchChat = (e) => {
      e.preventDefault();
      if(chatAlreadyExists(search)){

        //  console.log(3);
         
         {searchchatSnapshot?.docs.map((chat) => (enterChat(chat.id)))}
      }
      else{
        alert('No chat found');
      }
      setSearch("");
    }

    

  return (
    <Container>
      <Top>
      <Header> 
        <UserAvatar src= {user.photoURL} onClick = {() => auth.signOut()}></UserAvatar>
        <IconsContainer>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon></SearchIcon>
        <SearchInput placeholder="Search in chats" type="email" value={search} onKeyPress={ handleKeypress } onChange={(e) => setSearch(e.target.value)} />
        <button  hidden={!search} disabled={!search} type="submit" onClick={searchChat}  style={{backgroundColor: "#04AA6D", borderRadius: "5px", color: "white", cursor: "pointer" }} >
          Search
        </button>
      </Search>

      <SidebarButton onClick = {createChat}>Start a new chat</SidebarButton>
      </Top>
     

      

      
      {chatsSnapshot?.docs.map((chat) => (<Chat key= {chat.id} id={chat.id} users = {chat.data().users} />))
      }

    </Container>
  );
}

export default Sidebar;

const Top = styled.div`
display: flex;
flex-direction: column;
position: sticky;
  top: 0;
  z-index: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  
  /* position: sticky;
  top: 0; */
  &&&{
    border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
  background-color: white;
  }
  
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const Search = styled.div`
/* position: sticky;
  top: 0; */
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 2px;
  background-color: white;
`;

const Container = styled.div`
flex: 26%;
    border-right: 1px solid whitesmoke;
    height: 91vh;
    max-width: 45vw;
    min-width: fit-content;
    overflow-y: scroll;

::-webkit-scrollbar {
  display: none;
}

-ms-overflow-style: none;
scrollbar-width: none;

`;

const Header = styled.div`
  display: flex;
  
  background-color: white;
  
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
