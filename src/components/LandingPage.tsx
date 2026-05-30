import React, { useState } from 'react';
import { Sparkles, Download, ArrowLeft, Layers, HelpCircle, HardDrive, ShieldCheck, Star, Bot, ExternalLink, Eye, ArrowRight, Wallet } from 'lucide-react';
import { StockProduct, StockSource } from '../types';

interface LandingPageProps {
  products: StockProduct[];
  onSelectProduct: (p: StockProduct) => void;
  onNavigateToConverter: () => void;
  onNavigateToCatalog: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
}

export default function LandingPage({
  products,
  onSelectProduct,
  onNavigateToConverter,
  onNavigateToCatalog,
  onLogin,
  isLoggedIn
}: LandingPageProps) {
  
  // Local active stock logo filter to highlight info about each stock on landing
  const [selectedStockLogo, setSelectedStockLogo] = useState<StockSource>('freepik');

  const destinationStocks = [
    { id: 'freepik' as StockSource, name: 'Freepik', faName: 'فری‌پیک', desc: 'بزرگترین مرجع دانلود وکتور، عکس‌های استریل و طرح‌های PSD لایه‌باز لایت‌روم.', url: 'freepik.com', color: 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20' },
    { id: 'shutterstock' as StockSource, name: 'Shutterstock', faName: 'شاتراستوک', desc: 'آرشیو عظیم میلیون‌ها عکس فوق حرفه‌ای، فیلم خام صنعتی، موسیقی و تصاویر ایلوستریتور.', url: 'shutterstock.com', color: 'border-red-500 text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20' },
    { id: 'envato' as StockSource, name: 'Envato Elements', faName: 'انواتو المنتز', desc: 'دسترسی نامحدود به قالب‌های وب‌سایت، گرافیک لایه‌باز، آیکون‌های سه‌بعدی و اکشن‌های فتوشاپ.', url: 'elements.envato.com', color: 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' },
    { id: 'adobe' as StockSource, name: 'Adobe Stock', faName: 'ادوبی استوک', desc: 'کتابخانه لوکس شرکت ادوبی با سازگاری ۱۰۰٪ با ابزارهای فتوشاپ، ایلوستریتور و ایندیزاین.', url: 'stock.adobe.com', color: 'border-rose-600 text-rose-600 dark:text-rose-450 bg-rose-50/50 dark:bg-rose-950/20' },
    { id: 'vecteezy' as StockSource, name: 'Vecteezy', faName: 'وکتیزی', desc: 'مرکز تخصصی وکتورهای برداری با کیفیت خارق‌العاده، گرافیک‌های SVG و الگوهای تذهیب ایرانی.', url: 'vecteezy.com', color: 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20' },
    { id: 'istock' as StockSource, name: 'iStock', faName: 'آی‌استوک', desc: 'سورس لوکس عکس‌های باکیفیت و انحصاری متعلق به گتی ایمیجز با مجوزهای جهانی صادرشده.', url: 'istockphoto.com', color: 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/20' },
  ];

  return (
    <div className="space-y-20 pb-20 animate-fade-in" id="landing-page-component">
      
      {/* 1. HERO SECTION & SHAPES */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16">
        {/* Soft floating background light blobs */}
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* Decorative Grid Line */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100/80 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-black animate-bounce shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نکس‌ایمیج: هوش مصنوعی و دانلودر زنجیره‌ای تصاویر استوک دنیا</span>
          </div>

          {/* Main Display Typography Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight md:leading-snug max-w-4xl mx-auto font-sans tracking-tight">
            تبدیل مستقیم و بی‌‌واسطه لینک‌های پرمیوم به <span className="bg-gradient-to-l from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">بارگیری مستقیم</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold">
            دیگر نیازی به خرید اشتراک‌های دلاری و سنگین سایت‌های خارجی ندارید! پیوند فایل مدنظر خود را وارد کنید، عیارسنجی کنید و با پرداخت چند سکه ناچیز، فایل گرافیکی سورس‌اصلی را مستقیماً دریافت کنید یا در <span className="text-emerald-600 dark:text-emerald-400 font-bold">گوگل درایو</span> ذخیره کنید.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={onNavigateToConverter}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-l from-emerald-600 to-teal-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-500/20 hover:scale-102 hover:shadow-xl hover:shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>برو به مبدل لینک</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>
            
            <button
              onClick={onNavigateToCatalog}
              className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>مشاهده و کاتالوگ استوک</span>
            </button>
          </div>

          {/* Custom stats counters */}
          <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto text-right">
            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 backdrop-blur-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">تبدیل بلادرنگ</span>
                <span className="text-xs font-black font-mono text-slate-800 dark:text-slate-105">کمتر از ۵ ثانیه</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 backdrop-blur-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                ☁
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">انتقال مستقیم</span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-105">Google Drive Sync</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 backdrop-blur-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                ★
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">سایت‌های مقصد</span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-105">۶ منبع پرمیوم بزرگ</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 backdrop-blur-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                ☝
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">هر تبدیل لینک</span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-105">فقط ۱ الی ۲ سکه</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LANDING: INTERACTIVE STOCK DESTINATION GRAPHIC LOGOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="destination-stocks-logos">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
            <Layers className="w-5 h-5 text-emerald-500" />
            <span>پشتیبانی از معتبرترین مخازن فایل‌های گرافیکی لایه‌باز</span>
          </h2>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">برای مشاهده ابزارها و قابلیت‌های اختصاصی، بر روی لوگوی هر سایت کلیک کنید</p>
        </div>

        {/* Brand Logos Slider Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinationStocks.map((stock) => {
            const isActive = selectedStockLogo === stock.id;
            return (
              <button
                key={stock.id}
                onClick={() => setSelectedStockLogo(stock.id)}
                className={`py-4 px-6 rounded-2xl border text-center transition-all cursor-pointer relative focus:outline-none flex flex-col items-center justify-center gap-2 ${
                  isActive 
                    ? `${stock.color} scale-102 ring-2 ring-emerald-500/25` 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="font-mono text-xs font-black block uppercase tracking-wider">{stock.name}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">{stock.faName}</span>
                {isActive && (
                  <span className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Brand Custom Detail Display */}
        {(() => {
          const activeStock = destinationStocks.find(s => s.id === selectedStockLogo);
          if (!activeStock) return null;
          return (
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-right space-y-4 animate-fade-in">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    ★
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-800 dark:text-slate-150">دستیار پیوند وب‌سایت {activeStock.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">{activeStock.url}</span>
                  </div>
                </div>

                <div className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  نرخ تبدیل: ۱ سکه هر دانلود طرح
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                {activeStock.desc} نکس‌ایمیج با پروتکل‌های اتصال از راه دور پروکسی استوک، درخواست دانلود شما را دریافت کرده و پس از اعتبارسنجی سرور مبدا، در قالب فشرده با سرعت صاعقه به مخزن محلی شما روانه می‌کند.
              </p>
            </div>
          );
        })()}
      </section>

      {/* 3. CORE SERVICES & VALUES - ADVANCED LANDING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">چرا طراحان و آژانس‌های تبلیغاتی نکس‌‌ایمیج را ترجیح می‌دهند؟</h2>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">مجموعه بی‌نظیری از امکانات پیشرفته گرافیکی در یک پنل یکپارچه مستقل</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 space-y-4 hover:-translate-y-1 transition-all duration-200 group">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">ذخیره‌سازی ابری Google Drive</h3>
            <p className="text-xs text-slate-500 dark:text-slate-405 leading-relaxed font-semibold">
              شما می‌توانید بلافاصله پس از تبدیل لینک‌های خود، فایل خروجی را مستقیماً در حساب کاربری گوگل درایو خود همگام‌سازی کنید. ذخیره سریع و امن با لایسنس اصلی.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 space-y-4 hover:-translate-y-1 transition-all duration-200 group col-span-1">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">ربات تلگرام و بله هوشمند</h3>
            <p className="text-xs text-slate-500 dark:text-slate-405 leading-relaxed font-semibold">
              علاوه بر وبسایت، می‌توانید کدهای محصول یا پیوندهای استوک خود را به ربات کاربری نکس‌ایمیج تلگرام بفرستید تا حساب کاربری شما را شارژ کرده و خروجی را به شما پیام دهد.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 space-y-4 hover:-translate-y-1 transition-all duration-200 group">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">تیم پشتیبانی ۲۴ ساعته برخط</h3>
            <p className="text-xs text-slate-500 dark:text-slate-405 leading-relaxed font-semibold">
              در صورت بروز هرگونه مشکل فنی در استخراج فایل یا پرداخت‌ها، سامانه تیکتینگ ۲۴ ساعته در داشبورد شما فعال است تا پاسخگوی آنی سوالات شما کاربران گرامی باشد.
            </p>
          </div>

        </div>
      </section>

      {/* 4. PUBLIC EXAMPLES CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="landing-featured-catalog">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-right">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">طرح‌های پردانلود و کاتالوگ‌های آماده ویژه طراحان ایرانی</h2>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">برای تماشای ابعاد تصویر، متادیتا و جزئیات تگ‌ها، روی کارت هر تصویر کلیک نمایید</p>
          </div>

          <button
            onClick={onNavigateToCatalog}
            className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-705 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none"
          >
            <span>نمایش کل گالری طرح‌ها</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Public Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group text-right flex flex-col h-full"
            >
              {/* Product Thumbnail inside landing */}
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-all duration-350"
                  loading="lazy"
                />
                
                {/* Source Badge on Image top */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-white text-[9px] font-black uppercase font-mono tracking-wider">
                    {product.stockType}
                  </span>
                </div>

                {/* Coin Badge on Image bottom */}
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-black flex items-center gap-1">
                    <Wallet className="w-3 h-3" />
                    <span>{product.coinsPrice} سکه</span>
                  </span>
                </div>
              </div>

              {/* Product Body details */}
              <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Product Footer tools */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-450 dark:text-slate-500 font-bold shrink-0">
                  <div className="flex items-center gap-1">
                    <span>فرمت:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{product.codec || '.JPG'}</span>
                  </div>

                  <div className="flex items-center gap-1 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                    <span>مشاهده جزئیات بیشتر</span>
                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER / GET STARTED CALLOUT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 relative shadow-xs" id="cta-footer-callout">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white text-center space-y-6 overflow-hidden relative">
          
          {/* subtle decoration orb inside block */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
          
          <h2 className="text-xl sm:text-2xl font-black">هنوز تصمیمی نگرفته‌اید؟ حساب کاربری تستی بسازید!</h2>
          <p className="text-[11px] sm:text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            با ساخت حساب کاربری جدید به ایمیل خودتان، به صورت خودکار <span className="text-emerald-400 font-black">۱۵ کوین هدیه خوش‌آمدگویی</span> از نکس‌ایمیج دریافت می‌کنید و می‌توانید اولین لینک پرمیوم خود را رایگان تبدیل کنید.
          </p>

          <div className="pt-2">
            {!isLoggedIn ? (
              <button
                onClick={onLogin}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                ثبت نام و دریافت هدیه خوش‌آمدگویی (15 کوین رایگان)
              </button>
            ) : (
              <button
                onClick={onNavigateToConverter}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-black transition-all cursor-pointer border border-slate-700"
              >
                آغاز سریع تبدیل لینک در داشبورد مبارک
              </button>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
