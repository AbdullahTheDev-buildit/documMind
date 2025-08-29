import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  Animated,
  Easing,
  FlatList,
  Keyboard,
  StatusBar,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  avatar: string;
};

type HistoryItem = {
  id: string;
  title: string;
  date: Date;
};

const ChatScreen = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you with any questions or tasks you have. Feel free to ask me anything, and I'll do my best to assist you.",
      sender: 'ai',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEH4Owo7fWVOLZ-Dv82joW9JkdsikKrYGSUWL_wTfhfgI07VeAY5stGH2OqhdIqildn0bH1-e-AJQdTZHNYXVgVGKkpdt9pxebvv9D2qAs7Aq75rARY88rWJh5UCIjsR5aCzfQDHM9uE9M-r2DQOhwoYOxM9pZBhnRKb9sstTdLzsyGpw-A22LoqWMxfuUv_0uQ6C54cX5XZGi0ATt6QKoo5d_lVLhaklTLECk6p9mL5HiIh_JkNJGiZcSQoJsulRnNBeagxetMGo',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-300)).current;
  const [history] = useState<HistoryItem[]>([
    { id: '1', title: 'Document analysis', date: new Date() },
    { id: '2', title: 'Research help', date: new Date() },
  ]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const toggleMenu = () => {
    const toValue = isMenuVisible ? -300 : 0;
    Animated.timing(menuAnimation, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setMenuVisible(!isMenuVisible);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        avatar: '', // No avatar for user messages
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity style={styles.historyItem}>
      <Text style={styles.historyTitle}>{item.title}</Text>
      <Text style={styles.historyDate}>{item.date.toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isMenuVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleMenu}
          activeOpacity={1}
        />
      )}
      <Animated.View style={[styles.slideMenu, { left: menuAnimation }]}>
        <View style={styles.menuHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search history..."
          placeholderTextColor="#94A3B8"
        />
        </View>
        <TouchableOpacity style={styles.newChatButton}>
          <Feather name="plus" size={20} color="white" />
          <Text style={styles.newChatButtonText}>New Chat</Text>
        </TouchableOpacity>
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          style={styles.historyList}
        />
      </Animated.View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={toggleMenu}>
          <Feather name="menu" size={24} color="#94A3B8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Chat</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/memories')}>
              <MaterialIcons name="inventory" size={24} color="#94A3B8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/settings')}>
              <Feather name="settings" size={24} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: keyboardHeight }}
      >
        {messages.map((message) => (
          <View key={message.id} style={styles.messageRow}>
            {message.sender === 'ai' && (
              <Image source={{ uri: message.avatar }} style={styles.avatar} />
            )}
            <View
              style={[
                styles.messageBubble,
                message.sender === 'ai'
                  ? styles.aiBubble
                  : styles.userBubble,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Message AI Assistant..."
          placeholderTextColor="#94A3B8"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Feather name="arrow-up" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: StatusBar.currentHeight,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  aiBubble: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: '#0d7ff2',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    color: 'white',
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#0d7ff2',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  slideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#101a23',
    zIndex: 2,
    padding: 16,
    paddingTop: 60,
  },
  menuHeader: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    color: 'white',
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d7ff2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  newChatButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  historyTitle: {
    color: 'white',
    fontSize: 16,
  },
  historyDate: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ChatScreen;