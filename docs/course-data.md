# 課程資料維護

網站的科目表使用靜態 JSON，不會在訪客開啟頁面時解析或抓取官方 PDF。

- `src/data/courses-109-111.json`：109～111 學年度入學適用。
- `src/data/courses-112-115.json`：112～115 學年度入學適用。
- `src/data/curriculum.ts`：資料型別、排序及官方入口。

來源：[人工智慧學系大學部課程介紹](https://www.cgu.edu.tw/ai/Contents?nodeId=639)。原始 PDF 只用於核對；網站保留官方連結，未將 PDF 複製到儲存庫。

每次更新須核對 PDF 的入學適用年度、修訂標示、年級、上／下學期及學分欄位，再更新 `verifiedOn`。文字抽取順序不一定等於表格欄位順序，需目視核對。

`grades` 為科目表建議年級，`semester` 為建議學期（`upper`／`lower`；原表確實未指定時才使用 `unspecified`）。`kind` 為必修／選修；特殊符號、必選規則及碩士班課程資訊保留在 `group`、`note` 或該入學年度的 `notes`。

同時有上下學期學分的 `(1)(2)` 科目分開記錄。不同領域重複列出的同一科目需合併領域，避免把同一門課或學分算兩次。

更新後執行 `npm run check:courses`、`npm exec tsc -- --noEmit`、`npm run build`，並檢查 `/courses/` 的年度及年級切換。若官方新增、刪除課程或新增入學年度，核對後一併更新 `scripts/verify-curriculum.mjs` 的課程筆數及必修學分基準；選單會依 JSON 資料自動更新。
