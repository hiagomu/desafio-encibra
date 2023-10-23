export const formatDate = (date: Date | undefined): string => {
    const dateParts = String(date).split("T");
    return dateParts[0];
}