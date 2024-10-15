import {defineStore} from 'pinia'
import {computed, ref} from "vue";


export const useDataStore = defineStore('dataStore', () => {
    const data = ref(
        {
            surname: "",
            name: "",
            patronymic: "",
            day: Number,
            month: Number,
            year: Number,
            gender: "",
            isMarried: Boolean,
            email: "",
            telephone: Number,
        }
    )

    const saveStep1 = (surname,name,patronymic) => {
        data.value.surname = surname
        data.value.name = name
        data.value.patronymic = patronymic
    }

    const saveStep2 = (day,month,year,gender,isMarried,email,telephone) => {
        data.value.day = day
        data.value.month = month
        data.value.year = year
        data.value.gender = gender
        data.value.isMarried = isMarried
        data.value.email = email
        data.value.telephone = telephone
    }

    return {
        data,
        saveStep1,
        saveStep2
    }
})