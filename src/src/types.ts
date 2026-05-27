export interface FlightInfo {
  type: 'outbound' | 'return';
  date: string;
  airline: string;
  flightNo: string;
  fromCode: string;
  toCode: string;
  fromName: string;
  toName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cabinClass: string;
}

export interface HotelInfo {
  name: string;
  englishName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  imageUrl: string;
  features: string[];
  address: string;
}

export interface ItineraryEvent {
  id: string;
  time: string;
  endTime?: string;
  type: 'flight' | 'transport' | 'active' | 'food' | 'hotel' | 'other';
  label: string;
  desc: string;
  note?: string;
  location?: string;
  cost?: string;
}

export interface DayItinerary {
  dayNum: number;
  date: string;
  fullDate: string;
  dayOfWeek: string;
  title: string;
  events: ItineraryEvent[];
}

export interface PassengerInfo {
  name: string;
  passportNo: string;
  expiry: string;
  dob: string;
  phone: string;
  email: string;
  notes: string;
  emergencyName: string;
  emergencyRel: string;
  emergencyPhone: string;
  insuranceCompany: string;
  insuranceNo: string;
  insurancePhone: string;
}

export type ActiveTab = 'home' | 'itinerary' | 'info';

export const DEFAULT_FLIGHTS: FlightInfo[] = [
  {
    type: 'outbound',
    date: '2026/7/22',
    airline: '長榮航空',
    flightNo: 'BR215',
    fromCode: 'TPE',
    toCode: 'SIN',
    fromName: '桃園機場',
    toName: '新加坡樟宜機場',
    departureTime: '09:25',
    arrivalTime: '13:55',
    duration: '04:30',
    cabinClass: '經濟艙'
  },
  {
    type: 'return',
    date: '2026/7/25',
    airline: '長榮航空',
    flightNo: 'BR216',
    fromCode: 'SIN',
    toCode: 'TPE',
    fromName: '新加坡樟宜機場',
    toName: '桃園機場',
    departureTime: '15:20',
    arrivalTime: '20:00',
    duration: '04:40',
    cabinClass: '經濟艙'
  }
];

export const DEFAULT_HOTEL: HotelInfo = {
  name: '萬態雨林悅榕庄',
  englishName: 'Mandai Rainforest Resort by Banyan Tree',
  checkIn: '2026/7/22',
  checkOut: '2026/7/24',
  nights: 2,
  imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80',
  features: ['雨林度假村', '鄰近萬態野生動物保護區', '適合親子行程'],
  address: 'Mandai Wildlife Reserve, Singapore'
};

export const DEFAULT_ITINERARY: DayItinerary[] = [
  {
    dayNum: 1,
    date: '7/22',
    fullDate: '2026/7/22',
    dayOfWeek: '三',
    title: '抵達新加坡',
    events: [
      {
        id: '1-1',
        time: '07:00',
        endTime: '08:00',
        type: 'transport',
        label: '前往桃園機場',
        desc: '預留報到、托運行李與安檢時間。',
        location: '桃園機場'
      },
      {
        id: '1-2',
        time: '09:30',
        endTime: '14:00',
        type: 'flight',
        label: '長榮航空 BR215',
        desc: '09:25 桃園機場起飛，13:55 抵達新加坡樟宜機場。',
        note: '飛行時間 04:30'
      },
      {
        id: '1-3',
        time: '14:00',
        endTime: '15:00',
        type: 'other',
        label: '入境與領取行李',
        desc: '完成入境、領行李、確認網路與交通方式。',
        location: '新加坡樟宜機場'
      },
      {
        id: '1-4',
        time: '15:00',
        endTime: '16:30',
        type: 'transport',
        label: '前往飯店',
        desc: '由樟宜機場前往萬態雨林悅榕庄。',
        location: 'Mandai'
      },
      {
        id: '1-5',
        time: '16:30',
        endTime: '17:30',
        type: 'hotel',
        label: '入住萬態雨林悅榕庄',
        desc: '辦理入住、整理行李、確認隔日動物園交通。',
        location: '萬態雨林悅榕庄'
      }
    ]
  },
  {
    dayNum: 2,
    date: '7/23',
    fullDate: '2026/7/23',
    dayOfWeek: '四',
    title: '新加坡動物園',
    events: [
      {
        id: '2-1',
        time: '08:00',
        endTime: '08:30',
        type: 'food',
        label: '飯店早餐',
        desc: '出發前補水、確認門票與防曬用品。'
      },
      {
        id: '2-2',
        time: '09:00',
        endTime: '12:00',
        type: 'active',
        label: '新加坡動物園',
        desc: '上午安排重點展區與動物互動體驗。',
        location: 'Singapore Zoo',
        note: '可補充表演時間與必看區域'
      },
      {
        id: '2-3',
        time: '12:00',
        endTime: '13:00',
        type: 'food',
        label: '園區午餐',
        desc: '中午在園區或附近用餐，保留下午體力。'
      },
      {
        id: '2-4',
        time: '13:00',
        endTime: '17:00',
        type: 'active',
        label: '新加坡動物園下午行程',
        desc: '繼續園區參觀，視體力調整散步路線。',
        location: 'Singapore Zoo'
      },
      {
        id: '2-5',
        time: '17:30',
        endTime: '19:00',
        type: 'hotel',
        label: '回飯店休息',
        desc: '整理照片與隔日飛禽公園資料。',
        location: '萬態雨林悅榕庄'
      }
    ]
  },
  {
    dayNum: 3,
    date: '7/24',
    fullDate: '2026/7/24',
    dayOfWeek: '五',
    title: '飛禽公園與好奇心之灣',
    events: [
      {
        id: '3-1',
        time: '08:30',
        endTime: '09:00',
        type: 'hotel',
        label: '退房準備',
        desc: '確認行李寄放、票券、雨具與水壺。'
      },
      {
        id: '3-2',
        time: '09:00',
        endTime: '12:00',
        type: 'active',
        label: '飛禽公園',
        desc: '安排鳥類展區、表演與步行路線。',
        location: 'Bird Paradise'
      },
      {
        id: '3-3',
        time: '12:00',
        endTime: '13:00',
        type: 'food',
        label: '午餐與移動緩衝',
        desc: '保留用餐、補水與移動時間。'
      },
      {
        id: '3-4',
        time: '13:00',
        endTime: '16:30',
        type: 'active',
        label: '好奇心之灣',
        desc: '互動探索與親子活動時間。',
        location: 'Curiosity Cove'
      },
      {
        id: '3-5',
        time: '17:00',
        endTime: '18:00',
        type: 'transport',
        label: '晚間交通安排',
        desc: '依後續住宿或晚餐地點補充交通方式。'
      }
    ]
  },
  {
    dayNum: 4,
    date: '7/25',
    fullDate: '2026/7/25',
    dayOfWeek: '六',
    title: '返台日',
    events: [
      {
        id: '4-1',
        time: '09:00',
        endTime: '10:30',
        type: 'other',
        label: '行李與最後確認',
        desc: '確認護照、票券、充電器、伴手禮與退稅資料。'
      },
      {
        id: '4-2',
        time: '11:30',
        endTime: '12:30',
        type: 'food',
        label: '午餐',
        desc: '建議安排在機場或前往機場路線附近。'
      },
      {
        id: '4-3',
        time: '12:30',
        endTime: '13:30',
        type: 'transport',
        label: '前往樟宜機場',
        desc: '預留報到、托運行李與安檢時間。',
        location: '新加坡樟宜機場'
      },
      {
        id: '4-4',
        time: '13:30',
        endTime: '15:00',
        type: 'other',
        label: '機場報到與候機',
        desc: '辦理 BR216 報到，確認登機門。'
      },
      {
        id: '4-5',
        time: '15:30',
        endTime: '20:00',
        type: 'flight',
        label: '長榮航空 BR216',
        desc: '15:20 新加坡起飛，20:00 抵達桃園機場。',
        note: '飛行時間 04:40'
      }
    ]
  }
];

export const DEFAULT_PASSENGER: PassengerInfo = {
  name: '尚未填寫',
  passportNo: '尚未填寫',
  expiry: '尚未填寫',
  dob: '尚未填寫',
  phone: '尚未填寫',
  email: '尚未填寫',
  notes: '可填寫飲食禁忌、藥物需求、重要提醒或同行者備註。',
  emergencyName: '尚未填寫',
  emergencyRel: '尚未填寫',
  emergencyPhone: '尚未填寫',
  insuranceCompany: '尚未填寫',
  insuranceNo: '尚未填寫',
  insurancePhone: '尚未填寫'
};
