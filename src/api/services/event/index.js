import {EVENT_URLS} from "@/api/services/event/enums.js";

export default api => ({
    getAllEvents: () => api.get(EVENT_URLS.allEvents),
    createEvent: data => api.post(EVENT_URLS.createEvent, data)
})
