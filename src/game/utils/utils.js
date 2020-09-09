// Cross-platform, ignores the scrollbar
export const getViewDimensions = () =>
    ({
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
    })

export const getDistance = (point_1, point_2) =>
    Math.sqrt(Math.pow((point_1.x - point_2.x), 2) + Math.pow((point_1.y - point_2.y), 2))

export const getAngle = (point_1, point_2) =>
    Math.atan((point_2.y - point_1.y) / (point_2.x - point_1.x)) * (180 / Math.PI)

export const getLengthDirX = (angle, distance) =>
    Math.cos(angle * (Math.PI / 180)) * distance

export const getLengthDirY = (angle, distance) =>
    Math.sin(angle * (Math.PI / 180)) * distance

// Gets a random value in the given range
export const randomRange = (min, max) =>
    Math.random() * (max - min) + min