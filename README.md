# Project for Neutec

這是一個使用 Angular 20 開發的文章管理系統，提供文章的新增、編輯、刪除、搜尋及分頁功能。

## 🛠 開發框架與工具版本

| 工具/框架 | 版本 |
|-----------|------|
| Angular | ^20.2.1 |
| Angular CLI | ^20.2.0 |
| Angular Material | ^20.2.0 |
| TypeScript | ~5.9.2 |
| Node.js | v24.3.0 |
| npm | 11.4.2 |
| RxJS | ~7.8.0 |

### 測試框架
- Jasmine | ~5.9.0
- Karma | ~6.4.0
- Angular Testing Utilities

## 🚀 建置 / 執行指令

### 安裝
```bash
npm install
```

### 開發
```bash
npm start
# 或
ng serve
```
應用程式會在 `http://localhost:4200/` 啟動

### 建置
```bash
npm run build
# 或
ng build
```


## 🔐 登入測試帳號

目前登入狀態保存在cookie，模仿像是jwt那類型的http only cookie

建議測試帳號：
- **帳號**: `admin@mail.com`
- **密碼**: `admin_password`

## 📋 功能特色

### 核心功能
- ✅ **使用者認證** - 登入/登出系統
- ✅ **文章管理** - 新增、編輯、刪除文章
- ✅ **文章列表** - 支援分頁顯示
- ✅ **搜尋功能** - 關鍵字搜尋文章
- ✅ **標籤系統** - 文章分類標籤
- ✅ **批次操作** - 多選刪除功能
- ✅ **介面設計** - 使用 Angular Material


## 🏗 專案架構

```
src/app/
├── core/                # 核心服務
│   └── Service/         # API 服務、認證服務等
│   └── Store/           # 全域狀態管理
├── shared/              # 共享組件與工具
│   ├── component/       # 通用組件
│   └── layout/          # 版面配置
├── guards/              # 路由守衛
├── article/             # 文章管理功能
│   ├── editor/          # 文章編輯器
│   └── search/          # 搜尋組件
└── auth/                # 認證功能
```

## 🎯 設計理念

- 使用 Standalone Components 減少模組依賴
- 使用 loadComponent 製作頁面懶載入 讓載入時間加速
- 使用 元件內router 達成功能分離懶載入(規劃中，目前已有router切割，但對應元件後續會補上) 
- 運用 Signals 做組件各個別狀態管理
- 運用 Injectable 做出類似pinia的全域狀態管理 控制全域UI組件
- 運用 cookie 模擬http only cookie狀態 以達到模擬JWT登入狀態
- 運用 ngContent 製作類似Nuxt Layout功能 統一制定版面 方便管理與維護
- 運用 ngContiner 製作元件 讓元件有彈性處理不同資料狀態 以提高元件可重用性
- 以RxJS模擬RxJS http物件回應並使用subscribe模擬完整AJAX行為

## 🚧 困難點

- 框架轉換差異
第一次使用angular，許多語法跟概念都與vue有些不同，但整體概念上都還可以理解，目前都是先以vue的概念去轉換成angular，大多都還算順利。
整體而言其實並沒有我想像中的不適應，甚至有些部分比起vue更喜歡angular的方式，像是模板、樣式、邏輯拆開的方式，比起vue的單一檔案來說，更加的清楚彼此的職責分配，比較不會迷失在其他當下不該專注的部分。class化的寫法也是喜歡的部分，可以更加的好規劃整體架構分配職責，以提高整體重用性。

- 測試寫法
之前比較沒有寫過測試的部分，此專案測試是先請AI協助撰寫，看過後大致上可以理解主要測試的方式，但測試相關的語法相當的生疏，也不太清楚有哪些物件可以使用，理解這些部分算是畫比較多時間的部分，此專的測試也並沒有完整撰寫完成，目前還在摸索中

---

