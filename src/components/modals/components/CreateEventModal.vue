<template>
  <div class="create-event" @click="closeDatePicker">
    <v-form @submit.prevent="onSubmit" class="create-event__form">
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
      <v-select
        v-model="form.categoryId"
        color="black"
        class="text-black"
        :items="eventCategories"
        item-title="name"
        item-value="id"
        variant="outlined"
        label="Category*"
      />
      <div @click.stop="openDatePicker">
        <v-text-field
          v-model="form.endDate"
          color="black"
          disabled
          class="text-black"
          variant="outlined"
          placeholder="DD-MM-YYYY"
          label="End date"
        />
      </div>
      <v-btn class="mt-2" type="submit" :disabled="!enableCta" block>Create</v-btn>
    </v-form>
    <transition name="fade" mode="out-in">
      <date-picker
        v-if="isToggled"
        @set-date="setEndDate"
        class="create-event__date-picker"
        :start-date="form.startDate"
        @close="closeDatePicker"
        @click.stop
      />
    </transition>
  </div>
</template>

<script setup>
import {createEventForm, eventCategories} from "@/common/static/defaultStates";
import {computed, onMounted, reactive, ref} from "vue";
import DatePicker from "@/components/shared/DatePicker.vue";
import {useToggle} from "@/composables/useToggle";
import {useFetchEvents} from "@/composables/useFetchEvents";
import {useModals} from "@/composables/useModals";

const props = defineProps({
  start: {
    type: String
  }
})

const { isToggled, toggle:openDatePicker } = useToggle()
const { createEvent } = useFetchEvents();
const { toggleComponent } = useModals();
const closeDatePicker = () => {
  isToggled.value = false
}
const form = reactive({...createEventForm});
const rules = [
  value => {
    if (value) { return true }
    return 'This field is required'
  },
];

const enableCta = computed(() => !!form.name && !!form.startDate && !!form.categoryId)
const setStartDate = () => {
  if (!props.start) return
  form.startDate = props.start
}
const setEndDate = date => {
  if (form.startDate > date) return
  form.endDate = date;
}

const onSubmit = () => {
  createEvent(form);
  toggleComponent()
}

onMounted(setStartDate)
</script>

<style lang="scss">
@import "@/assets/styles/animations.scss";

.create-event {
  z-index: 2;

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

  &__date-picker {
    position: absolute;
    top: 0;
    left: 100%;
    z-index: -1;
  }
}
</style>
