 
cc.Class({
    extends: cc.Component,

    properties: {
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        m_goodsBG:cc.Sprite,
        m_goodsImg:cc.Sprite,
        m_disCount:cc.Node,
        m_disCountNum:cc.Label,
        m_goodsName:cc.Label,
        m_goodsX:cc.Label,
        m_goodsNum:cc.Label,
        m_goodsLimNum:cc.Label,
        m_goodsLimNow:cc.Label,
        m_goodsLimNow:cc.Label,
        m_limDay:cc.Label,
        m_valueType:cc.Sprite,
        m_valueX:cc.Label,
        m_valueNum:cc.Label,
        m_sellOut:cc.Sprite,
        m_goodsAtlas:cc.SpriteAtlas,
        m_shopResAtlas:cc.SpriteAtlas,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.nowMainBgm = cc.find('ROOTNODE').getComponent('transmit').getdata('bgm');
    },

    showEachGood(theGood,enough){
            // {type:'mansp',name:'幽敏',avatar:'blackbaby-sp',buynum:20,
            // limnum:1,nownum:0,price:1280,video:0,limtime:15,discount:8.0,hadbuy:0},
        this.thisGoodInfor = theGood;
        this.m_goodsImg.spriteFrame = this.m_goodsAtlas.getSpriteFrame(theGood.avatar+'-sp');
        this.m_goodsName.string = theGood.name;
        this.m_goodsNum.string = theGood.buynum;
        this.m_goodsLimNum.string = theGood.limnum;
        this.m_goodsLimNow.string = theGood.nownum;
        this.m_limDay.string = theGood.leftday;
        this.m_disCountNum.string = theGood.discount; 
        cc.log("theGood",theGood);
        if(theGood.discount != 10.0){
            this.m_disCount.active = true;
            this.m_disCountNum.string = theGood.discount;
        };
        if(theGood.type == 'gold'){
            this.m_goodsImg.spriteFrame = this.m_goodsAtlas.getSpriteFrame(theGood.avatar);
            this.m_valueType.spriteFrame = this.m_shopResAtlas.getSpriteFrame('vedio-icon');
            this.m_goodsBG.spriteFrame = this.m_shopResAtlas.getSpriteFrame('gray-bg-20');
            this.m_valueX.string = " 免费领取";
            this.m_goodsX.string = " x ";
            this.m_valueNum.node.active = false;
        }else{
            this.m_valueNum.string = theGood.price;
        };
        if(theGood.type == 'role'){
            this.m_goodsImg.spriteFrame = this.m_goodsAtlas.getSpriteFrame(theGood.avatar+'-avatar');
            this.m_goodsX.string = theGood.name;
            this.m_goodsName.string = '';
            this.m_goodsNum.string = '';
        };
        if(theGood.hadbuy == 1){
            this.m_sellOut.node.active = true;
            this.m_valueType.node.active = false;
            this.m_valueX.string = "...";
            this.m_valueNum.node.active = false;
        };
        if(enough != 1){
            this.notEnough = 0;
            this.m_valueX.node.color = new cc.Color(255,94,65);
            this.m_valueNum.node.color = new cc.Color(255,94,65);
        };
    },

    onClickBuyIt(){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(this.notEnough != 0 && this.m_sellOut.node.active != true){
            cc.log(this.thisGoodInfor.name);
            cc.find('ROOTNODE').getComponent('transmit').changeGoodsInfor(this.thisGoodInfor.name,'nownum',1);
            if(this.thisGoodInfor.type == 'role'){
                cc.find('ROOTNODE').getComponent('transmit').setdata('gold',-(this.thisGoodInfor.price));
                cc.find('ROOTNODE').getComponent('transmit').changeActorInfor(this.thisGoodInfor.avatar,'had',1);
                cc.find('ROOTNODE').getComponent('transmit').setRoleThing(2,this.thisGoodInfor.type,this.thisGoodInfor.avatar,this.thisGoodInfor.name,'',0,0);
            }else if(this.thisGoodInfor.type == 'mansp'){
                cc.find('ROOTNODE').getComponent('transmit').changeActorInfor(this.thisGoodInfor.avatar,'spnum',this.thisGoodInfor.buynum);
                cc.find('ROOTNODE').getComponent('transmit').setdata('gold',-(this.thisGoodInfor.price));
                cc.find('ROOTNODE').getComponent('transmit').setManThing(1,this.thisGoodInfor.type,this.thisGoodInfor.avatar+'-sp',this.thisGoodInfor.name,this.thisGoodInfor.buynum,0,0);
            }else if(this.thisGoodInfor.type == 'pokersp'){
                cc.find('ROOTNODE').getComponent('transmit').setdata('gold',-(this.thisGoodInfor.price));
                cc.find('ROOTNODE').getComponent('transmit').setPokerThing(1,this.thisGoodInfor.type,this.thisGoodInfor.avatar,this.thisGoodInfor.name,this.thisGoodInfor.buynum,0,0);
            }else if(this.thisGoodInfor.type == 'gold'){
                cc.find('ROOTNODE').getComponent('transmit').setGoldThing(1,this.thisGoodInfor.type,this.thisGoodInfor.avatar,this.thisGoodInfor.name,this.thisGoodInfor.buynum,0,0);
            }else if(this.thisGoodInfor.type == 'name'){
                cc.find('ROOTNODE').getComponent('transmit').setdata('gold',-(this.thisGoodInfor.price));
                cc.find('ROOTNODE').getComponent('transmit').setNameThing(1,this.thisGoodInfor.type,this.thisGoodInfor.avatar,this.thisGoodInfor.name,'',0,0);
            }else if(this.thisGoodInfor.type == 'poker'){
                cc.find('ROOTNODE').getComponent('transmit').setdata('gold',-(this.thisGoodInfor.price));
                cc.find('ROOTNODE').getComponent('transmit').setPokerTrainThing(2,this.thisGoodInfor.type,this.thisGoodInfor.avatar,this.thisGoodInfor.name,'',0,0);
            };
            cc.audioEngine.stop(this.nowMainBgm);
            cc.director.loadScene("getthing");
        };


    },

    // update (dt) {
    //     var date = new Date();
    //     var showDate = this.thisGoodInfor.showdate;//格式为'2002-12-18'
    //     var nowDate = date.toLocaleDateString(); //获取当前日期,格式为'2002/12/18'
    //     var aDate, oDate1, oDate2, iDays;
    //     aDate = showDate.split("-");
    //     oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
    //     aDate = nowDate.split("/");
    //     oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
    //     iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);//日期天数差
    //     this.m_limDay.string = this.thisGoodInfor.limtime - iDays;
    // },
});
