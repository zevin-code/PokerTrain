 
cc.Class({
    extends: cc.Component,

    properties: {
        m_BackGround:cc.Node,
        m_LoadingPrefab:cc.Prefab,
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        playButton:cc.Node,

    },

    start(){
    	this.m_Loading = cc.instantiate(this.m_LoadingPrefab);
    	this.m_BackGround.addChild(this.m_Loading);
    	this.m_Loading.y = this.playButton.y;
        this.m_Loading.width = 480;
        this.m_Loading.height = 34;
        var child = this.m_Loading.getChildByName("pogressmid");
        child.x = -236;
        child.height = 26;
        var childchild = this.m_Loading.getChildByName("realnum");
        childchild.active = false;
        this.m_Loading.getComponent('loading').setProgress(470,1);
        this.m_Loading.getComponent('loading').setStartWhere(0,470);
    	var goToPlay = function (dt) {
    		this.m_Loading.destroy();
    	    this.playButton.active = true;
            this.playButton.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1,0.92,0.92),cc.scaleTo(1,1.1,1.1))));
            let sysInfo = window.wx.getSystemInfoSync();
            //获取微信界面大小
            let width = sysInfo.screenWidth;
            let height = sysInfo.screenHeight;
            wx.login({
                success:function(res){
                    if(res.code){
                        console.log("登录成功",res.code);
                    };
                    var button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000',//最后两位为透明度
                            color: '#000000',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height,
                        }
                    });
                    button.show();
                    button.onTap((res) => {
                        if (res.errMsg === 'getUserInfo:ok') {
                            console.log("用户授权:", res);
                            WeChat.onRegisterUser(res.userInfo);
                            //注册用户信息
                            //此时可进行登录操作
                            button.destroy();
                        }else{
                            console.log("用户拒绝授权:", res);
                        };
                    });
                }
            });
    	};
    	this.scheduleOnce(goToPlay, 3);
    },

    onClickButton(target,data){
        if(data == 'play') return;
    },

    playButtonSound(){
        cc.audioEngine.play(this.buttonSound,false,1);
    },

    // start () {

    // },

    // update (dt) {

    // },
});
