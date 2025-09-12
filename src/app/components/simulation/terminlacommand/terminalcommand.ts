export function terminalcommand(command: string, topicNumber: number, stepNumber: Number): string {
  const gitCommandRegex = /^git\s+(\w+)(?:\s+(.*))?$/;
  const optionRegex = /-([a-zA-Z]+)/g;
  
  const match = command.match(gitCommandRegex);
  
  if (!match) {
    return "This command is not supported this application\nPlease use \"git\" command";
  }
  
  const [, subCommand, args = ""] = match;
  const options = [...args.matchAll(optionRegex)].map(m => m[1]);
  const hasOption = (opt: string) => options.some(o => o.includes(opt));
  
  switch (subCommand) {
    case "add":
      if (hasOption("A")) return "Added all files including untracked to staging area";
      return args ? `Added ${args} to staging area` : "Added all files to staging area";
      
    case "commit":
      const messageMatch = command.match(/-m\s+["']?([^"']+)["']?/);
      if (hasOption("a")) return messageMatch ? `Committed all changes with message: "${messageMatch[1]}"` : "Committed all changes without message";
      return messageMatch ? `Committed with message: "${messageMatch[1]}"` : "Committed without message";
        
    case "push":
      if (hasOption("f")) return "Force pushed to origin";
      if (hasOption("u")) return "Pushed and set upstream to origin";
      return args ? `Pushed to ${args}` : "Pushed to origin";
      
    case "pull":
      if (hasOption("r")) return "Pulled with rebase from origin";
      return args ? `Pulled from ${args}` : "Pulled from origin";
      
    case "log":
      if (hasOption("oneline")) return "abc123 Initial commit";
      if (hasOption("graph")) return "* abc123 (HEAD -> main) Initial commit";
      return "commit abc123 (HEAD -> main)\nAuthor: User <user@example.com>\nDate: Mon Jan 1 12:00:00 2024\n\n    Initial commit";
      
    case "status":
      if (hasOption("s")) return "M  file.txt";
      return "On branch main\nnothing to commit, working tree clean";
      
    case "checkout":
      if (hasOption("b")) return args ? `Created and switched to new branch '${args.replace(/-b\s+/, '')}'` : "Please specify branch name";
      return args ? `Switched to branch '${args}'` : "Please specify branch name";
      
    case "diff":
      if (hasOption("cached")) return "diff --git a/staged.txt b/staged.txt\n+staged changes";
      return "diff --git a/file.txt b/file.txt\nindex 1234567..abcdefg 100644\n--- a/file.txt\n+++ b/file.txt\n@@ -1,3 +1,3 @@\n-old line\n+new line";
      
    case "reset":
      if (hasOption("hard")) return "HEAD is now at abc123 Initial commit";
      if (hasOption("soft")) return "Reset to HEAD (soft)";
      return args ? `Reset to ${args}` : "Reset to HEAD";
      
    case "branch":
      if (hasOption("d")) return args ? `Deleted branch '${args.replace(/-d\s+/, '')}'` : "Please specify branch to delete";
      if (hasOption("r")) return "origin/main\norigin/develop";
      return args ? `Created branch '${args}'` : "* main\n  develop";
      
    case "clone":
      if (hasOption("b")) return args ? `Cloning into specific branch...\ndone.` : "Please specify repository URL";
      return args ? `Cloning into '${args.split('/').pop()?.replace('.git', '')}'...\ndone.` : "Please specify repository URL";
      
    case "merge":
      if (hasOption("no-ff")) return args ? `Merged branch '${args}' with no-fast-forward` : "Please specify branch to merge";
      return args ? `Merged branch '${args}' into current branch` : "Please specify branch to merge";
      
    case "remote":
      if (hasOption("v")) return "origin\tgit@github.com:user/repo.git (fetch)\norigin\tgit@github.com:user/repo.git (push)";
      return "origin";
      
    case "fetch":
      if (hasOption("all")) return "Fetching all remotes\nremote: Total 10 (delta 0)";
      return "Fetching origin\nremote: Counting objects: 10, done.\nremote: Total 10 (delta 0), reused 0 (delta 0)";
      
    case "rebase":
      if (hasOption("i")) return "Interactive rebase started";
      return args ? `Rebasing onto ${args}` : "Current branch is up to date";
      
    default:
      return `git: '${subCommand}' is not a git command. See 'git --help'.`;
  }
}