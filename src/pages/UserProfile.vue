<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <p>Profile</p>

            <div class="ass1-login__form" v-if='currentUser'>
                <div class="avatar">
                    <img :src='getProfilepicture'  alt="">
                </div>
                <form action="#" @submit.prevent='handleEditProfile'>
                    <input 
                        :value='currentUser.fullname'
                        @input="handleValueFullname"
                        type="text" class="form-control" placeholder="Tên ..." required="">
                    
                    <select  
                        @change='handleValueGender'
                        :value='currentUser.gender'
                        class="form-control">
                        <option value="" disabled>Giới tính</option>
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>                     
                    </select>

                    <input 
                        @change='updateAvatar'
                        
                        type="file" name="avatar"  placeholder="Ảnh đại diện" class="form-control">
                    
                    <textarea 
                        @input='handleValueDesc'
                        class="form-control" cols="30" rows="5" placeholder="Mô tả ngắn ...">{{currentUser.description}}</textarea>
                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn">Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'user-profile',
    data() {
        return {
            userid: this.$route.params.id,
            fullname:'',
            gender:'',
            description:'',
            pathAvatarChange:'',
            profilepicture:null
        }
    },
    watch:{
        $route(to,from){
            this.userid = to.params.id;
            this.checkUserInfo();
            
        }
    },
    
    computed: {
        ...mapGetters(['currentUser']),
        getProfilepicture(){
            if(this.pathAvatarChange === ''){
                if(this.currentUser.profilepicture){
                    return this.currentUser.profilepicture;
                }
            }
            else if(this.pathAvatarChange){
                return this.pathAvatarChange;
            }
            return '/dist/fonts/emotion/svg/Verified.svg';
                
        

            
        }
       
    },
    
    methods: {
        ...mapActions(['checkLogin','updateProfile']),
        checkUserInfo(){
            this.checkLogin().then(res => {
                if(res.ok){
                    if(this.currentUser.USERID != this.userid){
                        this.$router.push('/')
                    }
                }
            });
            
        },
        updateAvatar(e){
            if(e.target.files && e.target.files.length){
                const fileAvatar = e.target.files[0];
                const reader = new FileReader();

                reader.addEventListener("load",  () => {
                    // convert image file to base64 string
                    this.pathAvatarChange = reader.result;
                    this.profilepicture = fileAvatar;
                }, false);

                if (fileAvatar) {
                   reader.readAsDataURL(fileAvatar);
                }



            }
        },
        handleValueFullname(e){
            this.fullname = e.target.value;
        },
        handleValueGender(e){
            this.gender = e.target.value;
        },
        handleValueDesc(e){
            this.description = e.target.value;
        },
        handleEditProfile(){
            let data = {
                fullname:this.fullname||this.currentUser.fullname,
                description:this.description||this.currentUser.description,
                gender:this.gender||this.currentUser.gender,
                profilepicture:this.profilepicture||this.currentUser.profilepicture
            }
            console.log(data)
           if(data.fullname && data.description && data.gender && data.profilepicture){
               this.updateProfile(data).then(res => {
                   this.$router.push({name:'user-page',params:{id:res.data.USERID}})
               });
           }
            
        }


       
        
       
    },
    created(){
        this.checkUserInfo();
        
    },
}

</script>

<style scoped>
    .avatar {
        border-radius: 50%;
        overflow: hidden;
    }
</style>