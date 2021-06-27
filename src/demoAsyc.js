function login(username,password){
    return new Promise((resolve,reject) => {
        console.log('1');
        setTimeout(() => {
            let data = {
                username:username,
                password:password,
                isLogin:true,
                userId:'fagreaf'
            }
            resolve(data);
        console.log('2');

        },2000)
    })
}

function getPostByUserid(userId){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            let data = [
                {
                    postId:1,
                    userId,
                    content:'fdsafs'
                },
                {
                    postId:2,
                    userId,
                    content:'fdsafs'
                }
            ]
            resolve(data);
        },4000)
    })
}


async function handleLoginUser(){
    var resultLogin = await login('hung','hungdz');
    console.log('3');
    console.log('result',resultLogin)
   
}

handleLoginUser()


// function test(){
//     console.log('truoc login');
//     login('hung','hungdz').then(() => {
//         console.log('login');
//     });
//     console.log('sau login');
// }

// test()