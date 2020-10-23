const tip1 = ' 一时的失利并不会掩盖你幸运儿的光芒！';
const tip2 = ' 每日任务的随机大礼听说有惊喜哦';
const tip3 = ' 每天都有三次观看视频开启宝箱的机会！';
const ACTCUT = -2;  // 每局对局所消耗的体力



cc.Class({
    extends: cc.Component,

    properties: {
        m_matchProgressBar:cc.Node,
        m_lvNum:cc.Label,
        m_name:cc.Label,
        m_namename:cc.Sprite,
        m_head:cc.Sprite,
        matchProgress:cc.Node,
        matchResult:cc.Node,
        tips:cc.Label,
        vs_lvNum:cc.Label,
        vs_name:cc.Label,
        vs_namename:cc.Sprite,
        vs_head:cc.Sprite,
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node = cc.director.getScene("index").getChildByName('ROOTNODE');//获取节点的node脚本组件，并调用脚本里面的函数
        var myName = this.node.getComponent('transmit').getdata('myname');
        var lvNum = this.node.getComponent('transmit').getdata('lvpoker');
        //可继续添加头像称号等信息
        this.m_name.string = myName;
        this.m_lvNum.string = lvNum;
        cc.loader.loadRes('prefab/progressbar', function (err, prefab) {//动态加载预制体
            let matchprogress = cc.instantiate(prefab);
            matchprogress.width = 576;
            matchprogress.height = 64;
            this.m_matchProgressBar.addChild(matchprogress);
            var child = matchprogress.getChildByName("pogressmid");
            child.x = -280;
            child.height = 48;
            var childchild = matchprogress.getChildByName("realnum");
            childchild.x = 82;
            matchprogress.getComponent('loading').setStartWhere(0,558);
            matchprogress.getComponent('loading').setProgress(558,1);
            matchprogress.getComponent('loading').setMatchProgress('正在匹配...');
            var findVsFriend = function (dt){
                this.matchProgress.active = false;
                this.matchResult.active = true;
                matchprogress.getComponent('loading').setMatchProgress('进入房间中...');
            };
            this.scheduleOnce(findVsFriend,2);
        }.bind(this));
 
        var goToPlay = function (dt){
            cc.director.loadScene("gameroom");
        };
        this.scheduleOnce(goToPlay,4);

        var changeTip2 = function (dt){
            this.tips.string = tip2;
        };
        this.scheduleOnce(changeTip2,2);

        // var changeTip3 = function (dt){
        //     this.tips.string = tip3;
        // };
        // this.scheduleOnce(changeTip3,6);      
    },

    onClickClose(){
        cc.audioEngine.play(this.buttonSound,false,1);
        cc.director.loadScene("index");
        this.node = cc.director.getScene("index").getChildByName('ROOTNODE');
        this.node.getComponent('transmit').setdata('act',Math.abs(ACTCUT));
    },

    // update (dt) {},
});
