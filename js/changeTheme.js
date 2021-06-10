function changeTheme() {
    let bg = document.getElementById("bg-img")
    if (bg.style.backgroundImage.includes("1")) {
        bg.style = "background-image: url(img/2.png);height: 100vh;width: 100vw;"
        document.getElementById("sun").className = "px-16 self-start focus:outline-none hidden"
        document.getElementById("moon").className = "px-16 self-start focus:outline-none md:hidden"
        document.getElementById("md-sun").className = "px-16 focus:outline-none hidden"
        document.getElementById("md-moon").className = "px-16 self-start focus:outline-none hidden md:block"
    } else {
        bg.style = "background-image: url(img/1.png);height: 100vh;width: 100vw;"
        document.getElementById("moon").className = "px-16 self-start focus:outline-none hidden"
        document.getElementById("sun").className = "px-16 self-start focus:outline-none md:hidden"
        document.getElementById("md-moon").className = "px-16 focus:outline-none hidden"
        document.getElementById("md-sun").className = "px-16 self-start focus:outline-none hidden md:block"
    }
}