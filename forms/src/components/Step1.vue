<script setup lang="ts">
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import Header from '@/components/Header.vue'
import {useDataStore} from '@/stores/store'


const pageNumbers = {
  a: 1,
  b: 2,
  c: 3,
}

const { values, validate, errors, defineField } = useForm({
  validationSchema: object({
    surname: string()
        .min(2)
        .required(),
    name: string()
        .min(2)
        .required(),
    patronymic: string()
        .min(2),
  }),
})

const [ surname ] = defineField('surname')
const [ name ] = defineField('name')
const [ patronymic ] = defineField('patronymic')

const store = useDataStore()

const preSubmit = (surname,name,patronymic) => {
  store.saveStep1(surname,name,patronymic)
  console.log('Step 1: ', store.data.surname, store.data.name, store.data.patronymic)
}



</script>

<template>
  <div class="wrapper">
    <div class="form">
      <Header :pageNumbers="pageNumbers"/>
      <div class="form__wrapper">
        store: {{ store.data }} <br>
        <div class="input__wrapper">
          <div class="label">Фамилия</div>
          <input class="input" type="text" v-model="surname"> {{ errors.surname }}
          <div class="error" v-if="errors.surname">Ошибка</div>
        </div>
        <div class="input__wrapper">
          <div class="label">Имя</div>
          <input class="input" type="text" v-model="name"> {{ errors.name }}
          <div class="error" v-if="errors.name">Ошибка</div>
        </div>
        <div class="input__wrapper">
          <div class="label">Отчество</div>
          <input class="input" type="text" v-model="patronymic"> {{ errors.patronymic }}
          <div class="error" v-if="errors.patronymic">Ошибка</div>
        </div>
        <div class="input__wrapper">
          <RouterLink to="/page_2"><input type="submit" value="Далее" @click="preSubmit(surname,name,patronymic)"></RouterLink>
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

.input__wrapper{
 margin-top: 10px;
}

.label {
  font-weight: 600;
  margin-bottom: 4px;
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
