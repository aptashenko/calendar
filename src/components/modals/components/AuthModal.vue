<template>
  <div class="auth-modal">
    <h2 class="auth-modal__title">Please sign in first</h2>
    <v-btn color="blue-darken-4" @click="signIn">
      Sign in
    </v-btn>
  </div>
</template>

<script setup>
import {useModals} from "@/composables/useModals";
const signIn = () => {
  localStorage.setItem('token', import.meta.env.VITE_TOKEN);
  window.location.reload()
}


</script>

<style lang="scss" scoped>
.auth-modal {
  display: grid;
  place-items: center;

  width: 300px;
  height: 300px;
  background: #f5f5f5;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  &__title {
    color: #222222;
  }
}
</style>

