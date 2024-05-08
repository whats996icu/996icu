import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/996icu/',
  title: 'whats996icu',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '自用教程',
        items: [
          { text: '建站工具', items: [{ text: 'vitepress', link: '...' }] },
          {
            text: '编程软件',
            items: [{ text: 'ja-netfilter', link: '...' }],
          },
          { text: '更多工具', items: [{ text: 'vpn', link: '...' }] },
        ],
      },
      {
        text: '学习路线',
        items: [
          { text: '前端', items: [{ text: 'front-end', link: '...' }] },
          {
            text: '后端',
            items: [{ text: 'back-end', link: '...' }],
          },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

    footer: {
      copyright: 'Copyright © 2024-present whats996icu',
    },
  },
})
