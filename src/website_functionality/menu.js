const TABS = {
    ['Programming']: './programming.html',
    ['Creative Endeavours']: './creative-endeavours.html',
    ['Collaboration']: './collaboration.html',
    ['Links']: './links.html',
    ['Contact Me']: './contact-me.html'
}

// const github = 'https://github.com/wulffhunter'
// const linkedin = 'https://www.linkedin.com/in/jared-rand-522907134/'

const tabToHTML = (tabName, link, isMenuTab) =>
    `<a
        href="${link}"
        class="tab ${ isMenuTab ? '' : 'tabfade' }"
    >
        ${tabName}
    </a>`

const tabsToString = (isMenuTabs) =>
    (acc, currKey) => `
        ${acc}
        ${tabToHTML(currKey, TABS[currKey], isMenuTabs)}
    `

const menuHtml = `
    <div id="header" class="rounded">
        <div class="inner-content">
            <div class="tab-group non-mobile">
                ${
                    Object.keys(TABS)
                        .slice(0, Math.floor(
                            Object.keys(TABS).length / 2
                        ))
                        .reduce(tabsToString(false), '')
                }
            </div>
            <div class="tab-group only-mobile"></div>
            <a href="./index.html" class="logo logofade">Jared Rand</a>
            <div class="tab-group non-mobile">
                ${
                    Object.keys(TABS)
                        .slice(Math.floor(
                            Object.keys(TABS).length / 2
                        ))
                        .reduce(tabsToString(false), '')
                }
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
            ${
                Object.keys(TABS).reduce(tabsToString(true), '')
            }
        </div>
    </div>
`

export const createMenu = () => {
    window.toggleMenu = () => {
        document.getElementById('menu').classList.toggle('show-menu')
    }

    document.body.insertAdjacentHTML('afterbegin', menuHtml)
}
