 
cc.Class({
    extends: cc.Component,

    properties: {
        m_PokerOut:cc.Node,
        m_PokerCard:cc.Sprite,
        a_AtlasS:cc.SpriteAtlas,
        a_AtlasX:cc.SpriteAtlas,
        p_AtlasS:cc.SpriteAtlas,
        p_AtlasX:cc.SpriteAtlas,
    },

    setPoker(poker,ace){
        if(poker == 'art_one_BACK'){
            if(ace < 55){
                if(ace < 29){
                    this.m_PokerCard.spriteFrame = this.a_AtlasS.getSpriteFrame('art_one_'+ace);
                }else{
                    this.m_PokerCard.spriteFrame = this.a_AtlasX.getSpriteFrame('art_one_'+ace);
                };
            }else{
                ace -= 54;
                if(ace < 29){
                    this.m_PokerCard.spriteFrame = this.a_AtlasS.getSpriteFrame('art_one_'+ace);
                }else{
                    this.m_PokerCard.spriteFrame = this.a_AtlasX.getSpriteFrame('art_one_'+ace);
                };
            };
        }else if(poker == 'public_BACK'){
            if(ace < 55){
                if(ace < 29){
                    this.m_PokerCard.spriteFrame = this.p_AtlasS.getSpriteFrame('public_'+ace);
                }else{
                    this.m_PokerCard.spriteFrame = this.p_AtlasX.getSpriteFrame('public_'+ace);
                };
            }else{
                ace -= 54;
                if(ace < 29){
                    this.m_PokerCard.spriteFrame = this.p_AtlasS.getSpriteFrame('public_'+ace);
                }else{
                    this.m_PokerCard.spriteFrame = this.p_AtlasX.getSpriteFrame('public_'+ace);
                };
            };

        }
        
    },

    // update (dt) {},
});
