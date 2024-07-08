import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Icon_other from 'react-native-vector-icons/FontAwesome6';
import Background from '@/src/components/background';
import Dialog from "react-native-dialog";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const CHAT_GPT_API_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY ;
  const CHAT_GPT_API_URL = process.env.EXPO_PUBLIC_APIURL_KEY;
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setMessages([]);
    setVisible(false);
  };

  useEffect(() => {
    // Scroll to the end when messages are updated
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendRequest = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { role: 'user', content: inputText };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    try {
      const response = await fetch(CHAT_GPT_API_URL as string, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHAT_GPT_API_KEY }`
        },
        body: JSON.stringify({
          "model": "gpt-4",
          "messages": [
            { "role": "system", "content": "You are a sleep chatbot assistant." },
            ...messages,
            userMessage
          ],
          "max_tokens": 125,
        }),
      });

      const jsonResponse = await response.json();

      // Log the response for debugging
      console.log('Response:', jsonResponse);

      const botMessage = { role: 'assistant', content: jsonResponse.choices[0].message.content };
      console.log('Bot message:', botMessage.content);
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Error fetching response' }]);
    }
  };

  const renderMessage = ({ item }: { item: { role: string, content: string } }) => (
    <View style={[styles.message, item.role === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <Background>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.titleContainer}>
          <Icon_other style={styles.otherTitle} name="mattress-pillow" size={20} color="black" />
          <Text style={styles.title}>PillowPal</Text>
          <Text style={styles.otherTitle} onPress={showDialog}>Clear Chat</Text>
          <Dialog.Container visible={visible}>
            <Dialog.Title>Clear Chat</Dialog.Title>
            <Dialog.Description>
              Do you want to delete this Chat? You cannot undo this action.
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Delete" onPress={handleDelete} />
          </Dialog.Container>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask how to sleep better..."
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor="gray"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendRequest}>
            <Icon name="arrow-up" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  otherTitle: {
    fontSize: 15,
    color: 'white',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginLeft: 50,
  },
  messageList: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#d1e7dd',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#f8d7da',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 25,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  }
});

export default App;
