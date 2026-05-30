import React, { useState } from 'react';
import { 
  User as UserIcon, Wallet, Layers, HelpCircle, HardDrive, ShieldCheck, Mail, Calendar, 
  ArrowLeft, CreditCard, CheckCircle2, History, MessageCircle, PlusCircle, ExternalLink 
} from 'lucide-react';
import { User, Transaction, SupportTicket } from '../types';

interface UserDashboardProps {
  user: User;
  tickets: SupportTicket[];
  transactions: Transaction[];
  onAddTicket: (subject: string, message: string) => void;
  onChargeWallet: (coins: number, amountToman: number) => void;
}

export default function UserDashboard({
  user,
  tickets,
  transactions,
  onAddTicket,
  onChargeWallet
}: UserDashboardProps) {
  const [dashTab, setDashTab] = useState<'wallet' | 'tickets' | 'history'>('wallet');

  // New ticket state
  const [newSubject, setNewSubject] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Selected ticket for user chat view
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [userChatInput, setUserChatInput] = useState('');

  // Payment gateway mockup triggers
  const [showInvoiceCoins, setShowInvoiceCoins] = useState<number | null>(null);
  const [showInvoiceToman, setShowInvoiceToman] = useState<number | null>(null);
  const [paymentSuccessPopup, setPaymentSuccessPopup] = useState(false);

  const userTickets = tickets.filter(t => t.userId === user.id);
  const userTransactions = transactions.filter(t => t.userId === user.id);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMsg.trim()) return;
    onAddTicket(newSubject.trim(), newMsg.trim());
    setNewSubject('');
    setNewMsg('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  const currentChatTicket = tickets.find(t => t.id === selectedTicketId);

  const coinPackages = [
    { coins: 20, priceToman: 19000, label: 'بسته نقره‌‌ای استارتر' },
    { coins: 100, priceToman: 79000, label: 'بسته طلایی پر کاربردی (محبوب)' },
    { coins: 500, priceToman: 299000, label: 'بسته الماس ویژه شرکت‌ها و کانون‌ها' },
  ];

  const triggerPaymentSimulator = (coins: number, تومان: number) => {
    setShowInvoiceCoins(coins);
    setShowInvoiceToman(تومان);
  };

  const handleConfirmPaymentMockup = () => {
    if (showInvoiceCoins && showInvoiceToman) {
      onChargeWallet(showInvoiceCoins, showInvoiceToman);
      setShowInvoiceCoins(null);
      setShowInvoiceToman(null);
      setPaymentSuccessPopup(true);
      setTimeout(() => setPaymentSuccessPopup(false), 4000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-right animate-fade-in" dir="rtl" id="user-dashboard-hub">
      
      {/* 1. Profile Sidebar details */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 space-y-6 lg:col-span-1">
        
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="w-18 h-18 rounded-full border-2 border-emerald-500/40 object-cover" 
          />
          <div>
            <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase">{user.username}</h2>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mt-0.5">{user.email}</span>
          </div>
        </div>

        {/* stats mini */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/40 text-center space-y-1">
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">موجودی سکه فعلی شما</span>
          <p className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">{user.walletCoins} کوین</p>
        </div>

        {/* Metadata stats */}
        <div className="space-y-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex justify-between items-center bg-slate-55 dark:bg-slate-850 p-2.5 rounded-xl">
            <span>تاریخ عضویت:</span>
            <span className="text-slate-700 dark:text-slate-300 font-bold">۲ روز پیش</span>
          </div>
          <div className="flex justify-between items-center bg-slate-55 dark:bg-slate-850 p-2.5 rounded-xl">
            <span>نوع کاربری:</span>
            <span className="text-slate-700 dark:text-slate-300 font-bold">{user.isAdmin ? 'سرپرست' : 'کاربر عادی'}</span>
          </div>
        </div>

        {/* Sidebar Tabs */}
        <div className="space-y-1 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setDashTab('wallet')}
            className={`w-full text-right px-4.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer focus:outline-none transition-all ${
              dashTab === 'wallet' ? 'bg-emerald-650 text-white shadow-md shadow-emerald-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Wallet className="w-4 h-4 text-emerald-550" />
            <span>شارژ کیف پول و صورت‌حساب</span>
          </button>

          <button
            onClick={() => setDashTab('tickets')}
            className={`w-full text-right px-4.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer focus:outline-none transition-all ${
              dashTab === 'tickets' ? 'bg-emerald-650 text-white shadow-md shadow-emerald-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-555" />
            <span>پشتیبانی و تیکت‌ها</span>
          </button>

          <button
            onClick={() => setDashTab('history')}
            className={`w-full text-right px-4.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer focus:outline-none transition-all ${
              dashTab === 'history' ? 'bg-emerald-650 text-white shadow-md shadow-emerald-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>گزارش تراکنش‌ها و خریدها</span>
          </button>
        </div>

      </div>

      {/* 2. Main Dashboard Tab View panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 lg:col-span-3 space-y-6">
        
        {/* ==================== TAB A: COIN BUNDLES & CHARGING ==================== */}
        {dashTab === 'wallet' && (
          <div className="space-y-6 animate-fade-in" id="wallet-management-tab">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-800 dark:text-white">جدول بسته‌های کوینی نکس‌‌ایمیج</h3>
              <p className="text-[10px] text-slate-450 dark:text-slate-500">سکه را خریداری کرده و با استفاده از آن فوراً لینک‌های پرمیوم را استخراج کنید</p>
            </div>

            {/* list packages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coinPackages.map((pack) => (
                <div 
                  key={pack.coins} 
                  className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-850/50 space-y-4 hover:border-emerald-500 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold block">{pack.label}</span>
                    <h4 className="text-sm font-black text-slate-800 dark:text-emerald-400">{pack.coins} سکه کیف پول</h4>
                    <p className="text-[10px] text-slate-450 dark:text-slate-400 leading-relaxed font-semibold">مناسب برای تبدیل مستقیم {pack.coins} طرح یا وکتور لایه‌باز استوک مبدا.</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-black font-mono text-slate-855 dark:text-white block">{pack.priceToman.toLocaleString('fa-IR')} تومان</span>
                    
                    <button
                      onClick={() => triggerPaymentSimulator(pack.coins, pack.priceToman)}
                      className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black tracking-normal transition-all cursor-pointer text-center block"
                    >
                      خرید و شارژ من
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* simulated list of recent payments or transactions */}
            <div className="space-y-3 pt-4">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold block">فاکتورهای پرداخت اخیر شما</span>
              <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
                <table className="w-full text-xs text-right whitespace-nowrap">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-extrabold border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="py-2 px-4">مبلغ فاکتور</th>
                      <th className="py-2 px-4">تعداد سکه شارژ شده</th>
                      <th className="py-2 px-4">درگاه بانکی</th>
                      <th className="py-2 px-4 text-left">وضعیت پرداخت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850 font-bold text-slate-700 dark:text-slate-400">
                    {userTransactions.filter(t => t.type === 'charge').length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-400">تراکنش خریدی ثبت نگردیده است!</td>
                      </tr>
                    ) : (
                      userTransactions.filter(t => t.type === 'charge').map((trans) => (
                        <tr key={trans.id}>
                          <td className="py-2 px-4 font-mono">{trans.description.match(/\d+/) ? `${trans.description.match(/\d+/)} تومان` : '۵۰,۰۰۰ تومان'}</td>
                          <td className="py-2 px-4 text-emerald-550 dark:text-emerald-400">+{trans.amountCoins} سکه هدیه</td>
                          <td className="py-2 px-4 font-black">درگاه شتاب سامان</td>
                          <td className="py-2 px-4 text-left font-black text-emerald-600">✓ موفقیت آمیز</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB B: REGISTER SUPPORT TICKETS ==================== */}
        {dashTab === 'tickets' && (
          <div className="space-y-6 animate-fade-in" id="ticket-registration-tab">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Add Ticket Form */}
              <div className="p-5 border border-slate-150 dark:border-slate-800 rounded-2xl bg-slate-50/55 dark:bg-slate-850/50 space-y-4">
                <h3 className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                  <PlusCircle className="w-5 h-5 text-emerald-555" />
                  <span>ثبت تیکت پشتیبانی جدید</span>
                </h3>

                {submitSuccess && (
                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold border border-emerald-100 dark:border-emerald-900 animate-pulse">
                    تیکت با موفقیت برای تیم سرپرستی ثبت و ابلاغ شد!
                  </div>
                )}

                <form onSubmit={handleCreateTicket} className="space-y-4 text-right">
                  <div className="space-y-1 text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">موضوع یا مشکل تیکت:</span>
                    <input
                      type="text"
                      required
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      placeholder="امکان تراکنش، تاخیر در دانلود شاتراستوک و ..."
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-750 rounded-xl text-xs text-right outline-none dark:text-white"
                    />
                  </div>

                  <div className="space-y-1 text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">متن و جزئیات تیکت پشتیبانی:</span>
                    <textarea
                      required
                      rows={4}
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value)}
                      placeholder="توضیحات تکمیلی یا مراجع خرید خود را مرقوم بفرمایید"
                      className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-750 rounded-xl text-xs text-right outline-none dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black cursor-pointer transition-all"
                  >
                    ارسال تیکت به سرپرست
                  </button>
                </form>
              </div>

              {/* Registered tickets status */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-850 dark:text-white">پیگیری تیکت‌های پشتیبانی</h3>
                
                {userTickets.length === 0 ? (
                  <p className="text-[11px] text-slate-400 text-center py-10">تیکت پشتیبانی ثبتی ثبت نشده است</p>
                ) : (
                  <div className="space-y-3">
                    {userTickets.map((tc) => (
                      <div key={tc.id} className="p-4 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 rounded-xl flex items-center justify-between text-xs">
                        <div className="space-y-1">
                          <span className="font-extrabold text-slate-800 dark:text-slate-100 block">{tc.subject}</span>
                          <span className="text-[10px] text-slate-400 block font-mono">شناسه: {tc.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                            tc.status === 'open' ? 'bg-red-50 text-red-650' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {tc.status === 'open' ? 'در انتظار سرپرست' : 'بسته شده'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ==================== TAB C: TRANSACTION LOGS TRANSACTION HISTORY ==================== */}
        {dashTab === 'history' && (
          <div className="space-y-4 animate-fade-in" id="history-logs-tab">
            <h3 className="text-xs font-black text-slate-800 dark:text-white">گزارشات کامل تراکنش‌ها و کوین‌ها</h3>
            
            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-xs text-right whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-extrabold border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">موضوع تراکنش</th>
                    <th className="py-3 px-4">تغییر موجودی (کوین)</th>
                    <th className="py-3 px-4 text-left">زمان وقوع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850 font-bold text-slate-700 dark:text-slate-300">
                  {userTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-slate-400">تراکنشی یافت نگردید!</td>
                    </tr>
                  ) : (
                    userTransactions.map((trx) => (
                      <tr key={trx.id}>
                        <td className="py-3 px-4">{trx.description}</td>
                        <td className={`py-3 px-4 font-mono font-black ${
                          trx.type === 'charge' || trx.type === 'reward' ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          {trx.type === 'charge' || trx.type === 'reward' ? '+' : '-'}{trx.amountCoins}
                        </td>
                        <td className="py-3 px-4 text-left font-mono text-[10px] text-slate-450 dark:text-slate-500">
                          {new Date(trx.timestamp).toLocaleTimeString('fa-IR')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ==================== payment simulator popup ==================== */}
      {showInvoiceCoins && showInvoiceToman && (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-6 animate-scale-up" dir="rtl">
            
            <div className="space-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                💳
              </div>
              <h3 className="text-sm font-black text-slate-850 dark:text-white mt-1">تراکنش شاپرک شبیه‌سازی درگاه</h3>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">پرداخت امن کارت‌های عضو شتاب ایران</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-right space-y-2 text-xs font-semibold">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-405">
                <span>توضیح خرید:</span>
                <span>خرید بسته {showInvoiceCoins} کوینی</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-405">
                <span>پذیرنده تراکنش:</span>
                <span>سرورهای نکس‌‌ایمیج</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-2 text-slate-800 dark:text-white font-black">
                <span>مبلغ نهایی:</span>
                <span>{showInvoiceToman.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleConfirmPaymentMockup}
                className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black cursor-pointer"
              >
                تایید و پرداخت فاکتور
              </button>
              <button
                onClick={() => { setShowInvoiceCoins(null); setShowInvoiceToman(null); }}
                className="flex-1 py-2 rounded-xl bg-slate-200 text-slate-705 dark:bg-slate-800 dark:text-slate-300 text-xs font-black cursor-pointer"
              >
                انصراف و خروج
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================== payment success alert toast ==================== */}
      {paymentSuccessPopup && (
        <div className="fixed bottom-4 left-4 z-55 px-4.5 py-3.5 bg-emerald-600 text-white rounded-2xl text-xs font-bold leading-relaxed flex items-center gap-2 shadow-lg animate-fade-in border border-emerald-500">
          <CheckCircle2 className="w-5 h-5 animate-bounce text-white" />
          <span>تراکنش با موفقیت و درگاه شتاب تایید شد! حساب شما شارژ گردید.</span>
        </div>
      )}

    </div>
  );
}
