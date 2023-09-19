import {NOTIFICATION} from "../../../constants";
import {INotification, NotificationActionType} from "../../../types/appTypes";

function reducer(state: INotification, action: NotificationActionType) {
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