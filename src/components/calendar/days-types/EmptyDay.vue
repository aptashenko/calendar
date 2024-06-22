<template>
  <div
    class="empty-day"
    @click="createEvent"
  >
    <span v-if="day.isCurrentMonth">{{ new Date(day.date).getDate() }}</span>
  </div>
</template>

<script setup>
import {useModals} from "@/composables/useModals";
const props = defineProps({
  day: {
    type: Object,
    required: true
  }
})

const { openCreateEventModal } = useModals()

const createEvent = () => {
  openCreateEventModal({start: props.day.date})
}
</script>

<style lang="scss" scoped>
.empty-day {
  position: relative;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;

  & span {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
  }
}
</style>
