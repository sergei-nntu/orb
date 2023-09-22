import {NOTIFICATION} from "../../../constants";
import {INotification, NotificationActionType} from "../../../types/appTypes";

function reducer(state: INotification, action: NotificationActionType) {
    switch (action.type) {
        case NOTIFICATION.NO_MOVE_TO_POSITION:
            return {
                open: true,
                severity: "warning",
                message: "The robot cannot move to this position!"
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