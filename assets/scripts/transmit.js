const ACTCUT = -2;  // 每局对局所消耗的体力

window.G = {
    userInfo:null,
};

cc.Class({
    extends: cc.Component,

    properties: {
        m_rootnode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.m_rootnode);
        this.myname = 'Zevin';
        this.goldnum = 0;
        this.actnum = 40;
        this.pnownum = 0;
        this.pmaxnum = 200;
        this.lvpoker = 1;
        this.gamenum = 0;
        this.winnum = 0;
        this.get1 = 0;
        this.get2 = 0;
        this.get3 = 0;
        this.get4 = 0;
        this.enjoynum = 0;
        this.beforePage = 0;
        this.dayold = 0;
        this.daynow = 0;
        this.ifgift = 0;
        this.getday1 = 0;
        this.getday2 = 0;
        this.getday3 = 0;
        this.getday4 = 0;
        this.getday5 = 0;
        this.getday6 = 0;
        this.getday7 = 0;
        this.nowActor = 'startactor';
        this.nowPoker = 'public_BACK';
        this.playDate = '2020/4/19';
        this.s = 1;//每日商店限时一天商品刷新参数
        this.notchSize = 0;
        this.initialGame();
        this.setDesignSize();
    },

    ctor(){
        this.actors = [
            {name:'小灰仆',xian:'',avatar:'startactor',had:1,now:1,tip:0,spnum:30,spmax:30},
            {name:'晴希子',xian:'(活动限定)',avatar:'airgril',had:0,tip:0,now:0,spnum:0,spmax:80},
            {name:'幽敏',xian:'',avatar:'blackbaby',had:0,tip:0,now:0,spnum:60,spmax:80},
            {name:'任月',xian:'(活动限定)',avatar:'cutebaby',had:0,tip:0,now:0,spnum:0,spmax:80},
            {name:'益美莉亚',xian:'(活动限定)',avatar:'greeneye',had:0,tip:0,now:0,spnum:60,spmax:80},
            {name:'馨奈',xian:'',avatar:'japangril',had:0,tip:0,now:0,spnum:72,spmax:80},
            {name:'捷鸽',xian:'',avatar:'kingboy',had:0,tip:0,now:0,spnum:0,spmax:30},
            {name:'甜心酱',xian:'',avatar:'longhairgril',had:0,tip:0,now:0,spnum:0,spmax:80},
            {name:'泽少',xian:'',avatar:'oldman',had:0,tip:0,now:0,spnum:0,spmax:30},
            {name:'泉星',xian:'(活动限定)',avatar:'pokerprince',had:0,tip:0,now:0,spnum:0,spmax:80},
            {name:'IU',xian:'(开服限定)',avatar:'smallcat',had:0,tip:0,now:0,spnum:0,spmax:30}
        ];

        this.daytests = [
            {img:'playone',name:'参与一次对局',must:1,now:0,getit:0,
            gift:[
                {type:'gold',num:72}
            ], 
            funs:[
                function(){
                    cc.log(this.actnum,Math.abs(ACTCUT));  
                    if(this.actnum >= Math.abs(ACTCUT)){
                        cc.audioEngine.stop(this.nowbgm);
                        this.actnum += ACTCUT;
                        cc.director.loadScene("matching");   
                    }else{cc.log("体力不足");};
                }.bind(this),
                function(){
                    this.daytests[0].getit = 1;
                    this.setGoldThing(1,'gold','somegold','金币',this.daytests[0].gift[0].num,0,0);
                    this.daynow += 1;
                    cc.audioEngine.stop(this.nowbgm);
                    cc.director.loadScene("getthing");
                }.bind(this)
            ]
            },
            {img:'threewin',name:'获得3次胜利',must:3,now:0,getit:0,
            gift:[
                {type:'pokersp',num:2}
            ], 
            funs:[
                function(){
                    cc.log(this.actnum,Math.abs(ACTCUT));  
                    if(this.actnum >= Math.abs(ACTCUT)){
                        cc.audioEngine.stop(this.nowbgm);
                        this.actnum += ACTCUT;
                        cc.director.loadScene("matching");   
                    }else{cc.log("体力不足");};
                }.bind(this),
                function(){
                    this.daytests[1].getit = 1;
                    this.setPokerThing(1,'pokersp','pokersuipian','随机牌组碎片',this.daytests[1].gift[0].num,0,0);
                    this.daynow += 1;
                    cc.audioEngine.stop(this.nowbgm);
                    cc.director.loadScene("getthing");
                }.bind(this)
            ]
            },
            {img:'onegame',name:'分享一次游戏',must:1,now:0,getit:0,
            gift:[
                {type:'gold',num:128},
                {type:'mansp',num:1}
            ], 
            funs:[
                function(){//完善分享的跳转函数
                }.bind(this),
                function(){
                    this.daytests[2].getit = 1;
                    this.setGoldThing(1,'gold','somegold','金币',this.daytests[2].gift[0].num,0,0);
                    this.setManThing(1,'mansp','mansuipian','随机人物碎片',this.daytests[2].gift[1].num,0,0);
                    this.daynow += 1;
                    cc.audioEngine.stop(this.nowbgm);
                    cc.director.loadScene("getthing");
                }.bind(this)
            ]
            },
            {img:'sixgames',name:'进行6次对局',must:6,now:0,getit:0,
            gift:[
                {type:'gold',num:98},
                {type:'pokersp',num:4}
            ], 
            funs:[
                function(){
                    cc.log(this.actnum,Math.abs(ACTCUT));  
                    if(this.actnum >= Math.abs(ACTCUT)){
                        cc.audioEngine.stop(this.nowbgm);
                        this.actnum += ACTCUT;
                        cc.director.loadScene("matching");   
                    }else{cc.log("体力不足");};
                }.bind(this),
                function(){
                    this.daytests[3].getit = 1;
                    this.setGoldThing(1,'gold','somegold','金币',this.daytests[3].gift[0].num,0,0);
                    this.setPokerThing(1,'pokersp','pokersuipian','随机牌组碎片',this.daytests[3].gift[1].num,0,0);
                    this.daynow += 1;
                    cc.audioEngine.stop(this.nowbgm);
                    cc.director.loadScene("getthing");
                }.bind(this)
            ]
            }
        ];
        
        this.goods = [
            {type:'mansp',name:'幽敏',avatar:'blackbaby',buynum:20,limnum:1,nownum:0,price:1280,video:0,showdate:'2020-5-26',limtime:10,leftday:0,discount:7.9,hadbuy:0},
            {type:'mansp',name:'馨奈',avatar:'japangril',buynum:8,limnum:1,nownum:0,price:720,video:0,showdate:'2020-5-26',limtime:10,leftday:0,discount:7.9,hadbuy:0},
            {type:'role',name:'甜心酱',avatar:'longhairgril',buynum:1,limnum:1,nownum:0,price:1688,video:0,showdate:'2020-5-21',limtime:15,leftday:0,discount:6.9,hadbuy:0},
            {type:'gold',name:'金币',avatar:'somegold',buynum:520,limnum:3,nownum:0,price:'免费领取',video:1,showdate:'2020-5-21',limtime:400,leftday:0,discount:10.0,hadbuy:0}
        ];

        this.storehouse = [
            {
                name:'进阶宝库',imgbg:'StoreHouse-actor',start:'5.20',end:'6.30',describe:'每期宝库累计开启20次必得全部奖励！',leftnum:20,vedionum:3,coolingtime:'0:1:0:0',coolendtime:["",2,24,50],lucklist:[],
                storelist:[
                {type:'role',name:'星泉',avatar:'pokerprince',grade:1,left:1,all:1,everynum:1,x:1,xian:'(活动限定)',chance:1/20},
                {type:'mansp',name:'星泉',avatar:'pokerprince',grade:1,left:80,all:80,everynum:10,x:1,xian:'(活动限定)',chance:8/20},
                {type:'gold',name:'金币',avatar:'somegold',grade:2,left:1320,all:1320,everynum:120,x:0,xian:'',chance:11/20}
                ]
            },
            {
                name:'开服特惠',imgbg:'StoreHouse-poker',start:'6.1',end:'7.12',describe:'每期宝库累计开启20次必得全部奖励！',leftnum:20,vedionum:3,coolingtime:'0:0:30:0',coolendtime:["",0,0,0],lucklist:[],
                storelist:[
                {type:'pokersp',name:'艺术之光',avatar:'pokerprince',grade:1,left:10,all:10,everynum:1,x:1,xian:'(开服限定)',chance:10/20},
                {type:'gold',name:'金币',avatar:'somegold',grade:2,left:720,all:720,everynum:72,x:0,xian:'',chance:10/20}
                ]
            }
        ];

        this.pokerlist = [
            {name:'简约扑克',xian:'',back:'public_BACK',front:'',describe:'默认',limnum:10,nownum:10,had:1,tip:0},
            {name:'艺术之光',xian:'开服限定',back:'art_one_BACK',front:'',describe:'2020年7月首批玩家的专属',limnum:10,nownum:10,had:0,tip:0},
            {name:'国潮',xian:'开服限定',back:'art_two_BACK',front:'',describe:'国潮时尚的代表',limnum:10,nownum:6,had:0,tip:0}


        ];


    },

    setdata(res,num){
        if(res =='res'){
            this.end = num;
        }else if(res =='gold'){
            this.goldnum += num;
        }else if(res =='act'){
            this.actnum += num;
        }else if(res =='pnow'){
            this.pnownum = num;
        }else if(res =='pmax'){
            this.pmaxnum = num;
        }else if(res =='lvpoker'){
            this.lvpoker = num;
        }else if(res =='game'){
            this.gamenum += num;
        }else if(res =='win'){
            this.winnum += num;
        }else if(res =='bgm'){
            this.nowbgm = num;
        }else if(res =='enjoy'){
            this.enjoynum += num;
        }else if(res =='gthwho'){
            this.gthwho = num;
        }else if(res =='mthwho'){
            this.mthwho = num;
        }else if(res =='pthwho'){
            this.pthwho = num;
        }else if(res =='nthwho'){
            this.nthwho = num;
        }else if(res =='rthwho'){
            this.rthwho = num;
        }else if(res =='pothwho'){
            this.pothwho = num;
        }else if(res =='beforePage'){
            this.beforePage = num;
        }else if(res =='dayold'){
            this.dayold += num;
        }else if(res =='daynow'){
            this.daynow += num;
        }else if(res =='ifgift'){
            this.ifgift = num;
        }else if(res =='myname'){
            this.myname = num;
        }else if(res =='getday1'){
            this.getday1 = num;
        }else if(res =='getday2'){
            this.getday2 = num;
        }else if(res =='getday3'){
            this.getday3 = num;
        }else if(res =='getday4'){
            this.getday4 = num;
        }else if(res =='getday5'){
            this.getday5 = num;
        }else if(res =='getday6'){
            this.getday6 = num;
        }else if(res =='getday7'){
            this.getday7 = num;
        }else if(res =='nowActor'){
            this.nowActor = num;
        }else if(res =='nowPoker'){
            this.nowPoker = num;
        }else if(res =='actors'){
            this.actors = num;
        };
    },

    getdata(name){
        if(name =='res'){
            return this.end;
        }else if(name =='gold'){
            return this.goldnum;
        }else if(name =='act'){
            return this.actnum;
        }else if(name =='pnow'){
            return this.pnownum;
        }else if(name =='pmax'){
            return this.pmaxnum;
        }else if(name =='lvpoker'){
            return this.lvpoker;
        }else if(name =='game'){
            return this.gamenum;
        }else if(name =='win'){
            return this.winnum;
        }else if(name =='bgm'){
            return this.nowbgm;
        }else if(name =='gthingsize'){
            return this.gthingsize;
        }else if(name =='gthwho'){
            return this.gthwho;
        }else if(name =='gthimg'){
            return this.gthimg;
        }else if(name =='gthname'){
            return this.gthname;
        }else if(name =='gthnum'){
            return this.gthnum;
        }else if(name =='gthx'){
            return this.gthx;
        }else if(name =='gthxian'){
            return this.gthxian;
        }else if(name =='mthingsize'){
            return this.mthingsize;
        }else if(name =='mthwho'){
            return this.mthwho;
        }else if(name =='mthimg'){
            return this.mthimg;
        }else if(name =='mthname'){
            return this.mthname;
        }else if(name =='mthnum'){
            return this.mthnum;
        }else if(name =='mthx'){
            return this.mthx;
        }else if(name =='mthxian'){
            return this.mthxian;
        }else if(name =='pthingsize'){
            return this.pthingsize;
        }else if(name =='pthwho'){
            return this.pthwho;
        }else if(name =='pthimg'){
            return this.pthimg;
        }else if(name =='pthname'){
            return this.pthname;
        }else if(name =='pthnum'){
            return this.pthnum;
        }else if(name =='pthx'){
            return this.pthx;
        }else if(name =='pthxian'){
            return this.pthxian;
        }else if(name =='nthingsize'){
            return this.nthingsize;
        }else if(name =='nthwho'){
            return this.nthwho;
        }else if(name =='nthimg'){
            return this.nthimg;
        }else if(name =='nthname'){
            return this.nthname;
        }else if(name =='nthnum'){
            return this.nthnum;
        }else if(name =='nthx'){
            return this.nthx;
        }else if(name =='nthxian'){
            return this.nthxian;
        }else if(name =='rthingsize'){
            return this.rthingsize;
        }else if(name =='rthwho'){
            return this.rthwho;
        }else if(name =='rthimg'){
            return this.rthimg;
        }else if(name =='rthname'){
            return this.rthname;
        }else if(name =='rthnum'){
            return this.rthnum;
        }else if(name =='rthx'){
            return this.rthx;
        }else if(name =='rthxian'){
            return this.rthxian;
        }else if(name =='pothingsize'){
            return this.pothingsize;
        }else if(name =='pothwho'){
            return this.pothwho;
        }else if(name =='pothimg'){
            return this.pothimg;
        }else if(name =='pothname'){
            return this.pothname;
        }else if(name =='pothnum'){
            return this.pothnum;
        }else if(name =='pothx'){
            return this.pothx;
        }else if(name =='pothxian'){
            return this.pothxian;
        }else if(name =='enjoy'){
            return this.enjoynum;
        }else if(name =='beforePage'){
            return this.beforePage;
        }else if(name =='dayold'){
            return this.dayold;
        }else if(name =='daynow'){
            return this.daynow;
        }else if(name =='ifgift'){
            return this.ifgift;
        }else if(name =='myname'){
            return this.myname;
        }else if(name =='getday1'){
            return this.getday1;
        }else if(name =='getday2'){
            return this.getday2;
        }else if(name =='getday3'){
            return this.getday3;
        }else if(name =='getday4'){
            return this.getday4;
        }else if(name =='getday5'){
            return this.getday5;
        }else if(name =='getday6'){
            return this.getday6;
        }else if(name =='getday7'){
            return this.getday7;
        }else if(name =='actors'){
            return this.actors;
        }else if(name =='nowActor'){
            return this.nowActor;
        }else if(name =='nowPoker'){
            return this.nowPoker;
        }else if(name =='goods'){
            return this.goods;
        }else if(name =='storehouse'){
            return this.storehouse;
        }else if(name =='notch'){
            return this.notchSize;
        }else if(name =='daytests'){
            return this.daytests;
        }else if(name =='choosepoker'){
            return this.pokerlist;
        };
    },

    getNowTime(){
        var date = new Date();
        // date.getYear(); //获取当前年份(2位)
        // date.getFullYear(); //获取完整的年份(4位)
        // date.getMonth(); //获取当前月份(0-11,0代表1月)
        // date.getDate(); //获取当前日(1-31)
        // date.getDay(); //获取当前星期X(0-6,0代表星期天)
        // date.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
        // date.getHours(); //获取当前小时数(0-23)
        // date.getMinutes(); //获取当前分钟数(0-59)
        // date.getSeconds(); //获取当前秒数(0-59)
        // date.getMilliseconds(); //获取当前毫秒数(0-999)
        // date.toLocaleDateString(); //获取当前日期
        var mytime = date.toLocaleTimeString(); //获取当前时间
        cc.log("当前时间",mytime);
        date.toLocaleString(); //获取日期与时间
    },

    setDesignSize(){
        //获取视图的大小，以点为单位
        // let winSize=cc.view.getFrameSize();
        //获取运行场景的可见大小
        let visiSize=cc.view.getVisibleSize();
        //获取视图的大小，以像素为单位
        // let winSizePixels=cc.view.getVisibleSizeInPixel();
        var apple = visiSize.width / visiSize.height;
        if(Math.abs(visiSize.height - 1280) > 10){
            this.notchSize = -60;
            cc.log("刘海屏");
        };
        let winPort = cc.view.getViewportRect();
        // cc.log("视图大小-点",winSize);
        cc.log("运行场景大小",visiSize);
        // cc.log("视图大小-像素",winSizePixels);
        cc.log('apple',apple); 
    },

    initialGame(){
        this.initialShop();
        this.s++;
        cc.log("刷新参数",this.s);
        this.playDate = this.thisDate;
        this.initialShop();
    },

    initialShop(){//刷新商店
        var date = new Date();
        // var thisDate = '2020/4/21';
        this.thisDate = date.toLocaleDateString(); //获取当前日期
        if(this.playDate != this.thisDate){
            for(var i = 0;i < this.goods.length;i++){
                if((this.goods[i].leftday < 1) && (this.goods[i].limtime == this.s)){
                    this.goods[i].hadbuy = 0;
                    this.goods[i].nownum = 0;
                    this.goods[i].limtime += 1;
                    cc.log(i,this.s,this.goods[i].leftday,this.goods[i].limtime);
                    this.initialShop(); 
                    break;
                };
            };
        }else{
            cc.log("今天");
        };
    },

    initialDayTest(){//刷新每日任务

    },

    initialSevenDay(){//刷新七日登录

    },

    initialStoreHouse(){//刷新宝库

    },

    changeStoreInfor(num,key,value){
        if(key == 'coolendtime'){
            this.storehouse[num].coolendtime = value;
        }else if(key == 'leftnum'){
            this.storehouse[num].leftnum -= value;
        }else if(key == 'vedionum'){
            this.storehouse[num].vedionum -= value;
        }else if(key == 'role'){
            this.storehouse[num].storelist[0].left -= value;
        }else if(key == 'mansp'){
            this.storehouse[num].storelist[1].left -= value;
        }else if(key == 'gold'){
            if(num == 0){
                this.storehouse[num].storelist[2].left -= value;
            }else{
                this.storehouse[num].storelist[1].left -= value;
            };
        }else if(key == 'pokersp'){
            this.storehouse[num].storelist[0].left -= value;
        }else if(key == 'lucklist'){
            this.storehouse[num].lucklist = value;
        };
    },

    changeNowActor(now){
        for(var i = 0;i < this.actors.length;i++){
            this.actors[i].now = 0;
            if(this.actors[i].avatar == now){
                this.actors[i].now = 1;
            };
        };
    },

    changeGoodsInfor(name,key,value){
        for(var i = 0;i < this.goods.length;i++){
            if(this.goods[i].name == name){
                if(key == 'nownum'){
                    this.goods[i].nownum += value;
                    if(this.goods[i].nownum == this.goods[i].limnum){
                        this.goods[i].hadbuy = 1;
                    };
                }else if(key == 'leftday'){
                    this.goods[i].leftday = value;
                };
            };
        };

    },

    changeActorInfor(name,key,value){
        cc.log("name",name);
        for(var i = 0;i < this.actors.length;i++){
            if(this.actors[i].avatar == name){
                if(key == 'had'){
                    this.actors[i].had = value;
                }else if(key == 'spnum'){
                    this.actors[i].spnum += value;
                }else if(key == 'tip'){
                    this.actors[i].tip = value;
                };
            };
        };
    },

    changePokerInfor(name,key,value){
        for(var i = 0;i < this.pokerlist.length;i++){
            if(this.pokerlist[i].back ==name){
                if(key == 'had'){
                    this.pokerlist[i].had = value;
                }else if(key == 'nownum'){
                    this.pokerlist[i].nownum += value;
                }else if(key == 'tip'){
                    this.pokerlist[i].tip = value;
                };
            };
        };
    },


    setGoldThing(size,who,img,name,num,x,xian){
        this.gthingsize = size;
        this.gthwho = who;
        this.gthimg = img;
        this.gthname = name;
        this.gthnum = num;
        this.gthx = x;
        this.gthxian = xian;
    },

    setManThing(size,who,img,name,num,x,xian){
        this.mthingsize = size;
        this.mthwho = who;
        this.mthimg = img;
        this.mthname = name;
        this.mthnum = num;
        this.mthx = x;
        this.mthxian = xian;
    },

    setPokerThing(size,who,img,name,num,x,xian){
        this.pthingsize = size;
        this.pthwho = who;
        this.pthimg = img;
        this.pthname = name;
        this.pthnum = num;
        this.pthx = x;
        this.pthxian = xian;
    },

    setNameThing(size,who,img,name,num,x,xian){
        this.nthingsize = size;
        this.nthwho = who;
        this.nthimg = img;
        this.nthname = name;
        this.nthnum = num;
        this.nthx = x;
        this.nthxian = xian;
    },

    setRoleThing(size,who,img,name,num,x,xian){
        this.rthingsize = size;
        this.rthwho = who;
        this.rthimg = img;
        this.rthname = name;
        this.rthnum = num;
        this.rthx = x;
        this.rthxian = xian;
    },

    setPokerTrainThing(size,who,img,name,num,x,xian){
        this.pothingsize = size;
        this.pothwho = who;
        this.pothimg = img;
        this.pothname = name;
        this.pothnum = num;
        this.pothx = x;
        this.pothxian = xian;
    },

    update (dt) {
        this.daytests[0].now = this.gamenum;
        this.daytests[1].now = this.winnum;
        this.daytests[2].now = this.enjoynum;
        this.daytests[3].now = this.gamenum;





        
    },
});
