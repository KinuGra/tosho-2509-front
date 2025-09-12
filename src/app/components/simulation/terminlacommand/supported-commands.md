# サポートされているGitコマンド

## 基本コマンド

### git add
- `git add` - 全ファイルをステージングエリアに追加
- `git add <file>` - 指定ファイルをステージングエリアに追加
- `git add -A` - 未追跡ファイルを含む全ファイルを追加

### git commit
- `git commit` - メッセージなしでコミット
- `git commit -m "message"` - メッセージ付きでコミット
- `git commit -a` - 全変更をコミット
- `git commit -am "message"` - 全変更をメッセージ付きでコミット

### git push
- `git push` - originにプッシュ
- `git push <remote>` - 指定リモートにプッシュ
- `git push -f` - 強制プッシュ
- `git push -u` - アップストリーム設定してプッシュ

### git pull
- `git pull` - originからプル
- `git pull <remote>` - 指定リモートからプル
- `git pull -r` - リベースでプル

## 情報表示コマンド

### git log
- `git log` - 詳細なコミット履歴表示
- `git log --oneline` - 1行形式でコミット履歴表示
- `git log --graph` - グラフ形式でコミット履歴表示

### git status
- `git status` - 詳細なステータス表示
- `git status -s` - 短縮形式でステータス表示

### git diff
- `git diff` - 作業ディレクトリの変更を表示
- `git diff --cached` - ステージングエリアの変更を表示

## ブランチ操作

### git branch
- `git branch` - ローカルブランチ一覧表示
- `git branch <name>` - 新しいブランチ作成
- `git branch -d <name>` - ブランチ削除
- `git branch -r` - リモートブランチ一覧表示

### git checkout
- `git checkout <branch>` - ブランチ切り替え
- `git checkout -b <name>` - ブランチ作成と切り替え

### git merge
- `git merge <branch>` - ブランチをマージ
- `git merge --no-ff <branch>` - no-fast-forwardでマージ

## リセット・履歴操作

### git reset
- `git reset` - HEADにリセット
- `git reset <commit>` - 指定コミットにリセット
- `git reset --hard` - ハードリセット
- `git reset --soft` - ソフトリセット

### git rebase
- `git rebase` - 現在のブランチは最新
- `git rebase <branch>` - 指定ブランチにリベース
- `git rebase -i` - インタラクティブリベース

## リモート操作

### git clone
- `git clone <url>` - リポジトリをクローン
- `git clone -b <branch> <url>` - 特定ブランチをクローン

### git remote
- `git remote` - リモート名一覧表示
- `git remote -v` - リモートURL詳細表示

### git fetch
- `git fetch` - originから取得
- `git fetch --all` - 全リモートから取得