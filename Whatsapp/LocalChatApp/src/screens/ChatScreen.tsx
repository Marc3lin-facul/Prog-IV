import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { MessageBubble } from '../components/MessageBubble';
import { InputBar } from '../components/InputBar';
import { LanSocketService } from '../services/LanSocketService';

interface Message {
    id: string;
    text: string;
    isMe: boolean;
    timestamp: string;
}

export const ChatScreen = ({ route }: any) => {
    const { peerIp } = route.params || { peerIp: '255.255.255.255' };
    const [messages, setMessages] = useState<Message[]>([]);
    const flatListRef = useRef<FlatList<Message>>(null);
    const lanService = LanSocketService.getInstance();

    useEffect(() => {
        lanService.init((msg, senderIp) => {
            // Opcional: Se quiser filtrar mensagens vindas apenas do IP selecionado
            // ou ignorar pacotes que você mesmo enviou via broadcast:
            
            const newMessage: Message = {
                id: `${Date.now()}-${Math.random()}`,
                text: msg, // Removido o prefixo do IP para manter o balão limpo, sinta-se livre para voltar se preferir
                isMe: false,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            lanService.close();
        };
    }, []);

    // Rola para o final da lista sempre que o array de mensagens mudar
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100); // Pequeno delay para garantir que o layout renderizou o novo balão
        }
    }, [messages]);

    const handleSendMessage = (text: string) => {
        lanService.sendMessage(text, peerIp);

        const newMessage: Message = {
            id: `${Date.now()}-${Math.random()}`,
            text,
            isMe: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, newMessage]);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Ajustado para evitar comportamento estranho no Android
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MessageBubble 
                        text={item.text} 
                        isMe={item.isMe} 
                        timestamp={item.timestamp} 
                    />
                )}
                contentContainerStyle={styles.messageList}
                // Melhora a performance e renderização ao abrir o teclado
                removeClippedSubviews={false} 
            />
            <InputBar onSend={handleSendMessage} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeae2',
    },
    messageList: {
        paddingVertical: 16,
    },
});
