import store from '../store';
const ifNotAuthenticated = (to,from,next) => {
    // 1. Router chỉ cho phép vào khj chưa đăng nhập
    if(store.getters.isLogin){
        next({name:'home-page',query:{redirect:to.name}});
    }
    else{
        next();
    }
}

const ifAuthenticated = (to,from,next) => {
    // 2. Router cho phép vào khj đã đăng nhập
    if(store.getters.isLogin){
        next();
    }
    else{
        next({name:'login',query:{redirect:to.name}});
    }
}

export {
    ifNotAuthenticated,
    ifAuthenticated
}