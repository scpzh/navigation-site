<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const { t, locale, setLocale, locales } = useLanguage()

const isOpen = ref(false)

const fandomUrl = 'https://scp.fandom.com/zh/'
const mirahezeUrl = 'https://wiki.scpzh.org/'
const archiveUrl = 'https://wiki.scpzh.org/%E5%8E%9F%E5%88%9BSCP%E5%88%97%E8%A1%A8'
const backgroundUrl = 'https://wiki.scpzh.org/%E5%85%B3%E4%BA%8ESCP%E5%9F%BA%E9%87%91%E4%BC%9A'
const writingUrl = 'https://wiki.scpzh.org/Help:%E6%8C%87%E5%AF%BC%E4%B8%AD%E5%BF%83'
const externalUrl = 'https://wiki.scpzh.org/Project:%E7%9B%B8%E5%85%B3%E7%BD%91%E7%AB%99'

const navLinks = [
  { key: 'archive', label: () => t.value.sidebar?.nav?.archive, href: archiveUrl },
  { key: 'background', label: () => t.value.sidebar?.nav?.background, href: backgroundUrl },
  { key: 'writing', label: () => t.value.sidebar?.nav?.writing, href: writingUrl },
  { key: 'external', label: () => t.value.sidebar?.nav?.external || t.value.hero?.buttons?.external, href: externalUrl },
]

const siteMirrors = [
  {
    key: 'wikidot-en',
    title: () => t.value.sidebar?.sites?.wikidotEn,
    desc: () => t.value.sidebar?.sitesDesc?.wikidotEn || 'Wikidot EN',
    href: 'https://scp-wiki.wikidot.com',
    badge: 'EN Main',
  },
  {
    key: 'wikidot-cn',
    title: () => t.value.sidebar?.sites?.wikidotCn,
    desc: () => t.value.sidebar?.sitesDesc?.wikidotCn || 'Wikidot CN',
    href: 'https://scp-wiki-cn.wikidot.com',
    badge: 'CN Branch',
  },
  {
    key: 'fandom-zh',
    title: () => t.value.sidebar?.sites?.fandomZh,
    desc: () => t.value.sidebar?.sitesDesc?.fandomZh || 'Fandom ZH',
    href: fandomUrl,
    badge: 'MediaWiki',
  },
  {
    key: 'miraheze-cn',
    title: () => t.value.sidebar?.sites?.mirahezeCn,
    desc: () => t.value.sidebar?.sitesDesc?.mirahezeCn || 'Miraheze ZH',
    href: mirahezeUrl,
    badge: 'MediaWiki',
  },
]

function toggleSidebar() {
  isOpen.value = !isOpen.value
}

function closeSidebar() {
  isOpen.value = false
}

function handleLinkClick(href) {
  closeSidebar()
  if (href.startsWith('#')) {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    closeSidebar()
  }
}

watch(isOpen, (val) => {
  if (typeof document !== 'undefined') {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="site-sidebar-wrapper">
    <button
      type="button"
      class="sidebar-toggle"
      :class="{ 'is-active': isOpen }"
      :aria-label="isOpen ? t.sidebar?.close || '关闭菜单' : t.sidebar?.open || '打开菜单'"
      :aria-expanded="isOpen"
      @click="toggleSidebar"
    >
      <svg
        v-if="!isOpen"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>

    <!-- 侧栏抽屉遮罩背景 -->
    <transition name="sidebar-fade">
      <div
        v-if="isOpen"
        class="sidebar-backdrop"
        aria-hidden="true"
        @click="closeSidebar"
      ></div>
    </transition>

    <aside
      id="side-bar"
      class="mox-sidebar"
      :class="{ 'is-open': isOpen }"
      aria-label="站点菜单"
    >
      <div class="mox-sidebar__header">
        <div class="mox-sidebar__brand">
          <img
            class="mox-sidebar__logo"
            src="/logo-scp-mh.png"
            alt="SCP Foundation"
          />
          <img
            class="mox-sidebar__title-img"
            src="/nav-topbar-name.png"
            alt="SCP 基金会"
          />
        </div>
        <button
          type="button"
          class="mox-sidebar__close-btn"
          :aria-label="t.sidebar?.close || '关闭菜单'"
          @click="closeSidebar"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="side-block">
        <div class="heading">
          <p>{{ t.sidebar?.quickNav || '快速导航' }}</p>
        </div>
        <div class="side-block__links">
          <a
            v-for="link in navLinks"
            :key="link.key"
            :href="link.href"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="side-link"
            @click="handleLinkClick(link.href)"
          >
            <span class="side-link__name">{{ link.label() }}</span>
            <svg class="side-link__arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <div class="side-block">
        <div class="heading">
          <p>{{ t.sidebar?.mirrors || '站点列表' }}</p>
        </div>
        <div class="side-block__links">
          <a
            v-for="(site, idx) in siteMirrors"
            :key="site.key"
            :href="site.href"
            target="_blank"
            rel="noopener noreferrer"
            class="side-link side-link--mirror"
            @click="closeSidebar"
          >
            <div class="side-link__meta">
              <div class="side-link__top">
                <span class="side-link__idx">{{ String(idx + 1).padStart(2, '0') }}</span>
                <span class="side-link__name">{{ site.title() }}</span>
                <span class="side-link__badge">{{ site.badge }}</span>
              </div>
              <p class="side-link__desc">{{ site.desc() }}</p>
            </div>
            <svg class="side-link__arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

      <div class="side-block">
        <div class="heading">
          <p>{{ t.sidebar?.language || '语言设置' }}</p>
        </div>
        <div class="side-block__lang-group">
          <button
            v-for="loc in locales"
            :key="loc.key"
            type="button"
            class="side-lang-btn"
            :class="{ 'is-active': locale === loc.key }"
            @click="setLocale(loc.key)"
          >
            <span class="side-lang-btn__mark" aria-hidden="true"></span>
            <span>{{ loc.label }}</span>
            <span class="side-lang-btn__tag">{{ loc.key }}</span>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>

.site-sidebar-wrapper {
  position: relative;
  z-index: 1000;
}

/* 常驻固定在左上角的菜单切换按钮 */
.sidebar-toggle {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 1010;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid var(--scp-hairline);
  background: rgba(185, 185, 192, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: var(--scp-text-strong);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(38, 38, 44, 0.08);
  transition: opacity 0.25s ease, transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  outline: none;
}

.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(43, 43, 51, 0.35);
  box-shadow: 0 6px 20px rgba(38, 38, 44, 0.12);
  transform: translateY(-1px);
}

/* 侧栏展开后隐藏切换按钮，防止遮挡侧栏顶部的徽标和标题 */
.sidebar-toggle.is-active {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.85);
}

/* 侧栏半透明遮罩 */
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(18, 18, 22, 0.35);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1001;
}

.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}

.mox-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 86vw;
  height: 100vh;
  height: 100dvh;
  background: rgba(169, 169, 175, 0.97);
  backdrop-filter: blur(28px) saturate(140%);
  -webkit-backdrop-filter: blur(28px) saturate(140%);
  border-right: 1px solid var(--scp-hairline);
  box-shadow: 6px 0 32px rgba(38, 38, 44, 0.18);
  z-index: 1002;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 14px 28px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  transform: translateX(-100%);
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.mox-sidebar.is-open {
  transform: translateX(0);
}

/* 侧栏顶栏 */
.mox-sidebar__header {
  position: sticky;
  top: 0;
  z-index: 10;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -14px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--scp-hairline);
  background: rgba(169, 169, 175, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.mox-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mox-sidebar__logo {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.mox-sidebar__title-img {
  height: 24px;
  width: auto;
  max-width: 170px;
  object-fit: contain;
}

.mox-sidebar__close-btn {
  background: transparent;
  border: none;
  color: var(--scp-text-soft);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background 0.2s ease, color 0.2s ease;
}

.mox-sidebar__close-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  color: var(--scp-text-strong);
}

/* ============ Wikidot Mox 核心：.side-block 与 .heading ============ */
.side-block {
  padding: 0.5rem 0.6rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.22);
  border: 1px solid var(--scp-hairline);
  border-radius: 8px;
}

.side-block .heading {
  background: rgba(43, 43, 51, 0.08);
  color: var(--scp-text-strong);
  border-left: 3px solid var(--scp-red-bright);
  padding: 0.35rem 0.7rem;
  margin-bottom: 0.6rem;
  border-radius: 0 4px 4px 0;
}

.side-block .heading p {
  font-family: var(--scp-font-mono);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0;
}

.side-block__links {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.side-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-left: 3px solid rgba(43, 43, 51, 0.25);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  text-decoration: none;
  color: var(--scp-text);
  font-family: var(--scp-font-sans);
  font-size: 13.5px;
  font-weight: 500;
  transition: all 0.22s ease;
}

.side-link:hover {
  background-color: var(--mox-theme-color);
  box-shadow: inset 24rem 0rem var(--mox-theme-color) !important;
  color: #ffffff !important;
  border-left-color: var(--scp-red-bright);
}

.side-link:hover .side-link__arrow {
  color: #ffffff;
  transform: translateX(3px);
}

.side-link__arrow {
  color: var(--scp-text-faint);
  transition: transform 0.2s ease, color 0.2s ease;
  flex: none;
}

.side-link--mirror {
  align-items: flex-start;
  padding: 10px 12px;
}

.side-link__meta {
  flex: 1;
  min-width: 0;
}

.side-link__top {
  display: flex;
  align-items: center;
  gap: 6px;
}

.side-link__idx {
  font-family: var(--scp-font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--scp-red-bright);
}

.side-link:hover .side-link__idx {
  color: #ffffff;
}

.side-link__name {
  font-weight: 600;
}

.side-link__badge {
  font-family: var(--scp-font-mono);
  font-size: 9.5px;
  padding: 1px 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(43, 43, 51, 0.18);
  color: var(--scp-text-soft);
}

.side-link:hover .side-link__badge {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

.side-link__desc {
  font-size: 11.5px;
  color: var(--scp-text-soft);
  margin-top: 4px;
  line-height: 1.4;
}

.side-link:hover .side-link__desc {
  color: rgba(255, 255, 255, 0.85);
}

.side-block__lang-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.side-lang-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid var(--scp-hairline);
  background: rgba(255, 255, 255, 0.28);
  font-family: var(--scp-font-sans);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--scp-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.side-lang-btn:hover {
  background: rgba(255, 255, 255, 0.6);
  border-color: rgba(43, 43, 51, 0.35);
}

.side-lang-btn.is-active {
  background: var(--mox-theme-color);
  border-color: var(--scp-red-bright);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.25);
}

.side-lang-btn__mark {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}

.side-lang-btn.is-active .side-lang-btn__mark {
  opacity: 1;
  background: #ffffff;
}

.side-lang-btn__tag {
  font-family: var(--scp-font-mono);
  font-size: 10px;
  opacity: 0.7;
}

</style>
