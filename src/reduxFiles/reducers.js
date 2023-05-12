export const changeProfileOnClick = (state = "", action) => {

    const{type} = action;
    switch(type){
        case 'PROFILE_EDIT_CLICKED':
            return {...state, fullName: action.payload.fullName};
        case 'STATE_EDIT_CLICKED':
            return {...state, state: action.payload.state};
        case 'EMAIL_EDIT_CLICKED':
            return {...state, email: action.payload.email};
        case 'FAVORITECAMERA_EDIT_CLICKED':
            return {...state, favoriteCamera: action.payload.favoriteCamera}    
        case 'PROFILEPHOTO_EDIT_CLICKED':
            return {...state, photo: action.payload.photo}  
        default:
            return state;
    }

}