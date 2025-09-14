"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("password123");
    const [msg, setMsg] = useState("");
    const router = useRouter();
    const sp = useSearchParams();
    const redirect = sp.get("redirect") || "/home";

    const validateEmail = (email: string) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
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

        try {
            console.log("[Frontend] Attempting login for email:", email);
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            console.log("[Frontend] Login response status:", res.status);
            const data = await res.json();
            console.log("[Frontend] Login response data:", data);
            
            if (res.ok) {
                console.log("[Frontend] Login successful, redirecting to 2FA");
                router.push(`/twofa?email=${encodeURIComponent(email)}`);
            } else {
                console.error("[Frontend] Login failed:", data);
                setMsg(data.detail || "ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。");
            }
        } catch (error) {
            console.error("[Frontend] Login error:", error);
            setMsg("サーバーとの通信に失敗しました。");
        }
    };

    return (
        <main className="max-w-sm mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">gitsim ログイン</h1>
            <form onSubmit={onSubmit} className="space-y-3">
                <input className="w-full border p-2" placeholder="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full border p-2" type="password" placeholder="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full bg-black text-white p-2 rounded">ログイン</button>
            </form>
            {msg && (
                <p className="text-red-600 mt-2 text-sm bg-red-50 p-2 rounded">{msg}</p>
            )}
            <div className="mt-4 text-sm">
                新規登録は <a className="underline" href="/register">こちら</a>
            </div>
        </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}