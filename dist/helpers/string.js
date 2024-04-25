export const sanitizePath = (path) => path.toLowerCase().match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)
    ? path
    : "lumx-dapp";
export const createPathWithDashes = (path) => path.replace(/ /g, "-");
export const splitStringAfterSlash = (str) => {
    if (str && str.includes("/")) {
        return str.split("/")[1];
    }
    throw new Error("Invalid string");
};
