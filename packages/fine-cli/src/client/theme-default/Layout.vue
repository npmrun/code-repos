<script setup lang="ts">
import MarkView from '@/components/MarkView.vue'
import sitedata from 'sitedata'
import basicdata from 'basicdata'
import path from 'path-browserify'
import text from './readme.md?raw'
console.log(path)

console.log(sitedata.clientDir)
console.log(
    Object.keys(basicdata).map((v) => {
        // TODO 将路径转化为根据根目录的路径
        // https://github.com/browserify/path-browserify/issues/29#issuecomment-1600002373
        // console.log(sitedata.cwdDir);
        // console.log(path.resolve(sitedata.clientDir, v.slice(1)))
        // console.log(v.slice(1))

        // console.log(
        // path.resolve(sitedata.clientDir, v.slice(1)).replace(sitedata.cwdDir, '')
        // )
        // console.log(path.relative(sitedata.clientDir, path.join(sitedata.clientDir, v)));
        return v
            .split('/')
            .filter((v) => v !== '..')
            .join('/')
    })
)
</script>

<template>
    <div style="max-width: 800px; margin: 0 auto">
        <MarkView v-model="text"></MarkView>
    </div>
</template>
