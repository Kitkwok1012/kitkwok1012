import React, { useMemo, useState } from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'react-aria-components'

const tripWindow = { start: '2025-12-07', end: '2025-12-12' }
const coverImage = '/cover-itinerary.png'

const flights = {
  outbound: {
    code: 'UO850',
    from: 'HKG',
    to: 'KIX',
    depart: '09:55 HKT',
    arrive: '14:20 JST',
    duration: '約 3 小時 25 分'
  },
  inbound: {
    code: 'UO899',
    from: 'KIX',
    to: 'HKG',
    depart: '17:10 JST',
    arrive: '21:00 HKT',
    duration: '約 4 小時 50 分'
  }
}

const days = [
  {
    day: 'Day 1',
    date: '2025-12-07（日）',
    title: '抵達關西・難波夜逛',
    weather: { icon: '⛅️', tempHigh: 12, tempLow: 7, condition: '多雲間晴' },
    mapGuide: {
      label: '道頓堀步行地圖',
      url: 'https://maps.google.com/?q=Dotonbori',
      embed: 'https://www.google.com/maps?q=Dotonbori&output=embed',
      note: '心齋橋筋 ↔ 道頓堀河畔散步'
    },
    items: [
      '09:55 HKG → 14:20 KIX（UO850），入境後入手 Suica（西瓜卡）',
      '15:00 關空快速或 Haruka → 天王寺，轉大和路線往 JR 難波（OCAT 同棟）',
      '16:30 入住「大阪蒙特利格拉斯米爾酒店」（JR 難波站旁），短休息',
      '18:00 道頓堀散步＋章魚燒（會津屋/銀だこ）',
      '20:00 心齋橋購物藥妝、唐吉訶德地下超市'
    ]
  },
  {
    day: 'Day 2',
    date: '2025-12-08（一）',
    title: '心齋橋・美國村逛街',
    weather: { icon: '🌤️', tempHigh: 12, tempLow: 5, condition: '局部多雲' },
    mapGuide: {
      label: '心齋橋逛街地圖',
      url: 'https://maps.google.com/?q=Shinsaibashi',
      embed: 'https://www.google.com/maps?q=Shinsaibashi&output=embed',
      note: '心齋橋筋 → 美國村 → 道頓堀'
    },
    items: [
      '10:30 步行或搭乘地鐵至心齋橋，開始逛心齋橋筋商店街',
      '12:30 午餐：在心齋橋地區品嚐拉麵或蛋包飯',
      '14:00 逛大丸百貨與 PARCO，尋找潮流品牌與設計師商品',
      '16:00 前往美國村，探索古著店與街頭文化',
      '18:30 漫步至道頓堀，與固力果跑跑人招牌合照，感受夜生活',
      '19:30 晚餐：在道頓堀選擇蟹道樂或美味的燒肉'
    ]
  },
  {
    day: 'Day 3',
    date: '2025-12-09（二）',
    title: '木津市場早餐・梅田購物樂',
    weather: { icon: '☀️', tempHigh: 13, tempLow: 6, condition: '晴朗' },
    mapGuide: {
      label: '木津市場動線',
      url: 'https://maps.google.com/?q=Kizu+Ichiba+Market',
      embed: 'https://www.google.com/maps?q=Kizu+Ichiba+Market&output=embed',
      note: '難波搭御堂筋線至「大國町」或步行 15 分鐘，市場新鮮度佳'
    },
    items: [
      '10:00 御堂筋線或步行前往木津市場，早餐開動！',
      '10:30 在木津市場邊走邊吃，品嚐生魚片、烤扇貝、握壽司、時令水果',
      '13:00 午餐後，搭乘御堂筋線從難波前往梅田（約 8 分鐘）',
      '14:00 開始逛梅田各大百貨，如阪急、大丸、LUCUA 等',
      '17:00 前往梅田藍天大廈，欣賞日落與大阪夜景',
      '19:30 晚餐於梅田解決，或搭乘紅色 HEP FIVE 摩天輪'
    ]
  },
  {
    day: 'Day 4',
    date: '2025-12-10（三）',
    title: '京都散策・伏見稻荷',
    weather: { icon: '🌦️', tempHigh: 11, tempLow: 5, condition: '偶有小雨，帶傘' },
    mapGuide: {
      label: '伏見稻荷動線',
      url: 'https://maps.google.com/?q=Fushimi+Inari+Taisha',
      embed: 'https://www.google.com/maps?q=Fushimi+Inari+Taisha&output=embed',
      note: '伏見稻荷站 → 千鳥居 → 四ツ辻折返即可'
    },
    items: [
      '10:00 京阪難波線 → 京橋轉京阪本線至伏見稻荷（約 55 分）',
      '11:00 伏見稻荷千鳥居拍照，雨天帶輕便雨傘',
      '13:00 午餐：稻荷壽司/烏龍麵，前往祇園',
      '15:00 花見小路散步、八坂神社，16:30 折返京都河原町 → 難波',
      '18:00 難波 Parks / Takashimaya / Namba City 掃貨（營業至 21-22 點）'
    ]
  },
  {
    day: 'Day 5',
    date: '2025-12-11（四）',
    title: '天王寺購物・美食一日遊',
    weather: { icon: '⛅️', tempHigh: 12, tempLow: 6, condition: '多雲' },
    mapGuide: {
      label: '天王寺・阿倍野逛街地圖',
      url: 'https://maps.google.com/?q=Tennoji+Station',
      embed: 'https://www.google.com/maps?q=Tennoji+Station&output=embed',
      note: '從難波搭御堂筋線約 6 分鐘直達「天王寺站」'
    },
    items: [
      '11:00 搭地鐵御堂筋線前往天王寺站',
      '11:30 逛日本第一高樓「阿倍野 HARUKAS」，內有近鐵百貨，品牌齊全',
      '13:30 在 HARUKAS 美食街或 Q\'s Mall 享用午餐',
      '15:00 逛大型商場 Q\'s Mall，有 SHIBUYA 109、Bic Camera 等店舖',
      '17:30 可選擇登上 HARUKAS 300 展望台欣賞大阪黃昏景色',
      '19:00 晚餐可到懷舊風情的「新世界」地區，品嚐道地的串炸'
    ]
  },
  {
    day: 'Day 6',
    date: '2025-12-12（五）',
    title: '最後採購・返程',
    weather: { icon: '☁️', tempHigh: 12, tempLow: 5, condition: '陰時多雲' },
    mapGuide: {
      label: '心齋橋採購路線',
      url: 'https://maps.google.com/?q=Shinsaibashi+Shopping+Street',
      embed: 'https://www.google.com/maps?q=Shinsaibashi+Shopping+Street&output=embed',
      note: '心齋橋商店街 ↔ 戎橋筋，順路掃藥妝與手信'
    },
    items: [
      '10:00 最後補貨：心齋橋/道頓堀藥妝、伴手禮',
      '12:30 退房寄行李，午餐：豚骨拉麵或咖哩',
      '14:00 返回飯店取行李，檢查護照與退稅單',
      '14:30 南海特急 難波 → KIX（約 45 分，預留登機時間）',
      '17:10 UO899 KIX → 21:00 HKG，回程！'
    ]
  }
]

const foodSpots = [
  {
    name: '松阪牛燒肉 M（法善寺橫丁店）｜松阪牛焼肉 M',
    cuisine: '高級松阪牛燒肉，氛圍感十足，建議預約',
    budget: '午 ¥4,000~｜晚 ¥8,000~',
    search: '搜尋「松阪牛焼肉M 法善寺横丁」看圖片與地址',
    area: '心齋橋',
    tag: '燒肉'
  },
  {
    name: '北村壽喜燒（北むら）｜Kitamura Sukiyaki',
    cuisine: '米芝蓮一星，百年老字號關西風壽喜燒，桌邊服務',
    budget: '午 ¥8,000~｜晚 ¥15,000~',
    search: '搜尋「北むら 壽喜燒 心齋橋」',
    area: '心齋橋',
    tag: '壽喜燒'
  },
  {
    name: '壽司 早田｜Sushi Hayata',
    cuisine: '板前壽司，新鮮度高，中高價位的優質選擇',
    budget: '午 ¥3,000~｜晚 ¥8,000~',
    search: '搜尋「Sushi Hayata 心齋橋」',
    area: '心齋橋',
    tag: '壽司'
  },
  {
    name: '美津之（美津の）｜Mizuno',
    cuisine: '必比登大阪燒，食材講究，熱門排隊名店',
    budget: '午/晚 ¥2,000~',
    search: '搜尋「美津の 大阪燒」',
    area: '心齋橋',
    tag: '大阪燒'
  },
  {
    name: 'The Cosmopolitan Grill Bar Terrace',
    cuisine: '時尚高級西餐／牛排，Grand Front Osaka，適合約會/商務',
    budget: '午 ¥3,500~｜晚 ¥10,000~',
    search: '搜尋「The Cosmopolitan 大阪」',
    area: '梅田',
    tag: '牛排'
  },
  {
    name: '北新地 壽司千頭｜Sushi Senzu',
    cuisine: '高級江戶前壽司，北新地精緻套餐',
    budget: '午 ¥5,000~｜晚 ¥15,000~',
    search: '搜尋「寿司千頭 北新地」',
    area: '梅田',
    tag: '壽司'
  },
  {
    name: '白雲台（Grand Front店）｜Hakuundai',
    cuisine: '景觀燒肉，黑毛和牛，俯瞰梅田夜景',
    budget: '午 ¥2,500~｜晚 ¥6,000~',
    search: '搜尋「白雲台 グランフロント」',
    area: '梅田',
    tag: '燒肉'
  },
  {
    name: '大阪燒 Yukari（曾根崎本店）｜お好み焼 ゆかり',
    cuisine: '老字號升級版大阪燒，用料豐富，環境舒適',
    budget: '午/晚 ¥1,500~¥3,000',
    search: '搜尋「お好み焼 ゆかり 曾根崎」',
    area: '梅田',
    tag: '大阪燒'
  },
  {
    name: '大阪萬豪都酒店 ZK 景觀餐廳｜ZK Restaurant',
    cuisine: '57 樓絕景，歐陸／鐵板燒／懷石，慶祝首選',
    budget: '午 ¥6,000~｜晚 ¥15,000~',
    search: '搜尋「ZK レストラン 大阪マリオット」',
    area: '天王寺',
    tag: '景觀'
  },
  {
    name: '牛炸 京都勝牛（阿倍野店）｜Kyoto Katsugyu',
    cuisine: '吉列炸牛排，半熟多汁，可搭鐵板再煎',
    budget: '午/晚 ¥2,000~¥3,500',
    search: '搜尋「京都勝牛 阿倍野」',
    area: '天王寺',
    tag: '炸牛'
  },
  {
    name: '串炸達摩（新世界總本店）｜Kushikatsu Daruma',
    cuisine: '經典串炸發源店，海鮮和和牛串值得點',
    budget: '午/晚 ¥3,000~',
    search: '搜尋「串カツだるま 新世界本店」',
    area: '天王寺',
    tag: '串炸'
  },
  {
    name: '鰻魚之錦（うなぎのにしき）｜Unagi no Nishiki',
    cuisine: '炭火鰻魚飯，醬汁濃郁，中高價位',
    budget: '午/晚 ¥3,500~',
    search: '搜尋「うなぎのにしき 天王寺」',
    area: '天王寺',
    tag: '鰻魚'
  },
  {
    name: '魚市食堂｜Uoichi Shokudo',
    cuisine: '木津市場人氣海鮮丼，海膽三文魚子堆山',
    budget: '早/午 ¥2,500~¥4,500',
    search: '搜尋「魚市食堂 木津市場」',
    area: '木津市場',
    tag: '海鮮丼'
  },
  {
    name: '川上商店｜Kawakami Shoten',
    cuisine: '炭火國產鰻魚，味道達高級料亭水準',
    budget: '早/午 ¥3,000~¥4,500',
    search: '搜尋「川上商店 木津市場 鰻魚」',
    area: '木津市場',
    tag: '鰻魚'
  },
  {
    name: '壽司 當志郎｜Sushi Toshiro',
    cuisine: '市場直送壽司，拖羅必點，隱世小店',
    budget: '早/午 ¥2,500~¥4,000',
    search: '搜尋「寿司 当志郎 木津市場」',
    area: '木津市場',
    tag: '壽司'
  },
  {
    name: '木津市場提醒',
    cuisine: '營業 06:00-14:00 為主，周三/周日多為休市，安排早午餐時段',
    budget: '請避開晚餐時段以免撲空',
    search: '出發前查木津市場官網日曆與臨時休市公告',
    area: '木津市場',
    tag: '營業時間'
  }
]

const prepList = [
  {
    id: 'passport',
    title: '護照 / 簽證',
    detail: '確認護照有效期 6 個月以上；如需 eVisa/ETA 先申請，護照與簽證掃描檔存雲端'
  },
  {
    id: 'cards',
    title: 'Suica・付款',
    detail: '預先準備 Suica（西瓜卡）或行動版；帶免外幣手續費信用卡，日圓現金足額'
  },
  {
    id: 'connectivity',
    title: '上網 / App',
    detail: '購買 eSIM 或 Wi‑Fi 蛋，下載 Google Maps、翻譯 App、餐廳預約或排隊 App'
  },
  {
    id: 'transport',
    title: '機場路線',
    detail: '熟讀：關空快速 / Haruka → 天王寺 → 大和路線（綠色）往 JR 難波，OCAT 電梯到 22F Lobby'
  },
  {
    id: 'booking',
    title: '住宿・餐廳預約',
    detail: '確認飯店訂單；熱門餐廳（松阪牛燒肉M、北村壽喜燒、ZK 等）提前預約'
  },
  {
    id: 'insurance',
    title: '旅遊保險',
    detail: '購買旅遊保險，備份保單與緊急聯絡電話；家人聯絡方式及使館資訊留存'
  },
  {
    id: 'clothes',
    title: '行李與保暖',
    detail: '12 月早晚 5-7°C：薄羽絨、防水鞋、暖暖包、手套帽子；常用藥品與充電線'
  }
]

const tips = [
  { title: '餐廳排隊', detail: '避開 12:00-13:00、18:30-19:30；多人可以先抽號碼後分工逛街' },
  { title: '天氣裝備', detail: '12 月早晚 5-7°C，薄羽絨＋帽／手套；環球影城日帶防水鞋與暖暖包' },
  { title: '付款方式', detail: '現金＋信用卡並用，少數小店只收現金；Suica（西瓜卡）可在便利店小額刷卡' },
  { title: '行李寄放', detail: '最後一天退房後可寄放飯店；奈良／京都站置物櫃當備用方案' },
  { title: '退稅與收據', detail: '藥妝拆包前確認退稅規則，收據與護照同放夾鏈袋' },
  { title: '緊急聯絡', detail: '日本 119 救護/火警，110 報警；護照與保險單掃描存在雲端' }
]

const logistics = [
  {
    label: '旅遊日數',
    value: '6 天 5 夜｜12/7 - 12/12',
    detail: '回程留半天採購＋機場路程 45 分鐘，行李：28 吋 + 登機包'
  },
  {
    label: '住宿',
    value: '大阪蒙特利格拉斯米爾酒店（JR 難波旁）',
    detail: '入住 15:00 / 退房 12:00，旁邊 AEON / LAWSON 補給方便'
  },
  {
    label: '交通',
    value: 'Suica（西瓜卡）通用｜視情況補單程券',
    detail: '機場至酒店：① 搭乘【關空快速】或【Haruka】至天王寺；② 轉【大和路線（綠色）】往 JR 難波；③ JR 難波位於 OCAT 大樓內，電梯上 22 樓 Lobby。全程刷 Suica 進出站；奈良行程搭【近鐵】，京都行程搭【京阪】，出發前請先充值 Suica'
  },
  {
    label: '預算',
    value: '人均約 ¥75,000（住宿已付）',
    detail: '交通 ¥10k、餐飲 ¥18k、購物 ¥20k、門票/樂園 ¥12k、預留現金 ¥15k'
  },
  {
    label: '上網',
    value: 'eSIM 或隨身 Wi-Fi',
    detail: '落地立即開通；餐廳預約與網上排隊需要數據，Wi-Fi 分享器記得帶行動電源'
  },
]

function Card({ title, children, footer }) {
  return (
    <section className="card">
      <div className="card__header">
        <h2>{title}</h2>
      </div>
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </section>
  )
}

function ExpandableSection({ items, collapsedCount = 3, renderItem, expandLabel, collapseLabel }) {
  const [expanded, setExpanded] = useState(false)
  const hasOverflow = items.length > collapsedCount
  const visibleItems = expanded ? items : items.slice(0, collapsedCount)

  return (
    <div className="expandable">
      {hasOverflow && expanded && (
        <button className="ghost-button ghost-button--inline" type="button" onClick={() => setExpanded(false)}>
          {collapseLabel || '收起'}
        </button>
      )}
      <div className="expandable__list">
        {visibleItems.map(renderItem)}
      </div>
      {hasOverflow && (
        <button className="ghost-button" type="button" onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? (collapseLabel || '收起') : (expandLabel || `展開全部（${items.length}）`)}
        </button>
      )}
    </div>
  )
}

function Checklist({ items, collapsedCount = 3, expandLabel = '展開全部', collapseLabel = '收起全部' }) {
  const [checked, setChecked] = useState(() => new Set())
  const [expanded, setExpanded] = useState(false)

  const hasOverflow = items.length > collapsedCount
  const visibleItems = expanded ? items : items.slice(0, collapsedCount)

  const toggle = (id) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="checklist">
      {hasOverflow && expanded && (
        <button className="ghost-button ghost-button--inline" type="button" onClick={() => setExpanded(false)}>
          {collapseLabel}
        </button>
      )}
      {visibleItems.map((item) => {
        const isChecked = checked.has(item.id)
        return (
          <label key={item.id} className={`checklist__row ${isChecked ? 'checklist__row--checked' : ''}`}>
            <input type="checkbox" checked={isChecked} onChange={() => toggle(item.id)} />
            <div>
              <strong>{item.title}</strong>
              <p className="muted">{item.detail}</p>
            </div>
          </label>
        )
      })}
      {hasOverflow && (
        <button className="ghost-button" type="button" onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? collapseLabel : `${expandLabel}（${items.length}）`}
        </button>
      )}
    </div>
  )
}

function DayDetail({ day }) {
  const badgeText = useMemo(() => ` ${day.weather.condition}`, [day.weather])
  const tempText = useMemo(() => `${day.weather.tempLow}° ~ ${day.weather.tempHigh}°`, [day.weather])
  const [destinationInput, setDestinationInput] = useState('')

  const handleNavigation = (e) => {
    e.preventDefault()
    if (!destinationInput.trim()) {
      alert('請輸入目的地！')
      return
    }
    const destination = encodeURIComponent(destinationInput)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="day-card">
      <div className="day-card__header">
        <div>
          <p className="eyebrow">{day.day} · {day.date}</p>
          <h3>{day.title}</h3>
        </div>
        <div className="weather">
          <div className="weather__icon">{day.weather.icon}</div>
          <div>
            <strong>{badgeText}</strong>
            <p className="temp">{tempText}</p>
          </div>
        </div>
      </div>
      {day.mapGuide && (
        <div className="map-card">
          <form className="map-card__info map-form" onSubmit={handleNavigation}>
            <div className="map-input__wrapper">
              <svg className="map-input__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                type="text"
                className="map-input"
                placeholder="想去邊？輸入目的地..."
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
              />
            </div>
            <button type="submit" className="map-button" aria-label="規劃路線">
              <span>規劃路線</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </button>
          </form>
          {day.mapGuide.embed && (
            <div className="map-frame">
              <iframe
                title={day.mapGuide.label}
                src={day.mapGuide.embed}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      )}
      <ul className="day-list">
        {day.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  return (
    <div className="page">
      <div className="shell">
        <header className="hero">
          <p className="eyebrow">Osaka · Kansai · 6 Days</p>
          <h1>
            大阪六日遊
            <span className="gradient-text"> 行程全覽</span>
          </h1>
          <p className="lede">
            精選交通、每日路線、必吃美食與小撇步。航班資訊已填好，出發前一晚再確認時間與登機口。
          </p>
        </header>

        <main className="grid">
          <Card title="行程概要">
            <div className="cover-card">
              <img src={coverImage} alt="關西 6 日大冒險行程表封面" />
            </div>
          </Card>

          <Card title="航班與日期">
            <div className="flights">
              <div className="flight">
                <p className="eyebrow">{flights.outbound.code} · HKG → KIX</p>
                <strong>{tripWindow.start} · {flights.outbound.depart} 出發</strong>
                <p className="muted">抵達 {flights.outbound.arrive} · {flights.outbound.duration}</p>
              </div>
              <div className="flight">
                <p className="eyebrow">{flights.inbound.code} · KIX → HKG</p>
                <strong>{tripWindow.end} · {flights.inbound.depart} 出發</strong>
                <p className="muted">抵達 {flights.inbound.arrive} · {flights.inbound.duration}</p>
              </div>
            </div>
            <p className="hint">航班時間來源：Planemapper（近期班表）。起飛前仍以航空公司通知為準。</p>
          </Card>

          <Card title="事前準備 Checklist" footer={<p className="hint">出發前逐項勾選，護照與保險掃描檔記得備份。</p>}>
            <Checklist items={prepList} collapsedCount={0} expandLabel="展開全部" collapseLabel="收起全部" />
          </Card>

          <Card title="每日行程（6 天分頁）" footer={<p className="hint">使用下方分頁查看當日安排與天氣。</p>}>
            <Tabs defaultSelectedKey={days[0].day} className="tabs-wrapper">
              <TabList aria-label="Daily itinerary" className="tabs">
                {days.map((d) => (
                  <Tab key={d.day} id={d.day} className={({ isSelected }) => `tab ${isSelected ? 'tab--active' : ''}`}>
                    <span className="tab__day">{d.day}</span>
                    <span className="tab__date">{d.date}</span>
                    <span className="tab__title">{d.title}</span>
                  </Tab>
                ))}
              </TabList>
              {days.map((d) => (
                <TabPanel key={d.day} id={d.day} className="tab-panel">
                  <DayDetail day={d} />
                </TabPanel>
              ))}
            </Tabs>
          </Card>

          <Card
            title="餐廳／美食口袋清單"
            footer={<p className="hint">避開尖峰排隊，提前看好營業時間與是否能預約。</p>}
          >
            <ExpandableSection
              items={foodSpots}
              collapsedCount={0}
              expandLabel="展開全部美食"
              collapseLabel="收起美食清單"
              renderItem={(spot) => (
                <div key={spot.name} className="info-row">
                  <div>
                    <strong>{spot.name}</strong>
                    <p className="muted">{spot.cuisine}</p>
                    <p className="muted">預算：{spot.budget}</p>
                    <p className="muted">
                      🔎 搜尋：
                      <a href={`https://www.google.com/search?q=${encodeURIComponent(spot.search)}`} target="_blank" rel="noreferrer">
                        {spot.search}
                      </a>
                    </p>
                  </div>
                  {(spot.area || spot.tag) && <span className="badge">{spot.area || spot.tag}</span>}
                </div>
              )}
            />
          </Card>

          <Card title="交通・住宿・預算">
            <ExpandableSection
              items={logistics}
              collapsedCount={0}
              expandLabel="展開細節"
              collapseLabel="收起"
              renderItem={(item) => (
                <div key={item.label} className="logistics__row">
                  <div className="logistics__meta">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <p className="muted logistics__detail">{item.detail}</p>
                </div>
              )}
            />
          </Card>

          <Card
            title="Tips 小提醒"
            footer={<p className="hint">把這份頁面加到瀏覽器離線閱讀，或存成 PDF 帶去日本。</p>}
          >
            <ExpandableSection
              items={tips}
              collapsedCount={0}
              expandLabel="展開更多提醒"
              collapseLabel="收起提醒"
              renderItem={(tip) => (
                <div key={tip.title} className="tip-row">
                  <strong>{tip.title}</strong>
                  <p className="muted">{tip.detail}</p>
                </div>
              )}
            />
          </Card>
        </main>
      </div>
    </div>
  )
}
