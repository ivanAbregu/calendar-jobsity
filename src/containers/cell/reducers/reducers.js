import {ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER} from "../Const"

const initialState = {
    reminders: [],
    weathers: [],
};

export const reducer = (state=initialState, action) => {

    let data = state;
    let result = []
    switch (action.type) {

        case ADD_REMINDER:

            return {...data,
            weathers: action.weather?
                [action.weather, ...state.weathers]:
                [...state.weathers],
            reminders: [action.obj, ...state.reminders] };

        case UPDATE_REMINDER:
            result = data.reminders.filter(item => !item.time.isSame(action.time));
            return {...data, reminders: [action.obj, ...result] };

        case DELETE_REMINDER:
           result = data.reminders.filter(item => !item.time.isSame(action.time));
            return {...data, reminders: [...result] };

        default:
            return state;
    }
}

