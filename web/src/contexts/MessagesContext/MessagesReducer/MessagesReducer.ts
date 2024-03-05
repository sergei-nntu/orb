import { Reducer } from 'react';

import { IMessage } from '../../../types/appTypes';

interface State {
    messages: IMessage[];
}

interface Action {
    type: string;
    payload: {
        text: string;
        time: string;
    };
}

const ADD_MESSAGE = 'ADD_MESSAGE';

const MessagesReducer: Reducer<State, Action> = function (state, action) {
    switch (action.type) {
        case ADD_MESSAGE: {
            const newMessage: IMessage = {
                index: state.messages.length,
                text: action.payload.text,
                time: action.payload.time,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }
        default:
            return state;
    }
};
export { ADD_MESSAGE, MessagesReducer };
