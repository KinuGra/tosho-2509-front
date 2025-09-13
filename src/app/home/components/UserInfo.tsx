"use client";

import { useEffect, useState } from "react";

interface UserData {
    id: number;
    email: string;
    level: number;
    exp: number;
}

export default function UserInfo() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("/api/me", {
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    console.error("[UserInfo] Failed to fetch user data:", res.status);
                    return;
                }

                const data = await res.json();
                setUserData(data);
            } catch (error) {
                console.error("[UserInfo] Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="animate-pulse bg-gray-200 h-20 rounded"></div>;
    }

    if (!userData) {
        return (
            <div className="text-red-600 p-4 border border-red-200 rounded">
                ユーザー情報の取得に失敗しました。
                <button
                    onClick={() => window.location.href = "/login"}
                    className="ml-2 text-blue-600 hover:underline"
                >
                    ログインページへ
                </button>
            </div>
        );
    }

    return (
        <div className="border p-4 rounded">
            <div>ユーザー: {userData.email}</div>
            <div>
                レベル: <b>{userData.level}</b> / 経験値: <b>{userData.exp}</b>
            </div>
        </div>
    );
}
