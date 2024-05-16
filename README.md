# LINE 聊天紀錄視覺化工具 | Line Chat Visualizer

> [!WARNING]
> - 僅有繁體中文版本可正常使用，其他語言不保證效果。
> - 因為 LINE 只提供給使用者沒有標準規格的純文字聊天紀錄，因此無法保證與原聊天室格式一模一樣。
> - 電腦版 LINE 匯出的聊天紀錄格式不同，暫時無法使用 ^_^

## 使用方法
1. 在 LINE 應用程式上取得某個聊天室的聊天紀錄（副檔名為 .txt）
2. 在該專案網頁上點擊按鈕「選擇 LINE 聊天紀錄」
3. 從檔案中選擇需要顯示的聊天紀錄（副檔名為 .txt）
4. 若是群組，則需選擇自己的身份

## 如何取得 .txt 聊天紀錄檔案
### 手機版本
1. 選擇要匯出聊天紀錄的聊天室
2. 點擊右上角選單按鈕
3. 點擊「設定」
4. 點擊「傳送聊天紀錄」即可導出 .txt 檔案

## 開發
### Setup
Make sure to install the dependencies:

```bash
pnpm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```
Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
