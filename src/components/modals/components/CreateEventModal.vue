<template>
  <div class="create-event">
    <v-form @submit.prevent class="create-event__form">
      <v-text-field
        v-model="form.name"
        :rules="rules"
        color="black"
        class="text-black"
        variant="outlined"
        label="Event name*"
      />
      <v-text-field
        v-model="form.startDate"
        color="black"
        class="text-black"
        disabled
        variant="outlined"
        label="Start date*"
      />
      <v-text-field
        v-model="form.endDate"
        color="black"
        disabled
        class="text-black"
        variant="outlined"
        placeholder="DD-MM-YYYY"
        label="End date"
      />
      <v-btn class="mt-2" type="submit" :disabled="disableCta && form.name && form.startDate" block>Create</v-btn>
    </v-form>
    <calendar-desk type="small" @set-date="setEndDate" />
  </div>
</template>

<script setup>
import {createEventForm} from "@/common/static/defaultStates";
import {onMounted, reactive, ref} from "vue";
import dayjs from 'dayjs'
import SmallCalendar from "@/components/calendar/SmallCalendar.vue";
import CalendarDesk from "@/components/calendar/CalendarDesk.vue";

const props = defineProps({
  start: {
    type: String
  }
})

const disableCta = ref(true);

const form = reactive({...createEventForm});
const rules = [
  value => {
    if (value) {
      disableCta.value = false;
      return true
    }

    disableCta.value = true;
    return 'This field is required'
  },
];
const setStartDate = () => {
  if (!props.start) return
  form.startDate = dayjs(props.start).format('DD-MM-YYYY')
}
const setEndDate = date => {
  const formattedDate = dayjs(date).format('DD-MM-YYYY')
  if (form.startDate > formattedDate) return
  form.endDate = formattedDate;
}

onMounted(setStartDate)
</script>

<style lang="scss">
.create-event {
  display: grid;
  place-items: center;

  width: 300px;
  background: #f5f5f5;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;

  padding: 20px;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;


  &__form {
    width: 100% !important;
  }
}
</style>
