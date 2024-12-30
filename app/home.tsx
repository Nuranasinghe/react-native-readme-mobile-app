import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Fixed import for Ionicons
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

interface Book {
  key: string;
  cover_id: number;
  title: string;
  authors?: { name: string }[];
}

const HomeScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [clickCount, setClickCount] = useState(0); // Manage click count locally
  const navigation = useNavigation();
  const userName = "John Doe"; // Example user name

  // Fetch book data from a public API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://openlibrary.org/subjects/love.json?limit=10'); // Example API
        const data = await response.json();
        setBooks(data.works || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setClickCount((prevCount) => prevCount + 1);
      }}
    >
      <Image
        source={{ uri: `https://covers.openlibrary.org/b/id/${item.cover_id}-L.jpg` }}
        style={styles.bookImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.authors?.[0]?.name || 'Unknown Author'}
        </Text>
        <Text style={styles.status}>Status: Available</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/" asChild></Link>
        <TouchableOpacity style={styles.menuIcon} onPress={() => alert('Menu clicked!')}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.userContainer}>
          <Ionicons name="person-circle" size={24} color="#fff" style={styles.userIcon} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => alert(`You clicked ${clickCount} items.`)}
      >
        <Ionicons name="ios-cart" size={24} color="#fff" />
        <Text style={styles.buttonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#34A853',
    padding: 15,
    paddingTop: 40, // For status bar padding
  },
  menuIcon: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 5,
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  bookImage: {
    width: 80,
    height: 100,
    borderRadius: 4,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 14,
    color: '#34A853',
    marginTop: 5,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#34A853',
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default HomeScreen;
