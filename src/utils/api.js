const API_KEY = "D7AC672C2129A1C432C40B73ECF12CEE";
const URL = "https://opendict.korean.go.kr/api/search";

export async function fetchWords(query, method="exact") {
    const API_URL = `${URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&req_type=json&part=word&advanced=y&method=${method}&type1=word&type3=general,ancient&pos=1,5,6`;

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        let items;

        if (data.channel && data.channel.item) {
            items = data.channel.item;
        } else {
            items = [];
        }

        return items;
    } catch (error) {
        console.error(error);
        return [];
    }
}