export function terminalcommand(command: string, topicNumber: number, stepNumber: Number){
  let splitedCommand = command.split(" ");
  if(splitedCommand[0] === "git"){
    switch(splitedCommand[1]){
      case "add":
        //addする処理
        return("added")
      case "commit":
        let result = "commited "
        if(splitedCommand[2] === "-m" && splitedCommand[3] !== undefined){
          result += "with message " + splitedCommand[3] 
        } else {
          result += "without message"
        }
        return(result);

      case "push":
      case "pull":
      case "log":
      case "status":
      case "checkout":
      case "diff":
      case "reset":
      case "branch":
      case "clone":
      case "merge":
      case "remote":
      case "fetch":
      case "rebase":
      
    }
  } else {
    return("This command is not supported this application\nPlease use \"git\" command")
  }
}