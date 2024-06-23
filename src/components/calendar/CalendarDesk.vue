<template>
  <div class="calendar-desk">
    <div class="calendar-desk__header">
      <div class="calendar-desk__day-name" v-for="day in dayNames" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-desk__grid">
      <EmptyDay
        v-for="(day, index) in days"
        :key="index"
        :day="day"
        :events="findDate(day)"
      />
    </div>
  </div>
</template>

<script setup>
import EmptyDay from "@/components/calendar/days-types/EmptyDay.vue";
import {useDaysGrid} from "@/composables/useDaysGrid";
import {watch} from "vue";
import dayjs from "dayjs";

const props = defineProps({
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  month: {
    type: Number,
    default: new Date().getMonth() + 1,
  },
  events: {
    type: Array,
    default: () => []
  }
})

const findDate = date => props.events?.filter(item => dayjs(item.startDate).format('DD-MM-YYYY') === dayjs(date.date).format('DD-MM-YYYY'));

const { dayNames, days, setDays } = useDaysGrid();

watch(() => [props.year, props.month], ([year, month]) => {
  setDays(month, year)
}, {immediate: true})

</script>

<style lang="scss" scoped>
.calendar-desk {
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

  &__day-name {
    color: #333;
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
