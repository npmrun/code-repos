<template>
    <span class="pu-captcha" :class="[border ? 'border' : '']" :disabled="isStart"
        :style="{ color: color, fontSize: fontSize }">
        <slot>{{ text }}</slot>
    </span>
</template>
<docs>
  </docs>
<script>
export default {
    name: "pu-captcha",
    data() {
        return {
            timer: null,
            isStart: false,
            text: "获取短信验证码",
        };
    },
    props: {
        initText: {
            type: String,
            default: "",
        },
        second: {
            default: 60,
            validator(val) {
                return /^\d*$/.test(val);
            },
        },
        border: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: "#3482F1",
        },
        fontSize: {
            type: String,
            default: "12px",
        },
        runText: {
            type: String,
            default: "{%s}秒后重新获取",
        },
        resetText: {
            type: String,
            default: "重新获取验证码",
        },
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        run() {
            let second = this.second;
            this.text = this.getText(this.second);
            this.timer = setInterval(() => {
                second--;
                this.text = this.getText(second);
                second <= 0 && this.stop();
            }, 1000);
        },
        stop: function () {
            this.text = this.resetText;
            this.$emit("update:modelValue", false);
            this.$emit("stop", false);
            clearInterval(this.timer);
        },
        getText(second) {
            return this.runText.replace(/\{([^{]*?)%s(.*?)\}/g, second);
        },
    },
    watch: {
        modelValue: function (val) {
            this.isStart = val;
            val && this.run();
        },
    },
    mounted() {
        if (this.initText) {
            this.text = this.initText;
        }
    },
    destroyed() {
        this.stop();
    },
};
</script>
