# 35_21078061_LuongHoangGiaThuan_LTTBDD_Lab7

Bài tập 7 React lập trình thiết bị di động

## Yêu Cầu

Trước khi bắt đầu, hãy đảm bảo rằng bạn đã cài đặt các công cụ sau:
- **Mobile simulator**: Bạn có thể tải và cài đặt từ link sau đây [chromewebstore](https://chromewebstore.google.com/detail/mobile-simulator-responsi/ckejmhbmlajgoklhgbapkiccekfoccmk)
- **Node.js**: Bạn có thể tải và cài đặt từ [nodejs.org](https://nodejs.org/).
- **Cài đặt modules**: Chạy các lệnh sau:
  ```bash 
  npx create-expo-app YOUR_PROJECT --template blank
  cd YOUR_PROJECT
  npx expo install react-dom react-native-web @expo/metro-runtime

- **Install navigation và icon(fontawesome)**: Chạy các lệnh sau:
  ```bash
  npm install @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
  npm install @react-navigation/native-stack

- **Cài đặt 1 số thư viện khác**: Chạy các lệnh sau:
  ```bash 
  expo install expo-linear-gradient
  npm install react-native-vector-icons

- **Cài đặt json server**: Chạy các lệnh sau (phải cd vào project trước):
  ```bash 
  npm install -g json-server
  json-server --watch db.json --port 5000

- **Sử dụng mockapi**: Vào web [mockapi.io](https://mockapi.io/):
  ```bash 
  Bước 1: Đăng nhập sử dụng mockap
  Create new project
  Đặt tên cho dự án: My Notes API
  Nhấn: Create project

  Bước 2: Tạo Resource
  Bấm New resource
  Set từng giá trị/values
  
- **Tạo file db.json**: Chạy các lệnh sau (phải cd vào project trước):
  ```bash 
  npm install axios

- **Chạy web**:
  ```bash 
  npx expo start 

- **HƯỚNG DẪN CHẠY PROJECT TRÊN VSCODE**: Chạy các lệnh sau:
  ```bash
  git clone về
  vào VSC chọn open folder chọn thư mục vừa clone về
  npm i yarn
  npx expo start
  npm run web
