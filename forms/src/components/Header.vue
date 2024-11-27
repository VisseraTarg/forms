<script setup>
import back from "@/assets/icons/back.svg";
import down from "@/assets/icons/down.svg";
import {ref} from "vue";

const props = defineProps({
  pageNumbers: Object
})

const isActivePageList = ref(false);

const openPageList = () => {
  isActivePageList.value = !isActivePageList.value;
}


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
        <div class="drop-down__label">Страница {{props.pageNumbers.a}}</div>
        <div class="icon">
          <img
              :src="down"
              alt="">
        </div>
        <div class="drop-down__list" v-if="isActivePageList">
          <ul>
            <li>
              <RouterLink
                :to="`/page_${props.pageNumbers.b}`"
                class="link"
              >
                Страница {{props.pageNumbers.b}}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                  :to="`/page_${props.pageNumbers.c}`"
                  class="link"
              >
                Страница {{props.pageNumbers.c}}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h1 class="title">Этап <span>{{props.pageNumbers.a}}</span> из <span>3</span></h1>
  </div>
</template>

<style scoped>

</style>