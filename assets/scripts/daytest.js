const ACTCUT = -2;  // 每局对局所消耗的体力

cc.Class({
    extends: cc.Component,

    properties: {
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        m_closeButton:cc.Node,
        m_testBg:cc.Node,
        m_BackGround:cc.Node,
        m_proPoint1:cc.Sprite,
        m_proPoint2:cc.Sprite,
        m_proPoint3:cc.Sprite,
        m_proPointGift:cc.Node,
        m_proPointLight:cc.Node,
        m_Atlas:cc.SpriteAtlas,   
    },

    start () {
        var dayTestOld = cc.find('ROOTNODE').getComponent('transmit').getdata('dayold');
        var dayTestNow = cc.find('ROOTNODE').getComponent('transmit').getdata('daynow');
        this.setDayProgress(dayTestOld,dayTestNow);
        this.dayTestList = cc.find('ROOTNODE').getComponent('transmit').getdata('daytests');
        for(var i=0;i<this.dayTestList.length;i++){
            this.setEachTest(this.dayTestList[i]);
        };
        var ifOpenGift = cc.find('ROOTNODE').getComponent('transmit').getdata('ifgift');
        if(ifOpenGift == 1){
            // this.m_proPointLight.color = new cc.Color(223,223,223);
            // this.m_proPointGift.color = new cc.Color(223,223,223);
        }else if(dayTestNow == this.dayTestList.length){
            this.canGatFinal = 1;
            this.m_proPointLight.runAction(cc.repeatForever(cc.rotateBy(6, 360)));
            this.m_proPointGift.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1,0.92,0.92),cc.scaleTo(1,1.1,1.1))));
        };
    },

    setEachTest(day){
        cc.loader.loadRes('prefab/eachtest', function (err, prefab) {//动态加载预制体
            let m_testCard = cc.instantiate(prefab);
            this.m_testBg.addChild(m_testCard);
            m_testCard.getComponent('eachtest').showEachCard(day);
        }.bind(this));
    },

    setDayProgress(old,now){
    	var i = 1;
    	if(i <= old){
    		this.m_proPoint1.spriteFrame = this.m_Atlas.getSpriteFrame('complate');
    		i++;
    	};
    	if(i <= old){
    		this.m_proPoint2.spriteFrame = this.m_Atlas.getSpriteFrame('complate');
    		i++;
    	};
    	if(i <= old){
    		this.m_proPoint3.spriteFrame = this.m_Atlas.getSpriteFrame('complate');
    		i++;
    	};
    	cc.loader.loadRes('prefab/progressbar', function (err, prefab) {//动态加载预制体
    	    let dayprogress = cc.instantiate(prefab);
    	    dayprogress.width = 480;
    	    dayprogress.height = 34;
    	    this.m_BackGround.addChild(dayprogress);
    	    var child = dayprogress.getChildByName("pogressmid");
    	    child.x = -236;
    	    child.height = 26;
    	    var childchild = dayprogress.getChildByName("realnum");
    	    childchild.active = false;
    	    dayprogress.getComponent('loading').setStartWhere(old / 4,470);
    	    if(now > old){
    	        dayprogress.getComponent('loading').setProgress(470,now / 4);
    	        cc.find('ROOTNODE').getComponent('transmit').setdata('dayold',1);
	        	var pointChange = function (dt){
	        		if(i == 1){this.m_proPoint1.spriteFrame = this.m_Atlas.getSpriteFrame('complate');};
	        		if(i == 2){this.m_proPoint2.spriteFrame = this.m_Atlas.getSpriteFrame('complate');};
	        		if(i == 3){this.m_proPoint3.spriteFrame = this.m_Atlas.getSpriteFrame('complate');};
	        		if(i == 4){this.canOpenGift = 1};
	        	};
	        	this.scheduleOnce(pointChange,470 / 4 / 200);
    	    };
    	}.bind(this));   
    },

    clear(){
        this.setCloseCallfun(null);
    },

    onClickGift(){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(this.canGatFinal == 1){//可领取每日随机大奖(金币，碎片数量随机)
            var rannum1 = Math.floor(Math.random() * 199) + 1;//保底金币奖励
            if(rannum1 > 190){
                var goldimg = "lotgold";
            }else{
                var goldimg = "somegold";
            };
            cc.find('ROOTNODE').getComponent('transmit').setGoldThing(1,'gold',goldimg,'金币',rannum1,0,0);
            var ranMan = Math.floor(Math.random() * 2) + 0;
            cc.log("人物碎片随机",ranMan);
            if(ranMan == 1){
                var rannum2 = Math.floor(Math.random() * 2) + 1;
                cc.find('ROOTNODE').getComponent('transmit').setManThing(1,'mansp','mansuipian','随机人物碎片',rannum2,0,0);
            };
            var ranPoker = Math.floor(Math.random() * 10) + 0;
            cc.log("牌组碎片随机",ranPoker);
            if(ranPoker == 1){
                var rannum3 = Math.floor(Math.random() * 4) + 1;
                cc.find('ROOTNODE').getComponent('transmit').setPokerThing(1,'pokersp','pokersuipian','随机牌组碎片',rannum3,0,0);
            };
            cc.find('ROOTNODE').getComponent('transmit').setdata('ifgift',1);
            this.toStopHomeBGM();
            cc.director.loadScene("getthing");
        };
    	
    	
    },

    toStopHomeBGM(){
        var nowMainBgm = cc.find('ROOTNODE').getComponent('transmit').getdata('bgm');
    	cc.audioEngine.stop(nowMainBgm);
    },


    dayTestShow(closeCallBack){
        this.clear();
        this.setCloseCallfun(closeCallBack);

    },

    onClickClose(){
        cc.audioEngine.play(this.buttonSound,false,1);
        cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','0');
        this.node.active = false;
        if(this.m_CloseBack != null){
            this.m_CloseBack();
        };
        
    },

    setCloseCallfun(CallBack){
        this.m_CloseBack = CallBack;
    },

    // update (dt) {},
});
