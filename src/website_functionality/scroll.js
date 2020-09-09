// Increase this to direct the bulk of the easing function
// towards the ending of the smoothstep.
//
// I recommend it should be at least 10.
//
// Higher = spends more time slowing down at the end.
const EASE_IN_COEFFICIENT = 15

// Returns the smoothstepped percent
// based on percentage down the curve
const smoothStep = (percent, useSmoothstep) => {
    if (percent < 0) return 0
    if (percent > 1) return 1

    // // Original smoothstep function
    // return percent * percent * (3 - 2 * percent)

    if (useSmoothstep) return percent * percent * (3 - 2 * percent)

    // // Original sigmoid function
    // return 1 / (1 + Math.pow(Math.E, -percent))

    // Custom sigmoid function
    // The `5` moves the sigmoid to the right so that
    // it nicely clamps between 0 and 1
    return 1 / (1 + Math.pow(Math.E, -((EASE_IN_COEFFICIENT * Math.pow(percent, 0.5)) - 5)))
}

export const smoothScrollToElement = (
    elementId,
    duration,
    scrollPadding,
    useSmoothstep,
) => {
    if (!scrollPadding) {
        scrollPadding = 0
    }

    const element = document.getElementById(elementId)

    // Exit this function if the element doesn't exist
    if (!element) return

    const elementBoundingBox = element.getBoundingClientRect()

    // Find where the top of the window was when we began the scroll
    const initialY = window.pageYOffset

    // Find the difference between the element's position and where the
    // top of the window was when we began the scroll
    const diff = (elementBoundingBox.y - scrollPadding) - initialY

    let startTime = undefined

    // The function that will actually do the scrolling for us
    const stepFn = (timestamp) => {
        // Save the starting time if it wasn't there already
        if (!startTime) startTime = timestamp

        const elapsedTime = timestamp - startTime
        const percent = Math.min(elapsedTime / duration, 1)

        // Move
        window.scrollTo(0, initialY + (diff * smoothStep(percent, useSmoothstep)))

        if (elapsedTime < duration) {
            // Recursively call this function to continue scrolling
            window.requestAnimationFrame(stepFn)
        }
    }

    window.requestAnimationFrame(stepFn)
}