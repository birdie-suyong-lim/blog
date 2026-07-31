# 블로그 작업 규칙 — 일단, AI

이 레포는 Quartz v4 블로그입니다. 콘텐츠(.md)와 설정 3개 파일만 이 레포에 있고,
Quartz 코어는 CI가 체크아웃합니다.

## 디자인 시스템: Modernist (고정)

이 블로그의 시각 규칙은 아래가 전부입니다. **새 색·새 폰트·새 컴포넌트를 만들지 마세요.**

### 토큰 (quartz.custom.scss의 `:root`가 유일한 출처)

| 역할 | 값 | 변수 |
| --- | --- | --- |
| 바탕 | `#f3f2f2` | `--ground` |
| 잉크(본문·제목·2px 룰) | `#201e1d` | `--ink` |
| 강조 | `#ec3013` | `--accent` |
| 강조 텍스트(본문 크기) | `#ae1800` | `--accent-700` |
| 강조 틴트(hover) | `#fff2ef` | `--accent-100` |
| 얇은 구분선 | `#d7d3d3` | `--n-300` |
| 메타 텍스트 | `#605d5d` | `--n-700` |

- 하드코딩된 hex 금지. 항상 `var(--…)`.
- 폰트는 `--headerFont` / `--bodyFont` 두 개뿐 (Archivo + Noto Sans KR).
  **Archivo에는 한글이 없으므로 두 스택 모두 Noto Sans KR 폴백을 반드시 유지할 것.**

### 형태 규칙

1. **라운드 0** — 어떤 요소에도 `border-radius`를 넣지 않습니다.
2. **구분은 룰로** — 섹션 사이 `2px solid var(--ink)`, 목록 행 사이 `1px solid var(--n-300)`.
   그림자로 띄우지 않습니다.
3. **flush left** — 제목·본문·버튼 라벨 모두 왼쪽 정렬. 가운데 정렬 금지.
4. **적색은 아껴서** — 주요 액션, 작은 강조, 그리고 홈의 코스 배너 한 곳(포스터로 사용).
   본문 크기 적색 텍스트는 `--accent-700`(대비 확보).
5. **인터랙션 상태 필수** — 클릭 가능한 모든 요소에 `:hover { background: var(--accent-100) }` 계열 틴트,
   `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }`.
   브라우저 기본 파란 포커스 링을 남기지 마세요.
6. **사진은 흑백** — 컬러 이미지를 그대로 넣지 말고 `filter: grayscale(1)` 처리.
7. **이모지 금지** — 본문 마크다운의 파트 라벨 등에 사용하지 않습니다.

### 레이아웃 규칙 (quartz.layout.ts)

- `right: []` 를 유지합니다. 그래프·백링크는 쓰지 않고, 본문 폭을 넓게 씁니다.
- 상단 가로 네비는 `sharedPageComponents.header`에 둡니다. 사이드는 Explorer + 목차만.
- `explorerSortFn`(번호 오름차순)과 `explorerMapFn`(`pN-M` 접두어)은 **삭제·수정 금지** —
  글 번호 순서와 연재 파트 표기가 여기에 의존합니다.

## 파일별 책임

| 파일 | 바꿔도 되는 것 |
| --- | --- |
| `quartz.config.ts` | 색 토큰, 폰트, 플러그인. 색을 바꿀 땐 위 표와 custom.scss를 함께 갱신 |
| `quartz.layout.ts` | 컴포넌트 배치. `right`는 항상 `[]` |
| `quartz.custom.scss` | 스타일 전부. 새 규칙은 `:root` 토큰을 써서 작성 |
| `index.md` | 홈. `.home-hero` / `.home-grid` / `.course-banner` 블록 구조 유지, 글 수만 갱신 |

## 글 작성 규칙

- frontmatter: `title`, `date`(YYYY-MM-DD), `tags` 필수.
- 파일명은 `번호.제목-슬러그.md`. 연재물은 `partN-M.제목.md` (Explorer 정렬이 이 형식에 의존).
- 카테고리를 추가하면 `index.md`의 `.home-grid`에 셀을 하나 추가하고 글 수를 갱신합니다.

## 작업 후 확인

```
npx quartz build --serve
```

홈 / 카테고리 목록 / 글 상세 / 모바일 390px — 네 화면을 확인합니다.

- [ ] 우측 그래프·백링크 없음, 본문이 넓은가
- [ ] 제목과 본문의 한글이 같은 서체인가
- [ ] 라운드 0, 구분이 2px 룰인가
- [ ] 링크·행 hover가 적색 계열인가
- [ ] 390px에서 네비가 한 줄로 접히고 격자가 2열이 되는가
