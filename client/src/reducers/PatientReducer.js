import { DEFAULT_QUESTION, CUSTOM_QUESTIONS, QUESTIONS, PATIENT_DETAILS, PATIENT_DATA, PATIENT_PROVIDER_INFO } from '../actions/types';

const INITIAL_STATE = {
    defaultQuestion : [],
    customQuestions : [],
}


export default (state = INITIAL_STATE, action) => {
    console.log("Patient reducer : " , action);

    switch (action.type) {
        case QUESTIONS : 
            return { 
                defaultQuestion: action.payload.defaultQuestion , 
                customQuestions: action.payload.customQuestions
            };
        case DEFAULT_QUESTION:
            return {defaultQuestion : action.payload.defaultQuestion };
        case CUSTOM_QUESTIONS:
            return { customQuestions : action.payload.customQuestions };
        case PATIENT_DETAILS:
            return {...state, patientInfo: action.payload.patientInfo, userInfo : action.payload.userInfo, patientData : action.payload.patientData }
        case PATIENT_DATA :
        console.log("Patient reducer, patient data : " , action.payload);
            return  {...state, ...action.payload }
        case PATIENT_PROVIDER_INFO :
        console.log("Patient reducer, physician info" , action.payload);
            return { ...state, physicianInfo : action.payload.physicianInfo }
        default:
            return state;
    }
};