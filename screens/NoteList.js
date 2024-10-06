import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

function NoteList() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();

    // Lấy tên người dùng từ params (có thể từ Home hoặc RegisterLogin)
    const userName = route.params?.userName || 'Unknown User';

    // Check for newNote in the route params and add it to the notes list
    // useEffect(() => {
    //     if (route.params?.newNote) {
    //         setNotes(prevNotes => [...prevNotes, route.params.newNote]);
    //     }
    // }, [route.params?.newNote]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/notes');
                setNotes(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNotes();
    }, []);

    const filteredNotes = notes.filter(note =>
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    // Function to show the modal and set the note ID to delete
    const confirmDelete = (id) => {
        setNoteToDelete(id);
        setModalVisible(true);
    };

    // Function to handle delete
    const handleDelete = async () => {
        if (noteToDelete) {
            try {
                await axios.delete(`http://localhost:5000/notes/${noteToDelete}`);
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteToDelete));
                setNoteToDelete(null);
            } catch (error) {
                console.error(error);
            }
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/ava1.png')}
                    style={styles.profilePic}
                />
                <Text style={styles.greeting}>Hi {userName}</Text>
                <Text style={styles.subGreeting}>Have a great day ahead!</Text>
            </View>

            <TextInput
                placeholder="Search"
                value={search}
                onChangeText={setSearch}
                style={styles.searchBar}
            />

            <FlatList
                data={filteredNotes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.noteItem}>
                        <TouchableOpacity>
                            <Text style={styles.noteText}>{item.content}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                            <Text style={styles.deleteIcon}>❌</Text>  {/* Change to red X */}
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddUpdateNote')}
            >
                <Text style={styles.plusSign}>+</Text>
            </TouchableOpacity>

            {/* Modal for Delete Confirmation */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Bạn có chắc chắn muốn xóa ghi chú này?</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonCancel]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Hủy</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonOK]}
                            onPress={handleDelete}
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
        color: 'red',  // Optional: Make the delete icon red
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
        width: '40%', // Adjust width as needed
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
