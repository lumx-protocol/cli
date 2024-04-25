export const sanitizePath = (path) => path.toLowerCase().match(/^[a-zA-Z0-9]*$/) ? path : "lumx-dapp";
export const createPathWithDashes = (path) => path.replace(/ /g, "-");
