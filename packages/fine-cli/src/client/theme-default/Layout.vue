<script setup lang="ts">
import MarkView from '@/components/MarkView.vue'
import text from './readme.md?raw'
</script>

<template>
    <div style="max-width: 800px; margin: 0 auto">
        <MarkView v-model="text"></MarkView>
    </div>
</template>
