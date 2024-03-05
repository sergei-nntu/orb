import { Reducer } from 'react';

import { NOTIFICATION } from '../../../types/appTypes';
import { INotification, NotificationActionType } from '../../../types/appTypes';

const reducer: Reducer<INotification, NotificationActionType> = function (state, action) {
    switch (action.type) {
        case NOTIFICATION.NO_MOVE_TO_POSITION:
            return {
                open: action.open,
                severity: 'warning',
                message: 'The robot cannot move to this position!',
            };
        case NOTIFICATION.SUCCESS_PLANNING:
            return {
                open: action.open,
                severity: 'success',
                message: 'Changed start state',
            };
        case NOTIFICATION.NO_BLOCKLY_PROGRAM:
            return {
                open: action.open,
                severity: 'warning',
                message: 'Please, build program by putting blocks into workspace to run it!',
            };
        case NOTIFICATION.SAVE_BLOCKLY:
            return {
                open: action.open,
                severity: 'success',
                message: 'The program state has been saved!',
            };
        case NOTIFICATION.RUN_BLOCKLY:
            return {
                open: action.open,
                severity: 'success',
                message: 'The program has been running!',
            };
        case NOTIFICATION.STOP_BLOCKLY:
            return {
                open: action.open,
                severity: 'success',
                message: 'The program has been stopped!',
            };
        case NOTIFICATION.BLOCKLY_IS_ALREADY_RUNNING:
            return {
                open: action.open,
                severity: 'warning',
                message: 'The program is already running!',
            };
        case NOTIFICATION.BLOCKLY_IS_STOPPED:
            return {
                open: action.open,
                severity: 'warning',
                message: "The program isn't running now!",
            };
        case NOTIFICATION.BLOCKLY_WITHOUT_SERVER:
            return {
                open: action.open,
                severity: 'warning',
                message: 'Using Blockly requires connecting to the server to run or save blocks',
            };
        case NOTIFICATION.GET_QR_CODE:
            return {
                open: action.open,
                severity: 'warning',
                message: 'Please note that access to the QR code requires an active connection to our server!',
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
            };
    }
};

export default reducer;
