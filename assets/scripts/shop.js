 
cc.Class({
    extends: cc.Component,

    properties: {
        m_CloseButton:cc.Node,
        m_testBg:cc.Node,
        m_lefthour:cc.Label,
        m_leftMinute:cc.Label,
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.nowGoldNum = cc.find('ROOTNODE').getComponent('transmit').getdata('gold');
        this.goodsList = cc.find('ROOTNODE').getComponent('transmit').getdata('goods');
        this.setEachGood();
    },

    start () {

    },

    deleteOverGoods(){//剔除超出限时或未发售的商品
        var date = new Date();
        var nowDate = date.toLocaleDateString(); //获取当前日期,格式为'2002/12/18'
        for(var i = 0;i < this.goodsList.length;i++){
            var showDate = this.goodsList[i].showdate;//格式为'2002-12-18'
            var aDate, oDate1, oDate2, iDays;
            aDate = showDate.split("-");
            oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
            aDate = nowDate.split("/");
            oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
            iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);//日期天数差
            var leftday = this.goodsList[i].limtime - iDays;
            cc.find('ROOTNODE').getComponent('transmit').changeGoodsInfor(this.goodsList[i].name,'leftday',leftday);
            if(leftday < 1){
                this.goodsList.splice(i,1);
                this.deleteOverGoods();
            };
        };
         
    },

    setEachGood(){
        this.deleteOverGoods();
        for(var i = 0;i < this.goodsList.length;i++){
            if(this.goodsList[i].price == '免费领取'){
                var goldEnough = 1;
            }else if(this.nowGoldNum >= this.goodsList[i].price){
                var goldEnough = 1;
            }else{
                var goldEnough = 0;
            };   
            if(i%2 == 0){
                var thePosX = -148;
            }else{
                var thePosX = 148;
            };
            if(i < 2){
                var thePosY = 163;
            }else{
                var thePosY = -223;
            };
            this.setGoodInfor(this.goodsList[i],thePosX,thePosY,goldEnough);
        };
    },

    setGoodInfor(theGood,posx,posy,enough){
        cc.loader.loadRes('prefab/goods', function (err, prefab) {//动态加载预制体
            this.m_theGood = cc.instantiate(prefab);
            this.m_theGood.x = posx;
            this.m_theGood.y = posy;
            this.m_testBg.addChild(this.m_theGood);
            this.m_theGood.getComponent('goods').showEachGood(theGood,enough);
            // this.m_theGood.getComponent('goods').setButtonEvent(
            //     function(){
            //         cc.log("购买成功");
            //         cc.find('ROOTNODE').getComponent('transmit').changeNowActor(actorName);
            //     }
            // );
        }.bind(this));
    },

    onClickClose(){
        cc.audioEngine.play(this.buttonSound,false,1);
        this.node.active = false;
        cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','0');       
    },

    update (dt) {
        var date = new Date();
        var minute = 60 - date.getMinutes();
        var hour = 23 - date.getHours();
        if(minute < 10){
            this.m_leftMinute.string = '0'+minute;
        }else{
            this.m_leftMinute.string = minute;
        };
        if(hour < 10){
            this.m_lefthour.string = '0'+hour;
        }else{
            this.m_lefthour.string = hour;
        };
    },
});
