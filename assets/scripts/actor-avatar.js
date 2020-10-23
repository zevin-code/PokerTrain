 
cc.Class({
    extends: cc.Component,

    properties: {
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        m_avatar:cc.Sprite,
        m_unclocked:cc.Sprite,
        m_choose:cc.Sprite,
        m_avatarBG:cc.Sprite,
        m_SmallTip:cc.Sprite,
        m_avatarAtlas:cc.SpriteAtlas,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
 
    // },
    
    showEachActor(actor,had,now,tip){
        this.actorName = actor;
        this.m_avatar.spriteFrame = this.m_avatarAtlas.getSpriteFrame(actor+'-avatar');
        if(had == 1){
            this.m_unclocked.node.opacity = 0;
        };
        if(now == 1){
            this.setNowActorStyle(1);
        };
        if(tip == 1){
            this.m_SmallTip.node.active = true;
        }else{
            this.m_SmallTip.node.active = false;
        };
    },

    clear(){
        this.setChooseCallfun(null);
    },


    setButtonEvent(chooseCallBack){
        this.clear();
        this.setChooseCallfun(chooseCallBack);
    },

    setChooseCallfun(CallBack){
        this.m_ChooseBack = CallBack;
    },
 
    setNowActorStyle(now){
        if(now == 1){
            this.m_choose.node.opacity = 255;
            this.m_avatarBG.node.color = new cc.Color(255,225,72);
        }else{
            this.m_choose.node.opacity = 0;
            this.m_avatarBG.node.color = new cc.Color(223,223,223);
        };
    },

    onClickButton(target,data){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(data == 'choose'){
            if(this.m_ChooseBack != null){
                this.m_ChooseBack();
            };
            this.setNowActorStyle(1);
        };
    },

    // update (dt) {
    //     var theActorList = cc.find('ROOTNODE').getComponent('transmit').getdata('actors');
    //     for(var i = 0;i < theActorList.length;i++){
    //         // if(theActorList[i].now == 0){
    //         //     this.m_choose.node.opacity = 0;
    //         //     this.m_avatarBG.node.color = new cc.Color(223,223,223);
    //         // };
    //         if(theActorList[i].now == 1){  
    //             cc.log("现在是",this.actorName);
    //             this.m_choose.node.opacity = 255;
    //             this.m_avatarBG.node.color = new cc.Color(255,225,72);

    //         };
    //     };
    // },
});
