<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useDataStore } from '@/stores/store'
import { computed, ref } from 'vue'

const pageNumbers = {
  a: 3,
  b: 1,
  c: 2,
}

const store = useDataStore()

const months = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентабрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]

const isConfirm = ref(false)

const confirm = () => {
  console.log('confirm', isConfirm.value)
  isConfirm.value = !isConfirm.value
}

const forSubmit = computed(() => {
  return {
    surname: store.data.surname,
    name: store.data.name,
    patronymic: store.data.patronymic,
    day: store.data.day,
    month: store.data.month,
    year: store.data.year,
    gender: store.data.gender,
    isMarried: store.data.isMarried,
    email: store.data.email,
    telephone: store.data.telephone,
  }
})

const submit = () => {
  console.log('submit', forSubmit.value)

  store.clearStoreData()
  alert('Данные отправлены')
}


</script>

<template>

  <div class="wrapper">
    <div class="form">
      <Header :pageNumbers="pageNumbers"/>
      <div class="form__wrapper">
        <div class="input__wrapper">
          <div class="input__wrapper">
            <div class="label">Фамилия</div>
            <input class="input" type="text" :value="store.data.surname" readonly/>
          </div>
          <div class="input__wrapper">
            <div class="label">Имя</div>
            <input class="input" type="text" :value="store.data.name" readonly>
          </div>
          <div class="input__wrapper">
            <div class="label">Отчество</div>
            <input class="input" type="text" :value="store.data.patronymic" readonly>
          </div>
          <div class="input__wrapper">
            <div class="label">Дата рождения</div>
            <select class="select_readonly">
              <option selected disabled>
                {{ store.data.day }}
              </option>
            </select>
            <select class="select_readonly">
              <option selected disabled>
                {{ months[store.data.month] }}
              </option>
            </select>
            <select class="select_readonly">
              <option selected disabled>
                {{ store.data.year }}
              </option>
            </select>
          </div>
          <div class="input__wrapper">
            <div class="label">Пол</div>
            <select class="select_readonly">
              <option selected disabled v-if="store.data.gender">{{ store.data.gender }}</option>
              <option selected disabled v-else>Не выбрано</option>
            </select>
          </div>
          <div class="input__wrapper">
            <div class="label">Семейной положение</div>
            <select class="select_readonly">
              <option selected disabled>{{ store.data.isMarried }}</option>
            </select>
          </div>
          <div class="input__wrapper">
            <div class="label">Email</div>
            <input class="input" type="text" :value="store?.data.email" readonly>
          </div>
          <div class="input__wrapper">
            <div class="label">Телефон</div>
            <input class="input" :value="store?.data.telephone" readonly>
          </div>
        </div>
        <div class="input__wrapper">
          <input type="checkbox" v-model="isConfirm" @click="confirm">
          <span>Подтверждаю обработку личных данных</span>
        </div>
        <div class="input__wrapper">
          <RouterLink to="/page_1">
            <input
                type="submit"
                value="Отправить"
                :disabled="!isConfirm"
                @click="submit"
                class="button"
            />
          </RouterLink>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
