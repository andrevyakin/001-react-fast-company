export function convertToArray(objOrArr) {
    return Array.isArray(objOrArr) ? objOrArr : Object.values(objOrArr);
}
