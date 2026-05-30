import React, { useState } from 'react';
import { 
  X, Wallet, HardDrive, Download, ShieldCheck, Tag, HelpCircle, CheckCircle2, 
  ExternalLink, Eye, RefreshCw, AlertTriangle 
} from 'lucide-react';
import { StockProduct, User } from '../types';

interface ProductDetailsModalProps {
  product: StockProduct;
  user: User | null;
  onClose: () => void;
  onDownload: (productId: string, platformLink?: string) => void;
  onLogin: () => void;
}

export default function ProductDetailsModal({
  product,
  user,
  onClose,
  onDownload,
  onLogin
}: ProductDetailsModalProps) {
  const [driveSyncState, setDriveSyncState] = useState<'idle' | 'auth' | 'uploading' | 'completed' | 'error'>('idle');
  const [driveProgress, setDriveProgress] = useState(0);

  const canAfford = user ? user.walletCoins >= product.coinsPrice : false;

  // Handle standard download
  const handleDownload = () => {
    if (!user) {
      onLogin();
      return;
    }
    if (!canAfford) {
      alert('موجودی کوین‌های شما برای دریافت این فایل کافی نیست. لطفاً کیف پول خود را شارژ نمایید.');
      return;
    }
    onDownload(product.id);
  };

  // Google Drive Upload Flow with real scope logic simulation
  const handleSaveToGoogleDrive = () => {
    if (!user) {
      onLogin();
      return;
    }
    if (!canAfford) {
      alert('موجودی کوین شما کافی نیست.');
      return;
    }
    
    // First, deduct the coins/register transaction via onDownload
    onDownload(product.id, `Google Drive Saved: ${product.title}`);

    setDriveSyncState('auth');
    setDriveProgress(10);

    // Dynamic Multi-step upload with simulated progress
    setTimeout(() => {
      setDriveSyncState('uploading');
      setDriveProgress(30);
    }, 1500);

    setTimeout(() => {
      setDriveProgress(60);
    }, 3000);

    setTimeout(() => {
      setDriveProgress(90);
    }, 4500);

    setTimeout(() => {
      setDriveSyncState('completed');
      setDriveProgress(100);
    }, 5500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 overflow-y-auto flex items-center justify-center p-4 backdrop-blur-xs" id="product-details-lightbox">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl max-w-2xl w-full text-right p-6 relative space-y-6 animate-scale-up" dir="rtl">
        
        {/* Absolute Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-705 transition-all text-slate-500 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800 text-right">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase font-mono">
            {product.stockType}
          </span>
          <h2 className="text-sm font-black text-slate-850 dark:text-white line-clamp-1">{product.title}</h2>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Thumbnail view */}
          <div className="rounded-2xl overflow-hidden aspect-video relative bg-slate-100 dark:bg-slate-800">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Product data specs */}
          <div className="space-y-4 text-xs font-semibold text-slate-650 dark:text-slate-350">
            
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">توضیحات و مجوز فشرده طرح:</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {product.description} این فایل گرافیکی لایه‌باز با عیارسنجی اصلی و رعایت حریم کپی‌رایت سازمان استوک بین‌المللی آماده دانلود خریداران گرامی است.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[9px] text-slate-400 font-bold block">فرمت فایل پسوند:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white font-mono">{product.codec || '.JPG'}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold block">وضوح تصویر (رزولوشن):</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white font-mono">{product.dimensions || '5400 x 3600 PX'}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold block">آپلودر اصلی:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white">{product.creator}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold block">بهای بارگیری (کوین):</span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{product.coinsPrice} کوین</span>
              </div>
            </div>

          </div>

        </div>

        {/* Action Panel Buttons & Google Drive Pipeline */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Standard conversion/download button */}
            <button
              onClick={handleDownload}
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 text-white rounded-2xl text-xs font-black shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
            >
              <Download className="w-4 h-4" />
              <span>پرداخت و دانلود مستقیم ({product.coinsPrice} سکه)</span>
            </button>

            {/* Save to Google Drive Integration */}
            <button
              onClick={handleSaveToGoogleDrive}
              className="flex-1 py-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs font-black hover:bg-emerald-100 transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
              title="ذخیره‌سازی به حساب گوگل درایو شخصی"
            >
              <HardDrive className="w-4 h-4" />
              <span>ذخیره مستقیم در Google Drive شما</span>
            </button>

          </div>

          {/* Google Drive upload feedback panel */}
          {driveSyncState !== 'idle' && (
            <div className="p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/10 space-y-3 font-semibold animate-fade-in text-xs">
              
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-305 font-bold">
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
                  {driveSyncState === 'auth' && 'درگاه اهراز هویت Google Drive OAuth...'}
                  {driveSyncState === 'uploading' && 'در حال اتصال و همگام‌سازی فایل در مخزن ابری درایو...'}
                  {driveSyncState === 'completed' && 'با موفقیت در Drive شما آپلود شد!'}
                </span>
                <span className="font-mono">{driveProgress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${driveProgress}%` }}
                ></div>
              </div>

              {driveSyncState === 'completed' && (
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-300 pt-1 border-t border-emerald-100/50">
                  <span>فایل با موفقیت در پوشه مراجع NexImage ذخیره گردید و آماده دسترسی است.</span>
                  
                  <a 
                    href="https://drive.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>باز کردن پنل درایو من</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
