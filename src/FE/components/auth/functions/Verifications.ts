
export const onPasswordFieldChange=()=>{
    let text=document.getElementById('passwordStrengthText') as HTMLParagraphElement
    let level0= document.querySelector('#level-0')as HTMLLIElement
    let level1= document.querySelector('#level-1')as HTMLLIElement
    let level2= document.querySelector('#level-2')as HTMLLIElement
    let level3= document.querySelector('#level-3')as HTMLLIElement
    let level4= document.querySelector('#level-4')as HTMLLIElement
  
   let container = document.getElementById('password_strength') as HTMLDivElement
   let passwordField=document.getElementById('password') as HTMLInputElement
   let passwordContainer = document.getElementById('passwordField-container') as HTMLDivElement
   if(passwordField.value == ''){
    passwordContainer.style.border='1px solid red'
    container.style.display ='none'
  
    return
   }
   passwordContainer.style.border='0px solid #0000'
  
   container.style.display ='block'
   if(passwordField.value.length <= 8){
    level0.style.backgroundColor='#f00'
    level1.style.backgroundColor='#0000'
    level2.style.backgroundColor='#0000'
    level3.style.backgroundColor='#0000'
    level4.style.backgroundColor='#0000'
    text.innerText='very weak'
    return
   }
   if(passwordField.value.length >= 8 && passwordField.value.match(/[0-9]/) == null && passwordField.value.match(/[A-Z]/) == null && passwordField.value.match(/\W/) == null){
    level0.style.backgroundColor='#f00'
    level1.style.backgroundColor='#a40'
    level2.style.backgroundColor='#0000'
    level3.style.backgroundColor='#0000'
    level4.style.backgroundColor='#0000'
    text.innerText='weak'
    
    
  }
  if(passwordField.value.length >= 8){
    if(passwordField.value.match(/[0-9]/) != null || passwordField.value.match(/[A-Z]/) != null || passwordField.value.match(/\W/) != null){
      level0.style.backgroundColor='#f00'
      level1.style.backgroundColor='#a40' 
      level2.style.backgroundColor='#680'
      level3.style.backgroundColor='#0000'
      level4.style.backgroundColor='#0000'
    text.innerText='average'
    
    }
   
  }
  if(passwordField.value.length >= 8){
    if((passwordField.value.match(/[0-9]/) != null && passwordField.value.match(/[A-Z]/) != null) || (passwordField.value.match(/[0-9]/)!= null && passwordField.value.match(/\W/) != null)||(passwordField.value.match(/[A-Z]/) != null && passwordField.value.match(/\W/) != null)){
      level0.style.backgroundColor='#f00'
      level1.style.backgroundColor='#a40' 
      level2.style.backgroundColor='#680' 
      level3.style.backgroundColor='#2a0'
       level4.style.backgroundColor='#0000'
  
    text.innerText='strong'
    
    }
   
  }
  if(passwordField.value.length >= 8 && passwordField.value.match(/[0-9]/) != null && passwordField.value.match(/[A-Z]/) != null && passwordField.value.match(/\W/) != null){
    level0.style.backgroundColor='#f00'
      level1.style.backgroundColor='#a40' 
      level2.style.backgroundColor='#680' 
      level3.style.backgroundColor='#2a0'
    level4.style.backgroundColor='#0f0'
  text.innerText='very strong'
  return
  }
  
  
  }
  