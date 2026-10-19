import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface InputBarProps {
    onSend: (text: string) => void;
}

export const InputBar: React.FC<InputBarProps> = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim() === '') return;
        onSend(text);
        setText('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite uma mensagem..."
                placeholderTextColor="#8696a0"
                value={text}
                onChangeText={setText}
                multiline
                blurOnSubmit={false}
                onSubmitEditing={handleSend} // Permite enviar direto pelo teclado se pressionar "concluir"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.7}>
                <Text style={styles.sendButtonText}>➤</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#f0f2f5',
    },
    input: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxHeight: 100, // Impede que o input cresça indefinidamente na tela
        fontSize: 16,
        color: '#111b21',
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: '#00a884',
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    sendButtonText: {
        color: '#ffffff',
        fontSize: 18,
        marginLeft: 2, // Ajuste sutil para centralizar visualmente o ícone de seta
    },
});
