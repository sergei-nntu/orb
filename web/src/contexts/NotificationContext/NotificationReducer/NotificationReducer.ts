import { Reducer } from 'react';

import { NOTIFICATION } from '../../../types/appTypes';
import { CONSOLE_MESSAGE, INotification, NotificationActionType } from '../../../types/appTypes';

const reducer: Reducer<INotification, NotificationActionType> = function (state, action) {
    switch (action.type) {
        case NOTIFICATION.NO_MOVE_TO_POSITION:
            return {
                open: action.open,
                severity: 'warning',
                message: 'The robot cannot move to this position!',
                console: {
                    message: CONSOLE_MESSAGE.NO_MOVE_TO_POSITION,
                },
            };
        case NOTIFICATION.SUCCESS_PLANNING:
            return {
                open: action.open,
                severity: 'success',
                message: 'Changed start state',
                console: {
                    message: CONSOLE_MESSAGE.SUCCESS_PLANNING,
                },
            };
        case NOTIFICATION.NO_BLOCKLY_PROGRAM:
            return {
                open: action.open,
                severity: 'warning',
                message: 'Please, build program by putting blocks into workspace to run it!',
                // FIXME: the console shouldn't be necessary property
                console: {
                    message: '',
                },
            };
        case NOTIFICATION.SAVE_BLOCKLY:
            return {
                open: action.open,
                severity: 'success',
                message: 'The program state has been saved!',
                console: {
                    message: '',
                },
            };
        case NOTIFICATION.RUN_BLOCKLY:
            return {
                open: action.open,
                severity: 'success',
                message: 'The program has been running!',
                console: {
                    message: '',
                },
            };
        case NOTIFICATION.STOP_BLOCKLY:
            return {
                open: action.open,
                severity: 'success',
                message: 'The program has been stopped!',
                console: {
                    message: '',
                },
            };
        case NOTIFICATION.BLOCKLY_IS_ALREADY_RUNNING:
            return {
                open: action.open,
                severity: 'warning',
                message: 'The program is already running!',
                console: {
                    message: '',
                },
            };
        case NOTIFICATION.BLOCKLY_IS_STOPPED:
            return {
                open: action.open,
                severity: 'warning',
                message: "The program isn't running now!",
                console: {
                    message: '',
                },
            };
        case NOTIFICATION.GET_QR_CODE:
            return {
                open: action.open,
                severity: 'warning',
                message: 'Please note that access to the QR code requires an active connection to our server!',
                console: {
                    message: '',
                },
            };
        case NOTIFICATION.HIDE:
            return {
                ...state,
                open: false,
            };
        default:
            return {
                open: true,
                severity: 'error',
                message: 'Ops, something went wrong! Please sorry!',
                console: {
                    message: '',
                },
            };
    }
};

export default reducer;
