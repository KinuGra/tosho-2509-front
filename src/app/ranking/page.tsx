async function getRanking() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE ?? ""}/api/ranking`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
}

export default async function RankingPage() {
    const rows = await getRanking();
    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">ランキング</h1>
            <table className="w-full border">
                <thead className="bg-gray-50">
                    <tr><th className="p-2 text-left">ユーザー</th><th className="p-2">Lv</th><th className="p-2">Exp</th></tr>
                </thead>
                <tbody>
                    {rows.map((r: any, i: number) => (
                        <tr key={i} className="border-t">
                            <td className="p-2">{r.email}</td>
                            <td className="p-2 text-center">{r.level}</td>
                            <td className="p-2 text-center">{r.exp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
