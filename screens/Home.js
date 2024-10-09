import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios để gọi API
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome để sử dụng icon người dùng

const Home = () => {
  // Khai báo state cho username và trạng thái focus của input
  const [username, setUsername] = useState('');
  const [userNameFocused, setUserNameFocused] = useState(false);

  const navigation = useNavigation(); // Sử dụng hook để điều hướng

  // Hàm xử lý khi người dùng nhấn nút "Get Started"
  const handleGetStarted = async () => {
    try {
      // Gọi API để lấy danh sách người dùng
      const response = await axios.get('http://localhost:5000/users');
      // Tìm người dùng có username khớp với input (không phân biệt hoa/thường)
      const user = response.data.find(
        u => u.username.toLowerCase() === username.toLowerCase()
      );

      if (user) {
        // Nếu tìm thấy, điều hướng đến trang NoteList với tên người dùng
        navigation.navigate('NoteList', { userName: user.name });
      } else {
        // Nếu không tìm thấy, hiển thị thông báo lỗi
        alert('Username không tồn tại trong hệ thống. Hãy vui lòng nhập lại!');
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error(error);
      alert('Đã xảy ra lỗi khi kiểm tra username.');
    }
  };

  // Hàm xử lý khi người dùng nhấn nút "Login"
  const handleLogin = () => {
    navigation.navigate('RegisterLogin'); // Điều hướng đến trang đăng nhập/đăng ký
  };

  return (
    <View style={styles.container}>
      {/* Phần header chứa hình ảnh */}
      <View style={styles.header}>
        <Image
          source={require('../assets/img95.svg')} // Sử dụng hình ảnh trong thư mục assets
          style={styles.image}
        />
      </View>

      {/* Tiêu đề */}
      <Text style={styles.title}>MANAGE YOUR TASK</Text>

      {/* Input để người dùng nhập username */}
      <View style={[styles.inputContainer, username.length > 0, userNameFocused && styles.inputContainerFocused]}>
        <FontAwesome name="user" size={20} style={styles.icon} /> {/* Icon người dùng */}
        <TextInput
          style={styles.input}
          placeholder="Enter your username" // Nơi để nhập username
          placeholderTextColor="#aaa" // Màu placeholder
          value={username} // Giá trị của input là state username
          onFocus={() => setUserNameFocused(true)} // Khi focus vào input
          onBlur={() => setUserNameFocused(false)} // Khi bỏ focus
          onChangeText={setUsername} // Cập nhật state khi người dùng nhập text
        />
      </View>

      {/* Nút "Get Started" */}
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>

      {/* Nút "Login" */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Phần style của các component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', // Màu nền
  },
  header: {
    marginBottom: 30, // Khoảng cách phía dưới của phần header
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain', // Điều chỉnh hình ảnh vừa khít với khung
    top: '-25%', // Vị trí hình ảnh trên trục Y
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C63FF', // Màu tiêu đề
    marginBottom: 20, // Khoảng cách phía dưới của tiêu đề
    top: '-6%', // Vị trí tiêu đề trên trục Y
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%', // Chiều rộng của container input
    borderColor: '#ccc', // Màu viền mặc định
    borderWidth: 1, // Độ rộng của viền
    borderRadius: 10, // Bo tròn các góc
    marginBottom: 50, // Khoảng cách phía dưới của input
  },
  inputContainerFocused: {
    borderColor: '#6C63FF', // Thay đổi màu viền khi input được focus
    borderWidth: 1,
  },
  icon: {
    padding: 10, // Khoảng cách bên trong icon
    color: '#6C63FF', // Màu của icon
  },
  input: {
    height: 50, // Chiều cao của input
    flex: 1, // Để input chiếm phần còn lại của container
    paddingHorizontal: 10, // Khoảng cách ngang bên trong input
    outlineWidth: 0, // Loại bỏ viền outline khi input được focus (trên web)
  },
  button: {
    backgroundColor: '#00CFFF', // Màu nền của nút "Get Started"
    paddingVertical: 15, // Khoảng cách dọc bên trong nút
    width: '190px', // Chiều rộng của nút
    borderRadius: 10, // Bo tròn góc
    marginBottom: 20, // Khoảng cách phía dưới của nút
    alignItems: 'center', // Canh giữa nội dung
  },
  buttonText: {
    color: '#fff', // Màu chữ của nút
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#fff', // Màu nền của nút "Login"
    paddingVertical: 15, // Khoảng cách dọc bên trong nút
    width: '190px', // Chiều rộng của nút
    borderRadius: 10, // Bo tròn góc
    borderWidth: 1, // Đường viền
    borderColor: '#ccc', // Màu viền
    alignItems: 'center', // Canh giữa nội dung
  },
  loginText: {
    color: '#808080', // Màu chữ của nút "Login"
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
