 
cc.Class({
    extends: cc.Component,

    properties: {
        m_pokerBack:cc.Sprite,
        m_pokerFront:cc.Sprite,
        m_pokerName:cc.Label,
        m_pokerXian:cc.Label,
        m_pokerDescribe:cc.Label,
        m_pokerState:cc.Label,
        m_pokerBackAtlas:cc.SpriteAtlas,
         
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    showEachPoker(poker){
        this.m_pokerName.string = poker.name;
        this.m_pokerXian.string = poker.xian;
        this.m_pokerBack.spriteFrame = this.m_pokerBackAtlas.getSpriteFrame(poker.back.replace('_BACK','_ALL'));
        if(poker.had == 1){
            this.m_pokerState.string = '牌组已解锁';
            this.m_pokerDescribe.string = poker.describe;
        }else{
            this.m_pokerState.string = '牌组未解锁';
            this.m_pokerDescribe.node.active = false;
            cc.loader.loadRes('prefab/progressbar', function (err, prefab){
                this.m_Loading = cc.instantiate(prefab);
                this.m_Loading.y = -252;
                this.m_Loading.width = 400;
                this.m_Loading.height = 34;
                this.node.addChild(this.m_Loading);
                var child = this.m_Loading.getChildByName("pogressmid");
                child.x = -196;
                child.height = 26;
                var childchild = this.m_Loading.getChildByName("realnum");
                childchild.x = 190;
                this.m_Loading.getComponent('loading').setStartNum(poker.nownum,poker.limnum);
                this.m_Loading.getComponent('loading').setStartWhere((poker.nownum/poker.limnum),390);
            }.bind(this));
            if(poker.tip == 1){
                cc.loader.loadRes('prefab/showtip', function (err, prefab) {//动态加载预制体
                    this.m_showActorTip = cc.instantiate(prefab);
                    this.m_showActorTip.x = 112;
                    this.m_showActorTip.y = -320;
                    // this.m_showActorTip.x = 216;
                    // this.m_showActorTip.y = 328;
                    this.node.addChild(this.m_showActorTip);
                }.bind(this));
            };
        };



    },

    // update (dt) {},
});
