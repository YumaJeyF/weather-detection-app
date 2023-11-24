export function  toTextualDescription(degree){
    if (degree>337.5) return 'cеверный';
    if (degree>292.5) return 'северо-западный';
    if (degree>247.5) return 'cеверо-западный';
    if (degree>202.5) return 'юго-западный';
    if (degree>157.5) return 'южный';
    if (degree>122.5) return 'юго-восточный';
    if (degree>67.5) return 'восточный';
    if (degree>22.5) return 'северо-восточный';
    return 'северный';
}