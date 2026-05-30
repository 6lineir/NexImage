import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ProductDetailsModal from './components/ProductDetailsModal';
import { User, StockProduct, Transaction, SupportTicket, SystemNotification, UserLog, AppConfig, StockSource, TicketMessage } from './types';
import { 
  Sparkles, Wallet, Download, Search, AlertTriangle, CheckCircle2, ShieldCheck, 
  HelpCircle, ExternalLink, RefreshCw, Layers, Bell, Bot, HardDrive, Mail, Trash2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

// SEEDS & INITIAL STATES
const INITIAL_PRODUCTS: StockProduct[] = [
  {
    id: 'prod-1',
    title: 'وکتور لایه باز آیکون‌های واقعیت مجازی سه‌بعدی',
    description: 'مجموعه ارزشمند طرح‌های گرافیست برتر سه‌بعدی با قابلیت جفت‌سازی در موتورهای بازی، فایل سورس فتوشاپ PSD کاملاً لایه لایه.',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600&auto=format&fit=crop',
    stockType: 'freepik',
    creator: 'فرزاد مرادی',
    downloadsCount: 142,
    coinsPrice: 1,
    approved: true,
    date: '2026-05-10',
    dimensions: '6000 x 4000 PX',
    codec: '.PSD',
    tags: ['واقعیت مجازی', 'سه بعدی', 'لایه باز', 'آیکون']
  },
  {
    id: 'prod-2',
    title: 'عکس باکیفیت کویر لوت ایران در غروب آفتاب حماسی',
    description: 'غروب آفتاب جادویی روی ابرها و کلوت‌های طلایی کویر مرکزی لوت ایران، کیفیت فوق‌العاده سابلیشن و مجوزی اصلی گتی‌ایمیجز.',
    imageUrl: 'https://images.unsplash.com/photo-1501534159995-5b8ad2a7839b?q=80&w=600&auto=format&fit=crop',
    stockType: 'shutterstock',
    creator: 'کیانوش راد',
    downloadsCount: 310,
    coinsPrice: 2,
    approved: true,
    date: '2026-05-15',
    dimensions: '8200 x 5400 PX',
    codec: '.JPG',
    tags: ['کویر لوت', 'طبیعت ایران', 'عکاسی', 'غروب']
  },
  {
    id: 'prod-3',
    title: 'طرح لایه باز پوستر جشنواره پاییزی کالیگرافی سنتی',
    description: 'پوستر حرفه‌ای همایش هنری خوش‌نویسی و تذهیب اسلیمی با نقوش سنتی زرد و طلایی پاییزی به صورت سورس ادوبی ایلوستریتور.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
    stockType: 'adobe',
    creator: 'مریم اکبری',
    downloadsCount: 88,
    coinsPrice: 1,
    approved: true,
    date: '2026-05-18',
    dimensions: '5000 x 7000 PX',
    codec: '.AI',
    tags: ['کالیگرافی', 'پوستر', 'ایلوستریتور', 'اسلیمی']
  },
  {
    id: 'prod-4',
    title: 'قالب سه‌بعدی بنر موشن آرت تبلیغاتی جشن نوروز باستانی',
    description: 'مجموعه عظیم فایل‌های موشن گرافیک، دکور سفره هفت‌سین و آیکون‌های متحرک نوروز منطبق با استانداردهای سه‌بعدی بلندر و سینمافوردی.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    stockType: 'envato',
    creator: 'امیررضا علوی',
    downloadsCount: 220,
    coinsPrice: 2,
    approved: true,
    date: '2026-05-22',
    dimensions: '3840 x 2160 PX (4K)',
    codec: '.C4D / .AE',
    tags: ['نوروز', 'قالب سه‌بعدی', 'موشن گرافیک', 'تایپوگرافی']
  },
  {
    id: 'prod-5',
    title: 'تصویر برداری الگوهای تذهیب ایرانی سنتی طلایی طرح شمسه',
    description: 'وکتور باکیفیت و ترنسپیرنت دوربری شده ترنج نگارگری اسلیمی جهت تذهیب و حاشیه‌آرایی کتب مذهبی و تاریخی با فرمت فوق فشرده SVG.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop',
    stockType: 'vecteezy',
    creator: 'سحر تهرانی',
    downloadsCount: 154,
    coinsPrice: 1,
    approved: true,
    date: '2026-05-25',
    dimensions: '7200 x 7200 PX',
    codec: '.SVG / .EPS',
    tags: ['تذهیب', 'وکتور', 'صنایع دستی', 'شمسه']
  },
  {
    id: 'prod-6',
    title: 'تصویر باکیفیت قله دماوند برفی در مه صبحگاهی',
    description: 'عکاسی ممتاز از ارتفاعات با شکوه کوهستان دماوند در مه سفید رنگ صبحگاهی، مناسب نصب در غرفه‌های توریستی و قاب‌های کیفیت بالا.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
    stockType: 'istock',
    creator: 'علی سلیمانی',
    downloadsCount: 56,
    coinsPrice: 2,
    approved: true,
    date: '2026-05-28',
    dimensions: '9000 x 6000 PX',
    codec: '.JPG',
    tags: ['دماوند', 'مه', 'طبیعت گردی', 'ایران']
  }
];

const INITIAL_USER: User = {
  id: 'usr-default',
  username: 'امیر قاسمی',
  email: 'sky98photo@gmail.com',
  walletCoins: 25, // preloaded with enough coins
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
  joinedAt: '2026-05-28T10:00:00Z',
  isAdmin: true // make admin by default to allow testing everything easily
};

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tc-101',
    userId: 'usr-default',
    username: 'امیر قاسمی',
    subject: 'تاخیر در همگام‌سازی فایل‌های دانلودی با گوگل درایو شخصی',
    status: 'open',
    lastMessageAt: '2026-05-30T10:30:00Z',
    messages: [
      {
        id: 'msg-1',
        senderId: 'usr-default',
        senderName: 'امیر قاسمی',
        text: 'سلام خسته نباشید وقتتون بخیر. من یک پیوند از ادوبی استوک لایه‌باز خریدم ولی در زمان انتقال مستقیم به Google Drive خطا دریافت کردم. لایسنس حساب معتبره؟',
        timestamp: '2026-05-30T10:15:00Z',
        isAdminReply: false
      },
      {
        id: 'msg-2',
        senderId: 'admin',
        senderName: 'سرپرست نکس‌‌ایمیج',
        text: 'درود امیر عزیز، حجم طرح انتخابی شما بالا بوده و پهنای باند با پروکسی گوگل موقتا اشغال شده بود. مشکل رفع گردیده است، می‌توانید مجددا روی دکمه ذخیره در درایو کلیک بفرمایید.',
        timestamp: '2026-05-30T10:30:00Z',
        isAdminReply: true
      }
    ]
  },
  {
    id: 'tc-102',
    userId: 'usr-second',
    username: 'بهناز همتی',
    subject: 'مشکل تایید تراکنش در درگاه شتاب بانک سامان',
    status: 'closed',
    lastMessageAt: '2026-05-29T18:00:00Z',
    messages: [
      {
        id: 'msg-3',
        senderId: 'usr-second',
        senderName: 'بهناز همتی',
        text: 'تایید تراکنش کارت به کارت من طول کشید، ۵۰ تومان تراکنش تایید شد ولی کوین‌ها اضافه نشدند.',
        timestamp: '2026-05-29T17:45:00Z',
        isAdminReply: false
      },
      {
        id: 'msg-4',
        senderId: 'admin',
        senderName: 'سرپرست نکس‌‌ایمیج',
        text: 'سلام بهناز گرامی، تراکنش دستی شما بررسی و کیف پول شما به مقدار ۱۰۰ کوین شارژ شد. با احترام.',
        timestamp: '2026-05-29T18:00:00Z',
        isAdminReply: true
      }
    ]
  }
];

const INITIAL_USER_LOGS: UserLog[] = [
  { id: 'log-1', userId: 'usr-default', username: 'امیر قاسمی', action: 'ورود به سیستم', details: 'ورود موفق به پنل کاربری نکس‌‌ایمیج', timestamp: '2026-05-30T12:00:00Z' },
  { id: 'log-2', userId: 'usr-default', username: 'امیر قاسمی', action: 'شارژ کیف پول', details: 'شارژ آنلاین به مقدار ۱۰۰ کوین هدیه', timestamp: '2026-05-30T12:15:00Z' },
  { id: 'log-3', userId: 'usr-second', username: 'بهناز همتی', action: 'تبدیل لینک', details: 'دانلود و بازنشانی طرح Freepik شناسه #12404', timestamp: '2026-05-30T12:30:00Z' },
  { id: 'log-4', userId: 'usr-default', username: 'امیر قاسمی', action: 'هوش مصنوعی', details: 'ارتقای رزولوشن تصویر دماوند با موتور هوش مصنوعی', timestamp: '2026-05-30T12:45:00Z' }
];

const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'not-1',
    title: 'خوش‌آمدگویی به نکس‌‌ایمیج!',
    message: 'حساب شما با موفقیت ایجاد شد و ۱۵ سکه رایگان آغازین هدیه گرفتید.',
    type: 'success',
    timestamp: '2026-05-30T13:00:00Z',
    read: false
  },
  {
    id: 'not-2',
    title: 'کمپین تخفیفات شاتراستوک',
    message: 'بهای دانلود تمامی قالب‌ها و وکتورهای برگه شاتراستوک تا فردا شامل ۵۰٪ تخفیف سکه‌ای می‌باشد.',
    type: 'campaign',
    timestamp: '2026-05-30T13:10:00Z',
    read: false
  }
];

const DEFAULT_CONFIG: AppConfig = {
  welcomeCoins: 15,
  searchBonusRewardCoins: 1,
  telegramBotMsg: '🙌 ربات هوشمند نکسایمیج روی پیامرسان‌های تلگرام و بله کارگذاری شد! هم‌اکنون کدهای محصول خود را به شناسه کاربری @neximageBot روانه کنید.',
  isMaintenanceMode: false
};

export default function App() {
  
  // Theme Toggle: checks localStorage on launch
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  // Load and Persist States with localStorage
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [INITIAL_USER, { id: 'usr-second', username: 'بهناز همتی', email: 'behnaz@gmail.com', walletCoins: 8, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', joinedAt: '2026-05-29T10:00:00Z' }];
  });

  const [products, setProducts] = useState<StockProduct[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [userLogs, setUserLogs] = useState<UserLog[]>(() => {
    const saved = localStorage.getItem('userLogs');
    return saved ? JSON.parse(saved) : INITIAL_USER_LOGS;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  // Navigation and UI States
  const [activeTab, setActiveTab] = useState<string>('home'); // home, converter, archive, tickets, dashboard
  const [adminView, setAdminView] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<StockProduct | null>(null);

  // Link Converter logic variables
  const [inputUrl, setInputUrl] = useState<string>('');
  const [convertStatus, setConvertStatus] = useState<'idle' | 'validating' | 'proxy' | 'metadata' | 'success' | 'error'>('idle');
  const [detectedStock, setDetectedStock] = useState<StockSource | null>(null);
  const [conversionLogs, setConversionLogs] = useState<string[]>([]);
  const [resolvedPremiumUrl, setResolvedPremiumUrl] = useState<string | null>(null);

  // Maintenance Bypass Code (mock admin trigger)
  const [bypassCode, setBypassCode] = useState<string>('');

  // UI Toast notifications
  const [uiToast, setUiToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState<boolean>(false);
  const [productSearchTerm, setProductSearchTerm] = useState<string>('');

  // Sync / write changes to Local Storage on state mutations
  useEffect(() => {
    localStorage.setItem('user', user ? JSON.stringify(user) : '');
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('tickets', JSON.stringify(tickets));
    localStorage.setItem('userLogs', JSON.stringify(userLogs));
    localStorage.setItem('notifications', JSON.stringify(notifications));
    localStorage.setItem('config', JSON.stringify(config));
  }, [user, users, products, transactions, tickets, userLogs, notifications, config]);

  // Handle Dark mode attribute switching
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setUiToast({ message, type });
    setTimeout(() => setUiToast(null), 4000);
  };

  // 1. LINK RECOGNIZER & EXTRACTOR
  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputUrl(val);

    const matchVal = val.toLowerCase();
    if (matchVal.includes('freepik')) setDetectedStock('freepik');
    else if (matchVal.includes('shutterstock')) setDetectedStock('shutterstock');
    else if (matchVal.includes('envato') || matchVal.includes('elements.')) setDetectedStock('envato');
    else if (matchVal.includes('adobe') || matchVal.includes('stock.adobe')) setDetectedStock('adobe');
    else if (matchVal.includes('vecteezy')) setDetectedStock('vecteezy');
    else if (matchVal.includes('istock')) setDetectedStock('istock');
    else setDetectedStock(null);
  };

  // 2. MULTI-STEP ANIMATED CONVERTER PIPELINE
  const triggerLinkConversion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    if (!user) {
      showToast('لطفاً ابتدا به حساب کاربری خود وارد شوید تا اعتبار سکه‌ها برای استخراج فعال گردد.', 'error');
      setActiveTab('home');
      return;
    }

    if (!detectedStock) {
      showToast('پیوند چسبانده‌شده از میان سایت‌های مقصد مجاز پشتیبانی نمی‌شود. مجددا بررسی نمایید.', 'error');
      setConvertStatus('error');
      return;
    }

    const price = detectedStock === 'shutterstock' || detectedStock === 'envato' || detectedStock === 'istock' ? 2 : 1;
    if (user.walletCoins < price) {
      showToast(`موجودی کوین شما ناکافی است. برای استخراج فایل‌های این پلتفرم نیاز به حداقل ${price} فاکتور سکه دارید.`, 'error');
      setConvertStatus('error');
      return;
    }

    // Begin animated steps
    setConvertStatus('validating');
    setConversionLogs(['[سیستم] پایش پیوند و اعتبارسنجی ارجاع به سرور مقصد...']);

    setTimeout(() => {
      setConvertStatus('proxy');
      setConversionLogs(prev => [
        ...prev,
        '[سرور] اتصال امن به نماینده پروکسی کالیفرنیا برای بازنشانی توکن‌های کوکی شتاب برقرار شد.'
      ]);
    }, 1200);

    setTimeout(() => {
      setConvertStatus('metadata');
      setConversionLogs(prev => [
        ...prev,
        '[بارگیری] واکشی متادیتای باکیفیت و استقرار هدر اصلی در CDN منطقه اختصاصی نکس‌‌ایمیج.'
      ]);
    }, 2400);

    setTimeout(() => {
      // Deduct coins from wallet
      const finalUserCoins = user.walletCoins - price;
      const updatedUser = { ...user, walletCoins: finalUserCoins };
      setUser(updatedUser);

      // update global user logs
      setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));

      // Add to transaction ledger
      const newTrans: Transaction = {
        id: `trx-${Date.now()}`,
        userId: user.id,
        type: 'download',
        amountCoins: price,
        description: `استخراج مستقیم پیوند پرمیوم ${detectedStock.toUpperCase()}`,
        timestamp: new Date().toISOString()
      };
      setTransactions(prev => [newTrans, ...prev]);

      // Add to user telemetry activity logs
      const newLog: UserLog = {
        id: `log-${Date.now()}`,
        userId: user.id,
        username: user.username,
        action: 'تبدیل لینک',
        details: `تبدیل موفق آمیز پیوند استوک ${detectedStock.toUpperCase()}: ${inputUrl.slice(0, 50)}...`,
        timestamp: new Date().toISOString()
      };
      setUserLogs(prev => [newLog, ...prev]);

      // Push success Notification
      const newNot: SystemNotification = {
        id: `not-${Date.now()}`,
        title: 'استخراج پیوند موفقیت آمیز!',
        message: `استوک پرمیوم ${detectedStock.toUpperCase()} کسر ${price} سکه با موفقیت بارگیری شد.`,
        type: 'success',
        timestamp: new Date().toISOString(),
        read: false
      };
      setNotifications(prev => [newNot, ...prev]);

      // Generate mock premium high-res image link
      setResolvedPremiumUrl('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop');
      setConvertStatus('success');
      confetti();
      showToast('استخراج پیوند ممتاز با موفقیت صادر گردید!', 'success');
    }, 3805);
  };

  // 3. CATALOG DEDUCTION BARGIER ACTION
  const handleProductDownload = (productId: string, platformLink?: string) => {
    if (!user) return;
    const target = products.find(p => p.id === productId);
    if (!target) return;

    const coinsPrice = target.coinsPrice;
    const finalCoins = user.walletCoins - coinsPrice;
    
    const updatedUser = { ...user, walletCoins: finalCoins };
    setUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));

    // Transaction
    const newTr: Transaction = {
      id: `trx-${Date.now()}`,
      userId: user.id,
      type: 'download',
      amountCoins: coinsPrice,
      description: platformLink || `خرید مستقیم فایل کاتالوگ: ${target.title}`,
      timestamp: new Date().toISOString()
    };
    setTransactions(prev => [newTr, ...prev]);

    // Logs
    const newLg: UserLog = {
      id: `log-${Date.now()}`,
      userId: user.id,
      username: user.username,
      action: 'خرید محصول',
      details: platformLink || `دریافت فایل کاتالوگ ${target.title} - پرداخت ${coinsPrice} کوین`,
      timestamp: new Date().toISOString()
    };
    setUserLogs(prev => [newLg, ...prev]);

    // Notification
    const newNt: SystemNotification = {
      id: `not-${Date.now()}`,
      title: 'دانلود فایل کاتالوگ',
      message: `فایل "${target.title}" با موفقیت خریداری شد. برای ذخیره روی هارد یا درایو آماده است.`,
      type: 'success',
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNt, ...prev]);

    // Increment downloads count in local store
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, downloadsCount: p.downloadsCount + 1 } : p));

    confetti();
    if (!platformLink) {
      showToast('خرید فایل گالری تایید و به لیست دانلودی اضافه شد!', 'success');
    }
  };

  // 4. WALLET ONLINE DECHARGE ACTIONS
  const handleChargeWallet = (coins: number, amountToman: number) => {
    if (!user) return;
    
    const addedCoins = user.walletCoins + coins;
    const updatedU = { ...user, walletCoins: addedCoins };
    
    setUser(updatedU);
    setUsers(prev => prev.map(u => u.id === user.id ? updatedU : u));

    // Transaction Ledger
    const newTr: Transaction = {
      id: `trx-${Date.now()}`,
      userId: user.id,
      type: 'charge',
      amountCoins: coins,
      description: `شارژ آنلاین معادل ${amountToman.toLocaleString('fa-IR')} تومان به صورت الکترونیکی`,
      timestamp: new Date().toISOString()
    };
    setTransactions(prev => [newTr, ...prev]);

    // Logs
    const newLg: UserLog = {
      id: `log-${Date.now()}`,
      userId: user.id,
      username: user.username,
      action: 'شارژ کیف پول',
      details: `پرداخت موفق آنلاین فاکتور خرید شتاب برای فرستنده گو به مقدار ${coins} کوین شارژ شد.`,
      timestamp: new Date().toISOString()
    };
    setUserLogs(prev => [newLg, ...prev]);

    // Notification
    const newNt: SystemNotification = {
      id: `not-${Date.now()}`,
      title: 'شارژ آنی موجودی',
      message: `تراز کیف کاربری شما با موفقیت به مقدار ${coins} سکه ثبتی افزایش یافت.`,
      type: 'success',
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNt, ...prev]);

    confetti();
  };

  // 5. USER ADD SUPPORT TICKET
  const handleAddNewTicket = (subject: string, message: string) => {
    if (!user) return;

    const newTicket: SupportTicket = {
      id: `tc-${Date.now().toString().slice(-4)}`,
      userId: user.id,
      username: user.username,
      subject,
      status: 'open',
      lastMessageAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: user.id,
          senderName: user.username,
          text: message,
          timestamp: new Date().toISOString(),
          isAdminReply: false
        }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);

    // Log event
    const newLg: UserLog = {
      id: `log-${Date.now()}`,
      userId: user.id,
      username: user.username,
      action: 'تیکت پشتیبانی',
      details: `ایجاد تیکت و پیام با موضوع: "${subject}" ثبت به سرور`,
      timestamp: new Date().toISOString()
    };
    setUserLogs(prev => [newLg, ...prev]);

    showToast('تیکت شما با موفقیت به بخش سرپرستی ابلاغ شد.', 'success');
  };

  // 6. ADMIN REPLY SUPPORT TICKET OPERATIONS
  const handleAdminReplyTicket = (ticketId: string, replyMsg: string) => {
    const updatedTickets = tickets.map(t => {
      if (t.id === ticketId) {
        const newMsg: TicketMessage = {
          id: `msg-${Date.now()}`,
          senderId: 'admin',
          senderName: 'سرپرست نکس‌‌ایمیج',
          text: replyMsg,
          timestamp: new Date().toISOString(),
          isAdminReply: true
        };
        return {
          ...t,
          status: 'closed' as any, // close ticket upon responding or keep open as appropriate
          lastMessageAt: new Date().toISOString(),
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    showToast('پاسخ سرپرست به میز تیکت کاربر متصل و ارسال شد.', 'success');
  };

  // 7. ADMIN CONFIG UPDATER
  const handleUpdateConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    showToast('تنظیمات ربات و تعرفه‌های سکه‌ای با موفقیت ارتقا یافت', 'success');
  };

  // 8. ADMIN USER BALANCE ADJUSTMENTS
  const handleUpdateUserCoins = (userId: string, newCoins: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, walletCoins: newCoins } : u));
    if (user && user.id === userId) {
      setUser({ ...user, walletCoins: newCoins });
    }
    showToast('موجودی کیف پول هدف با موفقیت تغییر یافت.', 'success');
  };

  const handleToggleUserAdmin = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isAdmin: !u.isAdmin } : u));
    if (user && user.id === userId) {
      setUser({ ...user, isAdmin: !user.isAdmin });
    }
    showToast('رده دسترسی کاربری با موفقیت دگرگون شد.', 'success');
  };

  const handleClearLogs = () => {
    setUserLogs([]);
    showToast('تمامی گزارش‌های رفتار ترافیک تصفیه گردید.', 'success');
  };

  // 9. ADMIN CATALOG MANAGER ACTIONS
  const handleAddProduct = (p: Omit<StockProduct, 'id' | 'date' | 'downloadsCount'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: StockProduct = {
      ...p,
      id: newId,
      downloadsCount: 0,
      approved: true,
      date: new Date().toLocaleDateString('fa-IR')
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`برگه طرح "${p.title}" به کاتالوگ همومی بارگذاری شد.`, 'success');
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('طرح مورد نظر با موفقیت از کاتالوگ تصفیه شد.', 'success');
  };

  // Auth Quick simulator
  const handleQuickLogin = () => {
    setUser(INITIAL_USER);
    showToast('ورود موفق امیر قاسمی خوش آمدید!', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setAdminView(false);
    showToast('با موفقیت از سیستم نکس‌‌ایمیج خارج شدید.', 'info');
  };

  const handleMarkNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('بایگانی اعلانات خوانده شد', 'info');
  };

  // Google Drive integration quick demo auth screen or actual files status
  const handleSyncDriveScopes = () => {
    showToast('در حال جفت‌سازی و درخواست دسترسی به کلاینت گوگل درایو شما...', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-150 transition-colors flex flex-col justify-between" id="root-theme-layout">
      
      {/* ==================== A: GLOBAL MAINTENANCE OVERRIDES ==================== */}
      {config.isMaintenanceMode && (!user || !user.isAdmin) ? (
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center space-y-6" dir="rtl">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-450 flex items-center justify-center text-3xl mx-auto animate-bounce">
              ⚙
            </div>
            <div className="space-y-2">
              <h1 className="text-lg font-black text-slate-900 dark:text-white">نکس‌‌ایمیج در حال تعمیرات و ارتقای سخت‌افزاری است</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                طراحان و کاربران ارجمند، به زودی با افزودن درگاه‌های ابری ذخیره‌سازی، پهنای باند ممتاز و سرعت بسیار بالاتر باز خواهیم گشت. آماده‌سازی زیرساخت لایسنسینگ.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-bold block">
              پل ارتباطی الکترونیک: support@neximage.ir
            </div>

            {/* Quick Administrator Bypass form field */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <span className="text-[10px] text-slate-405 font-bold block">بای‌پس سرپرستان (ورود تست):</span>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="رمز عبور مدیر..."
                  value={bypassCode}
                  onChange={(e) => setBypassCode(e.target.value)}
                  className="w-full px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-center font-mono placeholder:text-slate-400 text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => {
                    if (bypassCode === 'admin123') {
                      setUser(INITIAL_USER);
                      setConfig({ ...config, isMaintenanceMode: false });
                      showToast('بای‌پس مدیر با موفقیت تایید و وضعیت تعمیرات خاموش شد.', 'success');
                    } else {
                      showToast('رمز عبور سرپرست نادرست است تکرار کنید.', 'error');
                    }
                  }}
                  className="px-4 py-1.5 bg-slate-900 dark:bg-slate-100 dark:text-slate-950 text-white rounded-lg text-xs font-black cursor-pointer"
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ==================== B: NORMAL APP LAYOUT ==================== */}
          <div className="flex-col min-h-screen">
            
            {/* 1. Header component */}
            <Header
              user={user}
              onOpenWallet={() => { setActiveTab('dashboard'); }}
              onOpenNotifications={() => setShowNotificationsDrawer(true)}
              notifications={notifications}
              adminView={adminView}
              setAdminView={setAdminView}
              onLogout={handleLogout}
              onLogin={handleQuickLogin}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(!darkMode)}
            />

            {/* 2. Top-level Telegram Notification banner marquee */}
            {user && (
              <div className="bg-emerald-600/10 border-b border-emerald-500/20 text-emerald-700 dark:text-emerald-400 py-2.5 text-center px-4 relative overflow-hidden" id="marquee-banner">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-black select-text leading-relaxed">
                  <Bot className="w-4 h-4 animate-pulse shrink-0" />
                  <span>{config.telegramBotMsg}</span>
                </div>
              </div>
            )}

            {/* 3. Main content body */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
              
              {/* ADMIN VIEWER IF ACTIVE */}
              {adminView && user && user.isAdmin ? (
                <AdminDashboard
                  users={users}
                  tickets={tickets}
                  userLogs={userLogs}
                  config={config}
                  products={products}
                  onUpdateConfig={handleUpdateConfig}
                  onUpdateUserCoins={handleUpdateUserCoins}
                  onToggleUserAdmin={handleToggleUserAdmin}
                  onClearLogs={handleClearLogs}
                  onAddProduct={handleAddProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onReplyTicket={handleAdminReplyTicket}
                />
              ) : (
                <>
                  {/* USER VIEW MANAGEMENT TABS */}
                  {activeTab === 'home' && (
                    <LandingPage
                      products={products}
                      onSelectProduct={(p) => setSelectedProduct(p)}
                      onNavigateToConverter={() => setActiveTab('converter')}
                      onNavigateToCatalog={() => setActiveTab('archive')}
                      onLogin={handleQuickLogin}
                      isLoggedIn={!!user}
                    />
                  )}

                  {/* SMART LINK CONVERTER MAIN INTERFACE */}
                  {activeTab === 'converter' && (
                    <div className="max-w-3xl mx-auto space-y-6 text-right animate-fade-in" id="link-converter-section">
                      
                      <div className="space-y-1">
                        <h1 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-2">
                          <Layers className="w-5 h-5 text-emerald-550" />
                          <span>تصفیه‌کننده و مبدل هوشمند لینک‌های پرمیوم</span>
                        </h1>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed">
                          پیوند اصلی طرح مدنظر خود در پلتفرم‌ها (Freepik, Shutterstock, Elements, Vecteezy, iStock, Adobe) را در کادر زیر انداخته و فایل زیپ مستقیم سورس کیفیت اصلی را در چند ثانیه تحویل بگیرید.
                        </p>
                      </div>

                      {/* URL converter box panel */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
                        
                        <form onSubmit={triggerLinkConversion} className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold block">نشانی (URL) فایل ممتاز در وب‌سایت مقصد:</span>
                            <div className="relative">
                              <input
                                type="text"
                                value={inputUrl}
                                onChange={handleUrlInputChange}
                                placeholder="مثال: https://www.freepik.com/premium-vector/traditional-gold-frame..."
                                className="w-full pl-4 pr-10 py-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-205 dark:border-slate-750 focus:border-emerald-500 rounded-2xl text-xs outline-none text-left font-mono text-slate-800 dark:text-white placeholder:text-slate-400"
                              />
                              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                                <Search className="w-4 h-4 text-slate-400" />
                              </div>
                            </div>
                          </div>

                          {detectedStock && (
                            <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs font-semibold">
                              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                                <span>شناسایی پلتفرم:</span>
                                <span className="font-mono uppercase font-black">{detectedStock}</span>
                              </div>
                              <div className="text-[10px] text-slate-420 dark:text-slate-400">
                                بهای استخراج: {detectedStock === 'shutterstock' || detectedStock === 'envato' || detectedStock === 'istock' ? '۲ کوین' : '۱ کوین'}
                              </div>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={convertStatus !== 'idle' && convertStatus !== 'success' && convertStatus !== 'error'}
                            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white rounded-2xl text-xs font-black transition-all cursor-pointer shadow-sm text-center flex items-center justify-center gap-1.5 focus:outline-none"
                          >
                            {convertStatus !== 'idle' && convertStatus !== 'success' && convertStatus !== 'error' ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>در حال عیارسنجی اتصال شبکه پروکسی...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                <span>استخراج و تولید فایل زیپ مستقیم</span>
                              </>
                            )}
                          </button>
                        </form>

                        {/* Conversions progress logging feedback */}
                        {convertStatus !== 'idle' && (
                          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-[10px] leading-relaxed space-y-2 border border-slate-800 text-left select-all">
                            {conversionLogs.map((logLine, index) => (
                              <p key={index}>{logLine}</p>
                            ))}
                            
                            {convertStatus === 'validating' && <p className="text-emerald-450 animate-pulse">⚙ [1/4] اتصال به مخزن ابری مبدا...</p>}
                            {convertStatus === 'proxy' && <p className="text-emerald-450 animate-pulse">⚙ [2/4] ایجاد کانال دانلود پروکسی کالیفرنیا...</p>}
                            {convertStatus === 'metadata' && <p className="text-emerald-450 animate-pulse">⚙ [3/4] همگام‌سازی CDN نکس‌‌ایمیج...</p>}
                            
                            {convertStatus === 'success' && (
                              <div className="pt-3 border-t border-slate-805 space-y-3 font-sans text-right" dir="rtl">
                                <div className="flex items-center gap-2.5 text-emerald-400 font-black">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                  <span>لینک دانلود مستقیم و ممتاز با موفقیت صادر گردید!</span>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">کوین از کیف پول شما کسر شد. فایل هم‌اکنون به مدت ۴ ساعت روی سرور پرسرعت ما قرار دارد.</p>
                                
                                <div className="flex gap-2">
                                  <a
                                    href={resolvedPremiumUrl || '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black flex items-center justify-center gap-1 cursor-pointer text-center"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>بارگیری فشرده مستقیم</span>
                                  </a>

                                  <button
                                    onClick={() => {
                                      showToast('در حال صدور درخواست ذخیره فایل استخراج شده در گوگل درایو...', 'info');
                                      alert('فایل با موفقیت در مخزن Google Drive شما آپلود شد!');
                                    }}
                                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-[10px] font-black flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <HardDrive className="w-3.5 h-3.5" />
                                    <span>همگام‌سازی Google Drive</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* logos block */}
                        <div className="pt-3 flex flex-wrap gap-3 items-center justify-center opacity-60">
                          <span className="text-[9px] text-slate-400 block font-bold">پلتفرم‌های مقصد مجاز:</span>
                          {['freepik', 'shutterstock', 'elements', 'adobe', 'vecteezy', 'istock'].map(st => (
                            <span key={st} className="font-mono text-[9px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">{st}</span>
                          ))}
                        </div>

                      </div>
                    </div>
                  )}

                  {/* CATALOG GALLERY / ARCHIVE VIEW */}
                  {activeTab === 'archive' && (
                    <div className="space-y-6 text-right animate-fade-in" id="catalog-gallery">
                      <div className="space-y-1">
                        <h1 className="text-base font-black text-slate-805 dark:text-white flex items-center gap-2">
                          <Layers className="w-5 h-5 text-emerald-500" />
                          <span>گالری کاتالوگ آماده نکس‌‌ایمیج (Curated Stock Archive)</span>
                        </h1>
                        <p className="text-[10px] text-slate-420 dark:text-slate-500 font-semibold">طرح‌های استخراج‌شده پرطرفدار که توسط همکاران و طراحان به اشتراک گذاشته شده‌اند.</p>
                      </div>

                      {/* Search box inside Archive */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-2 text-right">
                        <input
                          type="text"
                          value={productSearchTerm}
                          onChange={(e) => setProductSearchTerm(e.target.value)}
                          placeholder="جستجو در بین طرح‌های آماده، موضوعات..."
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-right outline-none dark:text-white"
                        />
                      </div>

                      {/* Product display grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products
                          .filter(p => p.title.toLowerCase().includes(productSearchTerm.toLowerCase()) || p.description.toLowerCase().includes(productSearchTerm.toLowerCase()))
                          .map((product) => (
                            <div
                              key={product.id}
                              onClick={() => setSelectedProduct(product)}
                              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer text-right flex flex-col h-full"
                            >
                              <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[9px] uppercase font-mono">{product.stockType}</span>
                              </div>
                              <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                                <div className="space-y-1">
                                  <h3 className="text-xs font-black text-slate-800 dark:text-white line-clamp-1">{product.title}</h3>
                                  <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-50 dark:border-slate-800">
                                  <span className="text-emerald-600 dark:text-emerald-450">{product.coinsPrice} کوین</span>
                                  <span>کد طرح: {product.id}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* CLIENT USER PROFILE & FINANCIAL DASHBOARD */}
                  {activeTab === 'dashboard' && user && (
                    <UserDashboard
                      user={user}
                      tickets={tickets}
                      transactions={transactions}
                      onAddTicket={handleAddNewTicket}
                      onChargeWallet={handleChargeWallet}
                    />
                  )}

                  {/* INDEPENDENT USER DISCUSSIONS CLIENT */}
                  {activeTab === 'tickets' && user && (
                    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-155 dark:border-slate-800 rounded-3xl space-y-6 text-right animate-fade-in" id="user-support-tickets-tab">
                      <div className="space-y-1">
                        <h2 className="text-sm font-black text-slate-800 dark:text-white">سامانه پشتیبانی ۲۴ ساعته نکس‌‌ایمیج</h2>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">سوالات، فاکتورهای تاخیردار یا مشکلات فنی کلاینت را تیکت کنید</p>
                      </div>

                      <div className="space-y-4">
                        {tickets.filter(t => t.userId === user.id).length === 0 ? (
                          <div className="text-center py-10 text-slate-400">تیکت ثبتی یافت نگردید. از بخش "داشبورد حساب من" تیکت جدید ارسال نمایید.</div>
                        ) : (
                          tickets.filter(t => t.userId === user.id).map((t) => (
                            <div key={t.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 space-y-3">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-black text-slate-800 dark:text-slate-100">{t.subject}</span>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                                  t.status === 'open' ? 'bg-red-50 text-red-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                }`}>
                                  {t.status === 'open' ? 'در انتظار سرپرست' : 'بسته شده'}
                                </span>
                              </div>
                              
                              <div className="border-t border-slate-100 dark:border-slate-800 pt-2 space-y-2">
                                {t.messages.map((m) => (
                                  <div key={m.id} className={`p-2.5 rounded-xl text-[11px] leading-relaxed ${
                                    m.isAdminReply ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800'
                                  }`}>
                                    <span className="font-extrabold text-[9px] block text-slate-400 mb-0.5">{m.senderName}:</span>
                                    <p>{m.text}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                </>
              )}

            </main>

            {/* 4. FOOTER: NEW STYLE PROFESSIONAL NEW FOOTER DESIGN */}
            <footer className="mt-20 border-t border-slate-150 dark:border-slate-850 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md pt-12 pb-8 text-right font-semibold" id="app-footer">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* Brand description block */}
                <div className="space-y-4 col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center font-mono font-black italic">N</div>
                    <span className="text-sm font-black text-slate-900 dark:text-white">بازار تخصصی و مبدل لینک نکس‌‌ایمیج</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                    نکس‌‌ایمیج بزرگترین سامانه انتقال ابری، همگام‌ساز گوگل درایو و استخراج مستقیم فایل‌های گرافیکی پرمیوم در ایران است. ما عیارسنجی اتصال را به صورت آنی در کدهای شما بهینه‌سازی می‌کنیم.
                  </p>
                </div>

                {/* Useful links */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-800 dark:text-white">سایت‌های استوک مقصد</h4>
                  <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <li><a href="https://freepik.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">دی ال فری‌پیک کاتالوگ</a></li>
                    <li><a href="https://shutterstock.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">دانلودر مستقیم شاتراستوک</a></li>
                    <li><a href="https://elements.envato.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">بسته‌های انواتو المنتز</a></li>
                    <li><a href="https://stock.adobe.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">ادوبی استوک لایسنسینگ</a></li>
                  </ul>
                </div>

                {/* Fast contact */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-800 dark:text-white">پشتیبانی و تماس</h4>
                  <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <li className="flex items-center gap-1.5 justify-end">
                      <span>نشانی ایمیل: sky98photo@gmail.com</span>
                    </li>
                    <li className="flex items-center gap-1.5 justify-end">
                      <span>ارتباط با پشتیبانی ۲۴ ساعته برخط</span>
                    </li>
                  </ul>
                  
                  {/* trust badges decoration */}
                  <div className="pt-2 flex gap-1.5 justify-end" id="trust-badges">
                    <span className="p-1 px-2.5 rounded bg-slate-50 dark:bg-slate-850 text-slate-400 text-[9px] uppercase font-mono">SSL Secure</span>
                    <span className="p-1 px-2.5 rounded bg-slate-50 dark:bg-slate-850 text-slate-400 text-[9px] uppercase font-mono">Drive Powered</span>
                  </div>
                </div>

              </div>

              {/* Sub-footer copyright */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-450 dark:text-slate-500">
                <span>تمامی حقوق مادی و معنوی برای پلتفرم نکس‌‌ایمیج محفوظ است © ۲۰۲۶</span>
                <span className="font-mono">NexImage Direct Downloader and Google Drive Sync V4.2</span>
              </div>
            </footer>

          </div>

          {/* ==================== C: FLOATING PORTFOLIO LIGHTBOX DETAILS MODAL ==================== */}
          {selectedProduct && (
            <ProductDetailsModal
              product={selectedProduct}
              user={user}
              onClose={() => setSelectedProduct(null)}
              onDownload={handleProductDownload}
              onLogin={handleQuickLogin}
            />
          )}

          {/* ==================== D: NOTIFICATIONS DRAWER OVERLAY ==================== */}
          {showNotificationsDrawer && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end" id="notifications-overlay">
              <div className="w-full max-w-sm bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-between text-right animate-fade-in" dir="rtl">
                
                <div className="space-y-4 flex-1 overflow-y-auto">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50 dark:border-slate-800">
                    <h3 className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-emerald-500" />
                      <span>پیام‌ها و اطلاعیه‌ها</span>
                    </h3>
                    <button onClick={() => setShowNotificationsDrawer(false)} className="text-slate-400 text-xs">بستن</button>
                  </div>

                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 text-xs">
                        <span className="font-black text-slate-700 dark:text-slate-200 block mb-1">{n.title}</span>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">{n.message}</p>
                        <span className="text-[8px] text-slate-400 font-mono block mt-1.5">{new Date(n.timestamp).toLocaleTimeString('fa-IR')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex gap-2">
                  <button
                    onClick={handleMarkNotificationsRead}
                    className="flex-1 py-2 bg-emerald-550 text-white rounded-xl text-[10px] font-black"
                  >
                    علامت‌گذاری به عنوان خوانده شده
                  </button>
                  <button
                    onClick={() => setShowNotificationsDrawer(false)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] text-slate-550"
                  >
                    بستن برگه
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ==================== E: FLOATING SYSTEM TOAST ALERTS ==================== */}
          {uiToast && (
            <div className="fixed bottom-6 right-6 z-55 max-w-sm p-4 bg-slate-900 border border-slate-800 dark:bg-white dark:border-slate-200 text-white dark:text-slate-900 rounded-2xl text-xs font-bold leading-relaxed shadow-xl animate-fade-in flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 animate-pulse" />
              <span>{uiToast.message}</span>
            </div>
          )}

        </>
      )}

    </div>
  );
}
