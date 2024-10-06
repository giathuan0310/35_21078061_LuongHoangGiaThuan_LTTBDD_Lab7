import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

function AddUpdateNote() {
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        await axios.post('http://localhost:5000/notes', { content });
        alert('Thêm ghi chú thành công');
        setContent('');
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Thêm Ghi Chú</Text>
            <TextInput
                placeholder="Nội dung"
                value={content}
                onChangeText={setContent}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Thêm" onPress={handleSubmit} />
        </View>
    );
}

export default AddUpdateNote;
