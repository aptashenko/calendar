import { baseRequest } from "@/api/instance.js";
import events from "@/api/services/event/index.js";
export const API = {
    events: events(baseRequest)
}
