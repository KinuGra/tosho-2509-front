export function terminalcommand(
  command: string, 
  commandLine: string[], 
  wantcode: string[], 
  onStepComplete?: () => void
): string {
  // コマンドパターンマッチング関数
  const matchesPattern = (cmd: string, pattern: string): boolean => {
    const cmdTrim = cmd.trim();
    const patternTrim = pattern.trim();
    
    // 特殊パターン: EDITOR_CHANGE - 空白コマンドでクリア
    if (patternTrim === 'EDITOR_CHANGE') {
      return cmdTrim === '';
    }
    
    // 部分マッチ: パターンがコマンドの開始部分と一致
    return cmdTrim.startsWith(patternTrim);
  };
  
  // wantcodeの全てが満たされているかチェック
  const allWantcodeMatched = wantcode.length > 0 && wantcode.every(want => 
    commandLine.some(cmd => matchesPattern(cmd, want))
  );
  
  if (allWantcodeMatched) {
    onStepComplete?.();
  }
  
  // EDITOR_CHANGEの場合は空白コマンドでもOK
  if (command.trim() === '' && wantcode.includes('EDITOR_CHANGE')) {
    return "Editor change detected";
  }
  
  const gitMatch = command.match(/^git\s+(\w+)(.*)$/);
  if (!gitMatch) return "This command is not supported this application\nPlease use \"git\" command";
  
  const [, cmd, rest] = gitMatch;
  const opts = new Set((rest.match(/-+([a-zA-Z][a-zA-Z0-9-]*)/g) || []).map(o => o.replace(/^-+/, '')));
  const msgMatch = rest.match(/-m\s+["']?([^"'\n]+)["']?/);
  const args = rest.replace(/-[a-zA-Z0-9-]*(?:\s+["']?[^"'\n]*["']?)?/g, '').trim();
  
  const hasAddCommand = Array.isArray(commandLine) && commandLine.some(cmd => cmd.match(/^git\s+add/));
  
  switch (cmd) {
    case "add":
      return opts.has('A') ? "Added all files including untracked" : "Added files";
    case "commit":
      if (!opts.has('a') && !hasAddCommand) {
        return "nothing to commit (use \"git add\" to track files)";
      }
      let result = opts.has('a') ? "Committed all changes" : "Committed";
      return msgMatch ? `${result} with message "${msgMatch[1]}"` : `${result} without message`;
    case "push":
      if (opts.has('f') && opts.has('u')) return "Force pushed and set upstream";
      if (opts.has('f')) return "Force pushed";
      if (opts.has('u')) return "Pushed and set upstream";
      return "Pushed";
    case "log":
      if (opts.has('oneline') && opts.has('graph')) return "* abc123 Initial commit";
      if (opts.has('oneline')) return "abc123 Initial commit";
      if (opts.has('graph')) return "* abc123 (HEAD -> main) Initial commit";
      return "commit abc123\nAuthor: User\nInitial commit";
    case "status":
      return opts.has('s') ? "M  file.txt" : "On branch main\nnothing to commit";
    case "checkout":
      return opts.has('b') ? `Created and switched to branch '${args}'` : `Switched to branch '${args}'`;
    case "diff":
      return opts.has('cached') ? "diff --cached output" : "diff output";
    case "reset":
      if (opts.has('hard')) return "Hard reset to HEAD";
      if (opts.has('soft')) return "Soft reset to HEAD";
      return "Reset to HEAD";
    case "branch":
      if (opts.has('d')) return `Deleted branch '${args}'`;
      if (opts.has('r')) return "origin/main";
      return args ? `Created branch '${args}'` : "* main";
    case "stash":
      if (args === "pop") return "Applied stash and removed from stash list";
      return "Saved working directory and index state";
    case "rebase":
      if (opts.has('i')) return "Interactive rebase started";
      return "Rebase completed";
    case "cherry-pick":
      return args ? `Applied commit ${args}` : "Cherry-pick completed";
    case "merge":
      return args ? `Merged branch '${args}'` : "Merge completed";
    case "pull":
      return "Updated from remote repository";
    default:
      return /^(clone|remote|fetch)$/.test(cmd) ? `${cmd} executed` : `Unknown command: ${cmd}`;
  }
}