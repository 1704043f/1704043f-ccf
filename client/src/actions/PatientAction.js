import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import _ from 'lodash';
import history from '../history'
import { QUESTIONS, PATIENT_DETAILS, PATIENT_DATA, PATIENT_DATA_FAIL, PATIENT_PROVIDER_INFO, SUBMIT_QUESTIONNAIRES, ERROR_SUBMIT_QUESTIONNAIRES,
    SUCCESS_EDIT_ACTIVE_STATUS, ERROR_EDIT_ACTIVE_STATUS, ACTIVE_USER } from './types';

    const moment = extendMoment(Moment);
export const fetchPatientData = () => {
    const user = localStorage.getItem('patient_data_id') ? localStorage.getItem('patient_data_id') : '';
    const url = `/api/patient_data/${user}`
    const request = axios.get(url);

    return(dispatch) => {
        let currentEpisode, latestEpisode, latestEpisodeLastDate, latestEpisodeLastTime;
        if(user){

            request.then( res => {
                console.log("patient data : ", res.data);
                latestEpisode = res.data[0].episodes[res.data[0].episodes.length - 1];
                latestEpisodeLastDate = moment(latestEpisode.end_date, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
                console.log("latest epi last date : ", latestEpisodeLastDate);
                latestEpisodeLastTime = moment(latestEpisode.end_time, "HHmm");
                console.log("latest epi last time : ", moment(moment(),"HHmm"), latestEpisodeLastTime);
                if (moment(moment(), 'YYYY-MM-DDTHH:mm:ss.SSSZ').isBefore(latestEpisodeLastDate)){
                    if(moment(moment(), "HHmm").isBefore(latestEpisodeLastTime)){
                        console.log("is before today")
                        currentEpisode = latestEpisode;
                    }else{
                        console.log("pass today")
                        currentEpisode = {};
                    }
                }
                dispatch({
                    type :  PATIENT_DATA,
                    payload : {
                        patient_data_id : res.data[0]._id,
                        patient_info_id: res.data[0].patient_info_id,
                        episodes : res.data[0].episodes,
                        patientDataID : res.data[0]._id,
                        currentEpisode: currentEpisode,
                        latestEpisode : latestEpisode,
                        closest: getClosestDateTime(res.data[0].episodes[res.data[0].episodes.length - 1]),
                    }
                })
            }, err => {dispatch({
                type: PATIENT_DATA_FAIL,
                payload: 'no user found'
            })})
        }else{
            dispatch({
                type: PATIENT_DATA_FAIL,
                payload: 'no user found'
            })
        }

    }
}
export const fetchQuestions = () => {

     const url = `/api/question_default`
    const request = axios.get(url);
    let defaultQ = [];
    return(dispatch) => {
        request.then( res => {
            defaultQ = res.data;
        }).then(
            axios.get('/api/question_custom').then( res => {
                dispatch({
                    type: QUESTIONS,
                    payload: {customQuestions : res.data, defaultQuestion : defaultQ }
                })
            })
        )
    }
}
export const fetchProviderInfo = () => {
    //console.log("fetching provider info")
    const providerID = localStorage.getItem('patientProviderID') ? localStorage.getItem('patientProviderID') : '';

    const url = `/api/provider/${providerID}`;
    const request = axios.get(url);
    return (dispatch) => {
        request.then( res => {
            //console.log("Fetched provider info : ", res.data)
            dispatch({
                type: PATIENT_PROVIDER_INFO,
                payload : {
                    physicianInfo : res.data,

                }
            })
        })
    }
}

export const submitForm = (id,epi, rec_id, new_status, objQuestionnaire ) => {
    console.log("submitForm ", objQuestionnaire);
    const url = `/api/patient_data/editRecord/${id}/${epi}/${rec_id}/${new_status}`;
    const request = axios.put(url, objQuestionnaire);

    return (dispatch) => {
        request.then( res => {
            dispatch({
                type : SUBMIT_QUESTIONNAIRES,
                payload : "Thank you for filling out the questionnaires!"
            })
        }, err => {
            dispatch({
                type : ERROR_SUBMIT_QUESTIONNAIRES,
                payload : err,
            })
        })
    }
}

export const findActiveByID = (id) => {
    const url = `/api/active/${id}`;
    const request = axios.get(url);
    return (dispatch) => {
        request.then( res => {
            console.log("getting active collection successfully! : ", res.data);
            dispatch({
                type: ACTIVE_USER,
                payload : {active : res.data}
            })
        }, err => {
            console.log("Error getting active collection : ", err);
        })
    }
}

export const editActiveStatus = (id, status) => {
    const url = `/api/active/${id}`;
    const request = axios.put(url, status);
    return (dispatch) => {
        request.then(res => {
            console.log("successfully edit active status : ", res.data);
            dispatch({
                type: SUCCESS_EDIT_ACTIVE_STATUS,
                payload : 'edited active status'
            })
        }, err => {
            console.log("failed setting active status : ", err);
            dispatch({
                type : ERROR_EDIT_ACTIVE_STATUS,
                payload : 'failed to edit active status'
            });
        })
    }

}

function closestEntry(curr){
    let today = moment().utc();
    console.log("Today : " + today);

}

function getClosestDateTime(currentEpisode) {
    console.log("current episode :  " , currentEpisode);

    let today = moment().utc();
    let todayTime = moment().format("HH:mm");
    let setTimeBeforeToday = moment(moment().format('YYYY-MM-DD') + " " + moment(currentEpisode.start_time, "HHmm").format("HH:mm")).format("YYYY-MM-DDTHH:mm");
    let setTimeAfterToday = moment(moment().format('YYYY-MM-DD') + " " + moment(currentEpisode.end_time, "HHmm").format("HH:mm")).format("YYYY-MM-DDTHH:mm");
    let newTime = moment().format("YYYY-MM-DDTHH:mm");
    console.log("start and end date : ", moment( ), moment(currentEpisode.start_date), moment(currentEpisode.end_date));
    console.log("start and end time : ", setTimeBeforeToday, setTimeAfterToday);
    let range = moment().range(moment(currentEpisode.start_date), moment(currentEpisode.end_date));
    console.log("Range : ", range.toString());

    let timeInrange = moment(newTime, "YYYY-MM-DDTHH:mm").isBetween(moment(setTimeBeforeToday, "YYYY-MM-DDTHH:mm"), moment(setTimeAfterToday, "YYYY-MM-DDTHH:mm"), null, '[]');
    console.log(`date in range ? ${range} , time in range ? ${timeInrange}`)
    if (timeInrange) {
        console.log("proceed to check for the closest time", currentEpisode.records);
        let newObj = _.mapKeys(currentEpisode.records, 'record_number');
        let closestTime = Infinity, closest = {};
        newObj = _.filter(newObj, (o) => {
            return (o.valid === false && moment(o.scheduled_datetime).isSame(moment(), 'd'));
        });
        console.log("new obj : ", newObj);

        newObj.forEach((d) => {
            console.log(moment(d.scheduled_datetime, "YYYY-MM-DDTHH:mm"));
            console.log(moment(moment(), "YYYY-MM-DDTHH:mm"));
            console.log("here : ", Math.abs(moment(d.scheduled_datetime, "YYYY-MM-DDTHH:mm").diff(moment(moment(), "YYYY-MM-DDTHH:mm"), 'minutes')));
            console.log(closestTime);
            if (Math.abs(moment(d.scheduled_datetime, "YYYY-MM-DDTHH:mm").diff(moment(moment(), "YYYY-MM-DDTHH:mm"), 'minutes')) < closestTime) {

                closestTime = Math.abs(moment(d.scheduled_datetime, "YYYY-MM-DDTHH:mm").diff(moment(moment(), "YYYY-MM-DDTHH:mm"), 'minutes'));
                console.log("closest time : " + closestTime);
                if(closestTime <= currentEpisode.margin_mins ){
                    closest = d;
                    closest.in_future = false;
                }else{
                    closest = d;
                    closest.in_future = true;
                }
            }
        })
        console.log("Closest entry : ", closest);
        return closest;

    } else {
        console.log("past the range");
        return null


    }
}