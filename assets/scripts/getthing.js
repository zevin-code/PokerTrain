 
cc.Class({
    extends: cc.Component,

    properties: {
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        getThingSound:{
            type:cc.AudioClip,
            default:null,
        },
        m_lightBling:cc.Node,
        m_smallThing:cc.Node,
        m_bigThing:cc.Node,
        m_blingbg:cc.Node,
        m_smallThingName:cc.Label,
        m_smallThingNum:cc.Label,
        m_smallX:cc.Label,
        m_smallThingXian:cc.Label,
        m_ThingImg:cc.Sprite,
        m_bigThingName:cc.Label,
        m_bigThingXian:cc.Label,
        m_Atlas:cc.SpriteAtlas, 
        m_AtlaTwo:cc.SpriteAtlas,
        m_AtlaActor:cc.SpriteAtlas, 
        m_pokerAtlas:cc.SpriteAtlas,     
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.audioEngine.play(this.getThingSound,false,1);
        this.m_lightBling.runAction(cc.repeatForever(cc.rotateBy(4, 360)));
        this.node = cc.director.getScene("index").getChildByName('ROOTNODE');//获取节点的node脚本组件，并调用脚本里面的函数
        this.thwho1 = this.node.getComponent('transmit').getdata('gthwho');
        this.thwho2 = this.node.getComponent('transmit').getdata('mthwho');
        this.thwho3 = this.node.getComponent('transmit').getdata('pthwho');
        this.thwho4 = this.node.getComponent('transmit').getdata('nthwho');
        this.thwho5 = this.node.getComponent('transmit').getdata('rthwho');
        this.thwho6 = this.node.getComponent('transmit').getdata('pothwho');
  
        if(this.thwho1 == 'gold'){
            this.thwho = this.thwho1;
            this.node.getComponent('transmit').setdata('gthwho','null');
            var chtip = 'g';
        }else if(this.thwho2 == 'mansp'){
            this.thwho = this.thwho2;
            this.thwho2 = 'null';
            this.node.getComponent('transmit').setdata('mthwho','null');
            var chtip = 'm';
        }else if(this.thwho3 == 'pokersp'){
            this.thwho = this.thwho3;
            this.thwho3 = 'null';
            this.node.getComponent('transmit').setdata('pthwho','null');
            var chtip = 'p';
        }else if(this.thwho4 == 'name'){
            this.thwho = this.thwho4;
            this.thwho4 = 'null';
            this.m_smallX.string = '';
            this.node.getComponent('transmit').setdata('nthwho','null');
            var chtip = 'n';
        }else if(this.thwho5 == 'role'){
            this.thwho = this.thwho5;
            this.thwho5 = 'null';
            this.m_smallX.string = '';
            this.node.getComponent('transmit').setdata('rthwho','null');
            var chtip = 'r';
        }else if(this.thwho6 == 'poker'){
            this.thwho = this.thwho6;
            this.thwho6 = 'null';
            this.m_smallX.string = '';
            this.node.getComponent('transmit').setdata('pothwho','null');
            var chtip = 'po';
        };
        this.thsize = this.node.getComponent('transmit').getdata(chtip+'thingsize');
        this.thimg = this.node.getComponent('transmit').getdata(chtip+'thimg');
        this.thname = this.node.getComponent('transmit').getdata(chtip+'thname');
        this.thnum = this.node.getComponent('transmit').getdata(chtip+'thnum');
        this.thx = this.node.getComponent('transmit').getdata(chtip+'thx');
        this.thxian = this.node.getComponent('transmit').getdata(chtip+'thxian');
        this.setThingInfor();
    },

    setThingInfor(){
        if(this.thwho =='gold'){
            this.m_ThingImg.spriteFrame = this.m_Atlas.getSpriteFrame(this.thimg);  
        }else if(this.thwho =='mansp'){
            this.node.getComponent('transmit').changeActorInfor(this.thimg.replace('-sp',''),'spnum',this.thnum);
            this.m_ThingImg.spriteFrame = this.m_AtlaActor.getSpriteFrame(this.thimg);  
        }else if(this.thwho =='pokersp'){
            this.m_ThingImg.spriteFrame = this.m_Atlas.getSpriteFrame(this.thimg);  
        }else if(this.thwho =='role'){
            this.node.getComponent('transmit').changeActorInfor(this.thimg,'had',1);
            this.m_ThingImg.spriteFrame = this.m_AtlaActor.getSpriteFrame(this.thimg);  
        }else if(this.thwho =='poker'){
            this.m_ThingImg.spriteFrame = this.m_pokerAtlas.getSpriteFrame(this.thimg.replace('_BACK','_ALL'));  
        }else if(this.thwho =='name'){
            this.m_ThingImg.spriteFrame = this.m_AtlaTwo.getSpriteFrame(this.thimg);  
        };
        if(this.thsize == 1){
            this.m_bigThing.active = false;
            this.m_smallThing.active = true;
            this.m_smallThingName.string = this.thname;
            this.m_smallThingNum.string = this.thnum;
            if(this.thx == 1){
                this.m_smallThingXian.string = this.thxian;
            }else{
                this.m_smallThingXian.string = '';
            };
        }else if(this.thsize == 2){
            this.m_bigThing.active = true;
            this.m_smallThing.active = false;
            this.m_bigThingName.string = this.thname;
            if(this.thx == 1){
                this.m_bigThingXian.string = this.thxian;
            }else{
                this.m_bigThingXian.string = '';
            };
        };
    },

    onClickButton(target,data){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(data == 'sure'){
            this.node.getComponent('transmit').setdata(this.thwho,this.thnum);//金币等奖励数据更新
            if(this.thwho2 == 'mansp' || this.thwho3 == 'pokersp' || this.thwho4 == 'name' || this.thwho5 == 'role' || this.thwho6 == 'poker'){
                cc.director.loadScene("getthing");
            }else{
                cc.director.loadScene("index");
            };
        };
    },

    // update (dt) {},
});
