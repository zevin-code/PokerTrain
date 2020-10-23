const LVADDNUM = 68;  // 每局获胜增加的经验值
const GOLDADDNUM = 128;  // 每局获胜增加的金币数量
const WINCUT = 0;  // 获胜扣除的奖励数量
const ANDCUT = 20;  // 平局扣除的奖励数量 
const FAILCUT = 40;  // 失败扣除的奖励数量
const TIME1 = 1;  // 基础倍数
const TIMES = 2;  // 观看视频奖励翻倍数
const ACTCUT = -2;  // 每局对局所消耗的体力




cc.Class({
    extends: cc.Component,

    properties: {
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        winBGM:{
            type:cc.AudioClip,
            default:null,
        },
        deadBGM:{
            type:cc.AudioClip,
            default:null,
        },
        m_twoGood:cc.Node,
        m_twoButton:cc.Node,
        m_backButton:cc.Node,
        m_notchTOP:cc.Node,
        m_notchFOOT:cc.Node,
        m_notchCARD:cc.Node,
        m_twoGoodTip:cc.Node,
        m_LoadingPrefab:cc.Prefab,
        m_BackGround:cc.Node,
        m_lightBling:cc.Node,
        m_PokerBack:cc.Sprite,
        m_BigBack:cc.Node,
        m_backtip:cc.Label,
        m_LvNum:cc.Label,
        m_GoldNum:cc.Label,
        m_LvPokerNum:cc.Label,
        m_Atlas:cc.SpriteAtlas,
        m_failBack:cc.Node,
        m_PokerCard:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node = cc.director.getScene("index").getChildByName('ROOTNODE');//获取节点的node脚本组件，并调用脚本里面的函数
        this.data = this.node.getComponent('transmit').getdata('res');
        this.lvpoker = this.node.getComponent('transmit').getdata('lvpoker');
        this.pnownum = this.node.getComponent('transmit').getdata('pnow');
        this.pmaxnum = this.node.getComponent('transmit').getdata('pmax');
        this.notchSize = cc.find('ROOTNODE').getComponent('transmit').getdata('notch');
        this.m_LvPokerNum.string = (this.lvpoker).toString();
        this.setStartUI(this.pnownum,this.pmaxnum);
        this.setPageUI(this.data);
        this.m_lightBling.runAction(cc.repeatForever(cc.rotateBy(6, 360)));
        this.twobutton = 1;
        if(this.notchSize){
            this.m_notchTOP.y += this.notchSize;
            this.m_notchCARD.y += this.notchSize/2;
            this.m_notchFOOT.y += this.notchSize;
            // this.notchFOOT.y = this.notchSize;
        };
        var timeCallback = function (dt) {
          this.m_backButton.active = true;
          this.m_twoButton.active = true;
        };
        this.scheduleOnce(timeCallback, 3);
    },

    setStartUI(pnow,pmax){
        this.m_Loading = cc.instantiate(this.m_LoadingPrefab);
        this.m_Loading.width = 480;
        this.m_Loading.height = 34;
        this.m_Loading.y = 8;
        this.m_BackGround.addChild(this.m_Loading);
        var child = this.m_Loading.getChildByName("pogressmid");
        child.x = -236;
        child.height = 26;
        var childchild = this.m_Loading.getChildByName("realnum");
        childchild.x = 230;
        this.m_Loading.getComponent('loading').setStartNum(pnow,pmax);
        this.m_Loading.getComponent('loading').setStartWhere((pnow/pmax),470);
    },

    onClickButton(target,data){
        if(data == 'index'){
            cc.audioEngine.play(this.buttonSound,false,1);
            if(this.data == 1){this.addGoldLv();}
            else if(this.data ==2){this.addGoldLv();}
            else if(this.data ==3){this.addGoldLv();}
            if(this.acceptGold > 190){
                var thisimg = 'lotgold';
            }else{
                var thisimg = 'somegold';
            };
            this.node.getComponent('transmit').setGoldThing(1,'gold',thisimg,'金币',this.acceptGold,0,0);
            cc.director.loadScene("getthing");    
        };
        if(data == 'next'){
            cc.audioEngine.play(this.buttonSound,false,1);
            if(this.data == 1){this.addGoldLv();}
            else if(this.data ==2){this.addGoldLv();}
            else if(this.data ==3){this.addGoldLv();} 
            var activenum = this.node.getComponent('transmit').getdata('act');
            this.node.getComponent('transmit').setdata('gold',this.acceptGold);
            cc.log("体力",activenum);
            if(activenum >= Math.abs(ACTCUT)){
                this.node.getComponent('transmit').setdata('act',ACTCUT);
                cc.director.loadScene("matching");
            }else{
                cc.log("体力不足");
            }
        };
        if(data == 'two'){
            cc.audioEngine.play(this.buttonSound,false,1);
            var n = this.twobutton%2;
            if(n == 0){
                this.m_twoGood.opacity = 255;
                this.m_twoGoodTip.active = true;
                if(this.data == 1){this.chooseGoldLv(WINCUT,TIMES);}
                else if(this.data ==2){this.chooseGoldLv(FAILCUT,TIMES);}
                else if(this.data ==3){this.chooseGoldLv(ANDCUT,TIMES);}
            }else{
                this.m_twoGood.opacity = 0;
                this.m_twoGoodTip.active = false;
                if(this.data == 1){this.chooseGoldLv(WINCUT,TIME1);}
                else if(this.data ==2){this.chooseGoldLv(FAILCUT,TIME1);}
                else if(this.data ==3){this.chooseGoldLv(ANDCUT,TIME1);}
            };
            this.twobutton++;    
        };

    },

    setPageUI(res){
        if(res == 1){
            this.m_backtip.string = '恭喜获胜！';
            cc.audioEngine.play(this.winBGM,false,1);
            this.chooseGoldLv(WINCUT,TIMES);
            this.node.getComponent('transmit').setdata('win',1);
        }else if(res == 2 ){
            this.m_backtip.string = '意外！意外！';
            cc.audioEngine.play(this.deadBGM,false,1);
            this.m_PokerBack.spriteFrame = this.m_Atlas.getSpriteFrame('grayback');
            this.m_failBack.active = true;
            this.chooseGoldLv(FAILCUT,TIMES);
        }else if(res == 3 ){
            cc.audioEngine.play(this.winBGM,false,1);
            this.m_backtip.string = '点到为止。';
            this.chooseGoldLv(ANDCUT,TIMES);
        };
    },

    chooseGoldLv(cut,two){
        this.acceptGold = (GOLDADDNUM - cut*0.8)*two;
        this.acceptLv = (LVADDNUM - cut*0.6)*two;  
        this.m_LvNum.string = (this.acceptLv).toString();
        cc.log("获得经验",this.acceptLv);
        this.m_GoldNum.string = (this.acceptGold).toString();
        cc.log("获得金币",this.acceptGold);
        this.addThisGame(this.acceptLv);    
    },

    addThisGame(lv){
        this.m_Loading.getComponent('loading').setStartNum((lv + this.pnownum),this.pmaxnum);
        if((lv + this.pnownum) >= this.pmaxnum){
            this.m_Loading.getComponent('loading').setProgress(470,1);
            var proAgain = function (dt){
                this.m_Loading.getComponent('loading').setStartWhere(0,470);
                this.m_Loading.getComponent('loading').setProgress(470,(this.pnownum + lv - this.pmaxnum)/(this.pmaxnum + 100 * this.lvpoker));
                this.m_Loading.getComponent('loading').setStartNum((this.pnownum + lv - this.pmaxnum),(this.pmaxnum + 100 * this.lvpoker));
            };
            this.scheduleOnce(proAgain,(470 * (1 - this.pnownum / this.pmaxnum)) / 200);
            this.newpnownum = this.pnownum + lv - this.pmaxnum;
            this.newpmaxnum = this.pmaxnum + 100 * this.lvpoker;
            this.newlvpoker = this.lvpoker + 1;
            this.m_Loading.getComponent('loading').setStartNum(this.newpnownum,this.newpmaxnum);
            this.m_LvPokerNum.string = (this.newlvpoker).toString();
            cc.log("升级啦");
        }else{
            this.m_Loading.getComponent('loading').setStartWhere((this.pnownum / this.pmaxnum),470);
            this.m_Loading.getComponent('loading').setProgress(470,(this.pnownum + lv)/this.pmaxnum);
            this.newpnownum = this.pnownum + lv;
            this.newpmaxnum = this.pmaxnum;
            this.newlvpoker = this.lvpoker;
            this.m_LvPokerNum.string = (this.newlvpoker).toString();
            cc.log("没升级");

        };

    },

    addGoldLv(){
        this.node.getComponent('transmit').setdata('pnow',this.newpnownum);
        this.node.getComponent('transmit').setdata('pmax',this.newpmaxnum);
        this.node.getComponent('transmit').setdata('lvpoker',this.newlvpoker);
        this.node.getComponent('transmit').setdata('game',1);
    },

    // update (dt) {},
});
