<script setup>
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

const archiveUrl = 'https://wiki.scpzh.org/%E5%8E%9F%E5%88%9BSCP%E5%88%97%E8%A1%A8'
const backgroundUrl = 'https://wiki.scpzh.org/%E5%85%B3%E4%BA%8ESCP%E5%9F%BA%E9%87%91%E4%BC%9A'
const writingUrl = 'https://wiki.scpzh.org/Help:%E6%8C%87%E5%AF%BC%E4%B8%AD%E5%BF%83'
const externalUrl = 'https://wiki.scpzh.org/Project:%E7%9B%B8%E5%85%B3%E7%BD%91%E7%AB%99'

const actions = [
  { key: 'archive', kind: 'solid', href: archiveUrl, external: true },
  { key: 'background', kind: 'glass', href: backgroundUrl, external: true },
  { key: 'writing', kind: 'glass', href: writingUrl, external: true },
  { key: 'external', kind: 'glass', href: externalUrl, external: true },
]

function scrollToContent() {
  const nextTarget = document.getElementById('content')
  if (nextTarget) {
    nextTarget.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="hero" id="top">
    <div id="extrac-div-1" class="hero__content-layer">
      <div class="scp-container hero__container">
        <div class="hero__watermark" aria-hidden="true">
          <img
            class="hero__watermark-img"
            src="/logo-scp-mh.png"
            alt=""
          />
        </div>

        <div class="hero__eyebrow-row">
          <span class="hero__badge-pill">{{ t.hero.badge }}</span>
          <span class="hero__eyebrow-text">{{ t.hero.eyebrow }}</span>
        </div>

        <h1 class="hero__title">
          {{ t.hero.title }}
        </h1>

        <div class="hero__tagline-row">
          <span class="hero__subtitle">{{ t.hero.subtitle }}</span>
        </div>

        <div class="hero__desc">
          <p v-for="(paragraph, i) in t.hero.desc" :key="i">
            {{ paragraph }}
          </p>
        </div>

        <div class="hero__actions">
          <a
            v-for="action in actions"
            :key="action.key"
            :href="action.href"
            :target="action.external ? '_blank' : undefined"
            :rel="action.external ? 'noopener noreferrer' : undefined"
            class="hero__pill-btn"
            :class="`hero__pill-btn--${action.kind}`"
          >
            <!-- 档案库图标 -->
            <svg
              v-if="action.key === 'archive'"
              class="hero__btn-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="5" rx="1" />
              <path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
              <path d="M10 13h4" />
            </svg>

            <!-- 背景资料图标 -->
            <svg
              v-else-if="action.key === 'background'"
              class="hero__btn-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M9 13h6M9 17h4" />
            </svg>

            <!-- 写作指导图标 -->
            <svg
              v-else-if="action.key === 'writing'"
              class="hero__btn-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
              <path d="M16 8 2 22" />
              <path d="M17.5 15H9" />
            </svg>

            <!-- 外部链接图标 -->
            <svg
              v-else
              class="hero__btn-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
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

            <span class="hero__btn-text">{{ t.hero.buttons[action.key] }}</span>
          </a>
        </div>
      </div>

      <!-- 向下滑动指示器 (点击顺畅滑入内容区) -->
      <button
        type="button"
        class="hero__scroll-prompt"
        aria-label="向下滑动浏览"
        @click="scrollToContent"
      >
        <span class="hero__scroll-text">向下滑动探索</span>
        <svg
          class="hero__scroll-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>

.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  isolation: isolate;
  background: transparent;
}

/* ============ 前景内容排版 ============ */
.hero__content-layer {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(60px, 12vh, 100px) 0 40px;
}

.hero__container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: var(--scp-max-width);
  margin-inline: auto;
}

/* ============ 斜置于右侧的半透明 SCP-MH 徽标水印 ============ */
.hero__watermark {
  position: absolute;
  top: 50%;
  right: -30px;
  transform: translateY(-50%) rotate(15deg);
  width: clamp(300px, 40vw, 560px);
  height: clamp(300px, 40vw, 560px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.16;
  filter: drop-shadow(0 12px 36px rgba(0, 0, 0, 0.3));
  user-select: none;
}

.hero__watermark-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(1) contrast(1.15);
}

/* 确保前景文字与按钮均位于水印图层之上清晰呈现 */
.hero__eyebrow-row,
.hero__title,
.hero__tagline-row,
.hero__desc,
.hero__actions {
  position: relative;
  z-index: 1;
}

/* 顶部眉标行（对标参考图小字） */
.hero__eyebrow-row {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.hero__badge-pill {
  font-family: var(--scp-font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ffffff;
  background: rgba(139, 0, 0, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3px 10px;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.3);
}

.hero__eyebrow-text {
  font-family: var(--scp-font-sans);
  font-size: clamp(14px, 1.8vw, 17px);
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.hero__title {
  font-family: var(--scp-font-sans);
  font-size: clamp(38px, 6.2vw, 68px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin-bottom: 14px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.35);
}

.hero__tagline-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.hero__subtitle {
  font-family: var(--scp-font-mono);
  font-size: clamp(12px, 1.6vw, 15px);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
}

.hero__class-badge {
  font-family: var(--scp-font-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(30, 30, 38, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 2px 9px;
  border-radius: 9999px;
  backdrop-filter: blur(8px);
}

/* 描述文案（两段清晰可读的左对齐正文） */
.hero__desc {
  max-width: 760px;
  display: grid;
  gap: 14px;
  margin-bottom: 36px;
}

.hero__desc p {
  font-size: clamp(14.5px, 1.6vw, 16.5px);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.82);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

/* ============ 行动按钮组（对标参考图：首个白底实心药丸，其余暗玻璃药丸） ============ */
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
}

.hero__pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  border-radius: 9999px;
  text-decoration: none;
  font-family: var(--scp-font-sans);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
}

.hero__pill-btn--solid {
  background: #ffffff;
  color: #121217;
  border: 1px solid #ffffff;
  font-weight: 600;
}

.hero__pill-btn--solid:hover {
  background: #f0f0f5;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.hero__pill-btn--solid:active {
  transform: translateY(0);
}

.hero__pill-btn--glass {
  background: rgba(28, 30, 40, 0.48);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.hero__pill-btn--glass:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}

.hero__pill-btn--glass:active {
  transform: translateY(0);
}

.hero__btn-icon {
  flex: none;
}

/* ============ 向下滑动探索指示 ============ */
.hero__scroll-prompt {
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  margin: 20px auto 0;
  padding: 6px 16px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s ease;
  animation: scroll-indicator-bounce 2.2s infinite ease-in-out;
  outline: none;
  user-select: none;
}

.hero__scroll-prompt:hover {
  color: #ffffff;
}

.hero__scroll-text {
  font-family: var(--scp-font-mono);
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.hero__scroll-icon {
  stroke-width: 2.2px;
}

/* ============ 移动端响应式 ============ */
@media (max-width: 680px) {
  .hero__watermark {
    right: -40px;
    opacity: 0.10;
    width: clamp(220px, 65vw, 360px);
    height: clamp(220px, 65vw, 360px);
  }

  .hero__title {
    font-size: 32px;
  }

  .hero__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    gap: 10px;
  }

  .hero__pill-btn {
    justify-content: center;
    padding: 10px 16px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .hero__actions {
    grid-template-columns: 1fr;
  }
}
</style>
