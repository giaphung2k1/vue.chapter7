<template>
    <div class="row">
        <div class="col-lg-8">
            <post-list/>
        </div>
        <div class="col-lg-4">
            <sidebar />
        </div>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';
export default {
    name: 'home-page',
     data() {
        return {
           
        }
    },
    created() {
		this.$store.dispatch('getListPostHasPaging',{});
	},
    components: {
        PostList,
        Sidebar
    },
    computed:{

    },
    watch:{
         $route (to, from){
             let id = parseInt(to.query.id);
             this.getListPostHasPaging({tagIndex:id});
        }
    },
    
   
   
    methods: {
       ...mapActions([
           'getListPostHasPaging'
       ]),
    }
}
</script>

<style>

</style>