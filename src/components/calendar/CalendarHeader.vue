<template>
  <div class="the-header">
    <div class="the-header__datepicker">
      <v-select
        label="Year"
        v-model="year"
        :items="yearsList"
        style="flex-basis: 40%"
        variant="solo"
        class="date-year"
      />
      <v-select
        label="Month"
        v-model="month"
        :items="months"
        item-title="label"
        item-value="id"
        style="flex-basis: 60%"
        variant="solo"
        class="date-month"
      />
    </div>

    <v-btn v-if="isAuth" color="blue-darken-4" @click="logOut">
      Logout
    </v-btn>
  </div>
</template>

<script setup>
import { months } from "@/common/static/months";
import {ref} from "vue";
const year = defineModel('year');
const month = defineModel('month');

const yearsList = Array.from({length: 20}, (_, idx) => (2024 - idx));
const isAuth = ref(localStorage.getItem('token'))
const logOut = () => {
  localStorage.removeItem('token');
  window.location.reload()
}
</script>

<style lang="scss">
.the-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;

  &__datepicker {
    display: flex;
    align-items: center;
    max-width: 300px;
    flex: 1;
  }
}
</style>
