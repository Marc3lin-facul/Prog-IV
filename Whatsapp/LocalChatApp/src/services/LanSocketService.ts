import { Buffer } from 'buffer';
import UdpSocket from 'react-native-udp';
import type Socket from 'react-native-udp/lib/Socket';

const PORT = 41234;

export class LanSocketService {
    private static instance: LanSocketService;
    private socket: Socket | null = null;
    private onMessageCallback: ((msg: string, senderIp: string) => void) | null = null;

    private constructor() {}

    public static getInstance(): LanSocketService {
        if (!LanSocketService.instance) {
            LanSocketService.instance = new LanSocketService();
        }
        return LanSocketService.instance;
    }

    public init(onMessage: (msg: string, senderIp: string) => void): void {
        this.onMessageCallback = onMessage;
        
        // Criando o socket UDP
        this.socket = UdpSocket.createSocket({ type: 'udp4', reusePort: true });

        // Ouvindo mensagens recebidas
        this.socket.on('message', (msg: Buffer, rinfo: { address: string; port: number }) => {
            const messageText = msg.toString('utf8');
            if (this.onMessageCallback) {
                this.onMessageCallback(messageText, rinfo.address);
            }
        });

        // Vinculando à porta estática
        this.socket.bind(PORT, () => {
            try {
                if (this.socket) {
                    this.socket.setBroadcast(true);
                }
            } catch (e) {
                console.error('Erro ao configurar broadcast:', e);
            }
        });
    }

    public sendMessage(text: string, targetIp: string = '255.255.255.255'): void {
        if (!this.socket) {
            console.warn('Socket não inicializado. Chame init() primeiro.');
            return;
        }

        const buffer = Buffer.from(text, 'utf8');
        
        this.socket.send(
            buffer,
            0,
            buffer.length,
            PORT,
            targetIp,
            (err: Error | null) => {
                if (err) {
                    console.error('Erro ao enviar mensagem:', err);
                }
            }
        );
    }

    public close(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}
