<script setup>
import { routes } from '@/main.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  title: String,
  disabled: Boolean,
})
const route = useRoute()
const currentRouteIndex = computed(() => routes.findIndex(r => r.path === route.path))
//console.log('Индекс текущего роута: ', currentRouteIndex.value)
const nextRoute = routes[currentRouteIndex.value + 1] || routes[1]
//console.log('Следующий роут: ', nextRoute)

</script>

<template>
  <RouterLink :to="nextRoute.path">
    <button
        class="button"
        :disabled="props.disabled"
    >
      {{ props.title }}
    </button>
  </RouterLink>
</template>

<style scoped>

</style>