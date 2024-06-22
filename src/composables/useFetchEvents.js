import {ref} from "vue";
import {API} from "@/api";

const allEvents = ref(null)
export function useFetchEvents () {

  const getEvents = async () => {
    try {
      const { data, status } = await API.events.getAllEvents();
      if (status === 200) {
        console.log(data)
      }
    } catch(err) {
      console.error(err)
    }
  }

  return {
    getEvents
  }
}
