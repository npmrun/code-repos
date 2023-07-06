import "./style/index.scss"
import html from "./build"
import { registerDBClick, isNull, registerManyEvent } from "./utils"

interface IConfig {
    container: string
    videoSelector: string
    durationSelector: string
    btnSelector: string
    controlSelector: string
    [key: string]: any
}
interface IOpts {
    container?: string
    videoSelector?: string
    durationSelector?: string
    btnSelector?: string
    controlSelector?: string
    [key: string]: any
}
class xVideo {
    private defaultConfig: IConfig = {
        container: "#xVideo",
        videoSelector: ".video-wrapper #video",
        durationSelector: ".video-wrapper .duration",
        btnSelector: ".video-wrapper .play-btn",
        controlSelector: ".video-wrapper .control-wrapper .curProgress",
    }
    config: IConfig = this.defaultConfig
    constructor(opts: IOpts = {}) {
        if (isNull(opts)) {
            // throw new Error("请配置video插件")
        }

        Object.keys(this.defaultConfig).forEach((key: keyof IConfig) => {
            if (opts.hasOwnProperty(key)) {
                this.config[key] = opts[key]
            }
        })

        const containerEl = document.querySelector(this.config.container)
        if (containerEl) {
            containerEl.innerHTML = html
        }

        const videoEl = <HTMLVideoElement>document.querySelector(this.config.videoSelector)
        const playEl = <HTMLDivElement>document.querySelector(this.config.btnSelector)
        const controlEl = <HTMLDivElement>document.querySelector(this.config.controlSelector)
        const durationEl = <HTMLDivElement>document.querySelector(this.config.durationSelector)
        videoEl.playbackRate = 2
        registerDBClick(videoEl, function () {
            if (videoEl.paused) {
                videoEl.play()
            } else {
                videoEl.pause()
            }
        })
        playEl.addEventListener("click", function () {
            videoEl.play()
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
        videoEl.addEventListener("loadedmetadata", function () {
            console.log("loadedmetadata");
            console.log(this.poster)
            console.log(this.duration)
            durationEl.innerText = "0.00/" + this.duration.toFixed(2)
        })
        videoEl.addEventListener("timeupdate", function () {
            console.log("timeupdate");
            
            console.log(this.duration)
            console.log(this.currentTime)
            let cur = (this.currentTime / this.duration) * 100
            controlEl.style.width = cur + "%"
            durationEl.innerText = this.currentTime.toFixed(2) + " / " + this.duration.toFixed(2)
        })
        registerManyEvent(videoEl, "play,pause,ended", function (type: string) {
            console.log(type);
            if (type == "play") {
                playEl.style.display = "none"
            }
            if (type == "pause" || type == "ended") {
                playEl.style.display = "block"
            }
        })
    }
}

module.exports = xVideo
