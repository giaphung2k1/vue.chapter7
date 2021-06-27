import {CONFIG_ACCESS_TOKEN } from '../../constants';
export default {
    [CONFIG_ACCESS_TOKEN]: localStorage.getItem(CONFIG_ACCESS_TOKEN),

    currentUser: null, // Login
    users:{},
    posts:{}
    
}


