import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterLogin = () => {
  const [username, setUsername] = useState('');  // Đổi thành username
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const user = response.data.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );

      if (user) {
        // Truyền tên đầy đủ (name) của người dùng vào NoteList
        navigation.navigate('NoteList', { userName: user.name });
      } else {
        alert('Lỗi: Tên người dùng hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi', 'Không thể kết nối đến máy chủ');
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Điều hướng đến màn hình đăng ký
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Đăng Nhập</Text>
      <TextInput
        placeholder="Tên người dùng"
        value={username}  // Sử dụng username
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title="Đăng Nhập" onPress={handleLogin} />

      {/* Nút đăng ký */}
      <View style={{ marginTop: 20 }}>
        <Button title="Đăng Ký" onPress={navigateToSignUp} />
      </View>
    </View>
  );
};

export default RegisterLogin;
