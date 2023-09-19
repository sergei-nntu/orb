import {NOTIFICATION} from "../../../constants";

// FIXME: write types in future
// eslint-disable-next-line
function reducer(state: any, action: any) {
    switch (action.type) {
        case NOTIFICATION.TEST:
            return {
                open: true,
                severity: "warning",
                message: "Test, notification!"
            };
        case NOTIFICATION.HIDE:
            return {
                ...state,
                open: false
            };
        default:
            return {
                open: true,
                severity: "error",
                message: "Ops, something went wrong! Please sorry!"
            };
    }
}

export default reducer;