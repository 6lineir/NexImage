export interface User {
  id: string;
  username: string;
  email: string;
  walletCoins: number;
  avatar: string;
  joinedAt: string;
  isAdmin?: boolean;
}

export type StockSource = 'freepik' | 'shutterstock' | 'vecteezy' | 'envato' | 'adobe' | 'istock';

export interface StockProduct {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  stockType: StockSource;
  creator: string;
  downloadsCount: number;
  coinsPrice: number;
  approved: boolean;
  date: string;
  dimensions?: string;
  tags?: string[];
  codec?: string; // e.g. .JPG, .EPS, .PSD
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'charge' | 'download' | 'reward';
  amountCoins: number;
  description: string;
  timestamp: string;
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isAdminReply: boolean;
}

export interface SupportTicket {
  id: string;
  userId: string;
  username: string;
  subject: string;
  status: 'open' | 'closed';
  lastMessageAt: string;
  messages: TicketMessage[];
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'campaign';
  timestamp: string;
  read: boolean;
}

export interface UserLog {
  id: string;
  userId: string;
  username: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface AppConfig {
  searchBonusRewardCoins: number; // reward for searching
  welcomeCoins: number; // wallet welcome gift
  telegramBotMsg: string; // editable telegram bot alert
  isMaintenanceMode: boolean; // toggle maintenance page
}
