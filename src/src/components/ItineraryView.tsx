import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Bus, Clock, Compass, Hotel, Info, MapPin, Plane, Search, Utensils } from 'lucide-react';
import { DayItinerary, ItineraryEvent } from '../types';

interface ItineraryViewProps {
  itinerary: DayItinerary[];
  onUpdateItinerary: (itinerary: DayItinerary[]) => void;
}

const periods = [
  { key: 'morning', label: '上午', range: '07:00 - 11:30', start: 7, end: 11.5 },
  { key: 'noon', label: '中午', range: '11:30 - 13:00', start: 11.5, end: 13 },
  { key: 'afternoon', label: '下午', range: '13:00 - 17:00', start: 13, end: 17 },
  { key: 'evening', label: '晚上', range: '17:00 - 00:00', start: 17, end: 24 }
];

const timeSlots = Array.from({ length: 35 }, (_, index) => {
  const totalMinutes = 7 * 60 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
});

export default function ItineraryView({ itinerary }: ItineraryViewProps) {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const filteredItinerary = useMemo(() => {
    if (!normalizedQuery) return itinerary;
    return itinerary
      .map(day => ({
        ...day,
        events: day.events.filter(event =>
          [event.label, event.desc, event.location, event.note].some(value =>
            value?.toLowerCase().includes(normalizedQuery)
          )
        )
      }))
      .filter(day => day.events.length > 0);
  }, [itinerary, normalizedQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-[1080px] px-4 py-5 pb-28 md:px-8"
    >
      <section className="sticky top-16 z-40 -mx-4 border-b border-outline-variant bg-surface/95 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">四天行程總覽</h2>
            <p className="mt-1 text-xs font-semibold text-on-surface-variant">07:00 - 00:00，每 30 分鐘一格，依上午、中午、下午、晚上分層。</p>
          </div>
          <div className="relative md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="搜尋行程、地點或備註"
              className="h-11 w-full rounded-lg border border-outline-variant bg-white pl-9 pr-3 text-sm font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {itinerary.map(day => (
          <a
            key={day.dayNum}
            href={`#day-${day.dayNum}`}
            className="shrink-0 rounded-full border border-outline-variant bg-white px-4 py-2 text-xs font-extrabold text-on-surface-variant shadow-xs transition hover:border-primary hover:text-primary"
          >
            D{day.dayNum} {day.date}
          </a>
        ))}
      </div>

      <div className="mt-6 space-y-10">
        {filteredItinerary.map(day => (
          <DayBlock key={day.dayNum} day={day} />
        ))}
      </div>
    </motion.div>
  );
}

function DayBlock({ day }: { day: DayItinerary }) {
  return (
    <section id={`day-${day.dayNum}`} className="scroll-mt-40">
      <div className="mb-4 rounded-xl border border-outline-variant bg-white p-4 shadow-xs">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-extrabold text-primary">Day {day.dayNum}</p>
            <h3 className="text-2xl font-extrabold tracking-tight">{day.date} 星期{day.dayOfWeek}</h3>
          </div>
          <p className="text-sm font-bold text-on-surface-variant">{day.title}</p>
        </div>
      </div>

      <div className="space-y-6">
        {periods.map(period => {
          const slots = timeSlots.filter(slot => {
            const value = toHour(slot);
            return value >= period.start && value < period.end;
          });

          return (
            <div key={period.key} className="rounded-xl border border-outline-variant bg-white shadow-xs">
              <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-4 py-3">
                <h4 className="text-sm font-extrabold text-primary">{period.label}</h4>
                <span className="text-xs font-bold text-on-surface-variant">{period.range}</span>
              </div>

              <div className="divide-y divide-outline-variant/50">
                {slots.map(slot => {
                  const event = day.events.find(item => item.time === slot);

                  return (
                    <div key={slot} className="grid min-h-16 grid-cols-[64px_1fr] gap-3 px-4 py-3 md:grid-cols-[84px_1fr]">
                      <div className="font-mono text-xs font-bold text-on-surface-variant">{slot}</div>
                      {event ? <EventCard event={event} /> : <div className="border-l border-dashed border-outline-variant pl-4 text-xs font-semibold text-on-surface-variant/35">空白時段</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: ItineraryEvent }) {
  const Icon = getIcon(event.type);

  return (
    <article className="rounded-lg border border-primary/15 bg-surface-container-low p-3 shadow-xs">
      <div className="flex items-start gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${getIconClass(event.type)}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h5 className="text-sm font-extrabold text-on-surface">{event.label}</h5>
            {event.endTime && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-on-surface-variant">
                <Clock className="h-3 w-3" />
                {event.time} - {event.endTime}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-medium leading-6 text-on-surface-variant">{event.desc}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {event.location && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[11px] font-bold text-on-surface-variant">
                <MapPin className="h-3 w-3 text-secondary" />
                {event.location}
              </span>
            )}
            {event.note && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[11px] font-bold text-on-surface-variant">
                <Info className="h-3 w-3 text-primary" />
                {event.note}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function toHour(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
}

function getIcon(type: ItineraryEvent['type']) {
  switch (type) {
    case 'flight':
      return Plane;
    case 'transport':
      return Bus;
    case 'food':
      return Utensils;
    case 'hotel':
      return Hotel;
    case 'active':
      return Compass;
    default:
      return Info;
  }
}

function getIconClass(type: ItineraryEvent['type']) {
  switch (type) {
    case 'flight':
      return 'bg-primary text-white';
    case 'transport':
      return 'bg-tertiary text-white';
    case 'food':
      return 'bg-secondary text-white';
    case 'hotel':
      return 'bg-primary-container text-white';
    case 'active':
      return 'bg-secondary-container text-on-secondary-container';
    default:
      return 'bg-white text-primary';
  }
}
