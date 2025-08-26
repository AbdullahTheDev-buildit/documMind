import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

type HistoryItem = {
  id: string;
  title: string;
  date: Date;
};

const chatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I assist you today?', isUser: false, timestamp: new Date() },
  ]);
  const [inputText, setInputText] = useState('');
  const [isUploadMenuVisible, setUploadMenuVisible] = useState(false);
  const [isHistoryVisible, setHistoryVisible] = useState(false);
  const [history] = useState<HistoryItem[]>([
    { id: '1', title: 'Document analysis', date: new Date() },
    { id: '2', title: 'Research help', date: new Date() },
  ]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: inputText, isUser: true, timestamp: new Date() },
        { id: (Date.now() + 1).toString(), text: 'Processing your request...', isUser: false, timestamp: new Date() },
      ]);
      setInputText('');
    }
  };

  const handleUploadOption = (option: string) => {
    console.log(`Selected upload option: ${option}`);
    setUploadMenuVisible(false);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.aiMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity style={styles.historyItem}>
      <Text style={styles.historyTitle}>{item.title}</Text>
      <Text style={styles.historyDate}>{item.date.toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>RAG Chat AI</Text>
        <TouchableOpacity onPress={() => setHistoryVisible(true)}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {['Documents', 'Settings', 'Help', 'Profile'].map((item) => (
          <TouchableOpacity key={item} style={styles.menuItem}>
            <Text style={styles.menuText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat Area */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => setUploadMenuVisible(true)}
        >
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline
        />
        
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Upload Menu */}
      <Modal
        visible={isUploadMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setUploadMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          onPress={() => setUploadMenuVisible(false)}
        >
          <View style={styles.uploadMenu}>
            {['PDF', 'Text Input', 'Memory'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.uploadOption}
                onPress={() => handleUploadOption(option)}
              >
                <Text style={styles.uploadOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* History Modal */}
      <Modal
        visible={isHistoryVisible}
        animationType="slide"
        onRequestClose={() => setHistoryVisible(false)}
      >
        <SafeAreaView style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Conversation History</Text>
            <TouchableOpacity onPress={() => setHistoryVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            style={styles.historyList}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItem: {
    padding: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#007AFF',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  uploadButton: {
    padding: 8,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  uploadMenu: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  uploadOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  uploadOptionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#007AFF',
  },
  historyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default chatScreen;