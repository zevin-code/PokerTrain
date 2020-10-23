 
cc.Class({
    extends: cc.Component,

    properties: {
        m_DayNum:cc.Label,
        m_GiftFontNum:cc.Label,
        m_GiftNum:cc.Label,
        m_GiftXianNum:cc.Label,
        m_EventBG:cc.Sprite,
        m_BackBG:cc.Sprite,
        m_Gift:cc.Sprite,
        m_Light:cc.Sprite,
        m_HadGet:cc.Node,
        m_NameXian:cc.Node,
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        m_Atlas:cc.SpriteAtlas,
        m_AtlaTwo:cc.SpriteAtlas,   


    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    clear(){
        this.setGetCallfun(null);
    },

    setButtonEvent(getCallBack){
        this.clear();
        this.setGetCallfun(getCallBack);
    },

    setGetCallfun(CallBack){
        this.m_GoToBack = CallBack;
    },

    onClickGet(target,data){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(data == 'day'){
            if(this.m_GoToBack != null){
                this.m_GoToBack();
            };
        };
    },

    showDayCard(day,size,gift,BG,light,font,num,back,ifGet){
        this.m_DayNum.string = day;
        this.m_GiftNum.string = num;
        this.m_GiftFontNum.string = font;
        this.m_GiftXianNum.string = back;
        if(gift =='gold'){ 
            if(num > 190){
                this.m_Gift.spriteFrame = this.m_AtlaTwo.getSpriteFrame('lotgold');
            }else{
                this.m_Gift.spriteFrame = this.m_AtlaTwo.getSpriteFrame('somegold');
            };
        };
        if(gift =='name'){
            this.m_Gift.spriteFrame = this.m_Atlas.getSpriteFrame('thefirstman');
        };
        if(gift =='role'){
            this.m_Gift.spriteFrame = this.m_Atlas.getSpriteFrame('gril');
            this.m_GiftNum.node.color = new cc.Color(160,62,255);
        };
        if(gift =='poker'){
        	this.m_DayNum.node.x = -200;
        	this.m_Gift.node.y = -26;
        	this.m_GiftXianNum.node.y = 124;
        	this.m_GiftNum.node.y = 124; 
        	this.m_GiftFontNum.node.y = 124;   


            this.m_Gift.spriteFrame = this.m_Atlas.getSpriteFrame('art-two-9');
        };
        if(size =='small'){
            this.m_HadGet.width = 172;
            this.m_HadGet.height = 172;
        }else if(size =='mid'){
            this.m_HadGet.width = 356;
            this.m_HadGet.height = 172;
        }else if(size =='midl'){
            this.m_HadGet.width = 172;
            this.m_HadGet.height = 356;         
        }else if(size =='big'){
            this.m_HadGet.width = 540;
            this.m_HadGet.height = 172;       
        };
        if(light =='0'){
            this.m_Light.node.active = false;
        }else{
            this.m_Light.node.active = true;
        };
        if(ifGet =='1'){
            this.m_HadGet.active = true;
        }else{
            this.m_HadGet.active = false;
        };
        this.m_EventBG.spriteFrame = this.m_Atlas.getSpriteFrame(BG);
    },

    // update (dt) {},
});
