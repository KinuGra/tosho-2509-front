# サポートされているGitコマンド

## 基本コマンド

### git add
- `git add` → "Added files"
- `git add -A` → "Added all files including untracked"

### git commit
- `git commit` → "Committed without message"
- `git commit -m "message"` → "Committed with message \"message\""
- `git commit -a` → "Committed all changes without message"
- `git commit -am "message"` → "Committed all changes with message \"message\""

### git push
- `git push` → "Pushed"
- `git push -f` → "Force pushed"
- `git push -u` → "Pushed and set upstream"
- `git push -f -u` → "Force pushed and set upstream"

## 情報表示コマンド

### git log
- `git log` → 詳細なコミット情報
- `git log --oneline` → "abc123 Initial commit"
- `git log --graph` → "* abc123 (HEAD -> main) Initial commit"
- `git log --oneline --graph` → "* abc123 Initial commit"

### git status
- `git status` → "On branch main\nnothing to commit"
- `git status -s` → "M  file.txt"

### git diff
- `git diff` → "diff output"
- `git diff --cached` → "diff --cached output"

## ブランチ操作

### git branch
- `git branch` → "* main"
- `git branch <name>` → "Created branch '<name>'"
- `git branch -d <name>` → "Deleted branch '<name>'"
- `git branch -r` → "origin/main"

### git checkout
- `git checkout <branch>` → "Switched to branch '<branch>'"
- `git checkout -b <name>` → "Created and switched to branch '<name>'"

## リセット操作

### git reset
- `git reset` → "Reset to HEAD"
- `git reset --hard` → "Hard reset to HEAD"
- `git reset --soft` → "Soft reset to HEAD"

## その他のコマンド

### 実装済み（簡易応答）
- `git pull` → "pull executed"
- `git clone` → "clone executed"
- `git merge` → "merge executed"
- `git remote` → "remote executed"
- `git fetch` → "fetch executed"
- `git rebase` → "rebase executed"