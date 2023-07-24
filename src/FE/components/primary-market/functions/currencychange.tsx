import React from "react"

export function change(e:React.MouseEvent<HTMLLIElement>){
 

    
   let list = document.querySelectorAll('.currency')as NodeListOf<HTMLLIElement>
    for(let i=0;i<list.length;i++){
        list[i].classList.remove('selectedCurrency')
    }
    e.currentTarget.classList.add('selectedCurrency')
    return e.currentTarget.innerText

}