import { parseJwt } from '../../helpers';
import { CONFIG_ACCESS_TOKEN } from '../../constants';
export default {
    isLogin: state => {
        let userObj = parseJwt(state[CONFIG_ACCESS_TOKEN]);
        if(userObj) {
            return true;
        } else {
            return false;
        }
    },
    currentUser: state => {
        if(state.currentUser){
            return state.currentUser;
        }
        return null;
        
    },
    getListPostOfCurrentUser: state => {
        if(state.currentUser) {
            let userCurrentId = state.currentUser.USERID;
            return state.posts[userCurrentId]
        }
        return null;
    }
}