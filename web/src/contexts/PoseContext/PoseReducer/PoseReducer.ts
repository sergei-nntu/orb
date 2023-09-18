// eslint-disable-next-line
function reducer(state: any, action: any) {
    switch (action.type) {
        case "foo":
            return {
                open: true,
                severity: "info",
                message: "It's your pofile avatar, Dear User!"
            };
        default:
            return {};
    }
}

export default reducer;