export const CloudFoundryParameters = {
    guid: {
        displayName: "Application Guid",
        description: "guid of Cloud Foundry application",
        pattern: /^.+$/,
        validInput: "a valid Cloud Foundry application guid",
        minLength: 1,
        maxLength: 100,
        required: true,
    },
};
