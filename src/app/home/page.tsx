"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import UserInfo from './components/UserInfo';
import { Topic, topics } from '../components/simulation/topix/topix';

// src/app/home/page.tsx

// ステータス表示コンポーネント
const Status = ({ experience, progress }: { experience: number; progress: string }) => {
  const clearCount = progress.split('').filter(p => p === '1').length;
  const totalClears = progress.length;
  const clearPercentage = totalClears > 0 ? (clearCount / totalClears) * 100 : 0;

  const nextLevelExp = 2000;
  const expPercentage = (experience / nextLevelExp) * 100;

  const progressPercentage = clearPercentage;

  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">クリア数</p>
          <p className="text-2xl font-bold">{clearCount}</p>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 dark:bg-gray-700">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${clearPercentage}%` }}></div>
          </div>
        </div>
        {/* <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">経験値</p>
          <p className="text-2xl font-bold">{experience.toLocaleString()}</p>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 dark:bg-gray-700">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${expPercentage}%` }}></div>
          </div>
        </div> */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">進捗</p>
          <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
          <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 dark:bg-gray-700">
            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// お題カードコンポーネント
const ThemeCard = ({ theme }: { theme: Topic }) => {
  const difficultyColor: { [key: string]: string } = {
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
      {theme.is_wip ? (
        <span className="font-bold py-2 px-4 rounded ml-4 bg-gray-300 text-gray-500 cursor-not-allowed">
          準備中
        </span>
      ) : (
        <Link href={`/simulation?topicId=${theme.id}`} className={`font-bold py-2 px-4 rounded ml-4 ${theme.is_completed
          ? 'bg-gray-500 hover:bg-gray-600 text-white'
          : 'bg-blue-500 hover:bg-blue-700 text-white'
        }`}>
          {theme.is_completed ? '復習' : '開始'}
        </Link>
      )}
    </div>
  );
};


export default function HomePage() {
  const BACKEND_URL = 'http://18.207.128.157:8000';
  const [experience, setExperience] = useState(0);
  const [progress, setProgress] = useState('');
  const [userThemes, setUserThemes] = useState(topics);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // ユーザー情報を取得
        const userResponse = await fetch('/api/me', {
          credentials: 'include'
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user status');
        }

        const userData = await userResponse.json();
        setExperience(userData.experience || 0);

        // 進捗情報を取得
        try {
          if (!BACKEND_URL) {
            throw new Error('Backend URL is not defined');
          }
          const progressResponse = await fetch(`${BACKEND_URL}/users/${userData.id}/progress`);
          if (progressResponse.ok) {
            const progressData = await progressResponse.json();
            setProgress(progressData.progress || '0'.repeat(topics.length));
          } else {
            // ユーザーが見つからない場合や進捗データが存在しない場合は、すべて未完了状態とする
            setProgress('0'.repeat(topics.length));
          }
        } catch (err) {
          console.error('Error fetching progress:', err);
          // エラーの場合も、すべて未完了状態とする
          setProgress('0'.repeat(topics.length));
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching status:', err);
        setError('Failed to load user status');
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    // progressが空文字列の場合も含めて処理
    const progressString = progress || '0'.repeat(topics.length);
    const updatedThemes = topics.map((theme, index) => ({
      ...theme,
      is_completed: progressString[index] === '1'
    }));
    setUserThemes(updatedThemes);
  }, [progress]);

  return (
    <div className="container mx-auto p-4">
      <main className="max-w-2xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">gitsim</h1>
        <UserInfo />
      </main>

      <main>
        {isLoading ? (
          <div className="mb-8 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
            <p className="text-center">ステータスを読み込み中...</p>
          </div>
        ) : error ? (
          <div className="mb-8 p-4 bg-red-100 rounded-lg dark:bg-red-800">
            <p className="text-center text-red-600 dark:text-red-300">{error}</p>
          </div>
        ) : (
          <Status experience={experience} progress={progress} />
        )}

        <section>
          <h2 className="text-2xl font-bold mb-4">お題カード一覧</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userThemes.map(theme => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
