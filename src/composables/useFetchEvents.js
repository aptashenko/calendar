import {ref} from "vue";
import {API} from "@/api";
import {fi} from "vuetify/locale";

const loading = ref(false)
const allEvents = ref(null)
export function useFetchEvents () {

  const getEvents = async () => {
    loading.value = true;
    try {
      const { data, status } = await API.events.getAllEvents();
      if (status === 200) {
        allEvents.value = data;
      }
    } catch(err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createEvent = async (payload) => {
    const body = {
      ...payload,
      endDate: payload.endDate ? new Date(payload.endDate).toISOString() : null,
      startDate: new Date(payload.startDate).toISOString()
    }

    loading.value = true;

    try {

      const { data , status } = await API.events.createEvent(body);
      if (status === 200) getEvents()

    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    allEvents,
    getEvents,
    createEvent,
    loading
  }
}
