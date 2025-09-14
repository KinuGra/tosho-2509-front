"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function TwoFAContent() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [sent, setSent] = useState(false);
    const [msg, setMsg] = useState("");
    
    useEffect(() => {
        const emailParam = searchParams.get("email");
        if (emailParam) {
            console.log("[Frontend] Email from URL:", emailParam);
            setEmail(emailParam);
            // メールアドレスが設定されたら自動的に認証コードをリクエスト
            requestCode(emailParam);
        }
    }, [searchParams]);

    const validateEmail = (email: string) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validateCode = (code: string) => {
        return code.match(/^\d{6}$/);
    };

    const requestCode = async (targetEmail?: string) => {
        try {
            const emailToUse = targetEmail || email;
            console.log("[Frontend] Requesting 2FA code for email:", emailToUse);
            setMsg("");

            // クライアントサイドバリデーション
            if (!emailToUse) {
                setMsg("メールアドレスを入力してください。");
                return;
            }
            if (!validateEmail(emailToUse)) {
                setMsg("有効なメールアドレスを入力してください。");
                return;
            }

            const res = await fetch("/api/2fa/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailToUse }),
            });
            console.log("[Frontend] 2FA request response status:", res.status);
            const data = await res.json();
            console.log("[Frontend] 2FA request response data:", data);
            
            setSent(res.ok);
            setMsg(data.message || data.detail || (res.ok ? "認証コードを送信しました。" : "認証コードの送信に失敗しました。"));
        } catch (error) {
            console.error("[Frontend] Error requesting 2FA code:", error);
            setMsg("サーバーとの通信に失敗しました。");
            setSent(false);
        }
    };

    const verify = async () => {
        try {
            console.log("[Frontend] Verifying 2FA code for email:", email);
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
            console.log("[Frontend] 2FA verification response status:", res.status);
            const data = await res.json();
            console.log("[Frontend] 2FA verification response data:", data);

            if (res.ok) {
                console.log("[Frontend] 2FA verification successful");
                try {
                    // ユーザー情報の取得を試みる
                    console.log("[Frontend] Fetching user info");
                    const baseUrl = window.location.origin;
                    const meRes = await fetch(`${baseUrl}/api/me`, {
                        credentials: "include"  // クッキーを含める
                    });
                    
                    if (meRes.ok) {
                        const userData = await meRes.json();
                        console.log("[Frontend] User info fetched successfully:", userData);
                        // router.pushを使用して正しくナビゲーション
                        window.location.href = `${baseUrl}/home`;
                    } else {
                        console.error("[Frontend] Failed to fetch user info:", {
                            status: meRes.status,
                            statusText: meRes.statusText
                        });
                        setMsg("ユーザー情報の取得に失敗しました。");
                    }
                } catch (error) {
                    console.error("[Frontend] Error fetching user info:", error);
                    setMsg("ユーザー情報の取得中にエラーが発生しました。");
                }
            } else {
                setMsg(data.detail || "認証コードが正しくありません。");
            }
        } catch (error) {
            console.error("[Frontend] Error verifying 2FA code:", error);
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
            <button 
                className="w-full bg-gray-800 text-white p-2 rounded" 
                onClick={() => requestCode()}
            >
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

export default function TwoFAPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TwoFAContent />
        </Suspense>
    );
}
