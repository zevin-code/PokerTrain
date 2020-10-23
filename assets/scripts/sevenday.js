 
cc.Class({
    extends: cc.Component,

    properties: {
         m_CloseButton:cc.Node,
         m_testBg:cc.Node,
         buttonSound:{
             type:cc.AudioClip,
             default:null,
         },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var nowMainBgm = cc.find('ROOTNODE').getComponent('transmit').getdata('bgm');
        cc.loader.loadRes('prefab/daygift', function (err, prefab) {//动态加载预制体
            let m_eachDay = cc.instantiate(prefab);
            this.m_testBg.addChild(m_eachDay);
            var ifGet = cc.find('ROOTNODE').getComponent('transmit').getdata('getday1');
            var theDay = '初次见面礼';//第几天
            var theSize = 'mid';
            var theGift = 'gold';
            var theBG = 'purmidbg';
            var theLight = 1;
            var theFont = 'x';
            var theNum = 1688;
            var theBack = '';
            m_eachDay.x = 178;
            m_eachDay.y = -86;
            m_eachDay.getComponent('daygift').showDayCard(theDay,theSize,theGift,theBG,theLight,theFont,theNum,theBack,ifGet);
            m_eachDay.getComponent('daygift').setButtonEvent(
                function(){
                    cc.find('ROOTNODE').getComponent('transmit').setdata('getday1',1);
                    cc.find('ROOTNODE').getComponent('transmit').setGoldThing(1,'gold','lotgold','金币',theNum,0,theBack);
                    cc.audioEngine.stop(nowMainBgm);
                    cc.director.loadScene("getthing");
                }
            );
        }.bind(this));

        cc.loader.loadRes('prefab/daygift', function (err, prefab) {//动态加载预制体
            let m_eachDay = cc.instantiate(prefab);
            this.m_testBg.addChild(m_eachDay);
            var ifGet = cc.find('ROOTNODE').getComponent('transmit').getdata('getday2');
            var theDay = '第二天';//第几天
            var theSize = 'small';
            var theGift = 'gold';
            var theBG = 'pursmallbg';
            var theLight = 1;
            var theFont = 'x';
            var theNum = 168;
            var theBack = '';
            var child1 = m_eachDay.getChildByName("bgbutton");
            var child2 = m_eachDay.getChildByName("gift");
            child1.width = 172;
            child1.height = 172;
            child2.width = 92;
            child2.height = 72;
            m_eachDay.x = 454;
            m_eachDay.y = -86;
            m_eachDay.getComponent('daygift').showDayCard(theDay,theSize,theGift,theBG,theLight,theFont,theNum,theBack,ifGet);
            m_eachDay.getComponent('daygift').setButtonEvent(
                function(){
                    cc.find('ROOTNODE').getComponent('transmit').setdata('getday2',1);
                    cc.find('ROOTNODE').getComponent('transmit').setGoldThing(1,'gold','somegold','金币',theNum,0,theBack);
                    cc.audioEngine.stop(nowMainBgm);
                    cc.director.loadScene("getthing");
                }
            );
        }.bind(this));

        cc.loader.loadRes('prefab/daygift', function (err, prefab) {//动态加载预制体
            let m_eachDay = cc.instantiate(prefab);
            this.m_testBg.addChild(m_eachDay);
            var ifGet = cc.find('ROOTNODE').getComponent('transmit').getdata('getday3');
            var theDay = '第三天';//第几天
            var theSize = 'mid';
            var theGift = 'name';
            var theBG = 'yellowmidlbg';
            var theLight = 0;
            var theFont = '';
            var theNum = '“先驱达人”称号';
            var theBack = '（绝版）';
            var child2 = m_eachDay.getChildByName("gift");
            child2.width = 260;
            child2.height = 68;
            m_eachDay.x = 178;
            m_eachDay.y = -270;
            m_eachDay.getComponent('daygift').showDayCard(theDay,theSize,theGift,theBG,theLight,theFont,theNum,theBack,ifGet);
            m_eachDay.getComponent('daygift').setButtonEvent(
                function(){
                    cc.find('ROOTNODE').getComponent('transmit').setdata('getday3',1);
                    cc.find('ROOTNODE').getComponent('transmit').setNameThing(1,'name','thefirstman','',theNum,1,theBack);
                    cc.audioEngine.stop(nowMainBgm);
                    cc.director.loadScene("getthing");
                }
            );
        }.bind(this));

        cc.loader.loadRes('prefab/daygift', function (err, prefab) {//动态加载预制体
            let m_eachDay = cc.instantiate(prefab);
            this.m_testBg.addChild(m_eachDay);
            var ifGet = cc.find('ROOTNODE').getComponent('transmit').getdata('getday4');
            var theDay = '第四天';//第几天
            var theSize = 'small';
            var theGift = 'gold';
            var theBG = 'pursmallbg';
            var theLight = 1;
            var theFont = 'x';
            var theNum = 72;
            var theBack = '';
            var child1 = m_eachDay.getChildByName("bgbutton");
            var child2 = m_eachDay.getChildByName("gift");
            child1.width = 172;
            child1.height = 172;
            child2.width = 92;
            child2.height = 72;
            m_eachDay.x = 86;
            m_eachDay.y = -454;
            m_eachDay.getComponent('daygift').showDayCard(theDay,theSize,theGift,theBG,theLight,theFont,theNum,theBack,ifGet);
            m_eachDay.getComponent('daygift').setButtonEvent(
                function(){
                    cc.find('ROOTNODE').getComponent('transmit').setdata('getday4',1);
                    cc.find('ROOTNODE').getComponent('transmit').setGoldThing(1,'gold','somegold','金币',theNum,0,theBack);
                    cc.audioEngine.stop(nowMainBgm);
                    cc.director.loadScene("getthing");
                }
            );
        }.bind(this));

        cc.loader.loadRes('prefab/daygift', function (err, prefab) {//动态加载预制体
            let m_eachDay = cc.instantiate(prefab);
            this.m_testBg.addChild(m_eachDay);
            var ifGet = cc.find('ROOTNODE').getComponent('transmit').getdata('getday5');
            var theDay = '第五天';//第几天
            var theSize = 'small';
            var theGift = 'gold';
            var theBG = 'pursmallbg';
            var theLight = 1;
            var theFont = 'x';
            var theNum = 128;
            var theBack = '';
            var child1 = m_eachDay.getChildByName("bgbutton");
            var child2 = m_eachDay.getChildByName("gift");
            child1.width = 172;
            child1.height = 172;
            child2.width = 92;
            child2.height = 72;
            m_eachDay.x = 270;
            m_eachDay.y = -454;
            m_eachDay.getComponent('daygift').showDayCard(theDay,theSize,theGift,theBG,theLight,theFont,theNum,theBack,ifGet);
            m_eachDay.getComponent('daygift').setButtonEvent(
                function(){
                    cc.find('ROOTNODE').getComponent('transmit').setdata('getday5',1);
                    cc.find('ROOTNODE').getComponent('transmit').setGoldThing(1,'gold','somegold','金币',theNum,0,theBack);
                    cc.audioEngine.stop(nowMainBgm);
                    cc.director.loadScene("getthing");
                }
            );
        }.bind(this));

        cc.loader.loadRes('prefab/daygift', function (err, prefab) {//动态加载预制体
            let m_eachDay = cc.instantiate(prefab);
            this.m_testBg.addChild(m_eachDay);
            var ifGet = cc.find('ROOTNODE').getComponent('transmit').getdata('getday6');
            var theDay = '第六天';//第几天
            var theSize = 'midl';
            var theGift = 'role';
            var theBG = 'yellowshubg';
            var theLight = 1;
            var theFont = '';
            var theNum = '集美娅';
            var theBack = '';
            var child1 = m_eachDay.getChildByName("bgbutton");
            var child2 = m_eachDay.getChildByName("gift");
            child1.width = 172;
            child1.height = 356;
            child2.width = 111;
            child2.height = 233;
            m_eachDay.x = 454;
            m_eachDay.y = -362;
            m_eachDay.getComponent('daygift').showDayCard(theDay,theSize,theGift,theBG,theLight,theFont,theNum,theBack,ifGet);
            m_eachDay.getComponent('daygift').setButtonEvent(
                function(){
                    cc.find('ROOTNODE').getComponent('transmit').setdata('getday6',1);
                    cc.find('ROOTNODE').getComponent('transmit').setRoleThing(2,'role','gril',theNum,'',0,theBack);
                    cc.audioEngine.stop(nowMainBgm);
                    cc.director.loadScene("getthing");
                }
            );
        }.bind(this));

        cc.loader.loadRes('prefab/daygift', function (err, prefab) {//动态加载预制体
            let m_eachDay = cc.instantiate(prefab);
            this.m_testBg.addChild(m_eachDay);
            var ifGet = cc.find('ROOTNODE').getComponent('transmit').getdata('getday7');
            var theDay = '最终大礼';//第几天
            var theSize = 'big';
            var theGift = 'poker';
            var theBG = 'yellowbigbg';
            var theLight = 0;
            var theFont = '';
            var theNum = '艺术之光';
            var theBack = '（开服限定）';
            var child1 = m_eachDay.getChildByName("bgbutton");
            var child2 = m_eachDay.getChildByName("gift");
            child1.width = 540;
            child1.height = 172;
            child2.width = 249;
            child2.height = 120;
            m_eachDay.x = 270;
            m_eachDay.y = -638;
            m_eachDay.getComponent('daygift').showDayCard(theDay,theSize,theGift,theBG,theLight,theFont,theNum,theBack,ifGet);
            m_eachDay.getComponent('daygift').setButtonEvent(
                function(){
                    cc.find('ROOTNODE').getComponent('transmit').setdata('getday7',1);
                    cc.find('ROOTNODE').getComponent('transmit').setPokerTrainThing(2,theGift,'artpoker',theNum,'',1,theBack);
                    cc.audioEngine.stop(nowMainBgm);
                    cc.director.loadScene("getthing");
                }
            );
        }.bind(this));
    },

    start () {

    },

    clear(){
        this.setCloseCallfun(null);
    },

    toStopHomeBGM(){
        var nowMainBgm = cc.find('ROOTNODE').getComponent('transmit').getdata('bgm');
        cc.audioEngine.stop(nowMainBgm);
    },


    sevenDayShow(closeCallBack){
        this.clear();
        this.setCloseCallfun(closeCallBack);

    },

    onClickClose(){
        cc.audioEngine.play(this.buttonSound,false,1);
        this.node.active = false;
        cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','0');
        if(this.m_CloseBack != null){
            this.m_CloseBack();
        };
        
    },

    setCloseCallfun(CallBack){
        this.m_CloseBack = CallBack;
    },

    // update (dt) {},
});
