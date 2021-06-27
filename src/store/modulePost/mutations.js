export default {
    SET_LIST_POST(state,data){
        state.listPosts = data;
    },
    PUSH_LIST_POST(state,data){
        state.listPosts = [...state.listPosts,...data];
    },
    SET_POST_DETAIL(state,data){
        state.postDetail = data;

    }
}

