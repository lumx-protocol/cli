async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function createJson(options: any) {
  const template = {
    language: "pt",
    addons: ["tokengating"],
  };

  const json = { ...template, ...options };

  return json;
}

export { sleep, createJson };
