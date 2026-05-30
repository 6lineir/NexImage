import React, { useState } from 'react';
import { 
  Users, Layers, Activity, FileText, Settings, Bot, ShieldAlert, Search, RefreshCw, 
  Trash2, MessageCircle, Send, CheckCircle2, XCircle, AlertTriangle, Key, Plus, Eye, Check, Wallet 
} from 'lucide-react';
import { User, SupportTicket, TicketMessage, UserLog, AppConfig, StockProduct } from '../types';

interface AdminDashboardProps {
  users: User[];
  tickets: SupportTicket[];
  userLogs: UserLog[];
  config: AppConfig;
  products: StockProduct[];
  onUpdateConfig: (newConfig: AppConfig) => void;
  onUpdateUserCoins: (userId: string, newCoins: number) => void;
  onToggleUserAdmin: (userId: string) => void;
  onClearLogs: () => void;
  onAddProduct: (p: Omit<StockProduct, 'id' | 'date' | 'downloadsCount'>) => void;
  onDeleteProduct: (pId: string) => void;
  onReplyTicket: (ticketId: string, replyMsg: string) => void;
}

export default function AdminDashboard({
  users,
  tickets,
  userLogs,
  config,
  products,
  onUpdateConfig,
  onUpdateUserCoins,
  onToggleUserAdmin,
  onClearLogs,
  onAddProduct,
  onDeleteProduct,
  onReplyTicket
}: AdminDashboardProps) {
  const [adminTab, setAdminTab] = useState<'metrics' | 'support' | 'logs' | 'users' | 'catalog' | 'settings'>('metrics');
  
  // Local state for coin configuration updates
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingCoinsVal, setEditingCoinsVal] = useState<number>(0);
  
  // Local state for adding products
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('');
  const [newProdType, setNewProdType] = useState<'freepik' | 'shutterstock' | 'vecteezy' | 'envato' | 'adobe' | 'istock'>('freepik');
  const [newProdCodec, setNewProdCodec] = useState('.JPG');
  const [newProdPrice, setNewProdPrice] = useState(1);
  const [newProdDim, setNewProdDim] = useState('5400 x 3600 PX');
  
  // Local state for support reply
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Local state for Telegram configuration edit
  const [telegramMsgInput, setTelegramMsgInput] = useState(config.telegramBotMsg);
  const [searchBonusInput, setSearchBonusInput] = useState(config.searchBonusRewardCoins);
  const [welcomeCoinsInput, setWelcomeCoinsInput] = useState(config.welcomeCoins);

  // Search and filters
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [logSearchTerm, setLogSearchTerm] = useState('');
  const [logActionFilter, setLogActionFilter] = useState<string>('all');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  // Handle support ticket reply submission
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !replyText.trim()) return;
    onReplyTicket(selectedTicketId, replyText.trim());
    setReplyText('');
  };

  // Handle configuration update save
  const handleSaveConfig = () => {
    onUpdateConfig({
      ...config,
      telegramBotMsg: telegramMsgInput,
      searchBonusRewardCoins: Number(searchBonusInput) || 1,
      welcomeCoins: Number(welcomeCoinsInput) || 15
    });
  };

  // Filter logs
  const filteredLogs = userLogs.filter(log => {
    const matchesAction = logActionFilter === 'all' || log.action === logActionFilter;
    const q = logSearchTerm.trim().toLowerCase();
    const matchesSearch = !q || 
      log.username.toLowerCase().includes(q) || 
      log.details.toLowerCase().includes(q) || 
      log.action.toLowerCase().includes(q);
    return matchesAction && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right animate-fade-in" dir="rtl" id="admin-hub">
      
      {/* Admin Title Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-3xl">
        <div className="space-y-1">
          <h1 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>پیشخوان ارشد سرپرستی نکس‌‌ایمیج (NexImage Admin Operations)</span>
          </h1>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">کنترل پنل ویژه پایش ترافیک، پیام پیامرسان‌ها، مدیریت تراکنش‌ها و لایو چت پشتیبانی</p>
        </div>

        {/* Dynamic Maintenance Badge alert */}
        <div className="flex items-center gap-2">
          {config.isMaintenanceMode ? (
            <div className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-920 text-[10px] font-black flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>دسترسی سایت مسدود! (تعمیرات)</span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60 text-[10px] font-black flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>سرورهای نکس‌‌ایمیج آنلاین</span>
            </div>
          )}
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800 gap-1 overflow-x-auto whitespace-nowrap pb-1">
        {[
          { id: 'metrics', label: 'آمار کلی و نمودارها', icon: Activity },
          { id: 'support', label: 'پشتیبانی و تیکت‌ها', icon: MessageCircle, badge: tickets.filter(t => t.status === 'open').length },
          { id: 'logs', label: 'لاگ‌های زنده سیستم', icon: FileText },
          { id: 'users', label: 'کاربران و کیف پول', icon: Users },
          { id: 'catalog', label: 'مدیریت طرح‌های کاتالوگ', icon: Layers },
          { id: 'settings', label: 'تنظیمات ربات و تعمیرات', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-purple-650 text-white dark:bg-purple-600'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ==================== 1. ANALYTICS METRICS ==================== */}
      {adminTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">کل کاربران ثبت‌نامی</span>
              <p className="text-xl font-mono font-black text-slate-800 dark:text-white mt-1">{users.length} کاربر</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">کل لاگ‌های ترافیک ثبت‌شده</span>
              <p className="text-xl font-mono font-black text-slate-800 dark:text-white mt-1">{userLogs.length} تراکنش</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">تیکت‌های در انتظار پاسخ</span>
              <p className="text-xl font-mono font-black text-red-500 mt-1">{tickets.filter(t => t.status === 'open').length} تیکت</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">طرح‌های موجود در کاتالوگ</span>
              <p className="text-xl font-mono font-black text-teal-600 mt-1">{products.length} فایل</p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-xs font-black text-slate-800 dark:text-slate-205">توزیع استفاده کاربران از استوک‌های پرمیوم</h3>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
              {['freepik', 'shutterstock', 'envato', 'adobe', 'vecteezy', 'istock'].map((st) => {
                const count = userLogs.filter(l => l.details.toLowerCase().includes(st)).length;
                return (
                  <div key={st} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center space-y-1">
                    <span className="font-mono text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 block">{st}</span>
                    <span className="text-xs font-black text-slate-800 dark:text-white block">{count} دانلود</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==================== 2. LIVE HELP CHAT DESK ==================== */}
      {adminTab === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="admin-operations-ticket-and-chats">
          
          {/* Tickets Sidebar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 space-y-3 lg:col-span-1">
            <h3 className="text-xs font-black text-slate-800 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-2">فهرست تیکت‌های پشتیبانی کاربران</h3>
            {tickets.length === 0 ? (
              <p className="text-[11px] text-slate-400 text-center py-8 font-medium">تیکت پشتیبانی ثبتی وجود ندارد</p>
            ) : (
              <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                {tickets.map((t) => {
                  const isSelected = selectedTicketId === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTicketId(t.id)}
                      className={`w-full text-right p-3 rounded-xl border transition-all cursor-pointer block space-y-1.5 focus:outline-none ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50/40 dark:bg-purple-950/20'
                          : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-705 dark:text-slate-300 font-black">{t.username}</span>
                        {t.status === 'open' ? (
                          <span className="text-red-500 bg-red-50 dark:bg-red-950/20 px-1.5 py-0.5 rounded-md">در انتظار پاسخ</span>
                        ) : (
                          <span className="text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">بسته شده</span>
                        )}
                      </div>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">{t.subject}</p>
                      <span className="text-[9px] text-slate-400 font-mono block">آخرین بروزرسانی: {new Date(t.lastMessageAt).toLocaleTimeString('fa-IR')}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Chat Desk Window */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 lg:col-span-2 flex flex-col justify-between h-[520px]">
            {selectedTicket ? (
              <>
                {/* Chat Header */}
                <div className="border-b border-slate-105 dark:border-slate-810 pb-3 flex justify-between items-center shrink-0">
                  <div className="space-y-0.5 text-right">
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold block">شناسه تیکت: {selectedTicket.id}</span>
                    <h3 className="text-xs font-black text-slate-800 dark:text-white">موضوع: {selectedTicket.subject}</h3>
                    <p className="text-[9px] text-slate-420 dark:text-slate-500">کاربر ارسال کننده: <span className="font-bold text-slate-700 dark:text-slate-300">{selectedTicket.username}</span></p>
                  </div>

                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black">
                      {selectedTicket.messages.length} پیام ثبتی
                    </span>
                  </div>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3 px-2">
                  {selectedTicket.messages.map((m) => (
                    <div 
                      key={m.id} 
                      className={`flex flex-col max-w-[80%] space-y-1 ${
                        m.isAdminReply ? 'mr-auto items-start' : 'ml-auto items-end'
                      }`}
                    >
                      <div 
                        className={`p-3.5 rounded-2xl text-xs font-medium text-right leading-relaxed ${
                          m.isAdminReply 
                            ? 'bg-purple-600 text-white rounded-tl-none' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tr-none'
                        }`}
                      >
                        <p>{m.text}</p>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {m.senderName} - {new Date(m.timestamp).toLocaleTimeString('fa-IR')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chat Reply Form input */}
                <form onSubmit={handleSendReply} className="border-t border-slate-100 dark:border-slate-800 pt-3 flex gap-2 shrink-0">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="پاسخ خود را به عنوان سرپرست بنویسید..."
                    className="flex-grow px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-purple-500 text-slate-800 dark:text-slate-100 text-right"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-650 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-4.5 h-4.5 rotate-180" />
                    <span>ارسال پاسخ</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400 dark:text-slate-500 gap-3">
                <MessageCircle className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                <div>
                  <h4 className="text-xs font-black text-slate-700 dark:text-slate-200">میز پشتیبانی غیرفعال است</h4>
                  <p className="text-[10px] leading-relaxed">لطفاً برای شروع گفت‌وگو و ارسال آرا، یک تیکت از ستون جانبی انتخاب نمایید.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ==================== 3. TELEMETRY USER BEHAVIOR LOGS ==================== */}
      {adminTab === 'logs' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            
            {/* Action buttons on telemetry */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xs font-black text-slate-800 dark:text-white">رصد برخط رفتار زنده کاربران (پایش ترافیک NexImage)</h3>
              
              <button
                onClick={() => {
                  if (window.confirm('آیا از پاک کردن کامل تاریخچه رفتارهای ثبت شده کاربران اطمینان دارید؟')) {
                    onClearLogs();
                  }
                }}
                className="px-3 py-1.5 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف تمامی لاگ‌های ثبت‌شده دیتابیس</span>
              </button>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="text-right">
                <label className="text-[10px] font-bold text-slate-400 block mb-1">جستجو در شرح لاگ‌ها:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={logSearchTerm}
                    onChange={(e) => setLogSearchTerm(e.target.value)}
                    placeholder="جستجوی کاربر، شرح پیام..."
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:border-purple-500 text-slate-800 dark:text-slate-100 text-right"
                  />
                </div>
              </div>

              <div className="md:col-span-2 text-right">
                <label className="text-[10px] font-bold text-slate-400 block mb-1">فیلتر موضوعی رفتارها:</label>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'ورود به سیستم', 'تبدیل لینک', 'هوش مصنوعی', 'شارژ کیف پول', 'تیکت پشتیبانی'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setLogActionFilter(cat)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        logActionFilter === cat
                          ? 'bg-purple-650 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      {cat === 'all' ? 'نمایش همه رفتارها' : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Logs list table */}
            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
              <table className="w-full text-xs text-right whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4">کاربر</th>
                    <th className="py-2.5 px-4">نوع رفتار</th>
                    <th className="py-2.5 px-4">جزئیات و شرح پیوند مراجع</th>
                    <th className="py-2.5 px-4 text-left">زمان ثبت اصلی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-650 dark:text-slate-350">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">لاگ متناظری یافت نشد!</td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                        <td className="py-3 px-4 font-black">{log.username}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-355">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 truncate max-w-[280px]" title={log.details}>{log.details}</td>
                        <td className="py-3 px-4 text-left font-mono text-[10px] text-slate-400">
                          {new Date(log.timestamp).toLocaleTimeString('fa-IR')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* ==================== 4. USER PORTFOLIO & COINS ==================== */}
      {adminTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-black text-slate-800 dark:text-white">امداد و مدیریت کیف پول‌های کاربری</h3>
            <input
              type="text"
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
              placeholder="جستجوی نام یا ایمیل کاربر..."
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-lg text-xs outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-extrabold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">نام کاربری</th>
                  <th className="py-3 px-4">نشانی پست الکترونیک (ایمیل)</th>
                  <th className="py-3 px-4">تراز کیف پول سکه‌ای اصلی</th>
                  <th className="py-3 px-4">دسترسی ادمین</th>
                  <th className="py-3 px-4 text-left">عملیات تصحیح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold text-slate-700 dark:text-slate-300">
                {users
                  .filter(u => u.username.toLowerCase().includes(userSearchTerm.toLowerCase()) || u.email.toLowerCase().includes(userSearchTerm.toLowerCase()))
                  .map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-2">
                        <img src={usr.avatar} alt={usr.username} className="w-7 h-7 rounded-full" />
                        <span>{usr.username}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[10px] text-slate-500 dark:text-slate-450">{usr.email}</td>
                      <td className="py-3 px-4">
                        {editingUserId === usr.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={editingCoinsVal}
                              onChange={(e) => setEditingCoinsVal(Number(e.target.value))}
                              className="w-16 px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 rounded font-mono text-center text-xs"
                            />
                            <button
                              onClick={() => {
                                onUpdateUserCoins(usr.id, editingCoinsVal);
                                setEditingUserId(null);
                              }}
                              className="bg-emerald-650 hover:bg-emerald-700 text-white px-2 py-0.5 rounded text-[10px]"
                            >
                              ✓ ثبت
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-slate-800 dark:text-slate-100 font-black">{usr.walletCoins} سکه</span>
                            <button
                              onClick={() => {
                                setEditingUserId(usr.id);
                                setEditingCoinsVal(usr.walletCoins);
                              }}
                              className="text-purple-600 hover:underline text-[10px]"
                            >
                              ویرایش کیف
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black ${
                          usr.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {usr.isAdmin ? 'سرپرست سیستم' : 'کاربر عادی'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-left">
                        <button
                          onClick={() => onToggleUserAdmin(usr.id)}
                          className="px-2 py-0.8 border border-purple-200 hover:bg-purple-50 text-purple-600 dark:text-purple-400 dark:border-purple-900 dark:hover:bg-purple-950/20 rounded text-[10px] cursor-pointer"
                        >
                          تغییر رتبه کاربری
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== 5. CATALOG DESIGN PRODUCTS ==================== */}
      {adminTab === 'catalog' && (
        <div className="space-y-6">
          
          {/* Add Product Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-slate-850 dark:text-white pb-2 border-b border-slate-50 dark:border-slate-800">
              بارگذاری و پیش‌فروش طرح جدید در کاتالوگ عمومی
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1 text-right">
                <span className="text-[10px] text-slate-400 font-bold block">نام طرح گرافیکی استوک:</span>
                <input
                  type="text"
                  value={newProdTitle}
                  onChange={(e) => setNewProdTitle(e.target.value)}
                  placeholder="مثال: پوستر لایه‌باز عاشورا PSD"
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-right"
                />
              </div>

              <div className="space-y-1 text-right">
                <span className="text-[10px] text-slate-400 font-bold block">توضیحات کوتاه فنی:</span>
                <input
                  type="text"
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="ابعاد، مراجع و نحوه لایه‌بندی"
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-right"
                />
              </div>

              <div className="space-y-1 text-right">
                <span className="text-[10px] text-slate-400 font-bold block">آدرس تصویر بندانگشتی طرح:</span>
                <input
                  type="text"
                  value={newProdImg}
                  onChange={(e) => setNewProdImg(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-left font-mono"
                />
              </div>

              <div className="space-y-1 text-right">
                <span className="text-[10px] text-slate-400 font-bold block">انتخاب پلتفرم مقصد پرمیوم:</span>
                <select
                  value={newProdType}
                  onChange={(e) => setNewProdType(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-left"
                >
                  <option value="freepik">Freepik (فری‌پیک)</option>
                  <option value="shutterstock">Shutterstock (شاتر استوک)</option>
                  <option value="envato">Envato Elements (انواتو المنتز)</option>
                  <option value="adobe">Adobe Stock (ادوبی استوک)</option>
                  <option value="vecteezy">Vecteezy (وکتیزی)</option>
                  <option value="istock">iStock Photo (آی‌استوک)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1 text-right">
                <span className="text-[10px] text-slate-400 font-bold block">فرمت فایل پسوند سورس:</span>
                <input
                  type="text"
                  value={newProdCodec}
                  onChange={(e) => setNewProdCodec(e.target.value)}
                  placeholder=".PSD"
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-right"
                />
              </div>

              <div className="space-y-1 text-right">
                <span className="text-[10px] text-slate-400 font-bold block">ابعاد رزولوشن طرح:</span>
                <input
                  type="text"
                  value={newProdDim}
                  onChange={(e) => setNewProdDim(e.target.value)}
                  placeholder="5000 x 3000 PX"
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-right"
                />
              </div>

              <div className="space-y-1 text-right">
                <span className="text-[10px] text-slate-400 font-bold block">میزان قیمت نهایی (تعداد کوین):</span>
                <input
                  type="number"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(Number(e.target.value))}
                  placeholder="1"
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-right font-mono"
                />
              </div>

              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!newProdTitle || !newProdImg) {
                      alert('لطفا نام طرح و تصویر را پر نمایید');
                      return;
                    }
                    onAddProduct({
                      title: newProdTitle,
                      description: newProdDesc || 'پلان گرافیکی اصلی با تراکم رنگ ممتاز',
                      imageUrl: newProdImg,
                      stockType: newProdType,
                      creator: 'NexImage Admin',
                      coinsPrice: newProdPrice,
                      approved: true,
                      dimensions: newProdDim,
                      codec: newProdCodec,
                      tags: ['طرح گرافیکی', 'وکتور', 'سورس فایل']
                    });
                    setNewProdTitle('');
                    setNewProdDesc('');
                    setNewProdImg('');
                  }}
                  className="w-full px-4 py-2 bg-purple-650 hover:bg-purple-700 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ثبت طرح و انتشار</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current products inventory list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-slate-800 dark:text-white">طرح‌های فعال کاتالوگ فعلی</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-850/50">
                  <div className="flex items-center gap-2">
                    <img src={p.imageUrl} className="w-10 h-10 object-cover rounded-lg" alt="" />
                    <div>
                      <span className="text-xs font-black block text-slate-800 dark:text-white line-clamp-1">{p.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">{p.stockType} | {p.coinsPrice} سکه</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteProduct(p.id)}
                    className="p-1 px-2.5 bg-red-50 text-red-650 hover:bg-red-100 rounded-lg text-[10px]"
                  >
                    حذف طرح
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ==================== 6. BOT MESSAGE & SITE CONFIGURATION ==================== */}
      {adminTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Telegram Bot Message Customizer */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-slate-804 dark:text-white flex items-center gap-1.5 pb-2 border-b border-slate-50 dark:border-slate-800">
              <Bot className="w-5 h-5 text-emerald-500" />
              <span>اعلانات ربات تلگرام نکسایمیج (مارکی و متن داشبورد)</span>
            </h3>

            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed font-semibold">
              متن وارد شده زیر در بالای صفحه داشبورد تمامی کاربران به صورت نوار اعلان مارکی و جعبه خبری پررنگ نمایش داده می‌شود. از این طریق کدهای فعال‌سازی ربات‌ها و کاتالیزورهای تلگرامی را به کاربران اطلاع دهید.
            </p>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold block">متن اعلان دکمه ربات:</label>
              <textarea
                rows={4}
                value={telegramMsgInput}
                onChange={(e) => setTelegramMsgInput(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold leading-relaxed text-right dark:text-white focus:ring-1 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">کوین خوش‌آمدگویی:</span>
                <input
                  type="number"
                  value={welcomeCoinsInput}
                  onChange={(e) => setWelcomeCoinsInput(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-center"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">پاداش جستجو در گالری:</span>
                <input
                  type="number"
                  value={searchBonusInput}
                  onChange={(e) => setSearchBonusInput(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono text-center"
                />
              </div>
            </div>

            <button
              onClick={() => {
                handleSaveConfig();
                alert('پیکربندی سیستم با موفقیت به‌روزرسانی شد');
              }}
              className="px-4 py-2 bg-purple-650 hover:bg-purple-750 text-white rounded-xl text-xs font-black transition-all cursor-pointer"
            >
              ذخیره تمامی تنظیمات عمومی
            </button>
          </div>

          {/* Site Maintenance Mode Switch */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-rose-600 dark:text-rose-400 flex items-center gap-1.5 pb-2 border-b border-rose-50 dark:border-rose-950">
              <ShieldAlert className="w-5 h-5" />
              <span>منطقه بحرانی: حالت تعمیرات سراسری سایت (Maintenance)</span>
            </h3>

            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed font-semibold block">
              با روشن کردن کلید زیر، کل صفحات وبسایت نکس‌ایمیج برای تمامی کاربران عادی مسدود شده و با ظاهر زیبای تعمیرات عمومی با پیام تماسی جایگزین می‌گردد. ادمین‌های مشخص‌شده کماکان می‌توانند با حساب خود وارد بخش‌های درونی شوند.
            </p>

            <div className="p-4 rounded-xl border border-rose-100 dark:border-rose-950 bg-rose-50/45 dark:bg-rose-950/10 flex justify-between items-center">
              <div className="text-right space-y-0.5">
                <span className="text-xs font-black text-slate-800 dark:text-slate-200">فعال‌سازی وضعیت تعمیرات</span>
                <p className="text-[9px] text-slate-420 dark:text-slate-500">محدود کردن دسترسی کاربران وبگاه موقتاً</p>
              </div>

              <button
                onClick={() => {
                  const mode = !config.isMaintenanceMode;
                  onUpdateConfig({
                    ...config,
                    isMaintenanceMode: mode
                  });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  config.isMaintenanceMode
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {config.isMaintenanceMode ? 'وضعیت تعمیرات: فعال' : 'وضعیت تعمیرات: غیرفعال'}
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
