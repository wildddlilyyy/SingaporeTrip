import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertOctagon, FileText, KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';
import { PassengerInfo } from '../types';

interface PassengerViewProps {
  passenger: PassengerInfo;
  onUpdatePassenger: (passenger: PassengerInfo) => void;
  isUnlocked: boolean;
  onUnlock: (password: string) => boolean;
  onLock: () => void;
}

const driveFolderUrl = 'https://drive.google.com/drive/folders/1MRQGVwNV8cXfE1VRXCvHnrw5nnKSFvqU';
const itineraryDocUrl = 'https://docs.google.com/document/d/10rHgCUbUEw4hRUUiK5QX6iI7aib-VQlppWzj1sm6g7Y';
const hotelPdfUrl = 'https://drive.google.com/file/d/1mLCuMrh_u-1wYqhC8io_Hvh2hLGnLgKm/view';
const ticketPdfUrl = 'https://drive.google.com/file/d/1yBDxHM3Lzq4VJCMoI28yC2ZhYOKAIRRK/view';
const zooPdfUrl = 'https://drive.google.com/file/d/15romfFph7Gt1l-bn1l_Tps165Qrjg0lo/view';
const birdPdfUrl = 'https://drive.google.com/file/d/1RsKl0UY0LiS2iujVmXRzG0qdo_qaWqXj/view';
const curiosityPdfUrl = 'https://drive.google.com/file/d/1bVW63LL5VkK_KnhfHT43mEsOEZvYWI8P/view';

const documents = [
  {
    label: 'Google Drive',
    title: 'SingaporeTrip 2026 新加坡旅遊資料',
    note: '所有正式附件與行程資料統一放在這裡',
    url: driveFolderUrl,
    primary: true
  },
  {
    label: '行程總覽',
    title: 'SingaporeTrip 2026 行程資料總覽',
    note: '乾淨版行程、航班、飯店與出發提醒',
    url: itineraryDocUrl
  },
  { label: '旅行社主資料', title: '自由行訂購明細與飯店資料', note: '含飯店、訂單窗口、注意事項', url: hotelPdfUrl },
  { label: '電子機票', title: 'BR215 / BR216 電子機票', note: '航班、航廈、行李與訂位資訊', url: ticketPdfUrl },
  { label: '園區門票', title: '新加坡動物園門票', note: '2026/07/23 08:30-17:00', url: zooPdfUrl },
  { label: '園區門票', title: '飛禽公園門票', note: '2026/07/24 09:00-17:00', url: birdPdfUrl },
  { label: '票券', title: '好奇心之灣電子票', note: '2026/07/24 17:30 入場', url: curiosityPdfUrl }
];

export default function PassengerView({ isUnlocked, onUnlock }: PassengerViewProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (onUnlock(password)) {
      setPassword('');
      return;
    }

    setPassword('');
    setError('密碼不正確，請重新輸入。');
  };

  if (!isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mx-auto flex min-h-[72vh] max-w-[480px] flex-col justify-center px-4 pb-28 pt-8"
      >
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-md">
            <LockKeyhole className="h-9 w-9" />
          </div>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight">旅客資訊已鎖定</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-on-surface-variant">
            敏感資料不放在網站內。解鎖後只顯示 Google Drive 附件入口。
          </p>
        </div>

        <form onSubmit={handleUnlock} className="mt-7 rounded-xl border border-outline-variant bg-white p-5 shadow-md">
          <label className="text-xs font-extrabold uppercase tracking-wider text-primary" htmlFor="passenger-password">
            查看密碼
          </label>
          <div className="relative mt-2">
            <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
            <input
              id="passenger-password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              className="h-11 w-full rounded-lg border border-outline-variant bg-white pl-9 pr-3 text-sm font-semibold tracking-widest outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="請輸入密碼"
              required
            />
          </div>
          {error && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-error">
              <AlertOctagon className="h-3.5 w-3.5" />
              {error}
            </p>
          )}
          <button className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-extrabold text-white transition hover:bg-primary-container">
            <ShieldCheck className="h-4 w-4" />
            解鎖查看
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-[1040px] space-y-6 px-4 py-6 pb-28 md:px-8"
    >
      <div className="rounded-xl border border-secondary/20 bg-secondary-container p-4 text-on-secondary-container">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6" />
          <div>
            <h2 className="font-extrabold">已解鎖雲端附件入口</h2>
            <p className="mt-0.5 text-xs font-semibold">敏感資料不放在網站內，請到 Google Drive 資料夾查看附件。</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documents.map(item => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className={`grid min-h-36 gap-2 rounded-lg border border-outline-variant bg-white p-5 text-on-surface no-underline shadow-xs transition hover:-translate-y-0.5 hover:border-primary/40 ${
              item.primary ? 'bg-gradient-to-br from-primary/10 to-secondary/10' : ''
            }`}
          >
            <span className="flex items-center gap-2 text-xs font-extrabold text-primary">
              <FileText className="h-4 w-4" />
              {item.label}
            </span>
            <strong className="text-lg leading-snug">{item.title}</strong>
            <small className="text-sm font-semibold leading-6 text-on-surface-variant">{item.note}</small>
          </a>
        ))}
      </div>
    </motion.section>
  );
}
