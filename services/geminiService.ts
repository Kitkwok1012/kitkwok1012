import { TripData } from "../types";

// Static data service since user will provide details later
export const getTripData = async (): Promise<TripData> => {
  // Simulating a short delay for smooth UI experience
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    title: "大阪六日遊",
    summary: "12月7日 - 12月12日 | UO850 / UO899",
    days: [
      {
        day: 1,
        date: "12-07 (Sun)",
        weather: { temp: "12°C / 6°C", condition: "多雲", icon: "cloud" },
        theme: "抵達大阪 & 難波探索",
        transportation: "關西機場 -> 南海電鐵 Rapi:t -> 難波站",
        shopping: ["Bic Camera 難波", "高島屋"],
        schedule: [
          { time: "09:55", title: "香港出發", description: "乘搭 HK Express UO850", emoji: "🛫" },
          { time: "14:20", title: "抵達關西機場 (KIX)", description: "辦理入境手續及領取行李", emoji: "🛬" },
          { time: "15:30", title: "前往市區", description: "乘搭南海特急 Rapi:t", emoji: "🚆" },
          { time: "17:00", title: "酒店 Check-in", description: "放下行李，稍作休息", emoji: "🏨" },
          { time: "18:30", title: "難波/道頓堀", description: "晚餐及周邊閒逛", emoji: "🍜" }
        ]
      },
      {
        day: 2,
        date: "12-08 (Mon)",
        weather: { temp: "11°C / 5°C", condition: "晴朗", icon: "sun" },
        theme: "待定行程 (TBD)",
        transportation: "大阪 Metro 御堂筋線",
        shopping: ["待定購物點"],
        schedule: [
          { time: "10:00", title: "早餐", description: "待定餐廳", emoji: "☕" },
          { time: "11:00", title: "景點活動", description: "請補充行程細節", emoji: "📍" },
          { time: "18:00", title: "晚餐", description: "待定餐廳", emoji: "🍽️" }
        ]
      },
      {
        day: 3,
        date: "12-09 (Tue)",
        weather: { temp: "13°C / 7°C", condition: "晴時多雲", icon: "cloud-sun" },
        theme: "待定行程 (TBD)",
        transportation: "JR 環狀線 / 私鐵",
        shopping: ["待定購物點"],
        schedule: [
          { time: "10:00", title: "早餐", description: "待定餐廳", emoji: "☕" },
          { time: "11:00", title: "景點活動", description: "請補充行程細節", emoji: "📍" },
          { time: "18:00", title: "晚餐", description: "待定餐廳", emoji: "🍽️" }
        ]
      },
      {
        day: 4,
        date: "12-10 (Wed)",
        weather: { temp: "10°C / 4°C", condition: "有雨", icon: "rain" },
        theme: "待定行程 (TBD)",
        transportation: "大阪 Metro",
        shopping: ["梅田百貨", "LUCUA"],
        schedule: [
          { time: "10:00", title: "早餐", description: "待定餐廳", emoji: "☕" },
          { time: "11:00", title: "室內購物/活動", description: "避雨行程建議", emoji: "🛍️" },
          { time: "19:00", title: "晚餐", description: "待定餐廳", emoji: "🍖" }
        ]
      },
      {
        day: 5,
        date: "12-11 (Thu)",
        weather: { temp: "11°C / 4°C", condition: "多雲", icon: "cloud" },
        theme: "潮流探索 & 咖啡巡禮",
        transportation: "步行 / 大阪 Metro 四橋線",
        shopping: ["Orange Street (立花通)", "美國村"],
        schedule: [
          { time: "10:30", title: "Brunch", description: "堀江區型格咖啡店", emoji: "🥪" },
          { time: "12:00", title: "Orange Street", description: "潮流品牌、古著店、家品店巡禮", emoji: "🧢" },
          { time: "15:00", title: "下午茶", description: "心齋橋周邊甜點", emoji: "🍰" },
          { time: "19:00", title: "最後晚餐", description: "燒肉或居酒屋慶祝", emoji: "🍻" }
        ]
      },
      {
        day: 6,
        date: "12-12 (Fri)",
        weather: { temp: "9°C / 3°C", condition: "晴朗", icon: "sun" },
        theme: "最後衝刺 & 返港",
        transportation: "難波 -> 南海電鐵 -> 關西機場",
        shopping: ["臨空城 Outlets (Rinku Premium Outlets)"],
        schedule: [
          { time: "10:00", title: "Check-out", description: "寄存行李或前往機場途中", emoji: "🧳" },
          { time: "11:00", title: "最後購物", description: "機場免稅店或 Outlets", emoji: "🎁" },
          { time: "15:00", title: "抵達機場", description: "辦理登機手續 UO899", emoji: "✈️" },
          { time: "17:10", title: "回程航班", description: "HK Express UO899 飛往香港", emoji: "🛫" },
          { time: "21:00", title: "抵達香港", description: "Welcome Home", emoji: "🇭🇰" }
        ]
      }
    ]
  };
};