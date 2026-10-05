<script setup>
import { computed, ref } from 'vue'
import { NButton } from 'naive-ui'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

const activeTab = ref('status')
const copiedKey = ref(null)
let copyTimer = null

const sites = computed(() => ({
  status: {
    key: 'status',
    logo: '/scpzh-status.svg',
    tabTitle: t.value.related?.status?.tabTitle || '状态站',
    name: t.value.related?.status?.name || 'SCP 基金会中文维基状态站',
    host: 'status.scpzh.org',
    url: 'https://status.scpzh.org',
    badge: t.value.related?.status?.badge || 'Uptime Monitor',
    tag: t.value.related?.status?.tag || '在线监控',
    desc:
      t.value.related?.status?.desc ||
      '提供 SCP 基金会中文维基各镜像与服务的实时可用性监测、故障宕机告警及历史运行状态报告。',
    features: t.value.related?.status?.features || ['可用性监控', '宕机告警', '历史指标'],
  },
  forum: {
    key: 'forum',
    logo: '/scpmh-forum.png',
    tabTitle: t.value.related?.forum?.tabTitle || '讨论版',
    name: t.value.related?.forum?.name || 'SCP 基金会 Miraheze 中文讨论版',
    host: 'forum.scpzh.org',
    url: 'https://forum.scpzh.org',
    badge: t.value.related?.forum?.badge || 'Community Forum',
    tag: t.value.related?.forum?.tag || '交流社区',
    desc:
      t.value.related?.forum?.desc ||
      'SCP 基金会 Miraheze 中文分部的官方社区讨论版，用于站务研讨、点子交流、世界观探索与草稿批评。',
    features: t.value.related?.forum?.features || ['站务研讨', '点子交流', '写作指导'],
  },
}))

const currentSite = computed(() => sites.value[activeTab.value])

async function copyUrl(url, key) {
  try {
    await navigator.clipboard.writeText(url)
  } catch {
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
  <!-- 关联站点与社区服务：采用侧边 Tabber 形式呈现 -->
  <section class="related" aria-labelledby="related-title">
    <div class="scp-container">
      <header class="related__head scp-rise">
        <p class="related__eyebrow">{{ t.design?.eyebrow }}</p>
        <h3 class="related__title" id="related-title">{{ t.design?.title }}</h3>
        <p class="related__subtitle">{{ t.design?.subtitle }}</p>
      </header>

      <!-- 侧边 Tabber 容器 -->
      <div class="related__tabber scp-rise">
        <!-- 侧边标签选项卡导航 (仅展示纯 Logo，不展示文字) -->
        <div class="related__nav" role="tablist" aria-orientation="vertical">
          <button
            v-for="site in Object.values(sites)"
            :key="site.key"
            type="button"
            role="tab"
            :aria-selected="activeTab === site.key"
            :aria-label="site.tabTitle"
            :title="site.tabTitle"
            class="related__tab-btn"
            :class="{ 'is-active': activeTab === site.key }"
            @click="activeTab = site.key"
          >
            <img
              :src="site.logo"
              :alt="site.tabTitle"
              class="related__tab-logo"
              loading="lazy"
            />
          </button>
        </div>

        <!-- 选中的内容展示面板 (Tab Content Panel) -->
        <transition name="tab-fade" mode="out-in">
          <div
            :key="currentSite.key"
            class="related__panel"
            role="tabpanel"
          >
            <!-- 面板顶部：大 Logo、徽章、名称与外链 -->
            <div class="related__panel-header">
              <div class="related__panel-logo-wrap">
                <img
                  :src="currentSite.logo"
                  :alt="currentSite.name"
                  class="related__panel-logo"
                  loading="lazy"
                />
              </div>

              <div class="related__panel-info">
                <div class="related__panel-tag-row">
                  <span class="related__panel-badge">{{ currentSite.badge }}</span>
                  <span class="related__panel-live">
                    <span class="pulse-dot"></span>
                    {{ currentSite.tag }}
                  </span>
                </div>

                <h4 class="related__panel-title">{{ currentSite.name }}</h4>

                <div class="related__panel-host-row">
                  <span class="related__panel-host-label">{{ t.card.urlLabel }}</span>
                  <a
                    :href="currentSite.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="related__panel-host-link"
                  >
                    {{ currentSite.host }}
                    <svg
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- 面板正文介绍 -->
            <div class="related__panel-body">
              <p class="related__panel-desc">{{ currentSite.desc }}</p>

              <!-- 功能特性芯片 -->
              <div class="related__panel-features">
                <span
                  v-for="(feat, idx) in currentSite.features"
                  :key="idx"
                  class="related__feature-chip"
                >
                  <span class="feature-chip-hash" aria-hidden="true">#</span>
                  {{ feat }}
                </span>
              </div>
            </div>

            <!-- 面板底部操作按键 -->
            <div class="related__panel-actions">
              <a
                :href="currentSite.url"
                target="_blank"
                rel="noopener noreferrer"
                class="related__visit-btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                </svg>
                {{ t.related?.visit || t.card.visit }}
              </a>

              <n-button
                quaternary
                size="medium"
                class="related__copy-btn"
                @click="copyUrl(currentSite.url, currentSite.key)"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  style="margin-right: 6px;"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {{
                  copiedKey === currentSite.key
                    ? t.related?.copied || t.card.copied
                    : t.related?.copy || t.card.copy
                }}
              </n-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.related {
  padding: clamp(28px, 4.5vw, 52px) 0 0;
}

/* 标题区 */
.related__head {
  margin-bottom: 24px;
}

.related__eyebrow {
  font-family: var(--scp-font-mono);
  font-size: 12px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--scp-red-bright);
}

.related__title {
  margin-top: 8px;
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--scp-text-strong);
}

.related__subtitle {
  margin-top: 6px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--scp-text-soft);
}

/* ============ 侧边 Tabber 核心网格布局 ============ */
.related__tabber {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 18px;
  align-items: stretch;
}

/* 左侧标签列表 (Vertical Tabs，仅包含纯 Logo 图标) */
.related__nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.related__tab-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  padding: 0;
  border: 1px solid var(--scp-hairline);
  border-left: 3px solid rgba(43, 43, 51, 0.25);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
  transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}

.related__tab-btn:hover {
  background: rgba(255, 255, 255, 0.38);
  border-color: rgba(43, 43, 51, 0.35);
  border-left-color: var(--scp-red-bright);
  transform: translateX(2px);
}

.related__tab-btn.is-active {
  background: rgba(255, 255, 255, 0.48);
  border-color: rgba(43, 43, 51, 0.4);
  border-left-color: var(--scp-red-bright);
  box-shadow: 0 6px 20px rgba(38, 38, 44, 0.09);
  transform: translateX(3px);
}

/* Tabber Logo：纯 Logo，无背景，无边框 */
.related__tab-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  background: transparent;
  transition: transform 0.24s ease;
}

.related__tab-btn:hover .related__tab-logo,
.related__tab-btn.is-active .related__tab-logo {
  transform: scale(1.08);
}

/* ============ 右侧选中的内容展示卡片 ============ */
.related__panel {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 30px 32px 26px;
  border: 1px solid var(--scp-hairline);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 8px 24px rgba(38, 38, 44, 0.06);
}

.related__panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(139, 0, 0, 0.6) 50%,
    transparent 100%
  );
  opacity: 0.75;
}

.related__panel-header {
  display: flex;
  align-items: center;
  gap: 22px;
}

.related__panel-logo-wrap {
  width: 76px;
  height: 76px;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.related__panel-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: transparent;
}

.related__panel-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.related__panel-tag-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.related__panel-badge {
  font-family: var(--scp-font-mono);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(139, 0, 0, 0.12);
  border: 1px solid rgba(139, 0, 0, 0.22);
  color: var(--scp-red-bright);
}

.related__panel-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--scp-font-mono);
  font-size: 11px;
  color: var(--scp-text-soft);
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

.related__panel-title {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--scp-text-strong);
}

.related__panel-host-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--scp-font-mono);
  font-size: 12.5px;
}

.related__panel-host-label {
  color: var(--scp-text-soft);
  font-size: 11px;
}

.related__panel-host-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--scp-text-strong);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.related__panel-host-link:hover {
  color: var(--scp-red-bright);
}

/* 面板正文 */
.related__panel-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.related__panel-desc {
  font-size: 14px;
  line-height: 1.8;
  color: var(--scp-text);
  max-width: 720px;
}

.related__panel-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.related__feature-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(43, 43, 51, 0.06);
  border: 1px solid var(--scp-hairline);
  font-family: var(--scp-font-mono);
  font-size: 12px;
  color: var(--scp-text-strong);
  font-weight: 500;
}

.feature-chip-hash {
  color: var(--scp-red-bright);
  font-weight: 700;
}

/* 操作按键组 */
.related__panel-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 6px;
  border-top: 1px dashed rgba(38, 38, 44, 0.16);
}

.related__visit-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border-radius: 9999px;
  background: var(--mox-theme-color);
  color: #ffffff;
  font-family: var(--scp-font-sans);
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.22s ease;
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.22);
}

.related__visit-btn:hover {
  background: var(--scp-red-bright);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(176, 8, 8, 0.32);
}

.related__copy-btn {
  font-family: var(--scp-font-sans);
  font-size: 13px;
  border: 1px solid var(--scp-hairline);
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
}

.related__copy-btn:hover {
  background: rgba(255, 255, 255, 0.6);
  border-color: rgba(43, 43, 51, 0.35);
}

/* Tab 切换过渡 */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ============ 移动端与响应式 ============ */
@media (max-width: 680px) {
  .related__tabber {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .related__nav {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  .related__tab-btn {
    width: 72px;
    height: 72px;
  }

  .related__tab-btn.is-active {
    transform: translateY(-2px);
  }

  .related__tab-logo {
    width: 42px;
    height: 42px;
  }
}

@media (max-width: 520px) {
  .related__panel {
    padding: 22px 18px 20px;
  }

  .related__panel-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .related__panel-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .related__visit-btn {
    justify-content: center;
  }
}
</style>
