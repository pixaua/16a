import React, { useState } from 'react';
import {
  Send,
  Instagram,
  Video,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Code2,
  Terminal,
  Award,
} from 'lucide-react';

export const AboutPA: React.FC<{ isBangla?: boolean }> = ({ isBangla = true }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const profile = {
    name: 'Amaz Uddin Abir',
    brandAlias: 'PA (16 A)',
    title: isBangla ? 'ফাউন্ডার ও সফটওয়্যার আর্কিটেক্ট (16 A Portal)' : 'Founder & Software Architect (16 A Portal)',
    bio: isBangla
      ? 'আমি Amaz Uddin Abir (PA), "16 A" ব্রাউজার ও এআই পোর্টালের নির্মাতা ও ডেভেলপার। প্রযুক্তি, কৃত্রিম বুদ্ধিমত্তা, অটোমেশন এবং ফুল-স্ট্যাক ডিজিটাল সলিউশন নিয়ে কাজ করছি।'
      : 'I am Amaz Uddin Abir (PA), creator and lead engineer behind 16 A Portal.',
    telegramUsername: '@amaz_uddin_abir16',
    telegramUrl: 'https://t.me/amaz_uddin_abir16',
    telegramBot: '@wwwjakanaka440_bot',
    telegramBotUrl: 'https://t.me/wwwjakanaka440_bot',
    instagramUsername: '@amaz_uddin_abir_16',
    instagramUrl: 'https://www.instagram.com/amaz_uddin_abir_16',
    tiktokUsername: '@abir_asl_16',
    tiktokUrl: 'https://www.tiktok.com/@abir_asl_16',
    email: 'amazuddinabir@gmail.com',
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-300">
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-cyan-400 via-indigo-600 to-purple-600 p-[3px] shadow-2xl shadow-cyan-500/30">
            <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center text-white">
              <span className="font-extrabold text-3xl sm:text-4xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-400">16 A</span>
              <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-semibold uppercase">DEV BY PA</span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{profile.name}</h1>
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Lead Developer & Creator (PA)
              </span>
            </div>
            <p className="text-sm text-cyan-400 font-mono font-medium">{profile.title}</p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">{profile.bio}</p>
          </div>
        </div>
      </div>

      {/* Social Links Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Telegram */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20"><Send className="w-5 h-5" /></div>
              <div><h3 className="font-semibold text-white text-sm">Telegram Personal ID</h3><p className="text-xs text-sky-400 font-mono font-semibold">{profile.telegramUsername}</p></div>
            </div>
            <button onClick={() => handleCopy(profile.telegramUsername, 'tg')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              {copiedKey === 'tg' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">সরাসরি টেলিগ্রাম চ্যাট</span>
            <a href={profile.telegramUrl} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 font-semibold flex items-center gap-1">কানেক্ট হন <ExternalLink className="w-3.5 h-3.5" /></a>
          </div>
        </div>

        {/* Telegram Bot */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20"><Terminal className="w-5 h-5" /></div>
              <div><h3 className="font-semibold text-white text-sm">Official Telegram Bot</h3><p className="text-xs text-cyan-400 font-mono font-semibold">{profile.telegramBot}</p></div>
            </div>
            <button onClick={() => handleCopy(profile.telegramBot, 'bot')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              {copiedKey === 'bot' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">ডাটা ক্লোন ও অ্যালার্ট বট</span>
            <a href={profile.telegramBotUrl} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-semibold flex items-center gap-1">বট চালু করুন <ExternalLink className="w-3.5 h-3.5" /></a>
          </div>
        </div>

        {/* Instagram */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20"><Instagram className="w-5 h-5" /></div>
              <div><h3 className="font-semibold text-white text-sm">Instagram Profile</h3><p className="text-xs text-pink-400 font-mono font-semibold">{profile.instagramUsername}</p></div>
            </div>
            <button onClick={() => handleCopy(profile.instagramUsername, 'ig')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              {copiedKey === 'ig' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">ইনস্টাগ্রাম প্রোফাইল</span>
            <a href={profile.instagramUrl} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-pink-500/20 text-pink-300 font-semibold flex items-center gap-1">ফলো করুন <ExternalLink className="w-3.5 h-3.5" /></a>
          </div>
        </div>

        {/* TikTok */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20"><Video className="w-5 h-5" /></div>
              <div><h3 className="font-semibold text-white text-sm">TikTok Account</h3><p className="text-xs text-purple-400 font-mono font-semibold">{profile.tiktokUsername}</p></div>
            </div>
            <button onClick={() => handleCopy(profile.tiktokUsername, 'tt')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              {copiedKey === 'tt' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">টিকটক ভিডিও</span>
            <a href={profile.tiktokUrl} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 font-semibold flex items-center gap-1">ভিডিও দেখুন <ExternalLink className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>

      {/* Gmail Contact */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20"><Mail className="w-5 h-5" /></div>
          <div><h3 className="font-semibold text-white text-sm">Official Gmail</h3><p className="text-xs text-cyan-400 font-mono font-semibold">{profile.email}</p></div>
        </div>
        <a href={`mailto:${profile.email}`} className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 text-xs font-semibold">ইমেইল পাঠান</a>
      </div>
    </div>
  );
};
