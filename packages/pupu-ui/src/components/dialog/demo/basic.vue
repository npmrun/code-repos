<script lang="ts" setup>
import { PuDialog } from 'pupu-ui';
import { ref } from 'vue';

const show = ref(false)
</script>
<template>
    <div class="basic-demo">
        <div class="flex">
            <div @click="show = !show">打开对话框</div>
            <PuDialog v-model:show="show">
                <div style="background-color: white;">
                    内部
                </div>
            </PuDialog>
        </div>
    </div>
</template>
<style scoped></style>