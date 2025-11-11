const API_KEY = "D7AC672C2129A1C432C40B73ECF12CEE";
const URL = "https://opendict.korean.go.kr/api/search";

async function fetchWords(query, pos="1,2,3,5,6,8,15,16,17,18,21") {
    const API_URL = `${URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&req_type=json&part=word&num=num&advanced=y&type1=word&pos=${pos}`

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

        // 단어만 추출
        const words = items.map(item => [item.word, item.sense[0].definition]);
        console.log("단어 수: ", words.length);
        console.log(words);

        return words;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// fetchWords("사과");