import { computed, ref } from 'vue'
import { messages, locales } from '@/i18n'

// 语言状态（模块级单例，供全局复用）
const current = ref('zh-Hans')

// 首次加载时优先读取本地存储的语言偏好
try {
  let saved = localStorage.getItem('scp-lang')
  if (saved === 'zh-CN') saved = 'zh-Hans'
  if (saved === 'zh-TW') saved = 'zh-Hant'
  if (saved && messages[saved]) current.value = saved
} catch {
  /* 隐私模式 / SSR 场景下忽略 */
}

export function useLanguage() {
  const locale = computed(() => current.value)

  // 当前语言对应的文案对象
  const t = computed(() => messages[current.value])

  function setLocale(key) {
    if (!messages[key]) return
    current.value = key
    try {
      localStorage.setItem('scp-lang', key)
    } catch {
      /* ignore */
    }
    // 让 `<html lang>` 与语言保持一致，有利于无障碍与 SEO
    if (document.documentElement) {
      document.documentElement.setAttribute('lang', key === 'zh-Hant' ? 'zh-Hant' : 'zh-Hans')
    }
  }

  return { locale, t, setLocale, locales }
}
