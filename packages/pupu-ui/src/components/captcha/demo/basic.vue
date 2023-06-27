<template>
    <div style="margin:20px;">
        <Captcha v-model="captcha" border :second="5" @click="clickSendCode" />
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import Captcha from 'pupu-ui/dist/components/captcha';

const captcha = ref(false);

function clickSendCode() {
    if (!captcha.value) {
        // 模拟发送验证码请求
        setTimeout(() => {
            captcha.value = true;
        }, 2000)
    }
}
</script>