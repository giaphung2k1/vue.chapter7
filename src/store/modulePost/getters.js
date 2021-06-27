export default {
    getListPost(state){
        return state.listPosts;
    },
    getDataPostDetail(state,getters,rootState){
        if(state.postDetail && state.postDetail.post) {
            let USERID = state.postDetail.post.USERID;
            var user = rootState.user.users[USERID];


        var data = {
            post:{
                ...state.postDetail.post,
                fullname:user.fullname,
                profilepicture:user.profilepicture


            },
            category:state.postDetail.categories
        }
        console.log(data);
        return data;
    }

        
        

    }
    
}