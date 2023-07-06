<template>
    <div>
        <%= componentVar %>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import params from './params'

export default defineComponent({
    name: params.name,
    setup() {},
})
</script>
