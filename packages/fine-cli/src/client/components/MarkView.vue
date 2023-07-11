<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import meta from 'markdown-it-meta'
import anchor from 'markdown-it-anchor'
import footnote from 'markdown-it-footnote'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { mathjax, createMathjaxInstance } from '@mdit/plugin-mathjax'
import { onBeforeMount, ref, watchEffect } from 'vue'

const props = defineProps<{
    modelValue: string
}>()

let mdInstance: typeof MarkdownIt

function init() {
    if (!mdInstance) {
        // https://zhuanlan.zhihu.com/p/336827934
        mdInstance = new MarkdownIt({
            html: false,
            linkify: true,
            typographer: true,
            breaks: true,
            xhtmlOut: false,
            highlight: function (str: string, lang: string) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return (
                            '<pre class="hljs"><code>' +
                            hljs.highlight(str, {
                                language: lang,
                            }).value +
                            '</code></pre>'
                        )
                    } catch (__) {}
                }

                return (
                    '<pre class="hljs"><code>' +
                    mdInstance.utils.escapeHtml(str) +
                    '</code></pre>'
                )
            },
        })
        mdInstance.use(meta)
        mdInstance.use(footnote)
        mdInstance.use(taskLists, { label: true, labelAfter: true })
        mdInstance.use(anchor)
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
/* @import './prism.scss'; */
</style>
