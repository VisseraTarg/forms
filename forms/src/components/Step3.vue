<script setup lang="ts">
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import Header from '@/components/Header.vue'
import {useDataStore} from '@/stores/store'

const pageNumbers = {
  a: 3,
  b: 1,
  c: 2,
}

const store = useDataStore()

const isMarried =  () => {
  if (store.data.isMarried == true) return "В браке"
  return "Не в браке"
}

</script>

<template>
  <div class="wrapper">
    <div class="form">
      <Header :pageNumbers="pageNumbers"/>
      <div class="form__wrapper">
        store: {{ store.data }} <br>
        <div class="input__wrapper">
          <div class="input__wrapper">
            <div class="label" >Фамилия</div>
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
            <select class="select_readonly" >
              <option selected disabled>
                {{ store.data.day }}
              </option>
            </select>
            <select class="select_readonly" >
              <option selected disabled>
                {{ store.data.month }}
              </option>
            </select>
            <select class="select_readonly" >
              <option selected disabled>
                {{ store.data.year }}
              </option>
            </select>
          </div>
          <div class="input__wrapper">
            <div class="label">Пол</div>
            <select class="select_" >
              <option selected disabled>{{ store.data.gender }}</option>
            </select>
          </div>
          <div class="input__wrapper">
            <div class="label">Семейной положение</div>
            <select class="select_">
              <option selected disabled>{{isMarried}}</option>
            </select>
          </div>
          <div class="input__wrapper">
            <div class="label">Email</div>
            <input class="input" type="text" :value="store.data.email" readonly>
          </div>
          <div class="input__wrapper">
            <div class="label">Телефон</div>
            <input class="input" type="number" :value="store.data.telephone" readonly>
          </div>
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

.select_readonly {
  pointer-events: none;
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
