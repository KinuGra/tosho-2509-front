"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("password123");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const validateEmail = (email: string) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validatePassword = (password: string) => {
        return password.length >= 8;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg("");

        // クライアントサイドバリデーション
        if (!email) {
            setMsg("メールアドレスを入力してください。");
            return;
        }
        if (!validateEmail(email)) {
            setMsg("有効なメールアドレスを入力してください。");
            return;
        }
        if (!password) {
            setMsg("パスワードを入力してください。");
            return;
        }
        if (!validatePassword(password)) {
            setMsg("パスワードは8文字以上である必要があります。");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                router.push("/twofa");
            } else {
                setMsg(data.detail || "登録に失敗しました。入力内容を確認してください。");
            }
        } catch (error) {
            setMsg("サーバーとの通信に失敗しました。");
        }
    };

    return (
        <main className="max-w-sm mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">gitsim 新規登録</h1>
            <form onSubmit={onSubmit} className="space-y-3">
                <input className="w-full border p-2" placeholder="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full border p-2" type="password" placeholder="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full bg-black text-white p-2 rounded">登録</button>
            </form>
            {msg && (
                <p className="text-red-600 mt-2 text-sm bg-red-50 p-2 rounded">{msg}</p>
            )}
            <div className="mt-4 text-sm">
                アカウントをお持ちの方は <a className="underline" href="/login">こちら</a>
            </div>
        </main>
    );
};
