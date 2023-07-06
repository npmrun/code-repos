<template>
    <teleport :to="to" :disabled="disabled">
        <transition name="pu-dialog-fade">
            <pu-mask is-render v-model:show="isShow"></pu-mask>
        </transition>
        <div class="pu-dialog__wrapper" v-if="isShowWraper" @click.stop="isShow = false">
            <transition name="pu-dialog-slide-fade" @after-leave="close()">
                <div class="pu-dialog__content" v-if="isShow" @click.stop>
                    <slot></slot>
                </div>
            </transition>
        </div>
    </teleport>
</template>
 
<script lang="ts" setup>
import { onMounted, watch, ref, nextTick } from 'vue';
import PuMask from '@/components/mask';

function setStyle(el: HTMLElement, css: Partial<CSSStyleDeclaration>) {
    for (const key in css) {
        if (Object.prototype.hasOwnProperty.call(css, key)) {
            const prop = css[key]
            el.style[key] = prop as string
        }
    }
}

// https://github.com/microsoft/TypeScript/issues/42873

const props = withDefaults(defineProps<{
    to?: string
    disabled?: boolean
    show?: boolean
}>(), {
    to: 'body',
    disabled: false,
    show: false,
})
const emits = defineEmits<{
    (e: "update:show", isShow: boolean): void
}>()

onMounted(() => {
    watch(() => props.show, (isShow) => {
        if (isShow) {
            show()
        } else {
            hide()
        }
    }, {
        immediate: true
    })
})

const isShow = ref(false)
const isShowWraper = ref(false)

function show() {
    isShowWraper.value = true
    setStyle(document.body, {
        overflow: "hidden"
    })
    nextTick(() => {
        isShow.value = true
    })
}

function hide() {
    isShow.value = false
    setStyle(document.body, {
        overflow: ""
    })
}

function close() {
    isShowWraper.value = false
    emits("update:show", false)
}
</script>
