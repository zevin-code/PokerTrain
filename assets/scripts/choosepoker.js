const MIN_LENGTH = 50;  // 最起码拖动的长度
const MOVE_DURATION = 0.1;  // 移动的时长

cc.Class({
    extends: cc.Component,

    properties: {
    	m_CloseButton:cc.Node,
    	m_testBg:cc.Node,
    	m_setPokerBtn:cc.Node,
    	m_setPokerBtnBG:cc.Node,
    	m_setPokerBtnMid:cc.Node,
    	m_setPokerBtnLab:cc.Label,
    	m_collectBar:cc.Node,
    	m_collectBarin:cc.Node,
    	buttonSound:{
    	    type:cc.AudioClip,
    	    default:null,
    	},
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.nowMainBgm = cc.find('ROOTNODE').getComponent('transmit').getdata('bgm');
        this.pokerList = cc.find('ROOTNODE').getComponent('transmit').getdata('choosepoker');
        this.m_testBg.width = this.pokerList.length*542 + (this.pokerList.length - 1)*89;
        for(var i=0;i<this.pokerList.length;i++){
        	this.setPokerList(this.pokerList[i]);
        };
        this.slideNum = 1;
    	this.addEventHandler();
    },

    addEventHandler() {
        this.m_testBg.on('touchstart', (event) => {
            this.startPoint = event.getLocation();
        });

        this.m_testBg.on('touchend', (event) => {
            this.touchEnd(event);
        });

        this.m_testBg.on('touchcancel', (event) => {
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

    setPokerList(poker){
    	cc.loader.loadRes('prefab/pokercard', function (err, prefab) {//动态加载预制体
    	    let m_pokercard = cc.instantiate(prefab);
    	    this.m_testBg.addChild(m_pokercard);
    	    m_pokercard.getComponent('pokercard').showEachPoker(poker);
    	}.bind(this));
    },

    onClickButton(target,data){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(data == 'close'){
            this.node.active = false;
            cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','0');
        }else if(data == 'setpoker'){
        	if(this.pokerList[this.slideNum - 1].had != 1){
        		if(this.ifGet == 1){
        			var thisPokerInfor = this.pokerList[this.slideNum - 1];
                   cc.find('ROOTNODE').getComponent('transmit').changePokerInfor(thisPokerInfor.back,'had',1);
                   cc.find('ROOTNODE').getComponent('transmit').changePokerInfor(thisPokerInfor.back,'tip',0);
                   cc.find('ROOTNODE').getComponent('transmit').setPokerTrainThing(2,'poker',thisPokerInfor.back,thisPokerInfor.name,'',1,thisPokerInfor.xian);
                   cc.audioEngine.stop(this.nowMainBgm);
                   cc.director.loadScene("getthing");
        		};
        	}else{
                cc.find('ROOTNODE').getComponent('transmit').setdata('nowPoker',this.pokerList[this.slideNum - 1].back);
        	};
         };
    },

    update (dt) {//左右切换动画
    	if(this.m_moveLeft){
    		if(this.slideNum < this.pokerList.length){
    			var posx = dt*1200;
    			this.m_testBg.x -= posx;
    			if(this.m_testBg.x < ( - this.slideNum * 631) - 271){
    				this.m_testBg.x = ( - this.slideNum * 631) - 271;
    				this.slideNum ++;
    				this.m_moveLeft = false;
    			};
    		}else{
    			this.m_moveLeft = false;
    		};
    	};
    	if(this.m_moveRight){
    		if(this.slideNum > 1){
    			var posx = dt*1200;
    			this.m_testBg.x += posx;
    			if(this.m_testBg.x > ( - (this.slideNum - 2) * 631) - 271){
    				this.m_testBg.x = ( - (this.slideNum - 2) * 631) - 271;
    				this.slideNum --;
    				this.m_moveRight = false;
    			};
    		}else{
    			this.m_moveRight = false;
    		};
    	};

        var nowPokerCard = cc.find('ROOTNODE').getComponent('transmit').getdata('nowPoker');
        var nowPokerChoose = this.pokerList[this.slideNum - 1];
        if(nowPokerChoose.nownum >= nowPokerChoose.limnum){
        	this.ifGet = 1;
        }else{
        	this.ifGet = 0;
        };
        if(nowPokerChoose.had == 1){
        	if(nowPokerCard == nowPokerChoose.back){
        	    this.m_setPokerBtnBG.color = new cc.Color(255,225,72);
        	    this.m_setPokerBtnLab.node.color = new cc.Color(255,225,72);
        	    this.m_setPokerBtnMid.color = new cc.Color(255,255,255);
        	    this.m_setPokerBtnLab.string = '使用中';
        	}else{
        	    this.m_setPokerBtnBG.color = new cc.Color(255,255,255);
        	    this.m_setPokerBtnLab.node.color = new cc.Color(255,255,255);
        	    this.m_setPokerBtnMid.color = new cc.Color(255,225,72);
        	    this.m_setPokerBtnLab.string = '设置使用';
        	};
        }else{
        	this.m_setPokerBtnBG.color = new cc.Color(255,255,255);
        	this.m_setPokerBtnLab.node.color = new cc.Color(255,255,255);
        	this.m_setPokerBtnMid.color = new cc.Color(223,223,223);
        	this.m_setPokerBtnLab.string = '待解锁';
        	this.m_setPokerBtnLab.node.color = new cc.Color(51,51,51);
        };
    	if(this.ifGet == 1 && nowPokerChoose.had != 1){//#A03EFF
    		this.m_setPokerBtnBG.color = new cc.Color(255,255,255);
    		this.m_setPokerBtnLab.node.color = new cc.Color(255,255,255);
    		this.m_setPokerBtnMid.color = new cc.Color(80,47,198);
    		this.m_setPokerBtnLab.string = '立即解锁';
    	};
    },
});
