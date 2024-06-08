import React, { useState } from "react";
import { Box, Container, VStack, HStack, Text, Input, Button, Avatar, IconButton, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

const Header = () => (
  <HStack justifyContent="space-between" p={4} bg="teal.500" color="white">
    <Text fontSize="xl" fontWeight="bold">
      ChatApp
    </Text>
    <Avatar icon={<FaUserCircle />} />
  </HStack>
);

const ChatList = ({ chats, selectChat }) => (
  <VStack align="stretch" spacing={4} p={4} bg="gray.100" height="100%" overflowY="auto">
    {chats.map((chat, index) => (
      <Box key={index} p={4} bg="white" borderRadius="md" shadow="md" onClick={() => selectChat(index)} cursor="pointer">
        <Text fontWeight="bold">{chat.name}</Text>
        <Text fontSize="sm" color="gray.500">
          {chat.messages[chat.messages.length - 1]?.text || "No messages yet"}
        </Text>
      </Box>
    ))}
  </VStack>
);

const ChatWindow = ({ chat }) => (
  <VStack align="stretch" spacing={4} p={4} bg="white" height="100%" overflowY="auto">
    {chat.messages.map((message, index) => (
      <Box key={index} alignSelf={message.sender === "me" ? "flex-end" : "flex-start"} bg={message.sender === "me" ? "teal.100" : "gray.200"} p={3} borderRadius="md">
        <Text>{message.text}</Text>
      </Box>
    ))}
  </VStack>
);

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSend = () => {
    if (message.trim() === "") {
      toast({
        title: "Message cannot be empty.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    sendMessage(message);
    setMessage("");
  };

  return (
    <HStack p={4} bg="gray.100">
      <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
      <IconButton aria-label="Send" icon={<FaPaperPlane />} onClick={handleSend} />
    </HStack>
  );
};

const Index = () => {
  const [chats, setChats] = useState([
    {
      name: "John Doe",
      messages: [
        { sender: "John", text: "Hello!" },
        { sender: "me", text: "Hi there!" },
      ],
    },
    { name: "Jane Smith", messages: [{ sender: "Jane", text: "How are you?" }] },
  ]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);

  const selectChat = (index) => {
    setSelectedChatIndex(index);
  };

  const sendMessage = (text) => {
    const newChats = [...chats];
    newChats[selectedChatIndex].messages.push({ sender: "me", text });
    setChats(newChats);
  };

  return (
    <Container maxW="container.xl" height="100vh" display="flex" flexDirection="column">
      <Header />
      <HStack flex="1" spacing={0} overflow="hidden">
        <Box width="30%" borderRight="1px solid" borderColor="gray.200">
          <ChatList chats={chats} selectChat={selectChat} />
        </Box>
        <VStack flex="1" spacing={0}>
          <Box flex="1" width="100%" overflowY="auto">
            <ChatWindow chat={chats[selectedChatIndex]} />
          </Box>
          <MessageInput sendMessage={sendMessage} />
        </VStack>
      </HStack>
    </Container>
  );
};

export default Index;
