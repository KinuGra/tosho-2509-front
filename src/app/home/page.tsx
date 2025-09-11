import Link from 'next/link';

// src/app/home/page.tsx

// ダミーデータ
const themes = [
  { id: 1, title: '自分のコードをpushしよう！', difficulty: 'Easy', tags: ['branch', 'basic'], pass: '/theme/1', is_completed: true },
  { id: 2, title: 'コンフリクトを解決しよう！', difficulty: 'Easy', tags: ['conflict'], pass: '/theme/2', is_completed: true },
  { id: 3, title: 'チーム開発をシミュレーションしてみよう１', difficulty: 'Medium', tags: ['ToDo-Application','simulation', 'advanced'], pass: '/theme/3', is_completed: false },
  { id: 4, title: 'チーム開発をシミュレーションしてみよう２', difficulty: 'Hard', tags: ['Project LINKS', 'interactive'], pass: '/theme/4', is_completed: false },
];

// ステータス表示コンポーネント
const Status = () => {
  // ダミーデータ
  const clearCount = 5;
  const totalClears = 10;
  const clearPercentage = (clearCount / totalClears) * 100;

  const experience = 1250;
  const nextLevelExp = 2000;
  const expPercentage = (experience / nextLevelExp) * 100;

  const progress = 50; // パーセンテージ

  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">クリア数</p>
          <p className="text-2xl font-bold">{clearCount}</p>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 dark:bg-gray-700">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${clearPercentage}%` }}></div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">経験値</p>
          <p className="text-2xl font-bold">{experience.toLocaleString()}</p>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 dark:bg-gray-700">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${expPercentage}%` }}></div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">進捗</p>
          <p className="text-2xl font-bold">{progress}%</p>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 dark:bg-gray-700">
            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
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

  // is_completedに応じてスタイルを変更
  const cardStyle = theme.is_completed
    ? "bg-gray-100 dark:bg-gray-800"
    : "hover:shadow-lg transition-shadow";

  return (
    <div className={`border rounded-lg p-4 dark:border-gray-700 flex justify-between items-center ${cardStyle}`}>
      <div>
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-bold">{theme.title}</h3>
          {theme.is_completed && (
            <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              ✓ 完了
            </span>
          )}
        </div>
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
      <Link href={theme.pass} className={`font-bold py-2 px-4 rounded ml-4 ${
        theme.is_completed
          ? 'bg-gray-500 hover:bg-gray-600 text-white'
          : 'bg-blue-500 hover:bg-blue-700 text-white'
      }`}>
        {theme.is_completed ? '復習' : '開始'}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {themes.map(theme => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}