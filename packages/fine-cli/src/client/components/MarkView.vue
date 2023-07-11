<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import meta from 'markdown-it-meta'
import anchor from 'markdown-it-anchor'
import { footnote } from '@mdit/plugin-footnote'
import { mathjax, createMathjaxInstance } from '@mdit/plugin-mathjax'
import { onBeforeMount, ref, watchEffect } from 'vue'

const props = defineProps<{
    modelValue: string
}>()

let mdInstance: typeof MarkdownIt

function init() {
    if (!mdInstance) {
        mdInstance = new MarkdownIt({
            breaks: true,
            html: true,
            typographer: true,
            linkify: true,
        })
        mdInstance.use(footnote)
        mdInstance.use(taskLists, { label: true, labelAfter: true })
        mdInstance.use(anchor)
        mdInstance.use(meta)
        const mathjaxInstance = createMathjaxInstance({})
        mdInstance.use(mathjax, mathjaxInstance)
    }
}

const renderText = ref('')
onBeforeMount(() => {
    init()
    watchEffect(() => {
        if (!props.modelValue) {
            renderText.value = ''
            return
        }
        console.log(props.modelValue);
        
        renderText.value = mdInstance.render(props.modelValue)
    })
})
</script>
<template>
    <div class="markdown-body">
        
        <div v-html="renderText"></div>
    </div>
</template>

<style lang="scss">
@import './style.scss';
@import './prism.scss';
</style>
