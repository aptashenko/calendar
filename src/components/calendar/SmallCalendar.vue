<template>
  <div class="small-calendar">
    <div class="small-calendar__header">
      <div class="small-calendar__day-name" v-for="day in dayNames" :key="day">{{ day }}</div>
    </div>
    <div class="small-calendar__grid">
      <div v-for="day of days">
        <span v-if="day.isCurrentMonth">
          {{new Date(day.date).getDate()}}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useDaysGrid} from "@/composables/useDaysGrid";
import {ref} from "vue";

const { daysGrid, dayNames } = useDaysGrid();
const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)

const days = daysGrid({month: month.value, year: year.value})
</script>

<style lang="scss" scoped>
.small-calendar {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &__header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: #f5f5f5;
    text-align: center;
    font-weight: bold;
    padding: 10px 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background-color: #dddddd;
  }
}
</style>
