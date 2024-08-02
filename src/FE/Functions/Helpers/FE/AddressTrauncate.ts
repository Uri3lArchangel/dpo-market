export const trauncateStringMiddle=(a:string)=>{
    if(a){
    const start = a.slice(0,12)
    const end = a.slice(a.length - 5,a.length)
    const newString = start +"...."+ end
    return newString
    }
  }