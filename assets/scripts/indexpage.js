const MIN_LENGTH = 50;  // 最起码拖动的长度
const MOVE_DURATION = 0.1;  // 移动的时长
const ACTCUT = -2;  // 每局对局所消耗的体力

// var UI_Manager = require("UI_manager");

cc.Class({
    extends: cc.Component,

    properties: {
        home: cc.Node,
        train:cc.Node,
        menutip:cc.Node,
        greenArrow1:cc.Node,
        greenArrow2:cc.Node,
        goldCoinNum:cc.Label,
        activeNum:cc.Label,
        lvPokerNum:cc.Label,
        testBack:cc.Node,
        notchTOP:cc.Node,
        notchTOP2:cc.Node,
        notchMID:cc.Node,
        notchFOOT:cc.Node,
        lvProgressBar:cc.Node,
        m_RobotPoker:cc.Sprite,
        mainBGM:{
            type:cc.AudioClip,
            default:null,
        },
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        m_actor:cc.Sprite,
        m_avatarAtlas:cc.SpriteAtlas,
        m_artAtlasOne:cc.SpriteAtlas,
        m_artAtlasTwo:cc.SpriteAtlas,
        m_publicAtlasOne:cc.SpriteAtlas,
        m_publicAtlasTwo:cc.SpriteAtlas,
        m_pokerBackAtlas:cc.SpriteAtlas,
        user_avatar:cc.Node,
        user_name:cc.Label,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	this.getNowTime();
        this.isMainBGM = cc.audioEngine.play(this.mainBGM,true,1);//cc.scaleTo(1,0.98,0.98)
        cc.find('ROOTNODE').getComponent('transmit').setdata('bgm',this.isMainBGM);
        this.m_actor.node.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(1,0.98,0.98),cc.moveTo(1,cc.v2(this.m_actor.node.x,this.m_actor.node.y + 8))),cc.spawn(cc.scaleTo(1,1,1),cc.moveTo(1,cc.v2(this.m_actor.node.x,this.m_actor.node.y - 8))))));
        this.menutip.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(1,0.96,0.96),cc.moveTo(1,cc.v2(this.menutip.x + 4,this.menutip.y))),cc.spawn(cc.scaleTo(1,1,1),cc.moveTo(1,cc.v2(this.menutip.x - 4,this.menutip.y))))));
        this.greenArrow1.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(1,30),cc.fadeTo(1,255))));
        this.greenArrow2.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(1,255),cc.fadeTo(1,30))));//rotate3DTo = cc.rotate3DTo(2, cc.v3(0, 180, 0))
        this.nowLvNum = cc.find('ROOTNODE').getComponent('transmit').getdata('lvpoker');
        this.nowGoldNum = cc.find('ROOTNODE').getComponent('transmit').getdata('gold');
        this.realActNum = cc.find('ROOTNODE').getComponent('transmit').getdata('act');
        this.pnowNum = cc.find('ROOTNODE').getComponent('transmit').getdata('pnow');
        this.pmaxNum = cc.find('ROOTNODE').getComponent('transmit').getdata('pmax');
        this.beforePage = cc.find('ROOTNODE').getComponent('transmit').getdata('beforePage');
        this.notchSize = cc.find('ROOTNODE').getComponent('transmit').getdata('notch');
        cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','0');
        if(this.beforePage == 'daytest'){
            cc.loader.loadRes('prefab/daytest', function (err, prefab) {//动态加载预制体
                let m_daytest = cc.instantiate(prefab);
                this.testBack.addChild(m_daytest);
                m_daytest.getComponent('daytest').dayTestShow();
            }.bind(this));
        };
        if(this.beforePage == 'sevenday'){
            cc.loader.loadRes('prefab/sevenday', function (err, prefab) {//动态加载预制体
                let m_sevenDay = cc.instantiate(prefab);
                this.testBack.addChild(m_sevenDay);
                m_sevenDay.getComponent('sevenday').sevenDayShow();
            }.bind(this));
        };
        if(this.beforePage == 'actors'){
            cc.loader.loadRes('prefab/actors', function (err, prefab) {//动态加载预制体
                let m_actors = cc.instantiate(prefab);
                this.testBack.addChild(m_actors);
            }.bind(this));
        };
        if(this.beforePage == 'shop'){
            cc.loader.loadRes('prefab/shop', function (err, prefab) {//动态加载预制体
                let m_shop = cc.instantiate(prefab);
                this.testBack.addChild(m_shop);
            }.bind(this));
        };
        if(this.beforePage == 'storehouse'){
            cc.loader.loadRes('prefab/storehouse', function (err, prefab) {//动态加载预制体
                let m_storehouse = cc.instantiate(prefab);
                this.testBack.addChild(m_storehouse);
            }.bind(this));
        };
        if(this.beforePage == 'choosepoker'){
            cc.loader.loadRes('prefab/choosepoker', function (err, prefab) {//动态加载预制体
                let m_choosepoker = cc.instantiate(prefab);
                this.testBack.addChild(m_choosepoker);
            }.bind(this));
        };
        this.activeNum.string = (this.realActNum).toString();
        this.lvPokerNum.string = (this.nowLvNum).toString();
        this.lvProgressBar.width = 294 * (this.pnowNum / this.pmaxNum);
        this.goldCoinNum.string = (this.nowGoldNum).toString();
        cc.log("现实有金币",this.nowGoldNum);
        cc.log("现实有经验",this.pnowNum);
        cc.log("现实有体力",this.realActNum);
    },

    ctor:function(){
    	this.m_moveLeft = false;
    	this.m_moveRight = false;
    },

    start () {
    	this.addEventHandler();
    	cc.log("notch",this.notchSize);
    	if(this.notchSize){
    		this.notchTOP.y += this.notchSize;
    		this.notchTOP2.y += this.notchSize*1.5;
    		this.notchFOOT.y = this.notchSize;
    	};
    	this.tipButton = 1;
    	this.dayButton = 1;

        // if(G.userInfo != null){
        //     let _url = G.userInfo.avatarUrl;
        //     cc.loader.load({
        //         url:_url,
        //         type:'jpg'
        //     },function(err,texture){
        //         var frame = new cc.spriteFrame(texture);
        //         if(err){
        //             console.log("用户头像",err);
        //         };
        //         this.user_avatar.getComponent(cc.sprite).spriteFrame = frame;
        //         this.user_name.getComponent(cc.Label).string = G.userInfo.nickName;
        //     }.bind(this));

        // };

    	//首页卡牌旋转动画
         this.m_RobotPoker.node.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.rotate3DTo(2, cc.v3(0, 180, 0)),cc.moveTo(2,cc.v2(0,236 + 8))),cc.spawn(cc.rotate3DTo(2, cc.v3(0, 360, 0)),cc.moveTo(2,cc.v2(0,236 - 8))))));
         // this.m_RobotPoker.node.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(2,0.98,0.98),cc.rotate3DTo(2, cc.v3(0, 180, 0)),cc.moveTo(2,cc.v2(0,236 + 8))),cc.spawn(cc.scaleTo(2,1,1),cc.rotate3DTo(2, cc.v3(0, 360, 0)),cc.moveTo(2,cc.v2(0,236 - 8))))));
    	this.schedule(function() {
            var nowNum = Math.floor(Math.random() * 54) + 1;
            this.m_RobotPoker.node.scaleX = 1;
            if(this.pokerStyle == 'public_BACK'){
                if(nowNum < 29){ 
                    this.m_RobotPoker.spriteFrame = this.m_publicAtlasOne.getSpriteFrame('public_'+nowNum);
                }else{
                    this.m_RobotPoker.spriteFrame = this.m_publicAtlasTwo.getSpriteFrame('public_'+nowNum);
                };

            }else if(this.pokerStyle == 'art_one_BACK'){
                if(nowNum < 29){ 
                    this.m_RobotPoker.spriteFrame = this.m_artAtlasOne.getSpriteFrame('art_one_'+nowNum);
                }else{
                    this.m_RobotPoker.spriteFrame = this.m_artAtlasTwo.getSpriteFrame('art_one_'+nowNum);
                };
            }
            
    	},4,cc.macro.REPEAT_FOREVER,3);
    	this.schedule(function() {
            this.m_RobotPoker.node.scaleX = -1;
            this.m_RobotPoker.spriteFrame = this.m_pokerBackAtlas.getSpriteFrame(this.pokerStyle);
    	},4,cc.macro.REPEAT_FOREVER,1);

    },

    getNowTime(){
        var date = new Date();
        var theFullYear = date.getFullYear(); //获取完整的年份(4位)
        var theMonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var theDate = date.getDate(); //获取当前日(1-31)
        var diyTime = theFullYear + "-" + theMonth + "-" + theDate;
        cc.log("当前日期",diyTime);
    },

    addEventHandler() {
        this.home.on('touchstart', (event) => {
            this.startPoint = event.getLocation();
        });

        this.home.on('touchend', (event) => {
            this.touchEnd(event);
        });

        this.home.on('touchcancel', (event) => {
            this.touchEnd(event);
        });
    },

    touchEnd(event) {
        this.endPoint = event.getLocation();
        let vec = this.endPoint.sub(this.startPoint);
        if (vec.mag(vec) > MIN_LENGTH) {
            if (Math.abs(vec.x) > Math.abs(vec.y)) {
                // 水平方向
                if (vec.x > 0) {
                	// cc.log("向右滑");
                	this.m_moveRight = true;
                    // this.moveRight();
                } else {
                	// cc.log("向左滑");
                	this.m_moveLeft = true;
                    // this.moveLeft();
                }
            } else  return
        }
    },

    onClickButton(target,data){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(data == 'rank'){
            if(this.realActNum >= Math.abs(ACTCUT)){
                cc.audioEngine.stop(this.isMainBGM);
                cc.find('ROOTNODE').getComponent('transmit').setdata('act',ACTCUT);
                var nowActNum = cc.find('ROOTNODE').getComponent('transmit').getdata('act');
                this.activeNum.string = (nowActNum).toString();
                cc.director.loadScene("matching");
            }else{
	            cc.loader.loadRes('prefab/tiptip', function (err, prefab) {//动态加载预制体
	                let m_Tip = cc.instantiate(prefab);
	                this.testBack.addChild(m_Tip);
	                m_Tip.getComponent('tipshow').showTipAll('体力不足哦~');
	            }.bind(this));
            };   
        }else if(data == 'test'){
            cc.loader.loadRes('prefab/daytest', function (err, prefab) {//动态加载预制体
                let m_daytest = cc.instantiate(prefab);
                this.testBack.addChild(m_daytest);
                m_daytest.getComponent('daytest').dayTestShow();
            }.bind(this));
            cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','daytest');
        }else if(data == 'sevenday'){
            cc.loader.loadRes('prefab/sevenday', function (err, prefab) {//动态加载预制体
                let m_sevenDay = cc.instantiate(prefab);
                this.testBack.addChild(m_sevenDay);
                m_sevenDay.getComponent('sevenday').sevenDayShow();
            }.bind(this));
            cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','sevenday');
        }else if(data == 'enjoy'){
            cc.find('ROOTNODE').getComponent('transmit').setdata('enjoy',1);
        }else if(data == 'actors'){
        	cc.loader.loadRes('prefab/actors', function (err, prefab) {//动态加载预制体
        	    let m_actors = cc.instantiate(prefab);
        	    this.testBack.addChild(m_actors);
        	}.bind(this));
            cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','actors');
        // UI_Manager.show_ui_at(this.node,"dialogbox");
        }else if(data == 'shop'){
        	cc.loader.loadRes('prefab/shop', function (err, prefab) {//动态加载预制体
        	    let m_shop = cc.instantiate(prefab);
        	    this.testBack.addChild(m_shop);
        	}.bind(this));
            cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','shop');
        }else if(data == 'storehouse'){
        	cc.loader.loadRes('prefab/storehouse', function (err, prefab) {//动态加载预制体
        	    let m_storehouse = cc.instantiate(prefab);
        	    this.testBack.addChild(m_storehouse);
        	}.bind(this));
            cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','storehouse');
        }else if(data == 'choosepoker'){
        	cc.loader.loadRes('prefab/choosepoker', function (err, prefab) {//动态加载预制体
        	    let m_choosepoker = cc.instantiate(prefab);
        	    this.testBack.addChild(m_choosepoker);
        	}.bind(this));
            cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','choosepoker');
        }else{
        	cc.loader.loadRes('prefab/tiptip', function (err, prefab) {//动态加载预制体
        	    let m_Tip = cc.instantiate(prefab);
        	    this.testBack.addChild(m_Tip);
        	    m_Tip.getComponent('tipshow').showTipAll('该功能暂未开放~');
        	}.bind(this));
        };
    },

    update (dt) {
    	var ifBeforePage = cc.find('ROOTNODE').getComponent('transmit').getdata('beforePage');//当前是否有正打开的弹窗
    	var nowActorAvatar = cc.find('ROOTNODE').getComponent('transmit').getdata('nowActor');
        var nowPokerCard = cc.find('ROOTNODE').getComponent('transmit').getdata('nowPoker');
    	this.m_actor.spriteFrame = this.m_avatarAtlas.getSpriteFrame(nowActorAvatar);
        this.pokerStyle = nowPokerCard;
    	if(ifBeforePage == '0'){
    		if(this.m_moveLeft){
    			var posx = dt*1200;
    			this.train.x -= posx;
    			if(this.train.x < -870) {
    				this.train.x = -870;
    				this.m_moveLeft = false;
    			}      
    		};
    		if(this.m_moveRight){
    			var posx = dt*1200;
    			this.train.x += posx;
    			if(this.train.x > -360) {
    				this.train.x = -360;
    				this.m_moveRight = false;
    			}      
    		};
    	}else{
    		this.m_moveLeft = false;
    		this.m_moveRight = false;
    	};
    	
     	var nowActorList = cc.find('ROOTNODE').getComponent('transmit').getdata('actors');//人物有操作时的红点提示
    	for(var i=0;i<nowActorList.length;i++){
    		if(nowActorList[i].had != 1){
    			if(nowActorList[i].spnum >= nowActorList[i].spmax){
    			    nowActorList[i].tip = 1;
    			    if(this.tipButton > 0){
    			    	cc.loader.loadRes('prefab/showtip', function (err, prefab) {//动态加载预制体
    			    	    this.m_showActorTip = cc.instantiate(prefab);
    			    	    this.m_showActorTip.x = 648+128*2;
    			    	    this.m_showActorTip.y = 112;
    			    	    this.train.addChild(this.m_showActorTip);
    			    	}.bind(this));
    			    	this.tipButton = 0;
    			    };
    			};
    		};  
    	};

    	var nowDayList = cc.find('ROOTNODE').getComponent('transmit').getdata('daytests');//每日任务有操作时的红点提示
    	var ifOpenGift = cc.find('ROOTNODE').getComponent('transmit').getdata('ifgift');
    	var canOpenGift = cc.find('ROOTNODE').getComponent('transmit').getdata('daynow');
    	if(ifOpenGift == 1){//提示用户已领取
    	}else if(canOpenGift == nowDayList.length){//可领取每日随机大奖(金币，碎片数量随机)
    		if(this.dayButton > 0){
    			cc.loader.loadRes('prefab/showtip', function (err, prefab) {//动态加载预制体
    			    this.m_showDayTip = cc.instantiate(prefab);
    			    this.m_showDayTip.x = 648;
    			    this.m_showDayTip.y = 112;
    			    this.train.addChild(this.m_showDayTip);
    			}.bind(this));
    			this.dayButton = 0;
    		};
    	};
    	for(var i=0;i<nowDayList.length;i++){
    		if(nowDayList[i].getit != 1){
    			if(nowDayList[i].now >= nowDayList[i].must){
    			    if(this.dayButton > 0){
    			    	cc.loader.loadRes('prefab/showtip', function (err, prefab) {//动态加载预制体
    			    	    this.m_showDayTip = cc.instantiate(prefab);
    			    	    this.m_showDayTip.x = 648;
    			    	    this.m_showDayTip.y = 112;
    			    	    this.train.addChild(this.m_showDayTip);
    			    	}.bind(this));
    			    	this.dayButton = 0;
    			    };
    			};
    		};  
    	};

        var nowPokerList = cc.find('ROOTNODE').getComponent('transmit').getdata('choosepoker');//牌组有操作时的红点提示
        for(var i=0;i<nowPokerList.length;i++){
            if(nowPokerList[i].had != 1){
                if(nowPokerList[i].nownum >= nowPokerList[i].limnum){
                    nowPokerList[i].tip = 1;
                    if(this.tipButton > 0){
                        cc.loader.loadRes('prefab/showtip', function (err, prefab) {//动态加载预制体
                            this.m_showActorTip = cc.instantiate(prefab);
                            this.m_showActorTip.x = 648+128*3;
                            this.m_showActorTip.y = 112;
                            this.train.addChild(this.m_showActorTip);
                        }.bind(this));
                        this.tipButton = 0;
                    };
                };
            };  
        };

    },
});
