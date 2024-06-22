<template>
  <v-app>
    <v-main>
      <calendar />
    </v-main>
  </v-app>
  <teleport to="body">
    <base-modal-component
      v-if="globalModalState.component"
    />
  </teleport>
</template>

<script setup>
import Calendar from "@/components/calendar/index.vue";
import {ref} from "vue";
import BaseModalComponent from "@/components/modals/BaseModalComponent.vue";
import {useModals} from "@/composables/useModals";

const { globalModalState, openAuthModal } = useModals()
const isAuth = ref(localStorage.getItem('token'))

if (!isAuth.value) openAuthModal()
</script>
