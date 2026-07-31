import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 좌측 내비게이션(Explorer) 정렬:
// 기본값은 displayName(=글 제목) 가나다순이라 게시글 번호 순서가 무시된다.
// slugSegment(=파일명, 번호 접두어 포함)를 numeric 비교해 "게시글 번호 오름차순"으로 정렬한다.
// 폴더는 파일보다 먼저(기본 동작 유지).
const explorerSortFn = (a: any, b: any) => {
  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return a.slugSegment.localeCompare(b.slugSegment, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }
  return !a.isFolder && b.isFolder ? 1 : -1
}

// 네비게이션 표시명 가공:
// 평탄 구조라 part 묶음이 안 보이므로, 파일명 `partN-M.` 접두어에서 `pN-M`을 뽑아
// 네비에 보이는 제목 앞에만 붙인다(예: "p0-1 클로드코드가 뭔가요?").
// 페이지 본문 제목(H1)은 frontmatter title 그대로라 영향 없음.
const explorerMapFn = (node: any) => {
  if (node.isFolder) return
  const m = (node.slugSegment ?? "").match(/^part(\d+)-(\d+)\./)
  if (m) {
    node.displayName = `p${m[1]}-${m[2]} ${node.displayName}`
  }
}

// ── 레이아웃 원칙 (Modernist) ──
// 1. 상단 가로 네비를 header에 둔다. 사이드는 최소화.
// 2. right는 항상 비운다 — 그래프·백링크 없음, 본문 폭 확대.
// 3. 목차는 좌측 데스크톱 전용.
// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/birdie-suyong-lim/blog",
      RSS: "/index.xml",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // 홈은 .home-hero가 제목 역할 — 자동 제목/메타는 홈에서 숨긴다
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Explorer({ sortFn: explorerSortFn, mapFn: explorerMapFn }),
  ],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({ sortFn: explorerSortFn, mapFn: explorerMapFn }),
  ],
  right: [],
}
