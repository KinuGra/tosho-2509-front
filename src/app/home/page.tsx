// サーバーコンポーネントで /api/me を叩く
async function getMe() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE ?? ""}/api/me`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
}

export default async function HomePage() {
    const me = await getMe();
    return (
        <main className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">gitsim ホーム</h1>
            {me ? (
                <div className="border p-4 rounded">
                    <div>ユーザー: {me.email}</div>
                    <div>レベル: <b>{me.level}</b> / 経験値: <b>{me.exp}</b></div>
                </div>
            ) : <div className="text-red-600">ユーザー情報の取得に失敗</div>}

            <div className="grid grid-cols-2 gap-4">
                <a className="border p-4 rounded hover:bg-gray-50" href="/simulation">シミュレーションへ</a>
                <a className="border p-4 rounded hover:bg-gray-50" href="/ranking">ランキング</a>
            </div>
        </main>
    );
}
