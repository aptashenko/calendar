<template>
  <div
    class="empty-day"
    :class="{disabled: !day.isCurrentMonth}"
    @click="createEvent"
  >
    <span v-if="day.isCurrentMonth">
      {{ new Date(day.date).getDate() }}
    </span>
    <ul v-if="events?.length" class="empty-day__list">
      <event-item
        v-for="event of events"
      >
        <component
          :is="setComponent(event.categoryId)"
          :key="event?.id"
          :item="event"
        />
      </event-item>
    </ul>
  </div>
</template>

<script setup>
import {useModals} from "@/composables/useModals";
import EventItem from "@/components/calendar/events/EventItem.vue";
import {eventCategories} from "@/common/static/defaultStates";
import {defineAsyncComponent} from "vue";
const props = defineProps({
  day: {
    type: Object,
    required: true
  },
  events: {
    type: Array
  }
})

const { openCreateEventModal } = useModals();
const setComponent = id => {
  const component = eventCategories.find(item => item.id === id).component;

  return defineAsyncComponent(() => import(`../events/components/${component}.vue`))
};
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
  padding: 30px 10px 10px;

  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  & span {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
  }

  &__list {
    position: absolute;
    top: 30px;
    padding: 0 10px 20px;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    height: 75%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
