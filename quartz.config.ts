import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * 블로그 Quartz 설정 (v4)
 *
 * 이 파일은 GitHub Actions 빌드 시 Quartz 체크아웃 루트로 복사되어 사용됩니다.
 * 콘텐츠(.md)는 이 레포 루트에 그대로 두고, CI가 Quartz의 content/ 로 주입합니다.
 *
 * 색·폰트는 Modernist 디자인 시스템 토큰입니다. 수정 규칙은 CLAUDE.md 참고.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "일단, AI",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ko-KR",
    baseUrl: "birdie-suyong-lim.github.io/blog",
    ignorePatterns: ["private", "templates", ".obsidian", "README.md", "CLAUDE.md", "**/CLAUDE.md", "**/인스타-카드-프롬프트*"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // Archivo에는 한글 글리프가 없다. 한글은 custom.scss의 폰트 스택에서
        // Noto Sans KR로 떨어지도록 --headerFont / --bodyFont를 함께 지정한다.
        header: "Archivo",
        body: "Noto Sans KR",
        code: "IBM Plex Mono",
      },
      colors: {
        // Modernist: ground #f3f2f2 / ink #201e1d / accent #ec3013 (단일 강조)
        lightMode: {
          light: "#f3f2f2",        // --color-bg
          lightgray: "#d7d3d3",    // --color-neutral-300
          gray: "#9b9797",         // --color-neutral-500
          darkgray: "#444141",     // --color-neutral-800
          dark: "#201e1d",         // --color-text
          secondary: "#ec3013",    // --color-accent
          tertiary: "#ae1800",     // --color-accent-700
          highlight: "#fff2ef",    // --color-accent-100
          textHighlight: "#ffc4b8", // --color-accent-300
        },
        darkMode: {
          light: "#201e1d",
          lightgray: "#444141",
          gray: "#7d7979",
          darkgray: "#d7d3d3",
          dark: "#f3f2f2",
          secondary: "#ff563c",    // 어두운 바탕에서는 accent-500
          tertiary: "#ff9783",
          highlight: "#2d2b2b",
          textHighlight: "#7c1405",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
