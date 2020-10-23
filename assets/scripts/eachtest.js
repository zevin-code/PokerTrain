 
cc.Class({
    extends: cc.Component,

    properties: {
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        m_testName:cc.Label,
        m_testRealNum:cc.Label,
        m_testMustNum:cc.Label,
        m_testNowNum:cc.Label,
        m_testImg:cc.Sprite,
        m_testGold:cc.Node,
        m_testGoldNum:cc.Label,
        m_testMan:cc.Node,
        m_testManNum:cc.Label,
        m_testPoker:cc.Node,
        m_testPokerNum:cc.Label,
        m_purGetBut:cc.Node,
        m_yellowGetBut:cc.Node,
        m_grayGetBut:cc.Node,
        m_Atlas:cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },
    

    showEachCard(daytest){
        this.theTest = daytest.img;
        this.m_testImg.spriteFrame = this.m_Atlas.getSpriteFrame(daytest.img);
        this.m_testName.string = daytest.name;
        this.m_testMustNum.string = daytest.must;
        this.m_testNowNum.string = daytest.now;
        if(daytest.now >= daytest.must){
            this.m_testNowNum.node.color = new cc.Color(29,219,15);
            if(daytest.getit == 0){
                this.m_purGetBut.active = false;
                this.m_yellowGetBut.active = true;
            }else if(daytest.getit == 1){
                this.setButtonStyle();
            };
        };
        for(var i=0;i<daytest.gift.length;i++){
            if(daytest.gift[i].type =='gold'){
                this.m_testGold.active = true;
                this.m_testGoldNum.string = daytest.gift[i].num;
            };
            if(daytest.gift[i].type =='mansp'){
                this.m_testMan.active = true;
                this.m_testManNum.string = daytest.gift[i].num;
            };
            if(daytest.gift[i].type =='pokersp'){
                this.m_testPoker.active = true;
                this.m_testPokerNum.string = daytest.gift[i].num;
            };
        };
        this.clear();
        this.setGoToCallfun(daytest.funs[0]);
        this.setGetCallfun(daytest.funs[1]);
        

    },

    clear(){
        this.setGoToCallfun(null);
        this.setGetCallfun(null);
    },


    // setButtonEvent(goToCallBack,getCallBack){
    //     this.clear();
    //     this.setGoToCallfun(goToCallBack);
    //     this.setGetCallfun(getCallBack);
    // },

    setGoToCallfun(CallBack){
        this.m_GoToBack = CallBack;
    },

    setGetCallfun(CallBack){
        this.m_GetBack = CallBack;
    },

    setButtonStyle(){
        this.m_purGetBut.active = false;
        this.m_yellowGetBut.active = false;
        this.m_grayGetBut.active = true;
    },

    // setGetThing(size,who,img,name,num,x,xian){
    //     cc.loader.loadRes('prefab/getthing', function (err, prefab){
    //         let m_getThing = cc.instantiate(prefab);
    //         this.m_HomeBg.addChild(m_getThing);
    //         m_getThing.getComponent('getthing').setThingInfor(size,who,img,name,num,x,xian);
    //     }.bind(this));
    // },

    onClickButton(target,data){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(data == 'pur'){
            if(this.m_GoToBack != null){
                this.m_GoToBack();
            };
        };
        if(data == 'yellow'){
            if(this.m_GetBack != null){
                this.m_GetBack();
            };
        };
    },

    // update (dt) {},
});
