# 🌐 Colbrush Test Site

**Colbrush** 라이브러리의 기능 테스트 및 데모를 위한 공식 문서 사이트입니다.
색각 이상자를 위한 접근성 중심의 디자인 시스템 라이브러리인 [Colbrush](https://www.npmjs.com/package/colbrush)의 다양한 기능을 검증하고 시연합니다.

---

## 📖 소개

이 사이트는 다음과 같은 목적으로 활용됩니다:

- **라이브러리 기능 테스트**: Colbrush의 핵심 기능들을 실제 환경에서 테스트
- **문서화**: Colbrush 설치, 설정, 통합 방법 안내
- **인터랙티브 데모**: 색각 이상 유형별 색상 변수 적응 방식 시연
- **접근성 UI 패턴 쇼케이스**: Colbrush로 구현 가능한 접근성 UI 컴포넌트 예시

---

## 🎯 주요 기능

### Colbrush 핵심 기능

현재 테스트 중인 Colbrush의 주요 기능들:

- **ThemeProvider** (`colbrush/client`): 색각 이상 유형별 테마 제공
- **ThemeSwitcher** (`colbrush/client`): 사용자가 직접 테마를 전환할 수 있는 UI
- **SimulationFilter** (`colbrush/devtools`): 색각 이상 시뮬레이션 필터 (개발 및 프로덕션 환경 지원)

### 페이지 구성

- **Install** (`/`): Colbrush 설치 및 초기 설정 가이드
- **API** (`/api`): Colbrush API 문서 및 사용법
- **Usage** (`/usage`): 실제 UI 컴포넌트 예제 (그래프, 차트, 투두리스트 등)

---

## 🛠 기술 스택

- **Framework**: React 19 + Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4 + Colbrush 테마 시스템
- **Charts**: amCharts 5 (접근성 데이터 시각화)
- **Build Tool**: Vite + SWC
- **Package Manager**: npm/yarn/pnpm

---

## 🚀 시작하기

### 설치

```bash
git clone https://github.com/2025-OSDC/colbrush-test.git
cd colbrush-test
npm install
```

### Colbrush 라이브러리 설치

```bash
npm install colbrush
```

### 개발 서버 실행

```bash
npm run dev
```

---

## 📂 프로젝트 구조

```plaintext
src/
├── App.tsx                 # 메인 앱 컴포넌트 (ThemeProvider 통합)
├── layouts/
│   └── Layout.tsx         # 레이아웃 (SimulationFilter, ThemeSwitcher 통합)
├── pages/
│   ├── install/           # 설치 가이드 페이지
│   ├── api/               # API 문서 페이지
│   └── usage/             # 사용 예제 페이지
│       └── component/     # 데모 컴포넌트들
│           ├── graph/     # 차트 컴포넌트
│           ├── simulator/ # 색각 이상 시뮬레이터
│           ├── todo/      # 투두 리스트 예제
│           └── ...
└── components/            # 공통 컴포넌트
```

---

## 🧪 테스트 상태

**colbrush 코드 주석 처리** - 기능 테스트를 위해 다음 컴포넌트들을 임시로 비활성화:

#### 주석 처리된 파일

1. **[src/App.tsx](src/App.tsx)**
   - `ThemeProvider` import 및 래핑 주석 처리

2. **[src/layouts/Layout.tsx](src/layouts/Layout.tsx)**
   - `SimulationFilter` 컴포넌트 주석 처리
   - `ThemeSwitcher` 컴포넌트 주석 처리

3. **[src/index.css](src/index.css)**
   - Colbrush 스타일시트 import 주석 처리
   - 색각 이상 유형별 테마 CSS 변수 주석 처리 (deuteranopia, protanopia, tritanopia, monochromacy)

### 테스트 진행 방법

1. **리포지토리 클론 및 설치**

   ```bash
   git clone https://github.com/2025-OSDC/colbrush-test.git
   cd colbrush-test
   npm install
   npm install colbrush
   ```

2. **기본 UI 테스트**: 주석 처리 상태에서 기본 스타일링 확인

   ```bash
   npm run dev
   ```

3. **Colbrush 활성화**: 주석 해제 후 색각 이상 대응 테마 동작 확인

4. **비교 분석**: 활성화 전후 접근성 개선 효과 검증

---

## 🎨 Colbrush 활성화하기

테스트를 완료하고 Colbrush 기능을 활성화하려면 다음 파일들의 주석을 해제하세요:

### 1. 스타일시트 활성화

**[src/index.css](src/index.css:3)**

```css
/* 주석 해제 */
@import 'colbrush/styles.css';

/* npx colbrush --generate로 색맹 유형별 테마 변수 생성 */
[data-theme='deuteranopia'] { /* ... */ }
[data-theme='protanopia'] { /* ... */ }
[data-theme='tritanopia'] { /* ... */ }
```

### 2. ThemeProvider 활성화

**[src/App.tsx](src/App.tsx:4-8,16)**

```tsx
// 주석 해제
import { ThemeProvider } from "colbrush/client";

function App() {
  return (
    <ThemeProvider>
      {/* ... */}
    </ThemeProvider>
  );
}
```

### 3. 개발 도구 및 테마 스위처 활성화

**[src/layouts/Layout.tsx](src/layouts/Layout.tsx:5-6,14-15)**

```tsx
// 주석 해제
import { SimulationFilter } from "colbrush/devtools";
import { ThemeSwitcher } from "colbrush/client";

// JSX에서 주석 해제
<SimulationFilter allowInProd={true} />
<ThemeSwitcher />
```

---

## 📦 패키지 의존성

### 주요 의존성

- `colbrush` (^1.11.0) - 핵심 라이브러리
- `react` (^19.1.1)
- `react-router-dom` (^7.8.0)
- `tailwindcss` (^4.1.12)
- `@amcharts/amcharts5` (^5.13.5) - 접근성 차트 라이브러리

자세한 의존성 정보: [package.json](package.json)

---

## 📫 링크

- **NPM Package**: [colbrush](https://www.npmjs.com/package/colbrush)
- **GitHub Organization**: [2025-OSDC](https://github.com/2025-OSDC)
- **Core Library**: [colbrush/colbrush](https://github.com/2025-OSDC/colbrush)
