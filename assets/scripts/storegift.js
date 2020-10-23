 
cc.Class({
    extends: cc.Component,

    properties: {
        m_avatarAtlas:cc.SpriteAtlas,
        m_AtlasBG:cc.SpriteAtlas,
        m_storeAvatar:cc.Sprite,
        m_storeOver:cc.Sprite,
        m_storeAvatarBG:cc.Sprite,
        m_storeLeft:cc.Label,
        m_storeAll:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    showEachStore(store){
        if(store.grade == '2'){
            this.m_storeAvatarBG.spriteFrame = this.m_AtlasBG.getSpriteFrame('gray-bg-20');
        };
        if(store.type == 'mansp'){
            this.m_storeAvatar.spriteFrame = this.m_avatarAtlas.getSpriteFrame(store.avatar+'-sp');
        };
        if(store.type == 'role'){
            this.m_storeAvatar.spriteFrame = this.m_avatarAtlas.getSpriteFrame(store.avatar+'-avatar');
        };
        if(store.left == 0){
            this.m_storeOver.node.active = true;
        };
        this.m_storeLeft.string = store.left;
        this.m_storeAll.string = store.all;
    },

    // update (dt) {},
});
