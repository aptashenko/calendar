<template>
  <div class="the-calendar">
    <calendar-header
      v-model:year="year"
      v-model:month="month"
      v-model:categories="categories"
    />
    <calendar-desk
      :year="year"
      :month="month"
      :events="filteredEvents"
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
import {eventCategories} from "@/common/static/defaultStates";

const year = ref(new Date().getFullYear())
const month = ref(months[new Date().getMonth()])
const categories = ref(eventCategories.map(item => item.name))
const { getEvents, allEvents } = useFetchEvents();

const filteredEvents = computed(() => allEvents.value?.filter(item => filteredCategoriesIds.value.includes(item.categoryId)))

const filteredCategoriesIds = computed(() => eventCategories.map(item => categories.value.includes(item.name) ? item.id : null).filter(item => item))

watchEffect(getEvents)
</script>

<style lang="scss" scoped>
.the-calendar {
  height: 100%;
}
</style>
