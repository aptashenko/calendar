<template>
  <v-app>
    <v-main>
      <calendar />
    </v-main>
  </v-app>
  <global-loader v-if="loading" />
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
import GlobalLoader from "@/components/ui/GlobalLoader.vue";
import {useFetchEvents} from "@/composables/useFetchEvents";

const { globalModalState, openAuthModal } = useModals();
const { loading } = useFetchEvents()
const isAuth = ref(localStorage.getItem('token'))

if (!isAuth.value) openAuthModal();
</script>
