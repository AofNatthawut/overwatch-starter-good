/**
 * Translates Thai keywords to multiple languages for international coordination.
 * @param {string} text The Thai text to be translated.
 * @returns {Object} An object containing translations in various languages.
 */
function translateAll(text) {
    if (!text) return { TH: text };

    const dictionary = {
        'ไฟไหม้': { EN: 'Fire', JP: '火災 (Kasai)', CN: '火灾 (Huǒzāi)', FR: 'Incendie' },
        'ระเบิด': { EN: 'Explosion', JP: '爆発 (Bakuhatsu)', CN: '爆炸 (Bàozhà)', FR: 'Explosion' },
        'ชน': { EN: 'Crash', JP: '衝突 (Shōtotsu)', CN: '撞车 (Zhuàngchē)', FR: 'Collision' },
        'อุบัติเหตุ': { EN: 'Accident', JP: '事故 (Jiko)', CN: '事故 (Shìgù)', FR: 'Accident' },
        'น้ำท่วม': { EN: 'Flood', JP: '洪水 (Kōzui)', CN: '洪水 (Hóngshuǐ)', FR: 'Inondation' }
    };

    const languages = ['EN', 'JP', 'CN', 'FR'];
    const results = { TH: text };

    languages.forEach(lang => {
        let translatedText = text;
        Object.keys(dictionary).forEach(thaiKey => {
            const regex = new RegExp(thaiKey, 'g');
            translatedText = translatedText.replace(regex, dictionary[thaiKey][lang]);
        });
        results[lang] = translatedText;
    });

    return results;
}

module.exports = { translateAll };
