<template>
  <div class="ed-event">
    <p>
      Навчання: {{item.name}}
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
.ed-event {

  & p {
    font-size: 12px;
    text-align: center;
    background: orange;
    color: white;
    border-radius: 5px;
  }
}
</style>
