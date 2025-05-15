import { defineConfig } from 'vitepress'
import { getGuideSideBarItems } from './guide'
import tailwindcss from '@tailwindcss/vite'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PY-XIAOZHI",
  description: "py-xiaozhi is a Python-based XiaoZhi voice client, designed for learning through code and experiencing AI XiaoZhi's voice features without hardware requirements.",
  base: '/py-xiaozhi/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/00_Documentation_Index' },
      { text: 'Architecture', link: '/architecture/' },
      { text: 'Ecosystem', link: '/ecosystem/' },
      { text: 'Team', link: '/about/team' },
      { text: 'Contributing', link: '/contributing' },
      { text: 'Sponsors', link: '/sponsors/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          // Expanded by default
          collapsed: false,
          items: getGuideSideBarItems(),
        },
        {
          text: 'Legacy Docs',
          collapsed: true,
          items: [
            { text: 'User Documentation', link: '/guide/old_docs/User_Guide' }
          ]
        }
      ],
      '/ecosystem/': [
        {
          text: 'Ecosystem Overview',
          link: '/ecosystem/'
        },
        {
          text: 'Related Projects',
          collapsed: false,
          items: [
            { text: 'XiaoZhi Mobile Client', link: '/ecosystem/projects/xiaozhi-android-client/' },
            { text: 'xiaozhi-esp32-server', link: '/ecosystem/projects/xiaozhi-esp32-server/' },
            { text: 'XiaoZhiAI_server32_Unity', link: '/ecosystem/projects/xiaozhi-unity/' },
            { text: 'IntelliConnect', link: '/ecosystem/projects/intelliconnect/' },
            { text: 'open-xiaoai', link: '/ecosystem/projects/open-xiaoai/' }
          ]
        },
      ],
      '/about/': [],
      // No sidebar on sponsors page
      '/sponsors/': [],
      // No sidebar on contributing page
      '/contributing': [],
      // No sidebar on architecture page
      '/architecture/': [],
      // No sidebar on team page
      '/about/team': []
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/huangjunsen0406/py-xiaozhi' }
    ]
  },
  vite: {
    plugins: [
        tailwindcss()
    ]
  }
})
