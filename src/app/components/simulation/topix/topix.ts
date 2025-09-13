// お題型
export interface Topic {
    id: number;
    title: string;
    description: string;
    steps: Step[];
    difficulty: string;
    tags: string[];
    is_completed: boolean;
}

// ステップ型
export interface Step {
    order: number;
    title: string;
    description: string;
    wantcode: string[];
}

// 型の例
export const exampleTopic: Topic = {
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
                "git checkout -b feature/my-branch"
            ]
        },
        {
            order: 2,
            title: "コードを編集・追加する",
            description: "必要なコードの編集や追加を行います。",
            wantcode: [
                "// ここでファイル編集"
            ]
        },
        {
            order: 3,
            title: "変更をコミットする",
            description: "編集した内容をコミットします。",
            wantcode: [
                "git add .",
                "git commit -m \"作業内容をコミット\"",
            ]
        },
        {
            order: 4,
            title: "リモートリポジトリにpushする",
            description: "作成したブランチをリモートリポジトリにpushします。",
            wantcode: [
                "git push origin feature/my-branch"
            ]
        }
    ],
};