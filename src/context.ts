import { createContext } from "react";
import uniqid from "uniqid"

export const ErrorsContext = createContext<IError[]>([])
export const ErrorsDispatchContext = createContext<React.Dispatch<any>>(()=>null);
export function errorsReducer(errors: IError[], action: ErrorAction) {
    switch (action.type) {
        case 'add': {
            return [...errors, {
                id: uniqid(),
                text: action.text,
                status: action.status
            }];
        }
        case 'remove': {
            return errors.filter(er => er.id !== action.id);
        }
        default: {
            throw Error('Unknown action');
        }
    }
}
