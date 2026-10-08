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
