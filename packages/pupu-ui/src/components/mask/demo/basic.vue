<script lang="ts" setup>
import { PuMask } from 'pupu-ui';
import { ref } from 'vue';

const show = ref(false)
</script>
<template>
    <div class="basic-demo">
        <div class="flex">
            <div @click="show = !show">打开遮罩</div>
            <PuMask v-model:show="show"></PuMask>
        </div>
    </div>
</template>
<style scoped></style>