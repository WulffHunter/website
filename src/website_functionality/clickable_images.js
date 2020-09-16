export const clickableImages = () =>
    // Add an onclick to every image in a gallery
    Array.from(document.getElementsByTagName('img'))
        .filter(img => img.parentNode.classList.contains('gallery'))
        .map(img => {
            img.addEventListener(
                "click",
                () => {
                    window.location = img.getAttribute('src')
                }
            )
        })