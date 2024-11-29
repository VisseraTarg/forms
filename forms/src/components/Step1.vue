<script setup lang="ts">
import { useForm, useIsFieldDirty, useIsFieldValid } from 'vee-validate'
import { object, string } from 'yup'
import Header from '@/components/Header.vue'
import { useDataStore } from '@/stores/store'
import { computed } from 'vue'
import NextButton from '@/components/NextButton.vue'


const store = useDataStore()
const { values, validate, errors, defineField, resetForm } = useForm({
  validationSchema: object({
    surname: string()
        .required('Это поле обязательно')
        .min(2, 'Поле должно содержать минимум 2 символа')
    ,
    name: string()
        .required('Это поле обязательно')
        .min(2, 'Поле должно содержать минимум 2 символа')
    ,
    patronymic: string()
        .min(2, 'Поле должно содержать минимум 2 символа'),
  }),
  initialValues: {
    surname: store.data.surname,
    name: store.data.name,
    patronymic: store.data.patronymic,
  },
})

const [ surname ] = defineField('surname')
const [ name ] = defineField('name')
const [ patronymic ] = defineField('patronymic')

const preSubmit = (surname, name, patronymic) => {
  store.saveStep1(surname, name, patronymic)
  console.log('Step 1: ', store.data)
}

const isValid_S = useIsFieldValid('surname')
const isValid_N = useIsFieldValid('name')
const isValid_P = useIsFieldValid('patronymic')

const isDirty_P = useIsFieldDirty('patronymic')

const showError_P = computed(() => !isValid_P.value && isDirty_P.value)

const isValid = computed(() => isValid_S.value && isValid_N.value && !showError_P.value)
</script>

<template>
  <div class="wrapper">
    <div class="form">
      <Header/>
      <div class="form__wrapper">
        <div class="input__wrapper">
          <div class="label">Фамилия<span>*</span></div>
          <input class="input" type="text" v-model="surname">
          <div class="error" v-if="errors.surname">{{ errors.surname }}</div>
        </div>
        <div class="input__wrapper">
          <div class="label">Имя<span>*</span></div>
          <input class="input" type="text" v-model="name">
          <div class="error" v-if="errors.name">{{ errors.name }}</div>
        </div>
        <div class="input__wrapper">
          <div class="label">Отчество</div>
          <input class="input" type="text" v-model="patronymic">
          <div class="error" v-if="showError_P">{{ errors.patronymic }}</div>
        </div>
        <div class="input__wrapper">
          <NextButton
              title="Далее"
              @click="preSubmit(surname,name,patronymic)"
              v-bind:disabled="!isValid"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
