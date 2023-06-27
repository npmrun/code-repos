<template>
    <div class="pu-keyborad-wrapper">
        <transition name="fade">
            <div class="mask" @click="hideFun" v-if="value"></div>
        </transition>
        <transition name="slide">
            <div class="pu-keyborad" v-if="value">
                <div class="key_main">
                    <div class="main_content">
                        <div class="content_num">
                            <div v-for="(item, index) in list2" :key="index" class="content_item">
                                {{ password[+item - 1] ? '●' : '' }}
                            </div>
                        </div>
                        <div class="main_forget" @click="forgetFun">
                            忘记密码
                        </div>
                    </div>
                    <div class="main_keyboard">
                        <div class="key_num" v-for="(item, index) in list" :key="index" @click="inputNumFun({ num: item })">
                            {{ item }}
                        </div>
                        <div class="key_null"></div>
                        <div class="key_0" @click="inputNumFun({ num: 0 })">
                            0
                        </div>
                        <div class="key_del" @click="delNumFun">
                            <!-- <img :src="imgUrl+'141.png'"> -->
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "pu-keyboard",
    props: {
        value: Boolean,
    },
    computed: {},
    data() {
        return {
            list: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            list2: ['1', '2', '3', '4', '5', '6'],
            imgUrl: '',
            password: '', //密码
        }
    },
    methods: {
        inputNumFun(op: any) {
            let _this = this
            if (_this.password.length <= 6) {
                _this.password += op.num
                if (_this.password.length == 6) {
                    var password = _this.password
                    _this.$emit('getPassword', { password: password })
                    _this.password = ''
                    console.log(password)
                    this.$emit("confrim", password)
                }
            }
        },
        delNumFun() {
            if (this.password.length == 0) return
            this.password = this.password.substring(0, this.password.length - 1)
            console.log('删除后的结果', this.password)
        },
        forgetFun() {
            // uni.showToast({
            //   title: "忘记密码操作",
            //   icon: "none"
            // });
        },
        hideFun() {
            this.$emit('update:value', false)
        },
    },
})
</script>
