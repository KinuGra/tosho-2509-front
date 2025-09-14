// お題型
export interface Topic {
    id: number;
    title: string;
    description: string;
    steps: Step[];
    difficulty: string;
    tags: string[];
    is_completed?: boolean; // オプショナルにして、未設定の場合はfalseとして扱う
    is_wip?: boolean; // 準備中かどうかを示すフラグ
}

// ステップ型
export interface Step {
    order: number;
    title: string;
    description: string;
    wantcode: string[];
    outcode: string;
    responses?: { [command: string]: string };
}

// お題一覧
export const topics: Topic[] = [
{
    id: 1,
    title: "自分のコードをpushしよう！",
    description: "Gitの基本操作を使って自分のコードをリモートリポジトリにpushする手順です。",
    difficulty: "Easy",
    tags: ["branch", "basic"],
    is_completed: true,
    steps: [
        {
            order: 1,
            title: "新しいブランチを作成する",
            description: "作業用の新しいブランチを作成します。",
            wantcode: [
                "git checkout -b"
            ],
            outcode: "git checkout -b [ブランチ名]\n// 新しいブランチを作成して切り替えます",
            responses: {
                "git status": "On branch feature/new-feature\nnothing to commit, working tree clean",
                "git branch": "  main\n* feature/new-feature"
            }
        },
        {
            order: 2,
            title: "コードを編集・追加してaddする",
            description: "必要なコードの編集や追加を行います。",
            wantcode: [
                "git add"
            ],
            outcode: "// 新機能の実装\nfunction newFeature() {\n    console.log('新しい機能を追加しました');\n    return true;\n}\n\n// 既存コードの修正\nconst config = {\n    version: '1.1.0',\n    updated: new Date()\n};"
        },
        {
            order: 3,
            title: "変更をコミットする",
            description: "編集した内容をコミットします。",
            wantcode: [
                "git commit -m"
            ],
            outcode: "// 新機能の実装\nfunction newFeature() {\n    console.log('新しい機能を追加しました');\n    return true;\n}\n\n// 既存コードの修正\nconst config = {\n    version: '1.1.0',\n    updated: new Date()\n};\n git add .\ngit commit -m \"[コミットメッセージ]\"\n// 変更をステージングしてコミットします"
        },
        {
            order: 4,
            title: "リモートリポジトリにpushする",
            description: "作成したブランチをリモートリポジトリにpushします。",
            wantcode: [
                "git push origin"
            ],
            outcode: "git push origin [ブランチ名]\n// リモートリポジトリにプッシュします"
        }
    ],
},
{
    id: 2,
    title: "コンフリクトを解決しよう！",
    description: "Gitでコンフリクトが発生した際の解決方法を学びます。",
    difficulty: "Medium",
    tags: ["conflict", "merge", "準備中"],
    is_completed: false,
    is_wip: true,
    steps: [
        {
            order: 1,
            title: "メインブランチを更新",
            description: "最新のメインブランチを取得します。",
            wantcode: [
                "git checkout main",
                "git pull origin main"
            ],
            outcode: "git checkout main\ngit pull origin main\n// メインブランチに切り替えて最新を取得"
        },
        {
            order: 2,
            title: "フィーチャーブランチでマージを試みる",
            description: "フィーチャーブランチに戻ってメインをマージします。",
            wantcode: [
                "git checkout",
                "git merge main"
            ],
            outcode: "git checkout feature/your-branch\ngit merge main\n// フィーチャーブランチでメインをマージ"
        },
        {
            order: 3,
            title: "コンフリクトを解決",
            description: "コンフリクトしたファイルを編集して解決します。",
            wantcode: [
                "EDITOR_CHANGE"
            ],
            outcode: "// コンフリクト解決後のコード\nfunction resolvedFunction() {\n    // 両方の変更を統合\n    console.log('コンフリクトを解決しました');\n    return 'resolved';\n}"
        },
        {
            order: 4,
            title: "マージを完了する",
            description: "解決した変更をコミットしてマージを完了します。",
            wantcode: [
                "git add",
                "git commit"
            ],
            outcode: "git add .\ngit commit -m \"Resolve merge conflict\"\n// コンフリクト解決をコミット"
        }
    ],
},
{
    id: 3,
    title: "高度なGit操作をマスターしよう！",
    description: "rebase、cherry-pick、stashなどの高度なGitコマンドを学びます。",
    difficulty: "Hard",
    tags: ["rebase", "advanced", "stash"],
    is_completed: false,
    steps: [
        {
            order: 1,
            title: "作業中の変更を一時保存",
            description: "作業中の変更をstashで一時保存します。",
            wantcode: [
                "git stash"
            ],
            outcode: "git stash\n// 作業中の変更を一時保存します"
        },
        {
            order: 2,
            title: "コミット履歴を綺麗にする",
            description: "interactive rebaseでコミット履歴を整理します。",
            wantcode: [
                "git rebase -i"
            ],
            outcode: "git rebase -i HEAD~3\n// 直近3つのコミットをインタラクティブにrebase"
        },
        {
            order: 3,
            title: "特定のコミットを選択的に適用",
            description: "cherry-pickで特定のコミットだけを適用します。",
            wantcode: [
                "git cherry-pick"
            ],
            outcode: "git cherry-pick abc123\n// 特定のコミットを現在のブランチに適用"
        },
        {
            order: 4,
            title: "保存した変更を復元",
            description: "stashした変更を復元して作業を続けます。",
            wantcode: [
                "git stash pop"
            ],
            outcode: "git stash pop\n// 一時保存した変更を復元します"
        }
    ],
},
{
    id: 4,
    title: "Git-flowで開発しよう！",
    description: "Git-flowのブランチ戦略に基づいて、機能開発からリリースまでの流れを学びます。",
    difficulty: "Medium",
    tags: ["git-flow", "branch-strategy", "release", "準備中"],
    is_completed: false,
    is_wip: true,
    steps: [
        {
            order: 1,
            title: "feature ブランチの作成",
            description: "Git-flowに従って、feature/ブランチを作成します。",
            wantcode: [
                "git flow feature start",
                "git checkout -b feature/"
            ],
            outcode: "git flow feature start my-feature\n// または\ngit checkout -b feature/my-feature\n// 新しい機能用のブランチを作成"
        },
        {
            order: 2,
            title: "develop ブランチへのマージ",
            description: "完成した機能をdevelopブランチにマージします。",
            wantcode: [
                "git checkout develop",
                "git merge feature/"
            ],
            outcode: "git checkout develop\ngit merge feature/my-feature\n// 機能をdevelopブランチに統合"
        },
        {
            order: 3,
            title: "release ブランチの作成",
            description: "リリース用のブランチを作成してバージョン管理を行います。",
            wantcode: [
                "git flow release start",
                "git checkout -b release/"
            ],
            outcode: "git flow release start v1.0.0\n// または\ngit checkout -b release/v1.0.0\n// リリース準備用のブランチを作成"
        },
        {
            order: 4,
            title: "main ブランチへのマージとタグ付け",
            description: "リリースをmainブランチにマージしてタグを付けます。",
            wantcode: [
                "git checkout main",
                "git merge release/",
                "git tag"
            ],
            outcode: "git checkout main\ngit merge release/v1.0.0\ngit tag -a v1.0.0 -m \"Version 1.0.0 release\"\n// リリースを本番環境用のブランチにマージしてタグ付け"
        }
    ],
}
];

// 互換性のためのエクスポート
export const exampleTopic: Topic = topics[0];

// 新しい関数: IDでトピックを取得
export function getTopicById(id: number): Topic | undefined {
    return topics.find(topic => topic.id === id);
}

// 型の例(旧)
export const oldExampleTopic: Topic = {
    id: 1,
    title: "自分のコードをpushしよう！",
    description: "Gitの基本操作を使って自分のコードをリモートリポジトリにpushする手順です。",
    difficulty: "Easy",
    tags: ["branch", "basic"],
    is_completed: true,
    steps: [
        {
            order: 1,
            title: "新しいブランチを作成する",
            description: "作業用の新しいブランチを作成します。",
            wantcode: [
                "git checkout -b"
            ],
            outcode: "git checkout -b [ブランチ名]\n// 新しいブランチを作成して切り替えます"
        },
        {
            order: 2,
            title: "コードを編集・追加する",
            description: "必要なコードの編集や追加を行います。",
            wantcode: [
                "EDITOR_CHANGE"
            ],
            outcode: "// 新機能の実装\nfunction newFeature() {\n    console.log('新しい機能を追加しました');\n    return true;\n}\n\n// 既存コードの修正\nconst config = {\n    version: '1.1.0',\n    updated: new Date()\n};"
        },
        {
            order: 3,
            title: "変更をコミットする",
            description: "編集した内容をコミットします。",
            wantcode: [
                "git add",
                "git commit -m"
            ],
            outcode: "git add .\ngit commit -m \"[コミットメッセージ]\"\n// 変更をステージングしてコミットします"
        },
        {
            order: 4,
            title: "リモートリポジトリにpushする",
            description: "作成したブランチをリモートリポジトリにpushします。",
            wantcode: [
                "git push origin"
            ],
            outcode: "git push origin [ブランチ名]\n// リモートリポジトリにプッシュします"
        }
    ],
};