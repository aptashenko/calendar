<template>
  <div class="date-picker">
    <div class="date-picker__dates">
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
    <div class="date-picker__header">
      <div class="date-picker__day-name" v-for="day in dayNames" :key="day">{{ day }}</div>
    </div>
    <div class="date-picker__grid">
      <div
        v-for="day in days"
        class="date-picker__small-date"
        :class="[{active: day.isCurrentMonth && dayjs(day.date) >= dayjs(startDate)}, {disabled: dayjs(day.date) < dayjs(startDate)}]"
        @click="setDate(day.date)"
      >
        <span v-if="day.isCurrentMonth">{{new Date(day.date).getDate()}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useDaysGrid} from "@/composables/useDaysGrid";
import {ref, watch} from "vue";
import { months } from "@/common/static/months";
import dayjs from "dayjs";

const { days, setDays, dayNames } = useDaysGrid();

const emit = defineEmits(['set-date', 'close']);
defineProps({
  startDate: {
    type: [String, Object]
  }
})

const yearsList = Array.from({length: 20}, (_, idx) => (2024 - idx));
const year = ref(new Date().getFullYear())
const month = ref(months[new Date().getMonth()])


watch(() => [year.value, month.value], ([year, month]) => {
  setDays(month, year)
}, {immediate: true})

const setDate = date => {
  emit('set-date', date);
  emit('close')
}
</script>

<style lang="scss" scoped>
.date-picker {
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
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  &__header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: #f5f5f5;
    text-align: center;
    font-weight: bold;
    padding: 10px 0;
  }

  &__day-name {
    color: #333;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background-color: #e1e1e1;
  }

  &__small-date {
    color: black;
    text-align: center;
    background: #fff;

    cursor: pointer;

    border-radius: 5px;
    border: 1px solid transparent;
    transition: all .25s ease;
    pointer-events: none;

    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    &.active {
      pointer-events: auto;
      &:hover {
        border: 1px solid #000;
        font-weight: 800;
      }
    }
  }

}

</style>
