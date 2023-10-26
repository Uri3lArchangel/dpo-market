export const URLresolve=(a:string)=>{
if(process.env.NODE_ENV == "production"){
    return window.location.origin + a
}
return a
}