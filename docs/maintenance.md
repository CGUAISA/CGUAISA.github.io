# 維護與交接說明

## 本機預覽

使用 Node.js 24（與目前部署環境一致），在專案資料夾執行：

```powershell
npm ci
npm run dev
```

用瀏覽器開啟終端機顯示的網址。

## 更新與發布

先確認修改內容與建置結果：

```powershell
git status
git diff
npm run build
```

確認只包含要發布的檔案後，將下方 `<檔案路徑>` 換成實際修改的檔案；多個檔案可用空格分隔：

```powershell
git add -- <檔案路徑>
git commit -m "Update AISA website"
git push origin main
```

推送到 `main` 後，GitHub Actions 會自動建置並發布。可在儲存庫的 Actions 查看結果。

科目表更新請參考[課程資料維護](course-data.md)。

## 活動資訊

活動資料放在 `src/data/events.ts`；首頁行事曆與 `/events/` 分頁共用這份資料。
修改後執行 `npm run check:events` 與 `npm run build`。

目前系遊日期依表單標題「115-1」整理為 2026 年。活動資訊為人工整理的靜態資料，
不會自動同步 Google 表單；修改日期、費用或行程時請核對原表單。
不要把報名者姓名、信箱或表單回覆放進公開儲存庫，也不要推測剩餘名額或成團狀態。
