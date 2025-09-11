"use client";
import { useState } from "react";

export default function TwoFAPage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [sent, setSent] = useState(false);
    const [msg, setMsg] = useState("");

    const validateEmail = (email: string) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validateCode = (code: string) => {
        return code.match(/^\d{6}$/);
    };

    const requestCode = async () => {
        try {
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

            const res = await fetch("/api/2fa/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            setSent(res.ok);
            setMsg(data.message || data.detail || (res.ok ? "認証コードを送信しました。" : "認証コードの送信に失敗しました。"));
        } catch (error) {
            setMsg("サーバーとの通信に失敗しました。");
            setSent(false);
        }
    };

    const verify = async () => {
        try {
            setMsg("");

            // クライアントサイドバリデーション
            if (!code) {
                setMsg("認証コードを入力してください。");
                return;
            }
            if (!validateCode(code)) {
                setMsg("認証コードは6桁の数字である必要があります。");
                return;
            }

            const res = await fetch("/api/2fa/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code }),
            });
            const data = await res.json();
            if (res.ok) {
                window.location.href = "/home";
            } else {
                setMsg(data.detail || "認証コードが正しくありません。");
            }
        } catch (error) {
            setMsg("サーバーとの通信に失敗しました。");
        }
    };

    return (
        <main className="max-w-sm mx-auto p-6 space-y-3">
            <h1 className="text-2xl font-bold">2段階認証</h1>
            <input 
                type="email"
                className={`w-full border p-2 ${sent ? 'bg-gray-100' : ''}`}
                placeholder="登録メールアドレス" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={sent}
            />
            <button className="w-full bg-gray-800 text-white p-2 rounded" onClick={requestCode}>
                認証コードを送信
            </button>

            {sent && (
                <>
                    <input 
                        type="number"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        maxLength={6}
                        className="w-full border p-2" 
                        placeholder="6桁コード" 
                        value={code}
                        onChange={(e) => setCode(e.target.value.slice(0, 6))} 
                    />
                    <button className="w-full bg-black text-white p-2 rounded" onClick={verify}>
                        認証する
                    </button>
                </>
            )}
            {msg && (
                <p className={`text-sm p-2 rounded ${
                    msg.includes("失敗") ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"
                }`}>
                    {msg}
                </p>
            )}
        </main>
    );
}
