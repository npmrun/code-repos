<script setup lang="ts">
import MarkView from '@/components/MarkView.vue'
import sitedata from 'sitedata'
import basicdata from 'basicdata'
import path from 'path-browserify'
import { reactive } from 'vue'
// import text from './readme.md?raw'

const realdata: any = reactive({})
Object.keys(basicdata).forEach((v) => {
    // TODO 将路径转化为根据根目录的路径
    // https://github.com/browserify/path-browserify/issues/29#issuecomment-1600002373
    console.log(v)
    // @ts-ignore
    path.cwd = ()=>{
        return sitedata.cwdDir
    }
    console.log(path.resolve(sitedata.clientDir, v));
    
    console.log(path.join(sitedata.clientDir, v).replace(sitedata.cwdDir, '').slice(1)
        .replace(/\\/g, '/'))
    
    const relativePath = path
        .resolve(sitedata.clientDir, v.slice(1))
        .replace(sitedata.cwdDir, '')
        .slice(1)
        .replace(/\\/g, '/')
    realdata[relativePath] = basicdata[v]
})
console.log(realdata)
</script>

<template>
    <div style="max-width: 800px; margin: 0 auto">
        <MarkView :model-value="realdata['aaa.md']"></MarkView>
    </div>
</template>
