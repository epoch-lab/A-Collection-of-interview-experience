import { defineConfig } from "vitepress";

//命令集：pnpm add -D vitepress vue @mdit-vue/shared @types/node busuanzi.pure.js canvas-confetti less medium-zoom sass vitepress-plugin-comment-with-giscus xgplayer

import { devDependencies } from "../package.json";

import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from "vitepress-plugin-group-icons";

import { generateSidebar } from "vitepress-sidebar";

export default defineConfig({
  title: "BLOG",
  description: "BLOG！",
  lang: "zh-CN",
  ignoreDeadLinks: true, // 防止因死链而失败
  lastUpdated: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        // href: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbmdlcnByaW50Ij48cGF0aCBkPSJNMTIgMTBhMiAyIDAgMCAwLTIgMmMwIDEuMDItLjEgMi41MS0uMjYgNCIvPjxwYXRoIGQ9Ik0xNCAxMy4xMmMwIDIuMzggMCA2LjM4LTEgOC44OCIvPjxwYXRoIGQ9Ik0xNy4yOSAyMS4wMmMuMTItLjYuNDMtMi4zLjUtMy4wMiIvPjxwYXRoIGQ9Ik0yIDEyYTEwIDEwIDAgMCAxIDE4LTYiLz48cGF0aCBkPSJNMiAxNmguMDEiLz48cGF0aCBkPSJNMjEuOCAxNmMuMi0yIC4xMzEtNS4zNTQgMC02Ii8+PHBhdGggZD0iTTUgMTkuNUM1LjUgMTggNiAxNSA2IDEyYTYgNiAwIDAgMSAuMzQtMiIvPjxwYXRoIGQ9Ik04LjY1IDIyYy4yMS0uNjYuNDUtMS4zMi41Ny0yIi8+PHBhdGggZD0iTTkgNi44YTYgNiAwIDAgMSA5IDUuMnYyIi8+PC9zdmc+',
      },
    ],
  ],
  themeConfig: {
    editLink: {
      pattern:
        "https://github.com/mameikagou/vitepress-template/edit/main/:path",
      text: "在 GitHub 上编辑此页面",
    },
    //本地搜索
    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      // { text: 'Examples', link: '/markdown-examples' }
    ],
    //启用深色模式
    appearance: "dark",
    vite: {
      plugins: [
        groupIconVitePlugin({
          customIcon: {
            ts: localIconLoader(
              import.meta.url,
              "../public/svg/typescript.svg"
            ), //本地ts图标导入
            md: localIconLoader(import.meta.url, "../public/svg/md.svg"), //markdown图标
            css: localIconLoader(import.meta.url, "../public/svg/css.svg"), //css图标
            js: "logos:javascript", //js图标
          },
        }),
      ],
    },

    markdown: {
      //行号显示
      lineNumbers: true,

      // 使用 `!!code` 防止转换
      codeTransformers: [
        {
          postprocess(code) {
            return code.replace(/\[\!\!code/g, "[!code");
          },
        },
      ],

      // 开启图片懒加载
      image: {
        lazyLoading: true,
      },

      // 组件插入h1标题下
      config: (md) => {
        (md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
          return htmlResult;
        }),
          md.use(groupIconMdPlugin); //代码组图标
      },
    },

    //多语言
    locales: {
      root: {
        label: "简体中文",
        lang: "Zh_CN",
      },
      en: {
        label: "English",
        lang: "en",
        link: "/en/",
      },
      fr: {
        label: "French",
        lang: "fr",
        link: "/fr/",
      },
    },

    sidebar: generateSidebar([
      {
        manualSortFileNameByPriority: ["README.md"],
        collapsed: true,
        collapseDepth: 2,
        useFolderLinkFromIndexFile: true,
        // 如果要把 src 目录下的文件放到根目录，可以设置 scanStartPath 为 '/src'
        // 而不是使用 documentRootPath: 'example', 会导致所有文件都放到 example 目录下;
        scanStartPath: "/src",
      },
    ]),

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mameikagou/vitepress-template",
      },
    ],
  },
});
