# imports/ — Claude Design からの取り込み場所

Claude Design(claude.ai/design)で使っているデザインシステムをこの
ワークスペースに反映するには:

1. Claude Design で対象のデザインシステムプロジェクトを開く
2. **Export**(エクスポート)から .zip をダウンロード
   - ローカルの Claude Code で `/design-sync` を使っている場合は、
     そのデザインシステムフォルダをそのままコピーしても OK
3. .zip(または展開済みフォルダ)をこの `imports/` に置く
4. Antigravity で `/design-import` を実行

取り込み後は `design-system/preview.html` をブラウザで開くと、反映された
ブランド(色・フォント・コンポーネント)を確認できます。以降に生成する
プロトタイプ・スライド・ワンページャーすべてに自動適用されます。

このフォルダに置いたファイルは取り込み後も削除されません(いつ・何を
取り込んだかの記録として残ります)。
