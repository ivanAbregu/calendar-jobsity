import moment from 'moment';
import {API_URL,
        APPID,
        ADD_REMINDER,
        DELETE_REMINDER,
        UPDATE_REMINDER
    } from "../Const"

const parseWeather = (data, time) =>{
 let result = data && data.list?
    data.list.find(item => moment(item.dt_txt).isSame(time,'day'))
    :""
 return result;

}

export const onAddReminder = obj => {
    return dispatch => {
        let url = `${API_URL}?q=${obj.city}&APPID=${APPID}`;
        console.log("url", url)
        return fetch(url, {})
            .then(res => res.json())
            .then(resp => {
                let result = {
                    type: ADD_REMINDER,
                    obj,
                }
                if(resp.cod==="200")
                    result.weather = parseWeather(resp, obj.time);
                return dispatch(result)
            })
        }
};

export const onEditReminder = (obj,time) => {
    return { type: UPDATE_REMINDER, obj, time}
};

export const onDeleteReminder = (time) => {
    return { type: DELETE_REMINDER,time}
};