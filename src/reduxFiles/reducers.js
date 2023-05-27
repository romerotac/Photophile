
export const changeProfileOnClick = (state = "", action) => {

    const {type} = action;
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
const initialState = {
    posts:[],
}

export const postState = (state= initialState, action) => {
    const {type} = action;
    switch(type){
        case "SET_POST": 
            return {...state, posts:action.payload }
        case "NEW_POST":
            return {...state, 
                posts:state.posts.concat({
                    title: action.payload.title,
                    imgPath: action.payload.imgPath,
                    user: action.payload.user,
                    profileImgPath: action.payload.profileImgPath,
                    date: action.payload.date,
                    likeID: action.payload.likeID,
                    commentID: action.payload.commentID
                })
                } 
        case "LATEST_POST":
            return {...state,
                    posts: state.posts.sort((a,b) => Date.parse(a.date) - Date.parse(b.date))}
        case "RECENT_POST":
            return {...state,
                    posts: state.posts.sort((a,b) => Date.parse(b.date) - Date.parse(a.date))}

        case "MOST_LIKED_POST":
            var listOfIndex = [];
            let sortedList = action.payload.sort((a,b) => b.data.whoLiked.length - a.data.whoLiked.length)
            sortedList.map((data) => (listOfIndex.push(data.id)))
            
            return {...state,
                    posts: state.posts.sort((a,b) => listOfIndex.indexOf(a.likeID) - listOfIndex.indexOf(b.likeID))
            }
        default:
        return state;
 }
}

const likedState = {
    liked:[],
}

export const setLiked = (state = likedState,action) => {
    const {type} = action;
    switch(type){
        case "SET_LIKED":
            return {...state,liked:action.payload}
        case "ADD_WHO_LIKED":
            return {...state,
                    liked: state.liked.map((ref) => 
                     ref.id === action.payload.likeid
                     ?{ 
                        
                        data: {...state.ref,
                            whoLiked: [...ref.data.whoLiked, action.payload.whoLiked],
                        },
                        id: ref.id
                     }
                     : ref
                     )};
        case "REMOVE_WHO_LIKED":
            return{...state,
                liked: state.liked.map((ref) => 
                 ref.id === action.payload.likeid
                 ?{ 
                    
                    data: {...state.ref,
                        whoLiked: ref.data.whoLiked.filter(item => item !== action.payload.whoLiked),
                    },
                    id: ref.id
                 }
                 : ref
                 )};
    default:
        return state;
    }
}

const comment = {
    comments:[
    ]
}

export const commentState = (state = comment,action) => {
    const {type} = action;
    switch(type){
        case "SET_COMMENTS":
            return {...state,comments:action.payload}
        case "PUT_NEW_COMMENT":
            return {...state,
                    comments: {
                        title: state.comments.title,
                        imgPostPath:state.comments.imgPostPath,
                        mainComment:state.comments.mainComment,
                        otherComments: state.comments.otherComments.concat({userID:action.payload.userID , newComment:action.payload.newComment}),
                    }
                    }
        default:
            return state;
     }
}