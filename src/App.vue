<script setup>
import { NConfigProvider, NGlobalStyle, darkTheme } from 'naive-ui'
import { useLanguage } from '@/composables/useLanguage'
import SiteSidebar from '@/components/SiteSidebar.vue'
import HeroSection from '@/components/HeroSection.vue'
import SiteCard from '@/components/SiteCard.vue'
import RelatedSection from '@/components/RelatedSection.vue'

const { t } = useLanguage()

// Naive UI 主题：darkTheme + 主题色覆盖
const themeOverrides = {
  common: {
    primaryColor: '#8f8f99',
    primaryColorHover: '#b0b0ba',
    primaryColorPressed: '#6f6f7a',
    primaryColorSuppl: '#8f8f99',
    // 背景（浅灰）
    bodyColor: '#A9A9A9',
    cardColor: '#b3b3bb',
    modalColor: '#b3b3bb',
    popoverColor: '#c0c0c8',
    // 文字（深灰）
    textColorBase: '#2c2c33',
    textColor1: '#1f1f25',
    textColor2: '#2c2c33',
    textColor3: '#5a5a64',
    // 边框
    borderColor: 'rgba(38, 38, 44, 0.22)',
    dividerColor: 'rgba(38, 38, 44, 0.18)',
    // 字体
    fontFamily:
      '"Noto Serif SC", "Source Han Serif SC", "Source Han Serif", "Songti SC", "STSong", "SimSun", "Times New Roman", serif',
    fontFamilyMono:
      '"JetBrains Mono", "SFMono-Regular", "Consolas", "Menlo", "Courier New", monospace',
  },
  Button: {
    textColorPrimary: '#14141a',
    textColorHoverPrimary: '#14141a',
    textColorPressedPrimary: '#14141a',
    textColorFocusPrimary: '#14141a',
    fontWeight: '500',
  },
  Radio: {
    buttonBorderColor: 'rgba(43, 43, 51, 0.3)',
    buttonBorderColorActive: '#2c2c33',
    boxShadowActive: 'none',
    textColor: '#4e4e58',
    opacityDisabled: '0.4',
  },
}

// 站点版权年份
const year = new Date().getFullYear()
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-global-style />

    <!-- 全局统一沉浸式背景（以 Hero 区为准：设施底图 + 52px细网格 + 循环星空 + 柔光） -->
    <div class="site-global-bg" aria-hidden="true">
      <div class="site-global-bg__facility"></div>
      <div class="site-global-bg__grid"></div>
      <div class="site-global-bg__stars"></div>
      <div class="site-global-bg__glow"></div>
    </div>

    <!-- 默认折叠的侧边栏（参考 wikidot.html 中 side-bar 的实现） -->
    <SiteSidebar />

    <!-- Hero 区域：参考上传参考图排版，所有内容向下滑动即可看到 -->
    <HeroSection />

    <!-- 主体内容：卡片与关联服务侧边Tabber板块 -->
    <main class="page-main" id="content">
      <SiteCard />
      <RelatedSection />
    </main>

    <!-- 页脚上方分割线（类似 <hr>） -->
    <hr class="site-footer__hr" />

    <!-- 页脚：去掉背景颜色，授权协议与 GitHub 链接改用纯 SVG 图像，不保留文字 -->
    <footer class="site-footer">
      <div class="scp-container site-footer__inner">
        <p class="site-footer__disclaimer">{{ t.footer.disclaimer }}</p>

        <!-- 纯 SVG 授权与链接图标（不保留文字） -->
        <div class="site-footer__links">
          <a
            class="site-footer__icon-link"
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            title="CC BY-SA 4.0"
            aria-label="CC BY-SA 4.0"
          >
            <img
              class="site-footer__icon site-footer__icon--cc"
              src="/logo-ccbysa.svg"
              alt="CC BY-SA 4.0"
            />
          </a>

          <a
            class="site-footer__icon-link"
            href="https://opensource.org/license/mit"
            target="_blank"
            rel="noopener noreferrer"
            title="MIT License"
            aria-label="MIT License"
          >
            <img
              class="site-footer__icon site-footer__icon--mit"
              src="/logo-mit.svg"
              alt="MIT License"
            />
          </a>

          <a
            class="site-footer__icon-link"
            href="https://github.com/scpzh"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
          >
            <img
              class="site-footer__icon site-footer__icon--github"
              src="/logo-github.svg"
              alt="GitHub"
            />
          </a>
        </div>

        <div class="site-footer__meta">
          <span class="site-footer__mark">SCP · Secure. Contain. Protect.</span>
          <span class="site-footer__rights">{{ year }} · {{ t.footer.rights }}</span>
        </div>
      </div>
    </footer>
  </n-config-provider>
</template>

<style scoped>
.page-main {
  flex: 1;
  padding-bottom: clamp(40px, 8vw, 96px);
}

/* ---------- 页脚上方细分割线（类似 <hr>） ---------- */
.site-footer__hr {
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(43, 43, 51, 0.32) 20%,
    rgba(43, 43, 51, 0.32) 80%,
    transparent 100%
  );
  width: 100%;
  max-width: var(--scp-max-width);
  margin: 0 auto;
}

/* ---------- 页脚（无背景颜色） ---------- */
.site-footer {
  background: transparent;
  padding: 28px 0 44px;
}

.site-footer__inner {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.site-footer__disclaimer {
  font-size: 13px;
  line-height: 1.75;
  color: var(--scp-text); /* 提高对比度与清晰度 */
  opacity: 0.92; /* 提升不透明度，消除过分透明发虚问题 */
  max-width: 760px;
}

/* 纯 SVG 图标链接列表（无文字） */
.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
}

.site-footer__icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 4px;
  text-decoration: none;
  opacity: 0.85;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.site-footer__icon-link:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.site-footer__icon {
  height: 22px;
  width: auto;
  object-fit: contain;
  vertical-align: middle;
  filter: brightness(0); /* CSS 滤镜统一所有 SVG 图标颜色为纯黑色 */
  opacity: 0.85;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.site-footer__icon-link:hover .site-footer__icon {
  opacity: 1;
  transform: translateY(-1px);
}

.site-footer__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
  font-family: var(--scp-font-mono);
  font-size: 11.5px;
  letter-spacing: 0.12em;
  color: var(--scp-text);
  opacity: 0.88; /* 提升不透明度 */
}

.site-footer__mark {
  color: var(--scp-red-bright);
  letter-spacing: 0.2em;
}

@media (max-width: 560px) {
  .site-footer__meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
