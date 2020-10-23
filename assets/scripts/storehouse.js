 
cc.Class({
    extends: cc.Component,

    properties: {
        m_storeAtlas:cc.SpriteAtlas,
        m_publicAtlas:cc.SpriteAtlas,
        m_CloseButton:cc.Node,
        m_realList:cc.Node,
        m_storeName:cc.Label,
        m_storeDes:cc.Label,
        m_storeStart:cc.Label,
        m_storeEnd:cc.Label,
        m_leftNum:cc.Label,
        m_freeTime:cc.Label,
        m_vedioNum:cc.Label,
        m_storeImg:cc.Sprite,
        m_freeBtnBG:cc.Sprite,
        m_nextBtnBG:cc.Sprite,
        m_lastBtnBG:cc.Sprite,





        buttonSound:{
            type:cc.AudioClip,
            default:null,
        },
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.storeNum = 0;
        this.showStoreList();
        this.nowMainBgm = cc.find('ROOTNODE').getComponent('transmit').getdata('bgm');


    },

    start () {

    },

    showStoreList(){
        this.storeHouseList = cc.find('ROOTNODE').getComponent('transmit').getdata('storehouse');
        if(this.storeHouseList[this.storeNum].coolendtime[0] != ''){
            this.m_freeTime.string = '';
            this.showFreeTime();
        }else{
            this.m_freeBtnBG.spriteFrame = this.m_publicAtlas.getSpriteFrame('pur-bg-10');
            this.m_freeTime.node.color = new cc.Color(255,255,255);
            this.m_freeTime.string = '免费抽取';
        };
        this.m_storeImg.spriteFrame = this.m_storeAtlas.getSpriteFrame(this.storeHouseList[this.storeNum].imgbg);
        this.m_storeName.string = this.storeHouseList[this.storeNum].name;
        this.m_storeStart.string = this.storeHouseList[this.storeNum].start;
        this.m_storeEnd.string = this.storeHouseList[this.storeNum].end;
        this.m_storeDes.string = this.storeHouseList[this.storeNum].describe;
        this.m_leftNum.string = this.storeHouseList[this.storeNum].leftnum;
        this.m_vedioNum.string = this.storeHouseList[this.storeNum].vedionum;
        if(this.storeHouseList[this.storeNum].leftnum < 10){
        	this.m_leftNum.string = '0'+this.storeHouseList[this.storeNum].leftnum;
        };
        for(var i=0;i<this.storeHouseList[this.storeNum].storelist.length;i++){
            this.setStoreAvatar(this.storeHouseList[this.storeNum].storelist[i]);
        };
        if(this.storeNum <= (this.storeHouseList.length - 2)){
            this.m_nextBtnBG.spriteFrame = this.m_publicAtlas.getSpriteFrame('pur-bg-10');
            this.m_lastBtnBG.spriteFrame = this.m_publicAtlas.getSpriteFrame('gray-bg-10');
        };
        if(this.storeNum >= 1){
            this.m_nextBtnBG.spriteFrame = this.m_publicAtlas.getSpriteFrame('gray-bg-10');
            this.m_lastBtnBG.spriteFrame = this.m_publicAtlas.getSpriteFrame('pur-bg-10');
        };
    },

    setStoreAvatar(gift){
        cc.loader.loadRes('prefab/storegift', function (err, prefab) {//动态加载预制体
            this.m_storeGift = cc.instantiate(prefab);
            this.m_realList.addChild(this.m_storeGift);
            this.m_storeGift.getComponent('storegift').showEachStore(gift);
        }.bind(this));

    },

    onClickButton(target,data){
        cc.audioEngine.play(this.buttonSound,false,1);
        if(data == 'close'){
            this.node.active = false;
            cc.find('ROOTNODE').getComponent('transmit').setdata('beforePage','0');
        }else if(data =='free'){
            if(this.m_freeTime.string == '免费抽取'){
            	this.m_freeTime.string = '';
            	this.setLuckDraw();
                cc.find('ROOTNODE').getComponent('transmit').changeStoreInfor(this.storeNum,'leftnum',1);
                this.showFreeTime();
            };
        }else if(data =='vedio'){
            if(this.storeHouseList[this.storeNum].vedionum != 0){
            	this.setLuckDraw();
                cc.find('ROOTNODE').getComponent('transmit').changeStoreInfor(this.storeNum,'vedionum',1);
                cc.find('ROOTNODE').getComponent('transmit').changeStoreInfor(this.storeNum,'leftnum',1);



            };
        }else if(data =='next'){
            if(this.storeNum <= (this.storeHouseList.length - 2)){
                this.storeNum++;
                this.showStoreList();   
                this.m_realList.removeAllChildren();
            };
        }else if(data =='last'){
            if(this.storeNum >= 1){
                this.storeNum--;
                this.showStoreList(); 
                this.m_realList.removeAllChildren();
            };
        };
    },

    setLuckDraw(){//设置每次抽取的物品逻辑
        this.luckHouseList = cc.find('ROOTNODE').getComponent('transmit').getdata('storehouse');
        if(this.luckHouseList[this.storeNum].lucklist.length == 0){
        	var luckList = [];
        	for(var i=1;i<(this.luckHouseList[this.storeNum].leftnum+1);i++){
        		luckList.push(i);
        	};
        	var realLuckList = [];
        	for(var i=0;i<this.luckHouseList[this.storeNum].storelist.length - 1;i++){
        		var midCutNum = (this.luckHouseList[this.storeNum].leftnum)*(this.luckHouseList[this.storeNum].storelist[i].chance);
        		var leftLuckList = luckList.splice(midCutNum);
        		realLuckList.push(luckList);
        		var luckList = leftLuckList;
        	};
        	realLuckList.push(luckList);
        	cc.log(realLuckList);
        }else{
        	var realLuckList = this.luckHouseList[this.storeNum].lucklist;
        };
        var finalList = [];
        for(var i=0;i<realLuckList.length;i++){
        	for(var j=0;j<realLuckList[i].length;j++){
        		finalList.push(realLuckList[i][j]);
        	};
        };
        cc.log(finalList);
        var numindex = Math.floor(Math.random()*finalList.length)+1;//[1,max]
        var theLuckNum = finalList[numindex - 1];
        cc.log("幸运数字",theLuckNum);
        for(var i=0;i<realLuckList.length;i++){
        	if(realLuckList[i].indexOf(theLuckNum) >= 0){
        		realLuckList[i].splice(realLuckList[i].indexOf(theLuckNum),1);
                cc.find('ROOTNODE').getComponent('transmit').changeStoreInfor(this.storeNum,'lucklist',realLuckList);
        		var finalGift = this.luckHouseList[this.storeNum].storelist[i];
        		cc.log(finalGift);
                cc.find('ROOTNODE').getComponent('transmit').changeStoreInfor(this.storeNum,finalGift.type,finalGift.everynum);
        		if(finalGift.type == 'role'){
                    cc.find('ROOTNODE').getComponent('transmit').setRoleThing(2,finalGift.type,finalGift.avatar,finalGift.name,'',finalGift.x,finalGift.xian);
	            }else if(finalGift.type == 'mansp'){
	                cc.find('ROOTNODE').getComponent('transmit').setManThing(1,finalGift.type,finalGift.avatar+'-sp',finalGift.name,finalGift.everynum,finalGift.x,finalGift.xian);
	            }else if(finalGift.type == 'gold'){
	                cc.find('ROOTNODE').getComponent('transmit').setGoldThing(1,finalGift.type,finalGift.avatar,finalGift.name,finalGift.everynum,finalGift.x,finalGift.xian);
	            };
	            // else if(finalGift.type == 'pokersp'){
	            //     cc.find('ROOTNODE').getComponent('transmit').setManThing(1,finalGift.type,finalGift.avatar+'-sp',finalGift.name,finalGift.everynum,finalGift.x,finalGift.xian);
	            // }else if(finalGift.type == 'name'){
	            //     cc.find('ROOTNODE').getComponent('transmit').setManThing(1,finalGift.type,finalGift.avatar,finalGift.name,finalGift.everynum,finalGift.x,finalGift.xian);
	            // }else if(finalGift.type == 'poker'){
	            //     cc.find('ROOTNODE').getComponent('transmit').setManThing(1,finalGift.type,finalGift.avatar,finalGift.name,finalGift.everynum,finalGift.x,finalGift.xian);
	            // };
	            cc.audioEngine.stop(this.nowMainBgm);
	            cc.director.loadScene("getthing");
        		cc.log("抽中了几等奖",i+1);//根据i的值确定本次抽取的奖品内容，
        	};
        };

    },

    showFreeTime(){
        var date = new Date();
        var nowSeconds = date.getTime();
        if(this.storeHouseList[this.storeNum].coolendtime[0] != ''){
            var endTime = this.storeHouseList[this.storeNum].coolendtime;
            cc.log("endTime",endTime);
        }else{
            var timeY = date.getFullYear();
            var timeM = date.getMonth()+1;
            var timeD = date.getDate();
            var timeH = date.getHours();
            var timeMi = date.getMinutes();
            var timeS = date.getSeconds();
            var startTimeO = [timeY+'/'+timeM+'/'+timeD,timeH,timeMi,timeS];
            if(timeM <= 9) timeM = "0"+timeM;
            if(timeD <= 9) timeD = "0"+timeD;
            if(timeH <= 9) timeH = "0"+timeH;
            if(timeMi <= 9) timeMi = "0"+timeMi;
            if(timeS <= 9) timeS = "0"+timeS;
            var startTime = timeY+'-'+timeM+'-'+timeD+' '+timeH+':'+timeMi+':'+timeS;
            var coolingTime = this.storeHouseList[this.storeNum].coolingtime;
            var coolingTimeNum = coolingTime.split(":");
            var endTime = this.getEndTime(startTime,coolingTimeNum[0],coolingTimeNum[1],coolingTimeNum[2],coolingTimeNum[3]);
            cc.find('ROOTNODE').getComponent('transmit').changeStoreInfor(this.storeNum,'coolendtime',endTime); 
        };
        var endtimeDate = new Date(endTime[0]);
        var endSeconds = endtimeDate.getTime() + endTime[1] * 60 * 60 * 1000 + endTime[2] * 60 * 1000 + endTime[3] * 1000;
        this.lefttimeSeconds = Math.round(endSeconds - nowSeconds);
    },

    getEndTime(startTime,days,hours,mins,secs){
        var nd = new Date(Date.parse(startTime.replace(/-/g, "/"))); //改为标准格式：2016/04/05 09:29:15 
            nd = nd.valueOf(); //转换为毫秒数
            nd = nd + days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + mins * 60 * 1000 + secs * 1000;
            nd = new Date(nd);
            var y = nd.getFullYear();
            var m = nd.getMonth()+1;
            var d = nd.getDate();
            var hh = nd.getHours();
            var mm = nd.getMinutes();
            var ss = nd.getSeconds();
            var date = [y+'/'+m+'/'+d,hh,mm,ss];
            return date; //结束时间 2016-04-07 13:34:15
    },

    update (dt) {//更新免费抽取的倒计时显示
    	if(this.m_freeTime.string != '免费抽取'){
    		this.m_freeBtnBG.spriteFrame = this.m_publicAtlas.getSpriteFrame('gray-bg-10');
    		this.m_freeTime.node.color = new cc.Color(51,51,51);
    		var leftd = Math.floor(this.lefttimeSeconds/(1000*60*60*24));  //计算天数
    		var lefth = Math.floor(this.lefttimeSeconds/(1000*60*60)%24);  //计算小时数
    		var leftm = Math.floor(this.lefttimeSeconds/(1000*60)%60); //计算分钟数
    		var lefts = Math.floor(this.lefttimeSeconds/1000%60);  //计算秒数
    		if(lefth <= 9) lefth = '0'+lefth;
    		if(leftm <= 9) leftm = '0'+leftm;
    		if(lefts <= 9) lefts = '0'+lefts;
    		this.m_freeTime.string = lefth+':'+leftm+':'+lefts;
    		this.lefttimeSeconds-= 10;
    		if(this.lefttimeSeconds <= 1000){
    		    this.m_freeBtnBG.spriteFrame = this.m_publicAtlas.getSpriteFrame('pur-bg-10');
    		    this.m_freeTime.string = '免费抽取';
    		    this.m_freeTime.node.color = new cc.Color(255,255,255);
    		    cc.find('ROOTNODE').getComponent('transmit').changeStoreInfor(this.storeNum,'coolendtime',["",0,0,0]);
    		};
    	};
    },
});
