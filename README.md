# design-master

**Google Antigravity で Claude Design と同じ体験を。**

このリポジトリは、[Google Antigravity](https://antigravity.google)(CLI /
IDE)を「AIデザインスタジオ」に変えるデザインワークスペースです。
プロンプトひとつで UI プロトタイプ・スライド・ワンページャーを生成し、
PDF / PPTX にエクスポートできます。Claude Design で使っている
デザインシステムをインポートして、全成果物にブランドを自動適用できます。

## セットアップ

1. [Antigravity](https://antigravity.google) をインストールし、この
   リポジトリを開く(CLI なら リポジトリ直下で `antigravity` を起動)
2. エクスポート機能を使う場合のみ:

   ```bash
   npm install
   npx playwright install chromium   # PLAYWRIGHT_BROWSERS_PATH が設定済みの環境では不要
   ```

スキルは `.agents/skills/`、スラッシュコマンドは `.agents/workflows/` に
入っており、リポジトリを開くだけで認識されます(`/skills` で確認可能)。

## 使い方

| コマンド | すること | 出力先 |
|---|---|---|
| `/design-slides 新製品発表の10枚ピッチ` | スライドデッキ生成(←/→でナビ) | `output/slides/` |
| `/design-prototype タスク管理SaaSのLP` | UI プロトタイプ / LP 生成 | `output/prototypes/` |
| `/design-onepager 会社紹介の1枚資料` | A4 印刷向けワンページャー生成 | `output/onepagers/` |
| `/design-import` | Claude Design のデザインシステムを取り込み | `design-system/` |
| `/design-system #1a73e8 をプライマリに` | ブランド設定・調整(URL からの抽出も可) | `design-system/` |
| `/design-export output/slides/xxx.html pptx` | PDF / PPTX エクスポート | 元ファイルの隣 |

スラッシュコマンドなしの自然言語(「LPつくって」「スライドにして」)でも
スキルが自動でマッチします。

## Claude Design のデザインシステムを使う

1. Claude Design(claude.ai/design)でデザインシステムプロジェクトを開き
   **Export** から .zip をダウンロード
   (ローカル Claude Code の `/design-sync` フォルダでも OK)
2. .zip かフォルダを `imports/` に置く
3. `/design-import` を実行

→ 色・フォント・コンポーネント・ガイドラインが `design-system/` に
取り込まれ、以降のすべての成果物に自動適用されます。反映結果は
`design-system/preview.html` で確認できます。既存の成果物への
再適用も選べます。

## エクスポート

```bash
node tools/export-pdf.mjs  output/slides/2026-07-06-pitch.html   # → PDF(1スライド=1ページ)
node tools/export-pptx.mjs output/slides/2026-07-06-pitch.html   # → PPTX(16:9、ノート付き)
node tools/serve.mjs                                             # プレビューサーバ(:8000)
```

PPTX は各スライドを高解像度画像として貼り込む方式です(プレビューと
100% 同じ見た目。テキスト編集が必要な場合は PDF を併用してください)。

## ディレクトリ構成

```
design-system/   ブランドの正本(tokens / components / guidelines / preview.html)
imports/         Claude Design エクスポートの置き場
.agents/         スキル6本 + ワークフロー6本(Antigravity が自動認識)
tools/           エクスポート・プレビュースクリプト(Node.js)
output/          生成物(prototypes / slides / onepagers)
```

## トラブルシューティング

- **エクスポートで「Executable doesn't exist」** → `npx playwright
  install chromium`(`PLAYWRIGHT_BROWSERS_PATH` 設定済み環境では不要)
- **「not a design-master deck」** → デッキがテンプレート契約
  (`window.__deck` 等)を満たしていません。`/design-slides` で再生成
  するか、テンプレートに合わせて修正してください
- **フォントが変わって見える** → オフライン時は Google Fonts の代わりに
  システムフォールバックが使われます(仕様)

---

## English summary

design-master turns Google Antigravity into a Claude Design-style AI
design studio: generate UI prototypes, slide decks, and one-pagers as
standalone HTML, all styled by a design system you can import straight
from a Claude Design export (drop the .zip into `imports/`, run
`/design-import`). Export decks to PDF/PPTX with the Node scripts in
`tools/`. Skills live in `.agents/skills/`, slash commands in
`.agents/workflows/`, rules in `AGENTS.md`.

## License

MIT — see [LICENSE](LICENSE).
