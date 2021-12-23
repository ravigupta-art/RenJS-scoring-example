class Scorer extends RenJS.Plugin {

    scorer = null;
    text = null;

    async onCall(params) {
        if (params.body.includes("REMOVE") && this.scorer){
            // remove scorer
            if (params.body.includes("NOFADE")){
                await this.game.screenEffects.transition.FADEOUT(this.scorer)
            }
            this.scorer.destroy();
            this.scorer = null;
        }
        if (this.scorer){
            // Just change the scorer value
            this.text.text = this.game.managers.logic.parseVars(params.body);
        } else {
            this.scorer = this.game.add.sprite(this.game.world.centerX+350, this.game.world.centerY-250, 'scorer'); //loads scorer gui under extras
            this.scorer.alpha = 0;
            this.scorer.anchor.set(0.5);
            const style = {...this.game.gui.hud.cHandlers.default.config.text.style};
            const message = this.game.managers.logic.parseVars(params.body);
            this.text = this.game.add.text(0, 0, message, style);
            this.text.anchor.set(0.5);
            this.scorer.addChild(this.text);
            await this.game.screenEffects.transition.FADEIN(this.scorer);
        }
        this.game.resolveAction();
    }
}

RenJSGame.addPlugin('Scorer',Scorer);
