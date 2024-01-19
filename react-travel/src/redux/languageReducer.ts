import i18n from "i18next";

export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

export interface languageState {
    currentLanguage: string;
    languageList: { name: string; code: string; }[];
}

const initial: languageState = {
    currentLanguage: "zh",
    languageList: [
        { name: "中文", code: "zh" },
        { name: "English", code: "en" },
    ],
}

interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE;
    payload: "zh" | "en";
}

interface AddLanguageAction {
    type: typeof ADD_LANGUAGE;
    payload: { name: string; code: string };
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (
    languageCode: "zh" | "en"
  ): ChangeLanguageAction => {
    return {
      type: CHANGE_LANGUAGE,
      payload: languageCode,
    };
  };
  
  export const addLanguageActionCreator = (
    name: string,
    code: string
  ): AddLanguageAction => {
    return {
      type: ADD_LANGUAGE,
      payload: { name, code },
    };
  };
  

export default function languageReducer(state = initial, action: LanguageActionTypes) {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload);
            return {
                ...state,
                currentLanguage: action.payload
            }
        case ADD_LANGUAGE:
            return {
                ...state,
                languageList: [...state.languageList, action.payload],
            };
        default:
            return state;
    }
} 