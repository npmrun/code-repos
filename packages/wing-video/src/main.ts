function registerEvent(element: Element, fn?: Function): Function {
    let count = 0
    let timeID: NodeJS.Timeout;
    let func = function () {
        clearTimeout(timeID)
        count++
        if (count >= 2) {
            console.log("双击");
            count = 0;
            fn && fn()
        }
        timeID = setTimeout(() => {
            count = 0;
        }, 500);
    }
    element.addEventListener("click", func)
    return function () {
        clearTimeout(timeID)
        element.removeEventListener("click", func)
    }
}

class wingVideo {
    constructor() {
        const videoEl = <HTMLVideoElement>document.querySelector(".video-wrapper #video")
        const playEl = <HTMLDivElement>document.querySelector(".video-wrapper .play-btn")
        let clear = registerEvent(videoEl, function () {
            if (videoEl.paused) {
                videoEl.play()
                playEl.style.display = "none"
            } else {
                videoEl.pause()
                playEl.style.display = "block"
            }
        })
        // videoEl.addEventListener("click", function(){
        //     // videoEl.currentTime = 2
        //     if(videoEl.paused){
        //         videoEl.play()
        //         playEl.style.display = "none"
        //     }else{
        //         videoEl.pause()
        //         playEl.style.display = "block"
        //     }
        // })
        //获取到元数据
        videoEl.addEventListener('loadedmetadata', function () {
            console.log(this.poster);
            console.log(this.duration);
        });
        videoEl.addEventListener('ended', function () {
            console.log(videoEl.paused);
            playEl.style.display = "block"
        });
    }
}

module.exports = wingVideo