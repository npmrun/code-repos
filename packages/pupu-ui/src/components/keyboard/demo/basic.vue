<template>
    <div>
        <div @click="clickShow">显示键盘</div>
        <Keyboard v-model:value="state.isShow" @confrim="handleConfrim"></Keyboard>
    </div>
</template>


<script lang="ts" setup>
import { reactive } from 'vue';
import Keyboard from 'pupu-ui/dist/components/keyboard';

const state = reactive({
    isShow: false,
})
function clickShow() {
    state.isShow = !state.isShow
}
function handleConfrim(pwd) {
    alert(pwd)
}
</script>