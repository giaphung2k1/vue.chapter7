<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <p>Đổi mật khẩu</p>
            <div class="ass1-login__form">
                <form action="#" @submit.prevent='handleChangePass'>
                    <input 
                        v-model='passOld'
                        type="password" class="form-control" placeholder="Mật khẩu cũ" required="">
                    <input 
                        v-model='passNew'
                        type="password" class="form-control" placeholder="Mật khẩu mới" required="">
                    <input 
                        v-model='passCheck'
                        type="password" class="form-control" placeholder="Xác nhận mật khẩu mới" required="">
                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn">Gửi</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'change-password',
    data() {
        return {
           id:this.$route.params.id,
           passOld:'',
           passNew:'',
           passCheck:''
        }
    },
    watch: {
        $route(to,from){
            this.id = to.params.id
        }
    },
    computed: {
        ...mapGetters(['currentUser'])
    },
    created() {
        // console.log('oke')
        this.checkUserChangePass()
    },
    methods: {
        ...mapActions(['checkLogin','changePass','Pass']),
        checkUserChangePass(){
            this.checkLogin().then(res => {
                if(res.ok){
                    if(this.currentUser){
                        if(this.id != this.currentUser.USERID){
                            
                            this.$router.push('/');
                        }
                    }
                }
            })
                
            
        },
        handleChangePass(){
            if(this.passOld && this.passNew && this.passCheck){
                let data = {
                    "oldPassword":this.passOld,
                    "newPassword":this.passNew,
                    "reNewPassword":this.passCheck
                }
                if(this.passNew == this.passCheck){
                    this.changePass(data).then(res => {
                        if(res.ok){
                            alert('Thay đổi mật khẩu thành công');
                            this.$router.push('/');
                        }
                        else{
                            console.log(res)
                        }
                    })
                }
                else{
                    alert('Nhập lại mật khẩu không trùng nhau');
                }
                
            }
            else{
                alert('Bạn phải nhập đầy đủ thông tin !')
            }
        }
    }
}
</script>

<style>

</style>