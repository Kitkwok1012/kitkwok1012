import React, { useMemo, useState } from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'react-aria-components'

const tripWindow = { start: '2025-12-07', end: '2025-12-12' }

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
      '09:55 HKG → 14:20 KIX（UO850），入境後買 ICOCA',
      '15:00 南海特急 Airport Express → 難波（約 45 分，直達）',
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
    title: '黑門市場美食・梅田購物樂',
    weather: { icon: '☀️', tempHigh: 13, tempLow: 6, condition: '晴朗' },
    mapGuide: {
      label: '黑門市場逛街地圖',
      url: 'https://maps.google.com/?q=Kuromon+Ichiba+Market',
      embed: 'https://www.google.com/maps?q=Kuromon+Ichiba+Market&output=embed',
      note: '從難波步行約 10 分鐘，或搭地鐵至「日本橋站」'
    },
    items: [
      '10:30 步行至黑門市場，準備開動！',
      '11:00 在黑門市場邊走邊吃，品嚐新鮮海膽、烤扇貝、神戶牛、時令水果',
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
    name: '一蘭拉麵道頓堀 / 難波店',
    detail: '24 小時營業，夜宵不用怕排太久；先在機台選湯濃度與麵硬度',
    tag: '排隊快'
  },
  {
    name: '蟹道樂本店',
    detail: '建議提前線上預約；套餐 ¥8,000~12,000，桌邊拆蟹服務',
    tag: '需預約'
  },
  {
    name: '燒肉五苑／牛角／萬野',
    detail: '晚餐 17:30 前入座較少等候，萬野牛舌與內臟串值得點',
    tag: '燒肉'
  },
  {
    name: '章魚燒（會津屋／銀だこ）',
    detail: '會津屋原味不加醬；銀だこ外脆內軟。人多時外帶速度較快',
    tag: '小食'
  },
  {
    name: 'HARBS／辻利抹茶甜點',
    detail: '下午茶 15:00 後較鬆，HARBS 草莓蛋糕與辻利抹茶聖代是招牌',
    tag: '甜品'
  },
  {
    name: '黑門市場海鮮、生蠔、壽司',
    detail: '現點即食，記得備好現金；拍照先詢問店家，可順便買水果'
  }
]

const tips = [
  { title: '餐廳排隊', detail: '避開 12:00-13:00、18:30-19:30；多人可以先抽號碼後分工逛街' },
  { title: '天氣裝備', detail: '12 月早晚 5-7°C，薄羽絨＋帽／手套；環球影城日帶防水鞋與暖暖包' },
  { title: '付款方式', detail: '現金＋信用卡並用，少數小店只收現金；ICOCA 可在便利店小額刷卡' },
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
    value: 'ICOCA + 南海特急 / 地鐵一日券視行程',
    detail: '機場→難波：南海 Rapi:t 或 Airport Express；奈良用近鐵，京都用京阪，記得充值'
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
                    <p className="muted">{spot.detail}</p>
                  </div>
                  {spot.tag && <span className="badge">{spot.tag}</span>}
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
