<template>
  <div class="conf-event">
    <p>
      Конференція: {{item.name}}
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
.conf-event {

  & p {
    font-size: 12px;
    text-align: center;
    background: green;
    color: white;
    border-radius: 5px;
  }
}
</style>
