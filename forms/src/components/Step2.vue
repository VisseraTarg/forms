<script setup lang="ts">
import { useForm, useIsFieldDirty, useIsFieldValid, useIsFormDirty, useIsFormValid } from 'vee-validate'
import { boolean, number, object, string } from 'yup'
import { computed } from 'vue'
import Header from '@/components/Header.vue'
import { useDataStore } from '@/stores/store'
import NextButton from '@/components/NextButton.vue'


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
    isMarried: string(),
    email: string()
        .required('Это поле обязательно')
        .email('Email введён неправильно'),
    telephone: string()
        .required('Это поле обязательно')
        .test('start',
            'Номер должен начинаться с 996 или 0',
            (val) => val?.startsWith('996') || val?.startsWith('0') || false
        )
        .test(
            'local',
            'Номер должен быть местным',
            (val) => val?.startsWith('996')
                || val?.startsWith('070')
                || val?.startsWith('050')
                || val?.startsWith('077')
                || val?.startsWith('022')
                || val?.startsWith('055')
                || val?.startsWith('099')
                || val?.startsWith('0312')
                || false,
        )
        .min(10, 'Номер должен содержать минимум 10 цифр')
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

function onInput(event: Event) {
  const input = event.target as HTMLInputElement
  input.value =  input.value.slice(0,12).replace(/[^\d+]/g, '')
      .replace(/(?!^)\+/, '')
  if (input.value.startsWith('996') || input.value.startsWith('0312')) input.value = input.value.slice(0,12)
  if ( input.value.startsWith('070')
  || input.value.startsWith('050')
  || input.value.startsWith('077')
  || input.value.startsWith('022')
  || input.value.startsWith('055')
  || input.value.startsWith('099')) input.value = input.value.slice(0,10)
  telephone.value = input.value
}

const store = useDataStore()

const preSubmit = (day, month, year, gender, isMarried, email, telephone) => {
  if (telephone.startsWith('0')) telephone = '+996' + telephone.slice(1)
  else telephone = '+' + telephone
  store.saveStep2(day, month, year, gender, isMarried, email, telephone)
  console.log('Step 2: ', store.data)
}

const isValid_E = useIsFieldValid('email')
const isDirty_E = useIsFieldDirty('email')

const showError_E = computed(() => !isValid_E.value && isDirty_E.value)

const isValid = useIsFormValid()
const isDirty = useIsFormDirty()

const isDisabled = computed(() => !isDirty.value || !isValid.value)

</script>

<template>
  <div class="wrapper">
    <div class="form">
      <Header/>
      <div class="form__wrapper">
        <div class="input__wrapper">
          <div class="label">Дата рождения<span>*</span></div>
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
            <option value="В браке">В браке</option>
            <option value="Не в браке">Не в браке</option>
          </select>
        </div>
        <div class="input__wrapper">
          <div class="label">Email<span>*</span></div>
          <input class="input" type="text" v-model="email">
          <div class="error" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="input__wrapper">
          <div class="label">Телефон<span>*</span></div>
          <input class="input" v-model="telephone" @input="onInput">
          <div class="error" v-if="errors.telephone">{{ errors.telephone }}</div>
          <br>
        </div>
        <div class="input__wrapper">
          <NextButton
              title="Далее"
              @click="preSubmit(day,month,year,gender,isMarried,email,telephone)"
              :disabled="isDisabled"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
