<template>
  <div class="the-calendar">
    <calendar-header
      v-model:year="year"
      v-model:month="month"
    />
    <calendar-desk
      :year="year"
      :month="selectedMonth"
    />
    <calendar-footer />
  </div>
</template>

<script setup>
import {computed, ref, watchEffect} from "vue";
import {months} from "@/common/static/months";
import CalendarHeader from "@/components/calendar/CalendarHeader.vue";
import CalendarFooter from "@/components/calendar/CalendarFooter.vue";
import {useFetchEvents} from "@/composables/useFetchEvents";

const year = ref(new Date().getFullYear())
const month = ref(months[new Date().getMonth()])
const { getEvents } = useFetchEvents()

const selectedMonth = computed(() => months.indexOf(month.value))

watchEffect(getEvents)
</script>

<style lang="scss" scoped>
.the-calendar {
  height: 100%;
}
</style>
