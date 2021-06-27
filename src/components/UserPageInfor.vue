<template>
    <div class="ass1-head-user" v-if='userInfo'>
        <div class="ass1-head-user__content">
            <div class="ass1-head-user__image"><a href="#"><img :src='getAvatar'></a></div>
            <div class="ass1-head-user__info">
                <div class="ass1-head-user__info-head">
                    <div class="ass1-head-user__name">
                        <span>{{userInfo.fullname}}</span> 
                        <i><img src="/dist/fonts/emotion/svg/Verified.svg" alt="Verified"></i>
                    </div>
                    <div class="w-100"></div>
                    <a v-if='!isCurrentUser'  href="#" class="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>

                    <template v-else-if='isCurrentUser'>
                        <router-link  
                            :to="{name:'change-password',params: { id: userInfo.USERID }}"
                            class="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</router-link>
                        <router-link 
                            :to="{name:'user-profile',parmas:{id:userInfo.USERID}}" 
                            class="ass1-head-user__btn-follow ass1-btn">Profile</router-link>
                    </template>
                    
                </div>
                <div class="ass1-head-user__info-statistic">
                    <div class="ass1-btn-icon"><i class="icon-Post"></i><span>Bài viết: {{listPostOfUser.length}}</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Followers"></i><span>Theo dõi: 0</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Following"></i><span>Đang theo dõi: 0</span></div>
                </div>
                <p>{{userInfo.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'user-page-info',
    props: {
        userInfo:{type:Object,default:{}},
        listPostOfUser:{rype:Object,default:{}}
    },
     computed: {
        ...mapGetters(['currentUser']),
        isCurrentUser(){
            if(this.userInfo.USERID == this.currentUser.USERID){
                return true;
            }
            
            return false;
        },
        getAvatar(){
            if(this.userInfo.profilepicture){
                return this.userInfo.profilepicture
            }
            return '/dist/images/cat-1634369_1920.jpg'
        }
    },
}
</script>

<style>

</style>