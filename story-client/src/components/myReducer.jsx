export default function myReducerState (state, action) {
    switch(action.type) {
        case 'update': 
            return {...state, placeholder: action.placeholder};
    }
}