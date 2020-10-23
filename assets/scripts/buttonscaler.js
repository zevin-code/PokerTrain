
cc.Class({
    extends: cc.Component,

    properties: {
    	duration:0.1,
    	scaleRatio:0.8
    },   

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	let initScale = this.node.scale;
    	let scaleDownAction=cc.scaleTo(this.duration,this.scaleRatio)
    	let scaleUpAction=cc.scaleTo(this.duration,initScale)
    	//this.node.runAction(scaleDownAction)
    	this.node.on('touchstart',onTouchDown,this.node)
    	this.node.on('touchend',onTouchUp,this.node)
    	this.node.on('touchcancel',onTouchUp,this.node)

    	function onTouchDown(){
    		this.stopAllActions();
    		this.runAction(scaleDownAction)
    	}
    	function onTouchUp(){
    		this.stopAllActions();
    		this.runAction(scaleUpAction)
    	}
    },


    // start () {
    // 	cc.audioEngine.play(this.buttonSound,false,1);
    // },

    // update (dt) {},
});
