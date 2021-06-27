import axiosInstance from '../../plugins/axios';
import { parseJwt } from '../../helpers';
import {CONFIG_ACCESS_TOKEN } from '../../constants';
export default {
    async getUserById({ commit }, userId) {
        commit('SET_LOADING', true);
        try {
            var result = await axiosInstance.get('/member/member.php?userid=' + userId);
            commit('SET_LOADING', false);
            if (result.data.status == 200) {
                commit('SET_USER_INFO', result.data.user);
                return {
                    ok: true,
                    data: result.data.user
                }
            }
            return {
                ok: false,
                error: result.message
            }
        }
        catch (error) {
            console.log('error')
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error
            }
        }
    },

    async login({ commit, dispatch }, { email = '', password = '' }) {
        commit('SET_LOADING', true);
        try {
            let data = {
                email,
                password

            }
            var result = await axiosInstance.post('/member/login.php', data);

            commit('SET_LOADING', false);
            if (result.data.status == 200) {
                commit('SET_USER_INFO', result.data.user);
                commit('SET_LOGIN_INFO', result.data);
                let resultPostUser = await dispatch('getListPostByUserId', result.data.user.USERID);
                if (resultPostUser.ok) {
                    return {
                        data: result.data,
                        ok: true
                    }
                }
                return {
                    ok:false,
                    error:resultPostUser.error
                }
            }
            return {
                ok: false,
                error: result.data.error
            }


        } catch (error) {
            commit('SET_LOADING', false);
            return {
                error: error,
                ok: false
            }

        }
    },
    async checkLogin({ commit, dispatch }) {
       
        try {
            
            if (localStorage.getItem(CONFIG_ACCESS_TOKEN)) {
                let token = localStorage.getItem(CONFIG_ACCESS_TOKEN);
                let userObj = parseJwt(token);

                if (userObj) {
                    let promiseUser = dispatch('getUserById', userObj.id);
                    let promisePostUser = dispatch('getListPostByUserId', userObj.id);
                    
                    let [resultUser, resultPostUser] = await Promise.all([promiseUser, promisePostUser]);
                    if (resultUser.ok && resultPostUser.ok) {
                        let data = {
                            user: resultUser.data,
                            token: token
                        }

                   
                        
                        commit('SET_LOGIN_INFO', data);
                        return {
                            ok: true,
                            error: null
                        }
                    }
                    return {
                        ok: false
                    }
                }

                return {
                    ok: true

                }
            }
            return {
                ok: false
            }

        } catch (error) {
            return {
                ok: false,
                error: error
            }
        }
    },
    async logout({ commit }) {
        commit('SET_LOGOUT');
    },


    async getListPostByUserId({ commit }, userid) {
        commit('SET_LOADING', true);
        try {
            let config = {
                params: {
                    userid
                },
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN),
                    'Content-Type':'multipart/form-data'
                }
            }
            var result = await axiosInstance.get('/post/getListPostUserID.php', config);

            commit('SET_LOADING', false);
            if (result.data.status == 200) {
                let data = {
                    posts: result.data.posts,
                    userid: userid
                }
                commit('SET_USER_POSTS', data);
                return {
                    posts:result.data.posts||[],
                    ok: true,
                }
            }
            return {
                ok: false,
                error: result.message
            }
        }
        catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error
            }
        }
    },
    async register({commit,dispatch},data){
        commit('SET_LOADING', true);
        try {
            var result = await axiosInstance.post('/member/register.php',data);
            commit('SET_LOADING', false);
            if(result.data.status == 200){
                let objLoginInfo = {
                    email:data.email,
                    password:data.password

                }
                await dispatch('login',objLoginInfo);

                return {
                    ok:true
                }
            }
            else{
                return {
                    ok:false,
                    error:result.data.error
                }
            }
        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error
            }
        }
    },

    async updateProfile({commit},{fullname='',description='',gender='',profilepicture=null}){
        commit('SET_LOADING', true);
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('fullname', fullname);
            bodyFormData.append('gender', gender);
            bodyFormData.append('description', description);
            if(profilepicture){
                bodyFormData.append('avatar', profilepicture);    
            }
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN),
                    // "Content-Type": "multipart/form-data" 
                }

            }
            var result = await axiosInstance.post('/member/update.php',bodyFormData,config);

            commit('SET_LOADING', false);
            if(result.data.status == 200){
                commit('SET_CURRENT_USER',result.data.user);
                return {
                    ok:true,
                    data:result.data.user
                }
                
            }
            return {
                ok:false,
                error:result.data.error
            }



            
        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error
            }
        }
    },
    

    async changePass({commit},data){
        commit('SET_LOADING', true);
        try {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN),
                    
                }

            }
       
            var result = await axiosInstance.post('/member/password.php',data,config);
            commit('SET_LOADING', false);

          
            if(result.data.status == 200){
                return {
                    ok:true,
                }
                
            }
            else{
                return {
                    ok:false,
                    // error:result.data.error,
                    // data:null
                }
            }   
            



            
        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error
            }
        }
    },

    

}