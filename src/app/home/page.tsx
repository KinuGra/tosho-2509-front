import UserInfo from './components/UserInfo';

export default function HomePage() {
    return (
        <main className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">gitsim ホーム</h1>
            <UserInfo />

            <div className="grid grid-cols-2 gap-4">
                <a className="border p-4 rounded hover:bg-gray-50" href="/simulation">シミュレーションへ</a>
                <a className="border p-4 rounded hover:bg-gray-50" href="/ranking">ランキング</a>
            </div>
        </main>
    );
}
