export const editName = fullName =>({
    type:'PROFILE_EDIT_CLICKED',
    payload:{fullName},
});

export const editEmail = email =>({
    type:'EMAIL_EDIT_CLICKED',
    payload:{email},
});

export const editState = state =>({
    type:'STATE_EDIT_CLICKED',
    payload:{state},
});

export const editfavoriteCamera = favoriteCamera =>({
    type:'FAVORITECAMERA_EDIT_CLICKED',
    payload:{favoriteCamera},
});

export const editPhoto = photo =>({
    type:'PROFILEPHOTO_EDIT_CLICKED',
    payload:{photo},
});