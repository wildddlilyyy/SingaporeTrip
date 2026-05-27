import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertOctagon,
  Badge,
  FileText,
  KeyRound,
  LockKeyhole,
  Mail,
  Phone,
  Save,
  ShieldAlert,
  ShieldCheck,
  UserRound
} from 'lucide-react';
import { PassengerInfo } from '../types';

interface PassengerViewProps {
  passenger: PassengerInfo;
  onUpdatePassenger: (passenger: PassengerInfo) => void;
  isUnlocked: boolean;
  onUnlock: (password: string) => boolean;
  onLock: () => void;
}

export default function PassengerView({ passenger, onUpdatePassenger, isUnlocked, onUnlock }: PassengerViewProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [draft, setDraft] = useState<PassengerInfo>(passenger);

  const handleUnlock = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (onUnlock(password)) {
      setPassword('');
      setDraft(passenger);
      return;
    }

    setPassword('');
    setError('密碼不正確，請重新輸入。');
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    onUpdatePassenger(draft);
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
            這裡會放護照、聯絡方式、緊急聯絡人與保險資料。每次進入此頁都需要重新輸入密碼。
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
    <motion.form
      onSubmit={handleSave}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-[1040px] space-y-6 px-4 py-6 pb-28 md:px-8"
    >
      <div className="rounded-xl border border-secondary/20 bg-secondary-container p-4 text-on-secondary-container">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6" />
          <div>
            <h2 className="font-extrabold">已解鎖旅客資訊</h2>
            <p className="mt-0.5 text-xs font-semibold">離開此頁後會自動鎖定，避免敏感資訊留在畫面上。</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="space-y-6">
          <Panel icon={Badge} title="護照與身份資料">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="姓名" value={draft.name} onChange={value => setDraft({ ...draft, name: value })} />
              <Field label="護照號碼" value={draft.passportNo} onChange={value => setDraft({ ...draft, passportNo: value })} />
              <Field label="護照效期" value={draft.expiry} onChange={value => setDraft({ ...draft, expiry: value })} />
              <Field label="出生日期" value={draft.dob} onChange={value => setDraft({ ...draft, dob: value })} />
            </div>
          </Panel>

          <Panel icon={UserRound} title="聯絡方式">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="電話" value={draft.phone} onChange={value => setDraft({ ...draft, phone: value })} icon={Phone} />
              <Field label="Email" value={draft.email} onChange={value => setDraft({ ...draft, email: value })} icon={Mail} />
            </div>
          </Panel>

          <Panel icon={FileText} title="其他重要備註">
            <textarea
              value={draft.notes}
              onChange={event => setDraft({ ...draft, notes: event.target.value })}
              className="min-h-28 w-full resize-none rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm font-medium leading-6 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </Panel>
        </section>

        <section className="space-y-6">
          <Panel icon={ShieldAlert} title="緊急聯絡人">
            <div className="space-y-4">
              <Field label="姓名" value={draft.emergencyName} onChange={value => setDraft({ ...draft, emergencyName: value })} />
              <Field label="關係" value={draft.emergencyRel} onChange={value => setDraft({ ...draft, emergencyRel: value })} />
              <Field label="電話" value={draft.emergencyPhone} onChange={value => setDraft({ ...draft, emergencyPhone: value })} />
            </div>
          </Panel>

          <Panel icon={ShieldCheck} title="保險資訊">
            <div className="space-y-4">
              <Field label="保險公司" value={draft.insuranceCompany} onChange={value => setDraft({ ...draft, insuranceCompany: value })} />
              <Field label="保單號碼" value={draft.insuranceNo} onChange={value => setDraft({ ...draft, insuranceNo: value })} />
              <Field label="海外急難電話" value={draft.insurancePhone} onChange={value => setDraft({ ...draft, insurancePhone: value })} />
            </div>
          </Panel>
        </section>
      </div>

      <div className="sticky bottom-20 flex justify-end">
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-primary-container">
          <Save className="h-4 w-4" />
          儲存旅客資訊
        </button>
      </div>
    </motion.form>
  );
}

function Panel({ icon: Icon, title, children }: { icon: typeof Badge; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-outline-variant bg-white p-5 shadow-xs">
      <div className="mb-5 flex items-center gap-2 border-b border-outline-variant pb-3">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-extrabold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, icon: Icon }: { label: string; value: string; onChange: (value: string) => void; icon?: typeof Phone }) {
  return (
    <label className="block">
      <span className="text-xs font-extrabold text-on-surface-variant">{label}</span>
      <div className="relative mt-1">
        {Icon && <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />}
        <input
          value={value}
          onChange={event => onChange(event.target.value)}
          className={`h-11 w-full rounded-lg border border-outline-variant bg-white px-3 text-sm font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${Icon ? 'pl-9' : ''}`}
        />
      </div>
    </label>
  );
}
