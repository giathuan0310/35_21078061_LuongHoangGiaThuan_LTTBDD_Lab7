import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState(''); // Tên đầy đủ của người dùng
  const [username, setUsername] = useState(''); // Tên người dùng (username)
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Lấy danh sách người dùng từ db.json để kiểm tra trùng lặp username
      const response = await axios.get('http://localhost:5000/users');
      const userExists = response.data.some(u => u.username.toLowerCase() === username.toLowerCase());

      if (userExists) {
        Alert.alert('Lỗi', 'Tên người dùng đã tồn tại');
        return;
      }

      // Nếu username chưa tồn tại, tạo tài khoản mới
      const newUser = { name, username, password };
      await axios.post('http://localhost:5000/users', newUser);

      Alert.alert('Thành công', 'Đăng ký thành công');
      navigation.navigate('RegisterLogin'); // Quay lại giao diện đăng nhập sau khi đăng ký
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Đăng Ký</Text>
      <TextInput
        placeholder="Tên đầy đủ"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Tên người dùng"
        value={username}
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
      <Button title="Đăng Ký" onPress={handleSignUp} />
    </View>
  );
};

export default SignUp;
