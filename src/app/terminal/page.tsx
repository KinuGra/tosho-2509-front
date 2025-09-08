import { terminalcommand } from "./terminalcommand"

export default function test(){
  let test1 = terminalcommand("not git", "aa")
  let test2 = terminalcommand("git commit -m \"test\"", "aa")
  return (
    <div>
      "not git" :
      {test1}\n
      "git commit" :
      {test2}
    </div>
  
  )

}