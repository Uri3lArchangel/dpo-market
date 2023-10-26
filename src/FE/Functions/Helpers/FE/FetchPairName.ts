export const fetchPairName = ()=>{
    let pairName = window.localStorage.getItem('pairName')
    if(!pairName){
      pairName = "BTC/CAD"
    }
    return pairName
  }