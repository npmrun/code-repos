# 自己实现一个video播放器

## 启

```
<video webkit-playsinline style="object-fit:fill;" preload="metadata" >
    <source src="https://www.w3school.com.cn/i/movie.ogg" type="video/ogg" />
    <source src="https://www.w3school.com.cn/i/movie.mp4" type="video/mp4" />
    <source src="https://www.w3school.com.cn/i/movie.webm" type="video/webm" />
    <object data="https://www.w3school.com.cn/i/movie.mp4" width="320" height="240">
        <embed width="320" height="240" src="https://www.w3school.com.cn/i/movie.swf" />
    </object>
</video>
```
* `webkit-playsinline`  
这个是为了兼容移动端，这个属性作用是让视频播放时局域播放（不全屏，在原有位置上播放），不脱离文档流 。但这个的兼容性也不太好，这里不展开讲这个。
* `style="object-fit:fill;"`  
为了让视频的内容铺满video标签，因为video是可替换元素，object-fit可以修改可替换元素的展示规则。
* `preload="metadata"`  
提示尽管作者认为用户不需要查看该视频，不过抓取元数据（比如：长度）还是很合理的。因为海报不显式指定的话需要抓取视频的第一帧，不然会一片空白
* `source`  
这个可以给video元素提供相同的媒体内容，但是指定不同的格式，上面是格式顺序是oog-->mp4-->webm-->embed标签，都是一级级的退化

## 附录
> 资源  
播放按钮图片：https://game.gtimg.cn/images/lol/act/a20210924vex/head-play.png  
海报图片: https://image-static.segmentfault.com/114/326/1143266354-57b188ae776c7_fix732

> 学习资料  
>* https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-preload
>* https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source
>* https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit
>* https://www.w3school.com.cn/html/html_video.asp
>* https://www.runoob.com/tags/tag-video.html
>* Video实例方法：https://www.w3school.com.cn/jsref/dom_obj_video.asp
>* Video触发事件：https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#events