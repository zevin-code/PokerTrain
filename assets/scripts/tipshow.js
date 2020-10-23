 
cc.Class({
    extends: cc.Component,

    properties: {
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        m_TipLabel:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    clear(){
        this.setTipLabel('');
        this.setSureCallBack(null);
        this.setCanlceCallBack(null);
        this.setCloseCallBack(null);
    },

    showTipAll(tip,sureCallBack,canlceCallBack,closeCallBack,){
        this.clear();
        this.setTipLabel(tip);
        this.setSureCallBack(sureCallBack);
        this.setCanlceCallBack(canlceCallBack);
        this.setCloseCallBack(closeCallBack);
    },

    setTipLabel(string){
        this.m_TipLabel.string = string;
    },

    onClickSure(){
        cc.audioEngine.play(this.buttonSound,false,1);
        this.node.active = false;
        if(this.m_SureBack != null){
            this.m_SureBack();
        };
    },

    onClickCanlce(){
        cc.audioEngine.play(this.buttonSound,false,1);
        this.node.active = false;
        if(this.m_CanlceBack != null){
            this.m_CanlceBack();
        };
    },

    onClickClose(){
        cc.audioEngine.play(this.buttonSound,false,1);
        this.node.active = false;
        if(this.m_CloseBack != null){
            this.m_CloseBack();
        };
        
    },

    setSureCallBack(CallBack){
        this.m_SureBack = CallBack;
        
    },

    setCanlceCallBack(CallBack){
        this.m_CanlceBack = CallBack;
        
    },

    setCloseCallBack(CallBack){
        this.m_CloseBack = CallBack;
    },

    // update (dt) {},
});
