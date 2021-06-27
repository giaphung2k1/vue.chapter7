<template>
    <div class="ass1-section__list">
        <post-item
           v-for='item in getListPost'
           :key='item.PID'
           :post='item'
        />

        <button 
            @click='handleLoadMore'
            v-if="getListPost && getListPost.length" 
            class="load-more ass1-btn"><span>Xem thêm</span>
        </button>
        <h3 v-else>Danh sách rỗng</h3>
    </div>
</template>

<script>
import {mapGetters,mapState,mapActions} from 'vuex';
import {PAGE_SIZE,CURRENT_PAGE} from '../constants';
import PostItem from './PostItem';
export default {
    name: 'post-list',
    data() {
        return {
            currPage : CURRENT_PAGE,
            tagIndex : parseInt( this.$route.query.id)
        }
    },
    
    components: {
        PostItem
    },
    computed: {
        
       ...mapGetters(['getListPost'])
        
     
    },
    watch: {
        $route(to,from) {
           this.tagIndex = parseInt( this.$route.query.id)
           this.currPage = 1
        }
    },
    methods: {
       handleLoadMore(){
           this.currPage += 1;
           let obj = {
                currPage : this.currPage,
                tagIndex : this.tagIndex
           }
           this.getListPostHasPaging(obj);
       },
       ...mapActions(['getListPostHasPaging'])
       
    },

   
}
</script>

<style>

</style>