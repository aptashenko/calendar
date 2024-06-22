<template>
  <div
    class="overlay"
    :class="[backgroundColor]"
    aria-modal="true"
    role="dialog"
    tabindex="-1"
    @click.self="handleSelfClick"
  >
    <transition
      v-bind="globalModalState.props.transition"
      @after-leave="closeModal"
    >
      <component
        v-if="globalModalState.showContent"
        :is="globalModalState.component"
        v-bind="globalModalState.props"
      />
    </transition>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted} from "vue";
import {useModals} from "@/composables/useModals";

const { closeModal, globalModalState, toggleComponent } = useModals();
const keydownListener = event => {
  if (event.key === "Escape") toggleComponent();
}

const handleSelfClick = () => {
  if (globalModalState.props.selfClick) toggleComponent()
}

onMounted(() => {
  document.addEventListener("keydown", keydownListener);
  toggleComponent()
});

onUnmounted(() => {
  document.removeEventListener("keydown", keydownListener);
});

const backgroundColor = computed(() => ({
  transparent: 'transparent',
  dark: 'dark',
  blur: 'blur'
})[globalModalState.props.background])

</script>

<style lang="scss" scoped>
@import "@/assets/styles/animations.scss";
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;

  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &.transparent {
    background: transparent;
  }
  &.dark {
    background: rgba(54, 58, 68, 0.4);
  }
  &.blur {
    backdrop-filter: blur(5px);
  }
}

</style>
