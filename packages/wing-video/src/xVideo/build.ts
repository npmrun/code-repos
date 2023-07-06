export default `
<div class="video-wrapper">
<!-- poster="https://image-static.segmentfault.com/114/326/1143266354-57b188ae776c7_fix732" -->
<video muted id="video" webkit-playsinline style="object-fit:fill;" preload="metadata" >
    <source src="https://www.w3school.com.cn/i/movie.ogg" type="video/ogg" />
    <source src="https://www.w3school.com.cn/i/movie.mp4" type="video/mp4" />
    <source src="https://www.w3school.com.cn/i/movie.webm" type="video/webm" />
    <object data="https://www.w3school.com.cn/i/movie.mp4" width="320" height="240">
      <embed width="320" height="240" src="https://www.w3school.com.cn/i/movie.swf" />
    </object>
  </video>
  <div class="play-btn">
      <img style="object-fit: contain;" src="//game.gtimg.cn/images/lol/act/a20210924vex/head-play.png" alt="">
  </div>
  <div class="control-wrapper">
    <div class="progress">
        <div class="curProgress" style="width: 0%;"></div>
    </div>
    <div class="duration">00:00</div>
  </div>
</div>
`
