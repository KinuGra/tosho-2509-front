import { terminalcommand } from "../../components/simulation/terminlacommand/terminalcommand";

export default function TestPage() {
  const tests: string[] = [
    "not git",
    "git commit -m \"test\"",
    "git add .",
    "git push origin main",
    "git pull",
    "git checkout -b feature/test",
    "git merge develop",
    "git status",
    "git log",
    "git branch",
    "git reset --hard HEAD^",
    "git stash",
    "git stash pop"
  ];

  return (
    <div>
      {tests.map((command) => (
        <div key={command}>
          {`"${command}": ${terminalcommand(command, 1, 1)}`}
        </div>
      ))}
    </div>
  );
}

