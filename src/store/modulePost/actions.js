
import axiosInstance from '../../plugins/axios';
import {PAGE_SIZE,CURRENT_PAGE,CONFIG_ACCESS_TOKEN} from '../../constants';
export default {
    async getListPostHasPaging({ commit }, { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE , tagIndex = null}) {
        commit('SET_LOADING',true);
        try {
            var config = {
                params:{
                    pagesize,
                    currPage
                }
            }
            if(tagIndex){
                config.params.tagIndex = tagIndex;
                var result = await axiosInstance.get('/post/getListByCategory.php',config);
            }else{
                var result = await axiosInstance.get('/post/getListPagination.php',config);
            }
            commit('SET_LOADING',false);
            if(result.data.status == 200){
                if(config.params.currPage === 1)
                commit('SET_LIST_POST',result.data.posts);
                else
                commit('PUSH_LIST_POST',result.data.posts);
            }
        } catch (error) {
            console.log(error);
        }
    },

    async getPostDetailById({commit,dispatch},postId){
        commit('SET_LOADING',true);
        try{
            var result = await axiosInstance.get('/post/post.php?postid='+postId);
            
            if(result.data.status == 200){
                var promisetUser =  dispatch('getUserById',result.data.data.post.USERID);
                var promiseComments =  dispatch('getListCommentByPostId',postId);
                let [resultUser,resultComments] = await Promise.all([promisetUser,promiseComments]);

                commit('SET_LOADING',false);
                commit('SET_POST_DETAIL',result.data.data);
                return {
                    ok:true,
                    listComment:resultComments.comments
                }
            }
            if(result.data.status == 502){
                return {
                    ok:false
                }
            }
        }catch(error){
            commit('SET_LOADING',false);
            return {
                ok:false,
                error:error
            }
            
        }
    },

    async getListPostSearch({commit},searchStr){
        commit('SET_LOADING',true);
        try {
            var result = await axiosInstance.get('/post/search.php?query='+searchStr);
            commit('SET_LOADING',false);
            if(result.data.status == 200){
                return {
                    ok:true,
                    posts:result.data.posts
                }
            }
            return {
                ok:false,
                
            }

        } catch (error) {
            commit('SET_LOADING',false);
            return {
                ok:false,
                error:error
            }
        }
    },

    async createNewPost({commit},{post_content='',url_image='',category,obj_image=null}){
        commit('SET_LOADING',true);
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('url_image', url_image);
            bodyFormData.append('post_content', post_content);
            bodyFormData.append('category', category);
            if(obj_image){
                bodyFormData.append('obj_image', obj_image);    
            }
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN),
                    "Content-Type": "multipart/form-data" 
                }

            }

            var result = await axiosInstance.post('/post/addNew.php',bodyFormData,config);
            commit('SET_LOADING',false);
            console.log(result)
            if(result.data.status == 200){
                return {
                    ok:true,
                    data:result.data.data
                }
            }
            return {
                ok:false,
                
            }
            
        } catch (error) {
            commit('SET_LOADING',false);
            return {
                ok:false,
                error:error
            }
        }
    },

    async getListCommentByPostId({commit},postId){
        commit('SET_LOADING',true);
        try{
            var result = await axiosInstance.get('/comment/comments.php?postid='+postId);
            
            if(result.data.status == 200){
                return {
                    ok:true,
                    comments:result.data.comments
                }
            }          
            return {
                ok:false,
                error:result.data.error
            }
            
        }catch(error){
            commit('SET_LOADING',false);
            return {
                ok:false,
                error:error
            }
            
        }

    },

    async addNewComment({commit},data){
        commit('SET_LOADING',true);
        try{
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN),
                    "Content-Type": "multipart/form-data" 
                }

            }
            var result = await axiosInstance.post('/comment/add_new.php',data,config);
            commit('SET_LOADING',false);
            if(result.data.status == 200){
                return {
                    ok:true,
                    message:result.data.message,
                    comment:result.data.body
                }
            }          
            return {
                ok:false,
                error:result.data.error
            }
            
        }catch(error){
            commit('SET_LOADING',false);
            return {
                ok:false,
                error:error
            }
            
        }
    }, 

    
   


}