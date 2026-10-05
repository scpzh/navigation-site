<script setup>
import { computed, ref } from 'vue'
import { NButton } from 'naive-ui'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

const copiedKey = ref(null)
let copyTimer = null

const fandomUrl = 'https://scp.fandom.com/zh/'
const mirahezeUrl = 'https://wiki.scpzh.org/'

const sites = computed(() => [
  {
    key: 'fandom',
    logo: '/logo-fandom.svg',
    name: t.value.card.fandom.name,
    host: t.value.card.fandom.host,
    note: t.value.card.fandom.note,
    url: fandomUrl,
  },
  {
    key: 'miraheze',
    logo: '/logo-miraheze.svg',
    name: t.value.card.miraheze.name,
    host: t.value.card.miraheze.host,
    note: t.value.card.miraheze.note,
    url: mirahezeUrl,
  },
])

async function copyUrl(url, key) {
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    // 回退方案：临时 textarea（部分环境/权限下不可用）
    const el = document.createElement('textarea')
    el.value = url
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copiedKey.value = key
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => (copiedKey.value = null), 1600)
}
</script>

<template>
  <!-- 两个站点盒子：无外层卡片/标题栏，直接左右并列 -->
  <section class="site-card-grid scp-rise">
    <article
      v-for="site in sites"
      :key="site.key"
      class="site-entry"
      :class="`site-entry--${site.key}`"
    >
      <!-- Logo：无边框 -->
      <div class="site-entry__logo">
        <img :src="site.logo" :alt="site.name" loading="lazy" />
      </div>

      <div class="site-entry__meta">
        <h4 class="site-entry__name">{{ site.name }}</h4>
        <p class="site-entry__host">
          <span class="site-entry__host-label">{{ t.card.urlLabel }}</span>
          {{ site.host }}
        </p>
        <p class="site-entry__note">{{ site.note }}</p>
      </div>

      <div class="site-entry__actions">
        <a
          :href="site.url"
          target="_blank"
          rel="noopener noreferrer"
          class="site-entry__visit"
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
          </svg>
          {{ t.card.visit }}
        </a>
        <n-button
          quaternary
          size="small"
          class="site-entry__copy"
          @click="copyUrl(site.url, site.key)"
        >
          {{ copiedKey === site.key ? t.card.copied : t.card.copy }}
        </n-button>
      </div>
    </article>
  </section>
</template>

<style scoped>
/* ============ 两个站点盒子 ============ */
.site-card-grid {
  max-width: var(--scp-max-width);
  margin: clamp(16px, 3vw, 40px) auto 0;
  padding-inline: var(--scp-gutter);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.site-entry {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 28px 26px;
  border: 1px solid var(--scp-hairline);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  text-align: center;
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.site-entry::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(139, 0, 0, 0.55) 50%, transparent 100%);
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.site-entry:hover {
  border-color: rgba(43, 43, 51, 0.45);
  background: rgba(255, 255, 255, 0.42);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(38, 38, 44, 0.1);
}

.site-entry:hover::before {
  opacity: 1;
}

/* Logo：无边框、无底色 */
.site-entry__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58px;
  padding: 6px;
}

.site-entry__logo img {
  height: 100%;
  width: auto;
  filter: grayscale(1) brightness(0.55) contrast(1.1);
}

.site-entry__name {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--scp-text-strong);
}

.site-entry__host {
  margin-top: 4px;
  font-family: var(--scp-font-mono);
  font-size: 12px;
  color: var(--scp-text-soft);
}

.site-entry__host-label {
  margin-right: 6px;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--scp-text-faint);
}

.site-entry__note {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--scp-text-faint);
}

.site-entry__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-top: 10px;
}

.site-entry__visit {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0.55em 1.1em;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: #fff;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid transparent;
  background: linear-gradient(135deg, var(--scp-red) 0%, #6d0000 100%);
  box-shadow: 0 8px 24px rgba(139, 0, 0, 0.28);
  transition: filter 0.25s ease, transform 0.2s ease;
}
.site-entry__visit:hover {
  filter: brightness(1.15);
  transform: translateY(-1px);
}

:deep(.site-entry__copy) {
  --n-text-color: var(--scp-text-faint) !important;
  --n-text-color-hover: var(--scp-text-strong) !important;
}

/* ============ 响应式：堆叠为上下布局 ============ */
@media (max-width: 760px) {
  .site-card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
