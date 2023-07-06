export function isNull(value: any) {
    return !!!value
}

export function registerManyEvent(el: Element, events: string, fn?: Function) {
    const allEvents = events.split(",")
    for (let i = 0; i < allEvents.length; i++) {
        const event = allEvents[i]
        el.addEventListener(event, function (...argu: any[]) {
            // @ts-ignore
            fn && fn.apply(this, [event].concat(argu))
        })
    }
}

export function registerDBClick(element: Element, fn?: Function): Function {
    let count = 0
    let timeID: NodeJS.Timeout
    let func = function (...argu: any[]) {
        clearTimeout(timeID)
        count++
        if (count >= 2) {
            console.log("双击")
            count = 0
            // @ts-ignore
            fn && fn.apply(this, argu)
        }
        timeID = setTimeout(() => {
            count = 0
        }, 500)
    }
    element.addEventListener("click", func)
    return function () {
        clearTimeout(timeID)
        element.removeEventListener("click", func)
    }
}
