 
cc.Class({
    extends: cc.Component,

    properties: {
       m_CloseButton:cc.Node,
       m_realList:cc.Node,
       m_testBg:cc.Node,
       m_actor:cc.Sprite,
       m_actorName:cc.Label,
       m_actorXian:cc.Label,
       m_avatarAtlas:cc.SpriteAtlas,
       m_setActorBtn:cc.Node,
       m_setActorBtnBG:cc.Node,
       m_setActorBtnMid:cc.Node,
       m_setActorBtnLab:cc.Label,
       m_collectBar:cc.Node,
       m_collectBarin:cc.Node,
       buttonSound:{
           type:cc.AudioClip,
           default:null,
       },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // var offSetNum = this.m_scrollView.getScrollOffset();
        // cc.log(offSetNum);
        // let maxScrollOffset = this.m_scrollView.getMaxScrollOffset();
        // this.m_scrollView.scrollToOffset(cc.v2(maxScrollOffset.x / 2, 0), 0.1);
        // this.m_scrollView.scrollToBottomRight(0.5, 0.1);
        this.nowMainBgm = cc.find('ROOTNODE').getComponent('transmit').getdata('bgm');
        this.actorList = cc.find('ROOTNODE').getComponent('transmit').getdata('actors');
        this.m_realList.width = this.actorList.length*166 + (this.actorList.length - 1)*16;
        this.m_actor.node.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(1,0.98,0.98),cc.moveTo(1,cc.v2(this.m_actor.node.x,this.m_actor.node.y + 8))),cc.spawn(cc.scaleTo(1,1,1),cc.moveTo(1,cc.v2(this.m_actor.node.x,this.m_actor.node.y - 8))))));
        this.setNowActor();
        var spnum = this.actorList[0].spnum;
        var spmax = this.actorList[0].spmax;
        this.setCollectBar(spnum,spmax);
    },
 
    setActorAvatar(actorName,actorHad,actorNow,actorTip){
        cc.loader.loadRes('prefab/actor-avatar', function (err, prefab) {//动态加载预制体
            this.m_eachAvatar = cc.instantiate(prefab);
            this.m_testBg.addChild(this.m_eachAvatar);
            this.m_eachAvatar.getComponent('actor-avatar').showEachActor(actorName,actorHad,actorNow,actorTip);
            this.m_eachAvatar.getComponent('actor-avatar').setButtonEvent(
                function(){
                    cc.find('ROOTNODE').getComponent('transmit').changeNowActor(actorName);
                } 
            );
        }.bind(this));
    },

    setNowActor(){
        var nowActorAvatar = cc.find('ROOTNODE').getComponent('transmit').getdata('nowActor');
        this.m_actor.spriteFrame = this.m_avatarAtlas.getSpriteFrame(nowActorAvatar);
        var actorArray1 = [];
        var actorArray0 = [];
        for(var i = 0;i < this.actorList.length;i++){
            if(this.actorList[i].had == 1){
                actorArray1.push(this.actorList[i]);
            }else{
                actorArray0.push(this.actorList[i]);
            };
        };
        var realActorArray = actorArray1.concat(actorArray0);
        cc.log("人物正确排序",realActorArray);
        cc.find('ROOTNODE').getComponent('transmit').setdata('actors',realActorArray);
        for(var i = 0;i < realActorArray.length;i++){
            var actorName = realActorArray[i].avatar;
            var actorHad = realActorArray[i].had;
            var actorNow = realActorArray[i].now;
            var actorTip = realActorArray[i].tip;
            this.setActorAvatar(actorName,actorHad,actorNow,actorTip);
            if(realActorArray[i].avatar == nowActorAvatar){
                var nowActorName = realActorArray[i].name;
                var nowActorXian = realActorArray[i].xian;
            };
        };
        this.m_actorName.string = nowActorName;
        this.m_actorXian.string = nowActorXian;
        
    },

    setCollectBar(spnum,spmax){
        cc.loader.loadRes('prefab/progressbar', function (err, prefab){
            this.m_Loading = cc.instantiate(prefab);
            this.m_Loading.width = 400;
            this.m_Loading.height = 34;
            this.m_collectBarin.addChild(this.m_Loading);
            var child = this.m_Loading.getChildByName("pogressmid");
            child.x = -196;
            child.height = 26;
            var childchild = this.m_Loading.getChildByName("realnum");
            childchild.x = 190;
            this.m_Loading.getComponent('loading').setStartNum(spnum,spmax);
            this.m_Loading.getComponent('loading').setStartWhere((spnum/spmax),390);
        }.bind(this));
    },

    onClickSetMyActor(){
        cc.audioEngine.play(this.buttonSound,false,1);
        var nowActorList = cc.find('ROOTNODE').getComponent('transmit').getdata('actors');
        for(var i = 0;i < nowActorList.length;i++){
            var myActorImg = nowActorList[i].avatar;
            var myActorName = nowActorList[i].name;
            var myActorXian = nowActorList[i].xian;
            if(nowActorList[i].now == 1){
                var theNowIndex = i;
                var theActor = myActorImg;
                var theActorName = myActorName;
                var theActorXian = myActorXian;
                if(this.iCanGet != 1){
                    cc.find('ROOTNODE').getComponent('transmit').setdata('nowActor',myActorImg);
                };
            };  
        };
        if(this.iCanGet == 1){
            cc.find('ROOTNODE').getComponent('transmit').changeActorInfor(theActor,'had',1);
            cc.find('ROOTNODE').getComponent('transmit').changeActorInfor(theActor,'tip',0);
            cc.find('ROOTNODE').getComponent('transmit').setRoleThing(2,'role',theActor,theActorName,'',1,theActorXian);
            cc.audioEngine.stop(this.nowMainBgm);
            cc.director.loadScene("getthing");
        };  
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

    update (dt) {
        // var offSetNum = this.m_scrollView.getScrollOffset();
        // cc.log(offSetNum);
        var outActorAvatar = cc.find('ROOTNODE').getComponent('transmit').getdata('nowActor');
        var nowActorList = cc.find('ROOTNODE').getComponent('transmit').getdata('actors');
        for(var i = 0;i < nowActorList.length;i++){
            var myActorName = nowActorList[i].avatar;
            if(nowActorList[i].now == 1){
                var nowActorAvatar = myActorName;
                this.myActorHad = nowActorList[i].had;
                this.spnum = nowActorList[i].spnum;
                this.spmax = nowActorList[i].spmax;
                // cc.log("碎片",this.spnum);
                // cc.log("碎片",this.spmax);

                  
                if(this.myActorHad != 1){
                    if(this.spnum >= this.spmax){
                        this.iCanGet = 1;
                    }else{
                        this.iCanGet = 0;
                    };
                };
                if(nowActorAvatar == outActorAvatar){
                    this.m_setActorBtnBG.color = new cc.Color(255,225,72);
                    this.m_setActorBtnLab.node.color = new cc.Color(255,225,72);
                    this.m_setActorBtnMid.color = new cc.Color(255,255,255);
                    this.m_setActorBtnLab.string = '当前形象';
                }else{
                    this.m_setActorBtnBG.color = new cc.Color(255,255,255);
                    this.m_setActorBtnLab.node.color = new cc.Color(255,255,255);
                    this.m_setActorBtnMid.color = new cc.Color(255,225,72);
                    this.m_setActorBtnLab.string = '设置出战';
                };
            };
        };
        this.m_actor.spriteFrame = this.m_avatarAtlas.getSpriteFrame(nowActorAvatar);
        if(this.iCanGet == 1){
            this.m_setActorBtn.active = true;
            this.m_collectBar.active = false;
            this.m_setActorBtnBG.color = new cc.Color(255,255,255);
            this.m_setActorBtnLab.node.color = new cc.Color(255,255,255);
            this.m_setActorBtnMid.color = new cc.Color(255,225,72);
            this.m_setActorBtnLab.string = '立即解锁';
        }else{
            if(this.myActorHad != 1){
                this.m_setActorBtn.active = false;
                this.m_collectBar.active = true;
                this.m_Loading.getComponent('loading').setStartNum(this.spnum,this.spmax);
                this.m_Loading.getComponent('loading').setStartWhere((this.spnum/this.spmax),390);
            }else{
                this.m_setActorBtn.active = true;
                this.m_collectBar.active = false;
            };
        };
        for(var i = 0;i < this.actorList.length;i++){
            if(this.actorList[i].avatar == nowActorAvatar){
                this.nowName = this.actorList[i].name;
                this.nowXian = this.actorList[i].xian;
            };
        };
        this.m_actorName.string = this.nowName;
        this.m_actorXian.string = this.nowXian;
    },
});
