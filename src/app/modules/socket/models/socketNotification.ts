export class socketNotification {
  message: string;
  timestamp: number;
  seen: boolean;

  constructor(message: string, timestamp: number, seen: boolean ){
      this.message = message;
      this.timestamp = timestamp;
      this.seen = seen;
      }
}
