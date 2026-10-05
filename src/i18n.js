// 国际化文案：简中 / 繁中（不区分地区）
// `zh-Hans` 为简体中文，`zh-Hant` 为繁体中文。
// 结构为纯静态对象，便于未来扩展其他语言。

export const locales = [
  { key: 'zh-Hans', label: '简中' },
  { key: 'zh-Hant', label: '繁中' },
]

export const messages = {
  'zh-Hans': {
    hero: {
      badge: 'Fandom & Miraheze',
      eyebrow: '特殊收容措施基金会',
      title: '控制，收容，保护',
      subtitle: 'Secure. Contain. Protect.',
      desc: [
        'SCP基金会是一个致力于收容世界上异常现象、物品、生物与地点的虚构组织。基金会以「控制（Secure）、收容（Contain）、保护（Protect）」为宗旨，这一宗旨在 Miraheze 和 Fandom 中常被意译为「稳定、收容、保护」。',
        '此处汇总了 SCP 基金会两个建立在 MediaWiki 农场的中文非官方维基社区：Fandom 与 Miraheze 。作为起源与本家的 Wikidot 维基 SCP Wiki 和 SCP-CN Wiki 也在此列出',
      ],
      buttons: {
        archive: '档案库',
        background: '背景资料',
        writing: '写作指导',
        external: '外部链接',
      },
      archiveDesc: '浏览 SCP 档案库',
      backgroundDesc: '了解基金会背景',
      writingDesc: '创作与写作指南',
      externalDesc: '跳转外部资源',
    },
    card: {
      urlLabel: '域名',
      fandom: {
        name: 'SCP Wikia ZH',
        host: 'scp.fandom.com/zh',
        note: '建立在 Fandom 的民间爱好者维基',
      },
      miraheze: {
        name: 'SCP Miraheze CN',
        host: 'wiki.scpzh.org',
        note: '托管在 Miraheze 的民间写作与百科维基',
      },
      visit: '访问站点',
      copy: '复制',
      copied: '已复制',
    },
    footer: {
      disclaimer:
        '本站与 SCP Wiki 或 SCP-CN Wiki 官方无任何关系，系外围民间社区网站',
      rights: 'SCP Foundation ZH  导航站 · 基于 Vite & Vue 3 构建',
      github: 'GitHub',
    },
    design: {
      eyebrow: 'About SCP Foundation Miraheze CN',
      title: '关于SCP基金会中文档案库',
      subtitle:
        '中文档案库即SCP基金会Miraheze中文，是建立在 Miraheze 农场的民间爱好者维基，允许较自由的创作或为SCP基金会的世界观编写百科。',
    },
    related: {
      status: {
        tabTitle: '状态页',
        name: 'SCP Miraheze CN 状态页',
        host: 'status.scpzh.org',
        url: 'https://status.scpzh.org',
        badge: 'Uptime Monitor',
        tag: '在线监控',
        desc:
          '提供 SCP Miraheze CN 维基及其附属服务，以及依赖平台的实时可用性监测、故障宕机告警及历史运行状态报告。',
        features: ['可用性监控', '宕机告警', '历史指标'],
      },
      forum: {
        tabTitle: '讨论版',
        name: 'SCP Miraheze CN 讨论版',
        host: 'forum.scpzh.org',
        url: 'https://forum.scpzh.org',
        badge: 'Community Forum',
        tag: '交流社区',
        desc:
          'SCP 基金会 Miraheze 中文的附属的社区论坛，用于站务发布、创作交流、文章推荐与草稿批评。',
        features: ['站务发布', '创作交流', '文章推荐'],
      },
      visit: '访问站点',
      copy: '复制域名',
      copied: '已复制',
    },
    sidebar: {
      quickNav: '快速导航',
      mirrors: '站点列表',
      language: '语言设置',
      close: '关闭菜单',
      open: '打开菜单',
      nav: {
        archive: '档案库',
        background: '背景资料',
        writing: '写作指导',
        external: '外部链接',
      },
      sites: {
        wikidotEn: 'SCP-EN Wiki',
        wikidotCn: 'SCP-CN Wiki',
        fandomZh: 'SCP-ZH Fandom',
        mirahezeCn: 'SCP-ZH Miraheze',
      },
      sitesDesc: {
        wikidotEn: 'Wikidot 官方英文总站',
        wikidotCn: 'Wikidot 官方中文分部',
        fandomZh: 'Fandom 中文民间维基',
        mirahezeCn: 'Miraheze 中文民间维基',
      },
    },
  },
  'zh-Hant': {
    hero: {
      badge: 'Fandom & Miraheze',
      eyebrow: '特殊收容措施基金會',
      title: '控制，收容，保護',
      subtitle: 'Secure. Contain. Protect.',
      desc: [
        'SCP基金會是一個致力於收容世界上異常現象、物品、生物與地點的虛構組織。基金會以「控制（Secure）、收容（Contain）、保護（Protect）」為宗旨，這一宗旨在 Miraheze 和 Fandom 中常被意譯為「穩定、收容、保護」。',
        '此處匯總了 SCP 基金會兩個建立在 MediaWiki 農場的中文非官方維基社群：Fandom 與 Miraheze 。作為起源與本家的 Wikidot 維基 SCP Wiki 和 SCP-CN Wiki 也在此列出',
      ],
      buttons: {
        archive: '檔案庫',
        background: '背景資料',
        writing: '寫作指導',
        external: '外部連結',
      },
      archiveDesc: '瀏覽 SCP 檔案庫',
      backgroundDesc: '了解基金會背景',
      writingDesc: '創作與寫作指南',
      externalDesc: '跳轉外部資源',
    },
    card: {
      urlLabel: '網域',
      fandom: {
        name: 'SCP Wikia ZH',
        host: 'scp.fandom.com/zh',
        note: '建立在 Fandom 的民間愛好者維基',
      },
      miraheze: {
        name: 'SCP Miraheze CN',
        host: 'wiki.scpzh.org',
        note: '託管在 Miraheze 的民間寫作與百科維基',
      },
      visit: '訪問站點',
      copy: '複製',
      copied: '已複製',
    },
    footer: {
      disclaimer:
        '本站與 SCP Wiki 或 SCP-CN Wiki 官方無任何關係，系外圍民間社群網站',
      rights: 'SCP Foundation ZH  導航站 · 基於 Vite & Vue 3 構建',
      github: 'GitHub',
    },
    design: {
      eyebrow: 'About SCP Foundation Miraheze CN',
      title: '關於SCP基金會中文檔案庫',
      subtitle:
        '中文檔案庫即SCP基金會Miraheze中文，是建立在 Miraheze 農場的民間愛好者維基，允許較自由的創作或為SCP基金會的世界觀編寫百科。',
    },
    related: {
      status: {
        tabTitle: '狀態頁',
        name: 'SCP Miraheze CN 狀態頁',
        host: 'status.scpzh.org',
        url: 'https://status.scpzh.org',
        badge: 'Uptime Monitor',
        tag: '在線監控',
        desc:
          '提供 SCP Miraheze CN 維基及其附屬服務，以及依賴平台的即時可用性監測、故障宕機告警及歷史運行狀態報告。',
        features: ['可用性監控', '宕機告警', '歷史指標'],
      },
      forum: {
        tabTitle: '討論版',
        name: 'SCP Miraheze CN 討論版',
        host: 'forum.scpzh.org',
        url: 'https://forum.scpzh.org',
        badge: 'Community Forum',
        tag: '交流社群',
        desc:
          'SCP 基金會 Miraheze 中文的附屬的社群論壇，用於站務發布、創作交流、文章推薦與草稿批評。',
        features: ['站務發布', '創作交流', '文章推薦'],
      },
      visit: '訪問站點',
      copy: '複製網域',
      copied: '已複製',
    },
    sidebar: {
      quickNav: '快速導航',
      mirrors: '站點列表',
      language: '語言設定',
      close: '關閉選單',
      open: '開啟選單',
      nav: {
        archive: '檔案庫',
        background: '背景資料',
        writing: '寫作指導',
        external: '外部連結',
      },
      sites: {
        wikidotEn: 'SCP-EN Wiki',
        wikidotCn: 'SCP-CN Wiki',
        fandomZh: 'SCP-ZH Fandom',
        mirahezeCn: 'SCP-ZH Miraheze',
      },
      sitesDesc: {
        wikidotEn: 'Wikidot 官方英文總站',
        wikidotCn: 'Wikidot 官方中文分部',
        fandomZh: 'Fandom 中文民間維基',
        mirahezeCn: 'Miraheze 中文民間維基',
      },
    },
  },
}
