<template>
    <div :class="[basicClass]" v-if="isRenderShow" v-show="isDisplayShow" @click.stop="clickMask"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { createCssScope } from "@/utils/bem"

const props = withDefaults(defineProps<{
    show?: boolean
    isRender?: boolean
}>(), {
    show: false,
    isRender: false
})

const bem = createCssScope("mask")

const basicClass = bem()
console.log(basicClass);


const isDisplayShow = computed(() => {
    return !props.isRender ? props.show : true
})
const isRenderShow = computed(() => {
    return props.isRender ? props.show && props.isRender : true
})

const emits = defineEmits<{
    (e: "update:show", isShow: boolean): void
}>()

function clickMask() {
    emits("update:show", false)
}
</script>
