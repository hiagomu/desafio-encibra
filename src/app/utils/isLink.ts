export const isLink = (str: string): boolean => {
    const linkPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

    return linkPattern.test(str);
}