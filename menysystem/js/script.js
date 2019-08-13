const navSlide = () => {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.navLinks')
    const navLinks = document.querySelectorAll('.navLinks li')

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active')
    
    navLinks.forEach((link, index) => {
        if(link.style.animation) {
            link.style.animation = ''
        }
        else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
            console.log(index/7)
        }
    }
    )
    burger.classList.toggle('toggle')
}

)
}

navSlide()