
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'react-native';

type Memory = {
  id: string;
  title: string;
  content: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const memories: Memory[] = [
  {
    id: '1',
    title: 'Travel Plans',
    content:
      'Discussed travel plans for the summer trip to Italy, including cities to visit and potential accommodations.',
    icon: 'travel-explore',
  },
  {
    id: '2',
    title: 'Project Ideas',
    content:
      'Brainstormed ideas for a new mobile application focused on local community events.',
    icon: 'lightbulb',
  },
  {
    id: '3',
    title: 'Personal Stories',
    content:
      'Shared personal stories about childhood memories and favorite family traditions.',
    icon: 'person',
  },
  {
    id: '4',
    title: 'Market Trends',
    content:
      'Reviewed and analyzed recent market trends in the renewable energy sector.',
    icon: 'show-chart',
  },
  {
    id: '5',
    title: 'Team Collaboration',
    content:
      'Discussed strategies for improving team collaboration and communication for remote work.',
    icon: 'groups',
  },
];

const MemoriesScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Memories</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/add-memory')}
          >
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.listContainer}>
        {memories.map((memory) => (
          <TouchableOpacity key={memory.id} style={styles.memoryItem}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={memory.icon}
                size={24}
                color="#94A3B8"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.memoryTitle}>{memory.title}</Text>
              <Text style={styles.memoryContent} numberOfLines={2}>
                {memory.content}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101a23',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: StatusBar.currentHeight,
  },
  headerLeft: {
    width: 40,
  },
  headerRight: {
    width: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#0d7ff2',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  memoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#182634',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: '#334155',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  memoryTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  memoryContent: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },
});

export default MemoriesScreen;
