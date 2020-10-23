const ROUNDNUM = 20;  // 一局回合数
const ACTCUT = -2;  // 每局对局所消耗的体力


cc.Class({
    extends: cc.Component,

    properties: {
        m_PokerTrain:cc.Node,
        m_notchTOP:cc.Node,
        m_PokerPrefab:cc.Prefab,
        m_Tipshow:cc.Prefab,
        m_RootNode:cc.Node,
        m_NowPoker:cc.Label,
        m_RoundNum:cc.Label,
        m_DataNum:cc.Integer,
        m_TablePoker:cc.Label,
        m_PokerButton:cc.Animation,
        m_RobPoker:cc.Label,
        m_PokerLight:cc.Animation,
        m_RobotPoker:cc.Animation,
        m_actor:cc.Sprite,
        m_usePokerCard:cc.Sprite,
        y_actor:cc.Sprite,
        m_avatarAtlas:cc.SpriteAtlas,
        m_pokerAtlas:cc.SpriteAtlas,
        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
        addPokerSound:{
            type:cc.AudioClip,
            default:null,
        },  
    },

    ctor:function(){
        this.pokerTrain = [];
        this.playerList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54];
        this.robotList = [55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108];
        this.rob = 1;
    },

    onLoad(){
        var nowActorAvatar = cc.find('ROOTNODE').getComponent('transmit').getdata('nowActor');
        this.nowPokerCard = cc.find('ROOTNODE').getComponent('transmit').getdata('nowPoker');
        this.actorList = cc.find('ROOTNODE').getComponent('transmit').getdata('actors');
        this.notchSize = cc.find('ROOTNODE').getComponent('transmit').getdata('notch');
        var robotActor = Math.floor(Math.random()*this.actorList.length)+0;
        var nowRobotActor = this.actorList[robotActor].avatar;
        this.m_actor.spriteFrame = this.m_avatarAtlas.getSpriteFrame(nowActorAvatar);
        this.y_actor.spriteFrame = this.m_avatarAtlas.getSpriteFrame(nowRobotActor);
        this.m_usePokerCard.spriteFrame = this.m_pokerAtlas.getSpriteFrame(this.nowPokerCard);
        this.m_actor.node.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(1,0.68,0.68),cc.moveTo(1,cc.v2(this.m_actor.node.x,this.m_actor.node.y + 8))),cc.spawn(cc.scaleTo(1,0.7,0.7),cc.moveTo(1,cc.v2(this.m_actor.node.x,this.m_actor.node.y - 8))))));
        this.y_actor.node.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(1,0.68,0.68),cc.moveTo(1,cc.v2(this.y_actor.node.x,this.y_actor.node.y + 8))),cc.spawn(cc.scaleTo(1,0.7,0.7),cc.moveTo(1,cc.v2(this.y_actor.node.x,this.y_actor.node.y - 8))))));


    },

    start () {
        this.addFristPoker();
        this.m_NowPoker.string =54;
        this.m_RobPoker.string =54;
        this.m_RoundNum.string =1;
        this.m_TablePoker.string =1;
        this.pokerRotation = false;
        this.rotationSpeed = 0;
        this.deleteTrain = [];
        this.whyNextRound = 3;
        this.m_RobotPoker.is3DNode = true;
        this.m_RobotPoker.node.active = false;
        this.theRobotRound();
        this.m_PokerButton.is3DNode = true;
        this.m_PokerButton.offPokerBut = function(){
            this.m_PokerButton.node.active = false;
            this.setDeleteTrain();
        }.bind(this);
        this.m_PokerButton.pokerButLight = function(){
            this.m_PokerButton.node.active = true;
            this.m_PokerLightAni = this.m_PokerLight.getClips();
            this.m_PokerLight.play(this.m_PokerLightAni[0].name);
            this.m_PokerLight.node.active = true;
        }.bind(this);
        this.m_RobotPoker.RobotOffPoker = function(){
            this.m_RobotPoker.node.active = false;
            this.setDeleteTrain();
        }.bind(this);
        if(this.notchSize){
            this.m_notchTOP.y += this.notchSize;
        };
    },

    onClickButton(target,data){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(data == 'index'){
            cc.loader.loadRes('prefab/tiptip', function (err, prefab) {//动态加载预制体
                let m_Tip = cc.instantiate(prefab);
                this.m_RootNode.addChild(m_Tip);
                m_Tip.getComponent('tipshow').showTipAll('中途退出直接判负是否直接退出',function(){
                    //此处传入的是一个提示框的文本和确定，取消，关闭三个回调函数，一般只用写确定的回调
                    this.node = cc.director.getScene("index").getChildByName('ROOTNODE');
                    this.node.getComponent('transmit').setdata('act',Math.abs(ACTCUT));
                    cc.audioEngine.play(this.buttonSound,false,1);
                    cc.director.loadScene("index");
                });
            }.bind(this));          
        };
    },

    addFristPoker(){
        var arr = this.playerList;
        var num = Math.floor(Math.random()*arr.length)+1;
        this.pokerTrain.unshift(num);
        this.positions = [];
        this.m_PokerCardList = [];
        this.showPokerTrain('public_BACK',num);
    },

    showPokerTrain(poker,ace){
        let x = 0;
        let y = -104 - this.pokerTrain.length * 64;
        let m_PokerCard = cc.instantiate(this.m_PokerPrefab);
        this.m_PokerTrain.addChild(m_PokerCard);
        m_PokerCard.getComponent('setPokerNumber').setPoker(poker,ace);
        m_PokerCard.is3DNode = true;
        m_PokerCard.setPosition(cc.v2(x,y));
        this.positions.push({
            x: x,
            y: y
        });
        this.m_PokerCardList.push(m_PokerCard);
    },

    endGameFunc(res){
        this.node = cc.director.getScene("index").getChildByName('ROOTNODE');//获取节点的node脚本组件，并调用脚本里面的函数
        this.node.getComponent('transmit').setdata('res',res);
        cc.director.loadScene("endgame");
    },

    theRobotRound(){
        if(this.robotList.length == 0){
            this.endGameFunc(1);
        }else if(this.playerList.length == 0){
            this.endGameFunc(2);
        }else{
            var n = this.rob%2;
            if(this.m_RoundNum.string < ROUNDNUM + 1){
                if(n == 0){//人机发牌
                    this.pokerList = this.robotList;
                    this.whyNextRound = 1;
                    this.m_RobotPoker.node.active = true;
                    this.m_RobotPoker.node.y = (306 - 64*this.pokerTrain.length);//确定thepoker按钮位置   
                    var timeCall = function (dt) {
                      this.addPoker();
                    };
                    this.scheduleOnce(timeCall,1);          
                }else{//玩家发牌
                    if((this.m_RoundNum.string == ROUNDNUM) && (this.whyNextRound == 1)){
                        if(this.robotList.length == this.playerList.length){
                            this.endGameFunc(3);
                        }else if(this.robotList.length > this.playerList.length) {
                            this.endGameFunc(2);
                        }else {
                            this.endGameFunc(1);
                        };
                    }else{
                        this.pokerList = this.playerList;
                        if(this.whyNextRound ==1){this.m_RoundNum.string = (this.m_DataNum++).toString();};//再次玩家发牌时回合数+1
                        this.whyNextRound = 2;
                        this.m_PokerButton.node.active = true;
                        this.m_PokerButton.node.y = (306 - 64*this.pokerTrain.length);//确定thepoker按钮位置
                        this.m_PokerLight.node.y = (302 - 64*this.pokerTrain.length);
                        this.pokerBuAniTwo = this.m_PokerButton.getClips();
                        if(this.rob == 1){
                            this.m_PokerButton.playAdditive(this.pokerBuAniTwo[1].name);
                        }else{
                            this.m_PokerButton.playAdditive(this.pokerBuAniTwo[2].name);
                        };
                    };            
                };     
            };
        };  
    
    },

    addPoker(){
        cc.audioEngine.play(this.addPokerSound,false,1);        
        let c = this.rob%2;
        if(c != 0){
            this.m_PokerLight.stop(this.m_PokerLightAni[0].name);
            this.m_PokerLight.node.active = false;
            this.pokerBuAniOne = this.m_PokerButton.getClips();
            this.m_PokerButton.playAdditive(this.pokerBuAniOne[0].name);
        }else{
            this.pokerBuAniThree = this.m_RobotPoker.getClips();
            this.m_RobotPoker.play(this.pokerBuAniThree[0].name);
        };
        let index = Math.floor(Math.random()*this.pokerList.length)+0;
        this.pokerNum = this.pokerList[index];
        //翻牌动画：(玩家会显示按钮，动画只有翻牌，然后隐藏按钮；电脑不会显示按钮，动画有点击按钮＋翻牌 )
        var pokerNumFont = this.pokerList[index-1];
        this.pokerTrain.push(this.pokerNum);
        // this.showPokerTrain(this.pokerNum);
        if(index != 0){
            var midNum = this.pokerList[index];
            this.pokerList[index] = this.pokerList[0];
            this.pokerList[0] = midNum;
        };
        this.pokerList.shift();
        //选中的牌和第一张交换后再删除第一张
        if(c == 0){
           this.showPokerTrain('public_BACK',this.pokerNum);
           this.m_RobPoker.string = this.pokerList.length;
           this.m_TablePoker.string = this.pokerTrain.length;
           
        }else{
           this.showPokerTrain(this.nowPokerCard,this.pokerNum);
           this.m_NowPoker.string = this.pokerList.length;
           this.m_TablePoker.string = this.pokerTrain.length;
        };
    },

    setDeleteTrain(){
        let a = this.rob%2;
        var oldNum = this.pokerTrain.length;
        if(this.pokerTrain.length != 1){
            if(this.pokerNum > 54){
                var zanPoker = this.pokerNum - 54;
            }else{
                var zanPoker = this.pokerNum;
            };
                for(var i=0;i<this.pokerTrain.length-1;i++){
                    if(this.pokerTrain[i] > 54){
                        var shiPoker = this.pokerTrain[i] - 54;
                    }else{
                        var shiPoker = this.pokerTrain[i];
                    };
                    if(Math.ceil(shiPoker / 4) == Math.ceil(zanPoker / 4)){
                        var deleteTrain = this.pokerTrain.splice(i);
                        this.pokerList = this.pokerList.concat(deleteTrain);
                        break;
                    };
                };
        };
        var nowNum = this.pokerTrain.length; 
        if(nowNum == 0){
            for(var i = 0;i < this.m_PokerCardList.length;i++){
                let deletepoker = this.m_PokerCardList[i];
                if(a%2 != 0){
                var moveTo = cc.moveTo(1,cc.v2(-300,-1000));
                }else{
                var moveTo = cc.moveTo(1,cc.v2(300,-1000));
                };
                var scaleTo = cc.scaleTo(0.5,0.4,0.4);
                var delay1 = cc.delayTime(1);
                var delay2 = cc.delayTime(0.4);
                var getPoker = cc.spawn(moveTo,scaleTo);
                var nowFace = cc.callFunc(function(){
                    deletepoker.destroy();
                });
                var postPoker = cc.sequence(delay1,getPoker,nowFace,delay2);
                deletepoker.runAction(postPoker);
            };
            this.positions = [];
            this.m_PokerCardList = [];
            var yin = true;
        }else if(nowNum < this.positions.length){
            for(var i = nowNum;i < this.positions.length;i++){
                let deletepoker = this.m_PokerCardList[i];
                if(a%2 != 0){
                var moveTo = cc.moveTo(1,cc.v2(-300,-1000));
                }else{
                var moveTo = cc.moveTo(1,cc.v2(300,-1000));
                };
                var scaleTo = cc.scaleTo(0.5,0.4,0.4);
                var delay1 = cc.delayTime(1);
                var delay2 = cc.delayTime(0.4);
                var getPoker = cc.spawn(moveTo,scaleTo);
                var nowFace = cc.callFunc(function(){
                    deletepoker.destroy();
                });
                var postPoker = cc.sequence(delay1,getPoker,nowFace,delay2);
                deletepoker.runAction(postPoker);
            };
            this.positions.splice(nowNum);
            this.m_PokerCardList.splice(nowNum);
            var yang = true;
        };
        
        //动画：判断可以收取扑克牌。需要：判断收取几张，收到对应人物方向。不需要：无动画。
        
        if(a == 0){
           this.robotList = this.pokerList;
           this.m_RobPoker.string = this.pokerList.length;
           this.m_TablePoker.string = this.pokerTrain.length;
           
        }else{
            this.playerList = this.pokerList;
            this.m_NowPoker.string = this.pokerList.length;
            this.m_TablePoker.string = this.pokerTrain.length;
        };

        //拓展动画：改变双方站台的高度。 

        if(yin || yang){
            this.rob += 2;//有收牌就继续出牌
        }else{
            this.rob += 1;
        };      
        var timeCallback = function (dt) {
          this.theRobotRound();
        }
        this.scheduleOnce(timeCallback, 2); 
    },

 
 
    // update (dt) {
    
    // },

    
    

    
 
});
