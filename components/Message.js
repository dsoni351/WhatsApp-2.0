import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOFMessage = user === userLoggedIn.email ? Sender : Receiver;

  return (
    <Container>
      <TypeOFMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOFMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  /* padding: 15px; */
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
    padding-bottom: 9px;
    padding-top: 3px;
    padding-right: 48px;
    padding-left: 15px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.span`
  color: grey;
  padding: 0px;
  font-size: 9px;
  position: absolute;
  bottom: 5px;
  text-align: right;
  right: 5px;
`;
