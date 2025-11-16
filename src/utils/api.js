import { API_CONSTANTS } from "../constants/apiConstants.js";

export async function fetchWords(query, method="exact") {
    const API_URL = `${API_CONSTANTS.API_DEFAULT_URL}?key=${API_CONSTANTS.API_KEY}&q=${encodeURIComponent(query)}&req_type=json&part=word&advanced=y&method=${method}&type1=word&type3=general&pos=1,5,6`;

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const items = (data.channel && data.channel.item) || [];
        return items;
    } catch (error) {
        console.error(error);
        return [];
    }
}