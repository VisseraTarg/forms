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
        <img :src="back" alt="" @click.prevent="$router.back()"/>
      </div>
      <div class="drop-down" @click="openPageList">
        <div class="drop-down__label">Страница {{props.pageNumbers.a}}</div>
        <div class="drop-down__icon"><img :src="down" alt=""></div>
        <div class="drop-down__list" v-if="isActivePageList">
          <ul>
            <li><RouterLink :to="`/page_${props.pageNumbers.b}`">Страница {{props.pageNumbers.b}}</RouterLink> </li>
            <li><RouterLink :to="`/page_${props.pageNumbers.c}`">Страница {{props.pageNumbers.c}}</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
    <h1 class="title">Этап {{props.pageNumbers.a}} из 3</h1>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  gap: 40px;
  padding: 6px;
}

.nav {
  display: flex;
  gap: 10px;
  border: 1px solid #ccc;
  height: fit-content;
  padding: 6px;
}

.drop-down {
  position: relative;
  display: flex;
  gap: 6px;
  height: fit-content;
}

.drop-down__list {
  position: absolute;
  top: calc(100%);
  left: 0;
  z-index: 10;
  padding: 4px;
  -webkit-box-shadow: 0 0 50px 0 rgba(34, 60, 80, 0.08);
  -moz-box-shadow: 0 0 50px 0 rgba(34, 60, 80, 0.08);
  box-shadow: 0 0 50px 0 rgba(34, 60, 80, 0.08);
  background-color: #fff;

}

ul {
  list-style-type: none;
  padding: 0px;
  margin: 2px;
}

li:hover {
  background-color: #898989;
 }
</style>