<script setup>
import back from "@/assets/icons/back.svg";
import down from "@/assets/icons/down.svg";
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '@/main.js'


const isActivePageList = ref(false);

const openPageList = () => {
  isActivePageList.value = !isActivePageList.value;
}

const route = useRoute()
//console.log('Текущий роут: ', route.path)

const currentRoute = computed(() => routes.find(r => r.path === route.path))
//console.log('Текущий роут инфо: ', currentRoute.value)

const currentRouteIndex = computed(() => routes.findIndex(r => r.path === route.path))
//console.log('Индекс текущего роута: ', currentRouteIndex.value)

const routersAmount = computed(() => routes.length)
//console.log('Всего роутов: ', routersAmount.value)

const otherRoutes = computed(() => routes.filter(r => r.path !== route.path).slice(1))
//console.log('Остальные роуты: ', otherRoutes.value)

</script>

<template>
  <div class="header">
    <div class="nav">
      <div class="icon">
        <img
            :src="back"
            alt=""
            @click.prevent="$router.back()"/>
      </div>
      <div class="drop-down" @click="openPageList">
        <div class="drop-down__label">{{currentRoute.name}}</div>
        <div class="icon">
          <img
              :src="down"
              alt="">
        </div>
        <div class="drop-down__list" v-if="isActivePageList">
          <ul>
            <li
                v-for="route in otherRoutes"
            >
              <RouterLink
                :to="route.path"
                class="link"
              >
                {{route.name}}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h1 class="title">Этап <span>{{currentRouteIndex}}</span> из <span>{{ routersAmount - 1 }}</span></h1>
  </div>
</template>

<style scoped>

</style>