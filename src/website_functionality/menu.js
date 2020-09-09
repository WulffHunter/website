const menuHtml = `
    <div id="header" class="rounded">
        <div class="inner-content">
            <div class="tab-group non-mobile">
                <a href="./about-me.html" class="tab tabfade">About Me</a>
                <a href="./about-site.html" class="tab tabfade">About This Site</a>
            </div>
            <div class="tab-group only-mobile"></div>
            <a href="./index.html" class="logo logofade">Jared Rand</a>
            <div class="tab-group non-mobile">
                <a href="https://github.com/wulffhunter" class="tab tabfade">GitHub</a>
                <a href="https://www.linkedin.com/in/jared-rand-522907134/" class="tab tabfade">LinkedIn</a>
                <a href="./contact-me.html" class="tab tabfade">Contact Me</a>
            </div>
            <div class="tab-group only-mobile">
                <a class="tab tabfade menu-button" onclick="toggleMenu()">&#9776;</a>
            </div>
        </div>
    </div>
    <div id="menu" class="only-mobile">
        <div class="menu-content">
            <a class="tab close-btn" onclick="toggleMenu()">&times;</a>
            <a href="./index.html" class="tab">Home</a>
            <a href="./about-me.html" class="tab">About Me</a>
            <a href="./about-site.html" class="tab">About This Site</a>
            <a href="https://github.com/wulffhunter" class="tab">GitHub</a>
            <a href="https://www.linkedin.com/in/jared-rand-522907134/" class="tab">LinkedIn</a>
            <a href="./contact-me.html" class="tab">Contact Me</a>
        </div>
    </div>
`

export const createMenu = () => {
    window.toggleMenu = () => {
        document.getElementById('menu').classList.toggle('show-menu')
    }

    document.body.insertAdjacentHTML('afterbegin', menuHtml)
}
