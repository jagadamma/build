import React, { Fragment, useEffect, useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationList,
  Conversation,
  Sidebar,
  Search,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";
import { getLoggedInUser } from "../api/auth";
import { getMessages, getAllMessages } from "../api/message";
import { useParams } from "react-router-dom";
const Chat = (props) => {
  const { id } = useParams();
  console.log(id);
  const [typedmessage, setTypedmessage] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [getMessage, setGetMessage] = useState(null);

  useEffect(() => {
    if (loggedInUser === null) {
      getLoggedInUser(id).then(function (user) {
        setLoggedInUser(user.data);
      });
    }
    getMessages(id).then(function (data) {
      setGetMessage(data.data);
    });
  }, [typedmessage]);
  console.log(getMessage);
  let sendHandler = (e) => {
    setTypedmessage(e);
    props.socket &&
      props.socket.emit("sent-message", {
        message: e,
        senderId: loggedInUser._id,
        sentTo: id,
      });
  };

  let messageList =
    getMessage &&
    getMessage.messages.map((e) => (
      <Message
        model={{
          message: e.message,
          sentTime: "just now",
          sender: "Joe",
          direction:
            e.userIdSent._id !== loggedInUser._id ? "incoming" : "outgoing",
          position: "single",
        }}
      ></Message>
    ));
  console.log(loggedInUser);
  let conversationList;
  //   // allMessage &&
  //   // allMessage.map((e, i) => (
  //   //   <Conversation
  //   //     style={{ fontSize: "1vmax" }}
  //   //     name={e.userA._id !== loggedInUser._id ? e.userA.name : e.userB.name}
  //   //     info="Yes i can do it for you"
  //   //     unreadCnt={3}
  //   //   >
  //   //     <Avatar src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" />
  //   //   </Conversation>
  //   ));
  return (
    <div>
      <MainContainer responsive style={{ height: "45vmax" }}>
        <Sidebar
          style={{ fontSize: "1vmax" }}
          position="left"
          scrollable={true}
          className="w-50"
        >
          <Search placeholder="Search..." />
          <ConversationList>{conversationList}</ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader style={{ fontSize: "1vmax" }}>
            <ConversationHeader.Back />
            <Avatar
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
              name="Zoe"
            />
            <ConversationHeader.Content
              userName={id}
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList style={{ padding: "2vmax", fontSize: "1vmax" }}>
            {messageList}
          </MessageList>
          <MessageInput
            onSend={sendHandler}
            attachButton={false}
            style={{ fontSize: "1.2vmax" }}
            placeholder="Type message here"
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
