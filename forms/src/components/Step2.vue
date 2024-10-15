<script setup lang="ts">
import { useForm } from 'vee-validate'
import { boolean, number, object, string } from 'yup'
import { computed } from 'vue'
import Header from '@/components/Header.vue'
import {useDataStore} from '@/stores/store'

const pageNumbers = {
  a: 2,
  b: 1,
  c: 3,
}

const { values, validate, errors, defineField } = useForm({
  validationSchema: object({
    day: number()
        .min(1)
        .max(31)
        .integer()
        .required(),
    month: string()
        .required(),
    year: number()
        .min(1920)
        .max(2024)
        .required(),
    gender: string(),
    isMarried: boolean(),
    email: string()
        .email()
        .required(),
    telephone: number()
        .required(),
  }),
})

const [ day ] = defineField('day')
const [ month ] = defineField('month')
const [ year ] = defineField('year')
const [ gender ] = defineField('gender')
const [ isMarried ] = defineField('isMarried')
const [ email ] = defineField('email')
const [ telephone ] = defineField('telephone')


const years = []

for (let year = 2024; year >= 1970; year--) {
  years.push(year)
}

const months = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентабрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]

const days = computed(() => {
  if (typeof year.value === 'number' && typeof month.value === 'number') {
    const date = new Date(year.value, month.value + 1, 0)
    const lastDay = date.getDate()
    const forDays = []
    for (let day = 1; day <= lastDay; day++) {
      forDays.push(day)
    }
    return forDays
  }
  return []
})
const isDaysDisabled = computed(() => !days.value.length)
const isMonthDisabled = computed(() => !year.value)

const store = useDataStore()

const preSubmit = (day,month,year,gender,isMarried,email,telephone) => {
  store.saveStep2(day,month,year,gender,isMarried,email,telephone)
  console.log('Step 2: ', store.data)
}

</script>

<template>
  <div class="wrapper">
    <div class="form">
      <Header :pageNumbers="pageNumbers"/>
      <div class="form__wrapper">
        store: {{ store.data }} <br>
        <div class="input__wrapper">
          <div class="label">Дата рождения</div>
          <select class="select_" v-bind:disabled="isDaysDisabled" v-model="day">
            <option v-for="day in days" :value="day">{{ day }}</option>
          </select>
          <select class="select_" v-bind:disabled="isMonthDisabled" v-model="month">
            <option v-for="(month, index) in months" :value="index++">
              {{ month }}
            </option>
          </select>
          <select class="select_" v-model="year">
            <option v-for="year in years" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div class="input__wrapper">
          <div class="label">Пол</div>
          <select class="select_" v-model="gender">
            <option value="М">М</option>
            <option value="Ж">Ж</option>
          </select>
        </div>
        <div class="input__wrapper">
          <div class="label">Семейной положение</div>
          <select class="select_" v-model="isMarried">
            <option :value="true">В браке</option>
            <option :value="false">Не в браке</option>
          </select>
        </div>
        <div class="input__wrapper">
          <div class="label">Email</div>
          <input class="input" type="text" v-model="email"> {{ errors.email }}
          <div class="error" v-if="errors.email">Ошибка</div>
        </div>
        <div class="input__wrapper">
          <div class="label">Телефон</div>
          <input class="input" type="number" v-model="telephone"> {{ errors.email }}
          <div class="error" v-if="errors.telephone">Ошибка</div><br>
        </div>
        <div class="input__wrapper">
            <RouterLink to="/page_3"><input type="submit" value="Далее" @click="preSubmit(day,month,year,gender,isMarried,email,telephone)"></RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 60px;
  min-width: 500px;
  min-height: 500px;
  padding: 20px;
  border-radius: 16px;
  -webkit-box-shadow: 0 0 50px 0 rgba(34, 60, 80, 0.08);
  -moz-box-shadow: 0 0 50px 0 rgba(34, 60, 80, 0.08);
  box-shadow: 0 0 50px 0 rgba(34, 60, 80, 0.08);
}

.label {
  font-weight: 600;
  margin-top: 10px;
}

.input__wrapper{
  margin-top: 10px;
}

.input {
  color: #161616;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-weight: 600;
}

.input:focus {
  outline: transparent;
}

.error {
  margin-top: 2px;
  color: #ff0000;
  font-size: 14px;
}
</style>
