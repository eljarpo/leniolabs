export const updatedObject = (oldObject, updatedProperities) => {
    return {
        ...oldObject,
        ...updatedProperities
    }
}