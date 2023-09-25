import {NOTIFICATION} from "../../../types/appTypes";
import {ConsoleMessage, INotification, NotificationActionType} from "../../../types/appTypes";

function reducer(state: INotification, action: NotificationActionType) {
    switch (action.type) {
        case NOTIFICATION.NO_MOVE_TO_POSITION:
            return {
                open: action.open,
                severity: "warning",
                message: "The robot cannot move to this position!",
                console: {
                    message: ConsoleMessage.NO_MOVE_TO_POSITION
                }
            };
        case NOTIFICATION.SUCCESS_PLANNING:
            return {
                open: action.open,
                severity: "success",
                message: "Changed start state",
                console: {
                    message: ConsoleMessage.SUCCESS_PLANNING
                }
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