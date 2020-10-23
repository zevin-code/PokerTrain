 
cc.Class({
    extends: cc.Component,

    properties: {
       m_ProMaxLen:cc.Integer,
       m_ProImage:cc.Sprite,
       m_ProBgImage:cc.Sprite, 
       m_Speed:cc.Integer, 
       m_addLvNum:cc.Label,
       m_midicon:cc.Label,
       m_maxLvNum:cc.Label,
       m_Atlas:cc.SpriteAtlas,
    },

    setStartNum(pnow,pmax){
        this.m_addLvNum.string = pnow;
        this.m_maxLvNum.string = pmax;
    },

    setMatchProgress(tip){
      this.m_maxLvNum.string = tip;
      this.m_maxLvNum.fontSize = 28;
      this.m_midicon.node.active = false;
      this.m_addLvNum.node.active = false;
      this.m_ProImage.spriteFrame = this.m_Atlas.getSpriteFrame('smallwhite');
      this.m_ProBgImage.spriteFrame = this.m_Atlas.getSpriteFrame('smallgray');
    },

    setStartWhere(start,max){
        this.m_ProImage.node.width = start * max;
    },

    setProgress(max,pro){
       if(pro > 1 || pro < 0){
        return
       }
       this.SetWidth = max * pro
       // this.m_ProImage.width = setWidth
    },
 
    update (dt) {
        if(this.m_ProImage.node.width < this.SetWidth){
          this.m_ProImage.node.width += dt*this.m_Speed
        };
    },
});
