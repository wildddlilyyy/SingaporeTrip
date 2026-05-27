import { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';
import HomeView from './components/HomeView';
import ItineraryView from './components/ItineraryView';
import PassengerView from './components/PassengerView';

import { 
  FlightInfo, 
  HotelInfo, 
  DayItinerary, 
  PassengerInfo, 
  ActiveTab,
  DEFAULT_FLIGHTS,
  DEFAULT_HOTEL,
  DEFAULT_ITINERARY,
  DEFAULT_PASSENGER
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Load and persist state with standard client-side key-value LocalStorage
  const [flights, setFlights] = useState<FlightInfo[]>(() => {
    try {
      const saved = localStorage.getItem('sg_trip_flights');
      return saved ? JSON.parse(saved) : DEFAULT_FLIGHTS;
    } catch {
      return DEFAULT_FLIGHTS;
    }
  });

  const [hotel, setHotel] = useState<HotelInfo>(() => {
    try {
      const saved = localStorage.getItem('sg_trip_hotel');
      return saved ? JSON.parse(saved) : DEFAULT_HOTEL;
    } catch {
      return DEFAULT_HOTEL;
    }
  });

  const [itinerary, setItinerary] = useState<DayItinerary[]>(() => {
    try {
      const saved = localStorage.getItem('sg_trip_itinerary');
      return saved ? JSON.parse(saved) : DEFAULT_ITINERARY;
    } catch {
      return DEFAULT_ITINERARY;
    }
  });

  const [passenger, setPassenger] = useState<PassengerInfo>(() => {
    try {
      const saved = localStorage.getItem('sg_trip_passenger');
      return saved ? JSON.parse(saved) : DEFAULT_PASSENGER;
    } catch {
      return DEFAULT_PASSENGER;
    }
  });

  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sg_trip_flights', JSON.stringify(flights));
  }, [flights]);

  useEffect(() => {
    localStorage.setItem('sg_trip_hotel', JSON.stringify(hotel));
  }, [hotel]);

  useEffect(() => {
    localStorage.setItem('sg_trip_itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    localStorage.setItem('sg_trip_passenger', JSON.stringify(passenger));
  }, [passenger]);

  // Lock passcode validation check
  const handleUnlock = (password: string): boolean => {
    if (password === '12345678') {
      setIsUnlocked(true);
      return true;
    }
    return false;
  };

  const handleLock = () => {
    setIsUnlocked(false);
  };

  useEffect(() => {
    if (activeTab !== 'info' && isUnlocked) {
      setIsUnlocked(false);
    }
  }, [activeTab, isUnlocked]);

  return (
    <div className="min-h-screen bg-background text-on-background font-sans transition-all flex flex-col">
      {/* Dynamic Top Navigation Bar */}
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isUnlocked={isUnlocked} 
        onLock={handleLock} 
      />

      {/* Primary Page Canvas */}
      <main className="flex-grow pb-16">
        {activeTab === 'home' && (
          <HomeView 
            onTabChange={setActiveTab}
            flights={flights}
            onUpdateFlights={setFlights}
            hotel={hotel}
            onUpdateHotel={setHotel}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryView 
            itinerary={itinerary}
            onUpdateItinerary={setItinerary}
          />
        )}

        {activeTab === 'info' && (
          <PassengerView 
            passenger={passenger}
            onUpdatePassenger={setPassenger}
            isUnlocked={isUnlocked}
            onUnlock={handleUnlock}
            onLock={handleLock}
          />
        )}
      </main>

      {/* Persistent Bottom Bar Navigation */}
      <BottomNavBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}
