<template>
  <div class="holiday-event">
    <p>
      Свято: {{item.name}}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.holiday-event {

  & p {
    font-size: 12px;
    text-align: center;
    background: tomato;
    color: white;
    border-radius: 5px;
  }
}
</style>
