window.WeChat = {};

//微信登录注册调用
WeChat.onRegisterUser = function(_userinfo){
    wx.cloud.callFunction({
        name:'login',
        data:{
            userinfo:_userinfo,
        },
        success(res){
            console.log("登录成功回调",res);
            G.userInfo = res.result.data[0].userinfo;
            cc.director.loadScene("index");    
        },
        fail:console.error()
    });

};