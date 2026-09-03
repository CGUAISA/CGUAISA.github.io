# CGU AISA Website

長庚大學人工智慧學系系學會網站雛形。

## 本機預覽

```powershell
npm install
npm run dev
```

終端機顯示網址後，以瀏覽器開啟即可。

## 發布到 GitHub Pages

本專案已包含 GitHub Pages workflow。推送到 `main` 後，GitHub Actions 會自動建置並發布：

```powershell
git add .
git commit -m "Add AISA website prototype"
git push origin main
```

第一次發布時，請在 GitHub repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
