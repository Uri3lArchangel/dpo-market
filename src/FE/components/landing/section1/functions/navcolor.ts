    const nav = document.getElementById('top_md_lg_nav') as HTMLDivElement;
    const section2 = document.getElementById('section2_steps')! as Element;

    const observer = new IntersectionObserver(
        (entries)=>{
            entries.forEach(
                (entry)=>{
                    if(entry.isIntersecting && entry.target == section2){
                        nav.style.backgroundColor='#000'
                        console.log(entry.target.id)
                    }else{
                        nav.style.backgroundColor='#0000'

                        console.log('b')

                    }
                }
            )
        }
    )
    const navE = document.getElementById('top_md_lg_nav') as Element;

    export const Observe = ()=>{

    observer.observe(navE)
    observer.observe(section2)
    }
    export const Unobserve = ()=>{

        observer.unobserve(navE)
        observer.unobserve(section2)
        }