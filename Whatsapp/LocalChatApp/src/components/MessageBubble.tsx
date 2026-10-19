import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBubbleProps {
    text: string;
    isMe: boolean;
    timestamp: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isMe, timestamp }) => {
    return (
        <View style={[styles.container, isMe ? styles.myMessageContainer : styles.peerMessageContainer]}>
            <View style={[styles.bubble, isMe ? styles.myBubble : styles.peerBubble]}>
                <Text style={[styles.text, isMe ? styles.myText : styles.peerText]}>
                    {text}
                </Text>
                <Text style={[styles.timestamp, isMe ? styles.myTimestamp : styles.peerTimestamp]}>
                    {timestamp}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        marginHorizontal: 12,
        flexDirection: 'row',
    },
    myMessageContainer: {
        justifyContent: 'flex-end',
    },
    peerMessageContainer: {
        justifyContent: 'flex-start',
    },
    bubble: {
        maxWidth: '75%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12, // Bordas um pouco mais arredondadas para um visual moderno
        flexDirection: 'column',
    },
    myBubble: {
        backgroundColor: '#dcf8c6',
        borderTopRightRadius: 2, // Efeito clássico de chat no balão do usuário
    },
    peerBubble: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 2, // Efeito clássico de chat no balão do outro usuário
        // Pequena sombra para destacar balões brancos do fundo da tela
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1,
        elevation: 1, 
    },
    text: {
        fontSize: 16,
        color: '#000000',
    },
    myText: {
        // Mantido caso queira mudar a cor do seu texto no futuro
    },
    peerText: {
        // Mantido caso queira mudar a cor do texto do par no futuro
    },
    timestamp: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
        color: '#667781',
    },
    myTimestamp: {
        // Customização futura para sua hora
    },
    peerTimestamp: {
        // Customização futura para hora do par
    },
});
