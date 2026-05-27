import { motion } from 'motion/react';
import {
  CalendarDays,
  CheckCircle2,
  Hotel,
  Leaf,
  MapPin,
  Navigation,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  ShieldCheck,
  Ticket,
  UserRound
} from 'lucide-react';
import { ActiveTab, FlightInfo, HotelInfo } from '../types';

interface HomeViewProps {
  onTabChange: (tab: ActiveTab) => void;
  flights: FlightInfo[];
  onUpdateFlights: (flights: FlightInfo[]) => void;
  hotel: HotelInfo;
  onUpdateHotel: (hotel: HotelInfo) => void;
}

export default function HomeView({ onTabChange, flights, hotel }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-[1180px] space-y-7 px-4 py-5 pb-28 md:px-8"
    >
      <section className="relative flex min-h-[280px] overflow-hidden rounded-xl p-6 shadow-md md:min-h-[360px] md:items-end md:p-8">
        <img
          alt="Singapore skyline"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5" />
        <div className="relative z-10 mt-auto max-w-2xl text-white">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-xs font-bold backdrop-blur">
            <MapPin className="h-3.5 w-3.5" />
            新加坡 4 天行程
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">2026 新加坡旅遊</h2>
          <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-white/90 md:text-base">
            航班、飯店、每日時間軸與旅客重要資訊集中管理，出遊時用手機就能快速查詢。
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <QuickButton icon={CalendarDays} label="每日行程" onClick={() => onTabChange('itinerary')} />
        <QuickButton icon={UserRound} label="旅客資訊" onClick={() => onTabChange('info')} />
        <QuickButton icon={Ticket} label="航班摘要" onClick={() => document.getElementById('flights')?.scrollIntoView({ behavior: 'smooth' })} />
        <QuickButton icon={Hotel} label="飯店資訊" onClick={() => document.getElementById('hotel')?.scrollIntoView({ behavior: 'smooth' })} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <section id="flights" className="space-y-4 scroll-mt-24">
          <SectionTitle icon={PlaneTakeoff} title="航班資訊" extra="已建立去回程" />
          {flights.map(flight => (
            <FlightCard key={flight.type} flight={flight} />
          ))}
        </section>

        <section id="hotel" className="space-y-4 scroll-mt-24">
          <SectionTitle icon={Hotel} title="飯店資訊" extra={`${hotel.nights} 晚`} />
          <div className="overflow-hidden rounded-xl border border-outline-variant bg-white shadow-xs">
            <div className="relative h-44">
              <img alt={hotel.name} className="h-full w-full object-cover" src={hotel.imageUrl} />
              <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-primary shadow-xs">
                2026/7/22 - 7/24
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <h3 className="text-lg font-extrabold text-on-surface">{hotel.name}</h3>
                <p className="mt-1 text-xs font-semibold text-on-surface-variant">{hotel.englishName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 border-y border-outline-variant py-3">
                <InfoTile label="入住" value={hotel.checkIn} />
                <InfoTile label="退房" value={hotel.checkOut} />
              </div>

              <div className="flex flex-wrap gap-2">
                {hotel.features.map(feature => (
                  <span key={feature} className="inline-flex items-center gap-1.5 rounded-md bg-surface-container-high px-2.5 py-1 text-xs font-bold">
                    <Leaf className="h-3.5 w-3.5 text-secondary" />
                    {feature}
                  </span>
                ))}
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ' ' + hotel.address)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-extrabold text-white transition hover:bg-primary-container"
              >
                <Navigation className="h-4 w-4" />
                開啟地圖
              </a>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

function QuickButton({ icon: Icon, label, onClick }: { icon: typeof CalendarDays; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border border-outline-variant bg-white p-4 text-center shadow-xs transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-sm font-extrabold text-on-surface">{label}</span>
    </button>
  );
}

function SectionTitle({ icon: Icon, title, extra }: { icon: typeof PlaneTakeoff; title: string; extra: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-lg font-extrabold">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </h3>
      <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">
        <CheckCircle2 className="h-3.5 w-3.5" />
        {extra}
      </span>
    </div>
  );
}

function FlightCard({ flight }: { flight: FlightInfo }) {
  const Icon = flight.type === 'outbound' ? PlaneTakeoff : PlaneLanding;

  return (
    <article className="rounded-xl border border-outline-variant bg-white p-5 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-bold text-on-surface-variant">{flight.date}</p>
            <h4 className="mt-0.5 text-base font-extrabold">{flight.airline} {flight.flightNo}</h4>
          </div>
        </div>
        <span className="rounded-md bg-surface-container px-2 py-1 text-xs font-bold text-on-surface-variant">{flight.cabinClass}</span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-outline-variant pt-5">
        <AirportTime time={flight.departureTime} code={flight.fromCode} name={flight.fromName} />
        <div className="flex min-w-20 flex-col items-center">
          <span className="mb-1 text-[11px] font-bold text-on-surface-variant">{flight.duration}</span>
          <div className="relative h-px w-full bg-outline-variant">
            <Plane className={`absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 bg-white text-primary ${flight.type === 'return' ? 'rotate-180' : ''}`} />
          </div>
        </div>
        <AirportTime alignRight time={flight.arrivalTime} code={flight.toCode} name={flight.toName} />
      </div>
    </article>
  );
}

function AirportTime({ time, code, name, alignRight = false }: { time: string; code: string; name: string; alignRight?: boolean }) {
  return (
    <div className={alignRight ? 'text-right' : 'text-left'}>
      <p className="text-2xl font-extrabold tracking-tight">{time}</p>
      <p className="mt-0.5 text-xs font-bold text-on-surface-variant">{code}</p>
      <p className="mt-0.5 text-[11px] font-semibold text-on-surface-variant/75">{name}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-on-surface-variant">{label}</p>
      <p className="mt-1 text-sm font-extrabold">{value}</p>
    </div>
  );
}
