import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for the user icon

const Home = () => {
  const [username, setUsername] = useState('');
  const [userNameFocused, setUserNameFocused] = useState(false);

  const navigation = useNavigation();

  const handleGetStarted = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const user = response.data.find(
        u => u.username.toLowerCase() === username.toLowerCase()
      );

      if (user) {
        // Pass the user's full name to NoteList
        navigation.navigate('NoteList', { userName: user.name });
      } else {
        alert('Username không tồn tại trong hệ thống. Vui lòng nhập lại!');
      }
    } catch (error) {
      console.error(error);
      alert('Đã xảy ra lỗi khi kiểm tra username.');
    }
  };

  const handleLogin = () => {
    navigation.navigate('RegisterLogin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/img95.svg')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      <View style={[styles.inputContainer, username.length > 0, userNameFocused && styles.inputContainerFocused]}>
        <FontAwesome name="user" size={20} style={styles.icon} /> {/* User icon */}
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#aaa"
          value={username}
          onFocus={() => setUserNameFocused(true)}
          onBlur={() => setUserNameFocused(false)}
          onChangeText={setUsername}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  header: {
    marginBottom: 30,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    top: '-25%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 20,
    top: '-6%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 50, // Increased margin to add more space
  },
  inputContainerFocused: {
    borderColor: '#6C63FF', // Change border color when input is not empty
    borderWidth: 1,
  },
  icon: {
    padding: 10, // Add some padding to the icon
    color: '#6C63FF', // Icon color
  },
  input: {
    height: 50,
    flex: 1, // Allow the input to take up the remaining space
    paddingHorizontal: 10,
    outlineWidth: 0,
  },
  button: {
    backgroundColor: '#00CFFF',
    paddingVertical: 15,
    width: '190px', // Adjusting to use percentage instead of fixed pixel width
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center', // Center content
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    width: '190px', // Keeping the same width for consistency
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center', // Center content
  },
  loginText: {
    color: '#808080',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
