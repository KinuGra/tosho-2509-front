import Link from 'next/link';

// src/app/home/page.tsx

// ダミーデータ
const themes = [
  { id: 1, title: '自分のコードをpushしよう！', difficulty: 'Easy', tags: ['branch', 'basic'], pass: '/theme/1' },
  { id: 2, title: 'コンフリクトを解決しよう！', difficulty: 'Easy', tags: ['conflict'], pass: '/theme/2' },
  { id: 3, title: 'チーム開発をシミュレーションしてみよう１', difficulty: 'Medium', tags: ['ToDo-Application','simulation', 'advanced'], pass: '/theme/3' },
  { id: 4, title: 'チーム開発をシミュレーションしてみよう２', difficulty: 'Hard', tags: ['Project LINKS', 'interactive'], pass: '/theme/4' },
];

// ステータス表示コンポーネント
const Status = () => {
  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">進捗状況</h2>
      <p>完了したお題: 3 / 10</p>
      <div className="w-full bg-gray-300 rounded-full h-4 mt-2 dark:bg-gray-700">
        <div className="bg-blue-500 h-4 rounded-full" style={{ width: '30%' }}></div>
      </div>
    </div>
  );
};

// お題カードコンポーネント
const ThemeCard = ({ theme }: { theme: typeof themes[0] }) => {
  const difficultyColor: {[key: string]: string} = {
    Easy: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300',
    Medium: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Hard: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow dark:border-gray-700 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold mb-2">{theme.title}</h3>
        <div className="flex items-center mb-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyColor[theme.difficulty]}`}>
            {theme.difficulty}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {theme.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded dark:bg-gray-700 dark:text-gray-300">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <Link href={theme.pass} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
        進む
      </Link>
    </div>
  );
};


export default function HomePage() {
  return (
    <div className="container mx-auto p-4">

      <main>
        <Status />

        <section>
          <h2 className="text-2xl font-bold mb-4">お題カード一覧</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map(theme => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}