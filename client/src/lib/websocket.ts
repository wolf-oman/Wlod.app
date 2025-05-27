import { useAppStore } from './store';

class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect() {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.send({ type: 'join', room: 'general' });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  private handleMessage(data: any) {
    const { addMessage, updateTeamMember } = useAppStore.getState();

    switch (data.type) {
      case 'chat_message':
        addMessage({
          type: data.sender === 'ai' ? 'ai' : 'user',
          content: data.message
        });
        break;

      case 'team_update':
        updateTeamMember(data.memberId, data.updates);
        break;

      case 'project_update':
        // Handle project updates
        break;

      case 'collaboration':
        // Handle real-time collaboration events
        break;

      default:
        console.log('Unknown message type:', data.type);
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  sendChatMessage(message: string) {
    this.send({
      type: 'chat_message',
      message,
      timestamp: new Date().toISOString()
    });
  }

  sendTeamUpdate(memberId: string, updates: any) {
    this.send({
      type: 'team_update',
      memberId,
      updates
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsManager = new WebSocketManager();

// Auto-connect when the module loads
if (typeof window !== 'undefined') {
  wsManager.connect();
}
