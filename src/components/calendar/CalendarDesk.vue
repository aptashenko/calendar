<template>
  <div class="calendar-desk">
    <div class="calendar-desk__header">
      <div class="calendar-desk__day-name" v-for="day in dayNames" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-desk__grid">
      <template v-if="type === 'desk'">
        <component
          v-for="(day, index) in days"
          :is="components[DAY_TYPES.empty]"
          :key="index"
          :day="day"
        />
      </template>
      <template v-if="type === 'small'">
        <div
          v-for="day in days"
          class="calendar-desk__small-date"
          :class="{active: day.isCurrentMonth}"
          @click="setDate(day.date)"
        >
          <span v-if="day.isCurrentMonth">{{new Date(day.date).getDate()}}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>

import EmptyDay from "@/components/calendar/days-types/EmptyDay.vue";
const components = { EmptyDay }

import { DAY_TYPES } from "@/components/calendar/days-types/enums";
import {useDaysGrid} from "@/composables/useDaysGrid";
import {computed} from "vue";

const props = defineProps({
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  month: {
    type: Number,
    default: new Date().getMonth() + 1,
  },
  type: {
    type: String,
    default: 'desk'
  }
})

const emit = defineEmits(['set-date'])

const { daysGrid, dayNames } = useDaysGrid();

const formattedMonth = computed(() => props.type === 'small' ? props.month - 1 : props.month)

const days = daysGrid({month: formattedMonth.value, year: props.year})

const setDate = date => {
  emit('set-date', date)
}
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
