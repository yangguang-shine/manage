export const delaySync = (time = 500) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time);
    })
}