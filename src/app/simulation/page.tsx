"use client";
import { useState } from "react";
type Step = { id: number; title: string; done: boolean };

const STEPS: Step[] = [
    { id: 1, title: "見出しの色を変える（エディタ編集）", done: false },
    { id: 2, title: "変更をステージングに追加（git add）", done: false },
    { id: 3, title: "コミット（git commit）", done: false },
    { id: 4, title: "プッシュ（git push）", done: false },
];

// DBのstep_idは環境により異なるので、seed後の実IDを合わせてね
const STEP_ID_MAP: Record<number, number> = {
    1: 1, 2: 2, 3: 3, 4: 4, // 例
};

export default function SimulationPage() {
    const [steps, setSteps] = useState<Step[]>(STEPS);
    const [editor, setEditor] = useState("<h1 class='title'>Hello</h1>");
    const [term, setTerm] = useState("");
    const [msg, setMsg] = useState("");

    const submitCommand = async () => {
        const input = term.trim();
        setMsg("");

        // ステップ判定
        let nextIdx = steps.findIndex(s => !s.done);
        if (nextIdx === -1) return;

        const next = steps[nextIdx];

        // step1: エディタ編集していればOK（雑に title を含む変更かで判定）
        if (next.id === 1) {
            if (editor.includes("style=") || editor.includes("text-") || editor.includes("color")) {
                await complete(next.id);
            } else {
                setMsg("見出しの色を変えてから進んでね（styleやclassでOK）");
            }
            return;
        }

        // step2-4: コマンド
        const need = next.id === 2 ? "git add" : next.id === 3 ? "git commit" : "git push";
        if (input.startsWith(need)) {
            await complete(next.id);
            setTerm("");
        } else {
            setMsg(`次は "${need}" を実行してね`);
        }
    };

    const complete = async (stepLocalId: number) => {
        const dbStepId = STEP_ID_MAP[stepLocalId];
        const res = await fetch("/api/progress/complete", {
            method: "POST",
            body: JSON.stringify({ step_id: dbStepId }),
        });
        const j = await res.json();
        if (res.ok) {
            setSteps(prev => prev.map(s => s.id === stepLocalId ? { ...s, done: true } : s));
            setMsg(`✅ ${j.message} (+${j.reward}xp) レベル:${j.level}, 経験値:${j.exp}`);
            // 全部終わったらリザルトへ
            const allDone = steps.every(s => s.id === stepLocalId ? true : s.done);
            if (allDone) setTimeout(() => { window.location.href = "/result"; }, 800);
        } else {
            setMsg(j.detail || "エラー");
        }
    };

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">シミュレーション</h1>
            <ol className="list-decimal ml-6 space-y-1">
                {steps.map(s => (
                    <li key={s.id} className={s.done ? "line-through text-gray-500" : ""}>{s.title}</li>
                ))}
            </ol>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded p-2">
                    <div className="font-semibold mb-2">エディタ</div>
                    <textarea className="w-full h-48 border p-2" value={editor} onChange={e => setEditor(e.target.value)} />
                </div>
                <div className="border rounded p-2">
                    <div className="font-semibold mb-2">ターミナル</div>
                    <input className="w-full border p-2" placeholder="git add / git commit -m ... / git push"
                        value={term} onChange={e => setTerm(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitCommand()} />
                    <button className="mt-2 bg-black text-white px-3 py-1 rounded" onClick={submitCommand}>実行</button>
                </div>
            </div>

            <p className="text-sm text-gray-700">{msg}</p>
        </main>
    );
}
