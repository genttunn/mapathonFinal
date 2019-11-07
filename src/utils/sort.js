let sortByGroup(pois, groupNum) {
    const result= pois.filter(poi => poi.content.poi.group == groupNum);
    return result;
} 

let sortByUser(pois, userEmail) {
    const result= pois.filter(poi => poi.content.poi.Creator.email == userEmail);
    return result;
} 

let sortByCategory(pois, category) {
    const result= pois.filter(poi => poi.content.poi.Categories.name == category);
    return result;
} 

export {sortByGroup, sortByCategory, sortByUser};