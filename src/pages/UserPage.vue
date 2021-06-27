<template>
    <div>
         <user-page-infor 
            :userInfo='userInfo'
            :listPostOfUser='listPostOfUser'
            
            />
           
        <div 
            column-width='.grid-sizer'
            transition-duration="0.3s" 
            item-selector=".ass1-section__item"
            class="ass1-section__wrap row ass1-section__isotope-init">
            <post-item 
                v-for='post in listPostOfUser'
                :key='post.PID'
                :post='post'
                class="col-lg-6"
            />
        </div>
    </div>
</template>

<script>
import PostItem from '../components/PostItem'
import UserPageInfor from '../components/UserPageInfor'

import { mapActions,mapGetters } from 'vuex';

export default {
    name: 'user-page',
    components: {
        UserPageInfor,
        PostItem
    },
    data() {
        return {
            userId:this.$route.params.id,
            userInfo:null,
            listPostOfUser:[]
        }
    },
    watch: {
        $route(to,from){
            this.userId = to.params.id,
            this.fetchAllData()
        }
    },
   
    created() {
        this.fetchAllData()
        
    },
    methods: {
        ...mapActions(['getListPostByUserId','getUserById','setLoading']),
        async fetchAllData(){
            this.setLoading(true);
            let promisePostUser  = this.getListPostByUserId(this.userId);
            let promiseUser =  this.getUserById(this.userId);
            let [resultUser,resultPostUser] = await Promise.all([promiseUser, promisePostUser]);
            this.setLoading(false);
            if(resultUser.ok && resultPostUser.ok){
                this.userInfo = resultUser.data;
                this.listPostOfUser = resultPostUser.posts
                this.$redrawVueMasonry();
            }
            else{
                this.$router.push('/');
            }
        }
    },
}
</script>

<style>

</style>