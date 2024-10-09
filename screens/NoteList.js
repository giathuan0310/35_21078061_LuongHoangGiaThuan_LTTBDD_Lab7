import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

function NoteList() {
    // State lưu trữ danh sách ghi chú, nội dung tìm kiếm, trạng thái modal và ghi chú cần xóa
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    
    // Lấy thông tin từ route params (có thể là tên người dùng từ Home hoặc RegisterLogin)
    const route = useRoute();
    const navigation = useNavigation();
    const userName = route.params?.userName || 'Unknown User'; // Lấy tên người dùng

    // Gọi API để lấy danh sách ghi chú khi component được mount
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/notes');
                setNotes(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error(error); // Xử lý lỗi khi gọi API
            }
        };
        fetchNotes();
    }, []);

    // Lọc danh sách ghi chú theo từ khóa tìm kiếm
    const filteredNotes = notes.filter(note =>
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    // Hàm hiển thị modal xác nhận xóa và lưu lại ID của ghi chú muốn xóa
    const confirmDelete = (id) => {
        setNoteToDelete(id);
        setModalVisible(true); // Mở modal
    };

    // Hàm xử lý xóa ghi chú
    const handleDelete = async () => {
        if (noteToDelete) {
            try {
                await axios.delete(`http://localhost:5000/notes/${noteToDelete}`); // Gọi API xóa
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteToDelete)); // Cập nhật danh sách
                setNoteToDelete(null); // Đặt lại trạng thái
            } catch (error) {
                console.error(error); // Xử lý lỗi khi xóa
            }
        }
        setModalVisible(false); // Đóng modal sau khi xóa
    };

    return (
        <View style={styles.container}>
            {/* Header với ảnh đại diện và lời chào */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/ava1.png')} // Ảnh đại diện
                    style={styles.profilePic}
                />
                <Text style={styles.greeting}>Hi {userName}</Text>
                <Text style={styles.subGreeting}>Have a great day ahead!</Text>
            </View>

            {/* Ô tìm kiếm ghi chú */}
            <TextInput
                placeholder="Search"
                value={search}
                onChangeText={setSearch}
                style={styles.searchBar}
            />

            {/* Danh sách ghi chú */}
            <FlatList
                data={filteredNotes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.noteItem}>
                        <TouchableOpacity>
                            <Text style={styles.noteText}>{item.content}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                            <Text style={styles.deleteIcon}>❌</Text> {/* Nút xóa ghi chú */}
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Nút thêm ghi chú mới */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddUpdateNote')} // Điều hướng đến trang thêm ghi chú
            >
                <Text style={styles.plusSign}>+</Text>
            </TouchableOpacity>

            {/* Modal xác nhận xóa ghi chú */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Đóng modal khi nhấn nút back
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Bạn có chắc chắn muốn xóa ghi chú này?</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonCancel]}
                            onPress={() => setModalVisible(false)} // Nút hủy
                        >
                            <Text style={styles.textStyle}>Hủy</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonOK]}
                            onPress={handleDelete} // Nút xác nhận xóa
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F0F0',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    subGreeting: {
        fontSize: 16,
        color: '#666',
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    noteText: {
        fontSize: 16,
        color: '#333',
    },
    deleteIcon: {
        fontSize: 18,
        color: 'red',  // Màu đỏ cho biểu tượng xóa
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#00AFFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    plusSign: {
        fontSize: 36,
        color: '#fff',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '40%', // Điều chỉnh kích thước nút
    },
    buttonCancel: {
        backgroundColor: 'red',
    },
    buttonOK: {
        backgroundColor: '#00AFFF',
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
});

export default NoteList;
