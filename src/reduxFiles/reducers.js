export const changeProfileOnClick = (state = "", action) => {

    const{type} = action;
    switch(type){
        case 'PROFILE_EDIT_CLICKED':
            return state + action.payload.fullName;
        default:
            return state;
    }

}