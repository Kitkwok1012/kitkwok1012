import React from 'react'

const itinerary = [
  {
    day: 'Day 1',
    title: '抵達關西・難波夜逛',
    items: [
      '關西機場入境，購買 ICOCA & 南海特急往難波',
      '入住難波站附近飯店，放置行李後自由活動',
      '心齋橋、道頓堀夜逛，必吃章魚燒／拉麵'
    ]
  },
  {
    day: 'Day 2',
    title: '大阪城・梅田展望夜景',
    items: [
      '上午參觀大阪城公園、天守閣，公園散步拍照',
      '午餐推薦：天滿市場或黑門市場海鮮',
      '傍晚梅田藍天大廈夜景，HEP FIVE 摩天輪'
    ]
  },
  {
    day: 'Day 3',
    title: '奈良半日・鹿公園',
    items: [
      '近鐵奈良線往奈良，奈良公園餵鹿、東大寺',
      '春日大社散步，帶鹿仙貝與濕紙巾',
      '回大阪晚餐選擇：燒肉 or 炸串'
    ]
  },
  {
    day: 'Day 4',
    title: '京都散策・伏見稻荷',
    items: [
      'JR 或京阪往京都，伏見稻荷千鳥居拍照',
      '祇園花見小路、清水寺周邊抹茶甜點',
      '晚上回大阪，逛心齋橋藥妝店補貨'
    ]
  },
  {
    day: 'Day 5',
    title: '環球影城日',
    items: [
      '提早入園，先玩超級任天堂世界（建議快速通行）',
      '午餐可在園內、晚上回難波補吃美食',
      '購物：任天堂周邊／小小兵紀念品'
    ]
  },
  {
    day: 'Day 6',
    title: '最後採購・返程',
    items: [
      '檢查戰利品、壓縮行李，準備退房',
      '難波／心齋橋最後補貨，預留機場交通時間',
      '南海電鐵回關西機場，提早辦理退稅與登機'
    ]
  }
]

const foodSpots = [
  '一蘭拉麵道頓堀 / 難波店',
  '蟹道樂本店（預約建議）',
  '燒肉五苑、牛角、萬野',
  '章魚燒（會津屋／銀だこ）',
  'HARBS／辻利抹茶甜點',
  '黑門市場海鮮、生蠔、壽司'
]

const tips = [
  'ICOCA 直接刷地鐵／JR，搭近鐵奈良線也能用',
  '環球影城門票建議事先預約，早場先衝任天堂',
  '京都伏見稻荷容易塞人，清晨或傍晚光線最好',
  '藥妝分散購買，多帶折疊袋，退稅要帶護照',
  '隨身雨傘＋行動電源必備，記得帶國際插座'
]

const logistics = [
  { label: '旅遊日數', value: '6 天 5 夜' },
  { label: '住宿', value: '難波站 2 分鐘，方便搭南海電鐵' },
  { label: '交通', value: 'ICOCA + 南海特急 / JR / 地鐵一日券視行程選' },
  { label: '上網', value: 'eSIM 或隨身 Wi-Fi，現場掃碼設定即可' },
  { label: '預算', value: '餐飲每天 3,000-5,000¥；購物視個人需求' }
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

function Timeline() {
  return (
    <div className="timeline">
      {itinerary.map((day) => (
        <article key={day.day} className="timeline__item">
          <div className="timeline__badge">{day.day}</div>
          <div>
            <h3>{day.title}</h3>
            <ul>
              {day.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  )
}

function PillList({ items }) {
  return (
    <div className="pill-list">
      {items.map((item) => (
        <span key={item} className="pill">
          {item}
        </span>
      ))}
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
            精選交通、每日路線、必吃美食與小撇步，直接部署到 Cloudflare Pages 的靜態版。旅遊前一晚再確認時間與預約即可。
          </p>
          <div className="hero__meta">
            <div>
              <small>旅行月份</small>
              <strong>3-5 月 / 10-12 月氣候最舒適</strong>
            </div>
            <div>
              <small>出發地</small>
              <strong>香港 → 關西機場</strong>
            </div>
            <div>
              <small>更新時間</small>
              <strong>{new Date().toLocaleDateString('zh-HK')}</strong>
            </div>
          </div>
        </header>

        <main className="grid">
          <Card title="每日行程">
            <Timeline />
          </Card>

          <Card
            title="餐廳／美食口袋清單"
            footer={<p className="hint">避開尖峰排隊，提前看好營業時間與是否能預約。</p>}
          >
            <PillList items={foodSpots} />
          </Card>

          <Card title="交通・住宿・預算">
            <div className="logistics">
              {logistics.map((item) => (
                <div key={item.label} className="logistics__row">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Tips 小提醒"
            footer={<p className="hint">把這份頁面加到瀏覽器離線閱讀，或存成 PDF 帶去日本。</p>}
          >
            <ul className="tips">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </Card>
        </main>

        <footer className="footer">
          <div>
            <p className="eyebrow">Cloudflare Pages Ready</p>
            <p>部署時將 build 命令設為 <code>npm run build</code>，輸出目錄 <code>dist</code> 即可。</p>
          </div>
          <a className="cta" href="https://developers.cloudflare.com/pages/" target="_blank" rel="noreferrer">
            查看部署說明
          </a>
        </footer>
      </div>
    </div>
  )
}
