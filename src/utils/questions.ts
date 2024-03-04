const questions = [
  {
    type: "input",
    name: "pageTitle",
    message: "What's the title of your project?",
  },
  {
    type: "input",
    name: "pageDescription",
    message: "What's the description of your project?",
  },
  {
    type: "input",
    name: "apiKey",
    message: `What's your apiKey? You can get it at https://docs.lumx.io/api-reference/v1/account/get-an-api-key)
    `,
    validate: (input: string) =>
      input.length != 73 ? "Please enter a valid apiKey" : true,
  },
  {
    type: "input",
    name: "clientId",
    message: `What's your clientId?
    `,
    validate: (input: string) =>
      input.length != 36
        ? "Please enter a valid clientId (UUID). You can get it at https://docs.lumx.io/api-reference/v1/account/get-account)"
        : true,
  },
  {
    type: "input",
    name: "contractId",
    message: "What's the contractId?",
    validate: (input: string) =>
      input.length != 36
        ? "Please enter a valid contractId. You can get it at https://docs.lumx.io/api-reference/v1/contracts/read-all-contracts"
        : true,
  },
  {
    type: "input",
    name: "itemTypeId",
    message: "What's the itemTypeId?",
    validate: (input: string) =>
      input.length != 36
        ? "Please enter a valid itemTypeId. You can get it at https://docs.lumx.io/api-reference/v1/contracts/read-all-item-types-of-a-given-contract"
        : true,
  },
  {
    type: "list",
    name: "journey",
    message: "Do you want to start your Web3 journey?",
    choices: ["Of course!", "Yes, please!", "Hell yeah!"],
  },
];

export { questions };
