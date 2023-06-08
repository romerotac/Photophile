
export const setComments = (comments) => {
    return{
        type: 'SET_COMMENTS',
        payload:comments,
    };
};

export const putNewComment = (userID,newComment) =>{
    return{
        type:"PUT_NEW_COMMENT",
        payload:{userID,newComment}
    };
}

export const setPost = (post) => {
    return{
    type: 'SET_POST',
    payload:post,
    };
};

export const newPost = (title,imgPath,user,profileImgPath,date,likeID,commentID) =>{
    return{
        type:'NEW_POST',
        payload:{title,imgPath,user,profileImgPath,date,likeID,commentID}
    };
};

export const latestPost = () =>{
    return{
        type: 'LATEST_POST'
    };
}

export const recentPost = () =>{
    return{
        type: 'RECENT_POST'
    };
}

export const mostLikedPost = (likedList) => {
    return{
        type: 'MOST_LIKED_POST',
        payload:likedList,
    };
}

export const setLiked = (liked) => {
    return{
    type: 'SET_LIKED',
    payload: liked
    }
}

export const addWhoLiked = (likeid,whoLiked) => ({
    type: 'ADD_WHO_LIKED',
    payload: {likeid,whoLiked},
})

export const removeWhoLiked = (likeid,whoLiked) => ({
    type: 'REMOVE_WHO_LIKED',
    payload: {likeid,whoLiked},
})

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

export const setSocial = social =>({
    type:'SET_SOCIAL',
    payload:{social}
})

export const updateSocial = (socialURL,type) =>({
    type:'SOCIAL_EDIT_CLICKED',
    payload:{socialURL,type}
})

export const setOtherUserComment = (data,userID) => ({
    type: 'SET_OTHER_USER_COMMENT',
    payload:{data,userID}
})
