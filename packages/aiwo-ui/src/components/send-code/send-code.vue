<template>
    <a-button @click="onClick" :disabled="isDisabled" :loading="isLoading" type="primary" size="small">
        {{ text }}
    </a-button>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, watchEffect } from 'vue'
const props = withDefaults(
    defineProps<{
        duration?: number
        initText?: string
        runText?: string
        loadingText?: string
        resetText?: string
    }>(),
    {
        runText: '{%s}s 后重新发送',
        initText: '获取验证码',
        loadingText: '正在发送',
        resetText: '重新获取',
        duration: 60,
    }
)
const emits = defineEmits<{
    (event: 'update:modelValue', show: boolean): void
    (event: 'send', start: () => void, done: (isDone: boolean) => void): void
}>()

const text = ref(props.initText)
const isDisabled = ref(false)
const isLoading = ref(false)
let number = props.duration
let timeID: any

onBeforeUnmount(() => {
    stop()
})

function stop() {
    clearInterval(timeID)
    number = props.duration
    text.value = props.resetText
    isLoading.value = false
    isDisabled.value = false
    emits('update:modelValue', false)
}
//获取格式化
function getText(second: string | number): string {
    return props.runText.replace(/\{([^{]*?)%s(.*?)\}/g, String(second))
}
function run() {
    isLoading.value = false
    text.value = getText(number)
    clearInterval(timeID)
    timeID = setInterval(() => {
        number--
        text.value = getText(number)
        if (number <= 0) {
            stop()
        }
    }, 1000)
}

function onClick() {
    emits(
        'send',
        () => {
            isDisabled.value = true
            isLoading.value = true
            text.value = props.loadingText
        },
        (isDone: boolean) => {
            if (isDone) {
                run()
            } else {
                stop()
            }
        }
    )
}
</script>
