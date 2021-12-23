class Scorer extends RenJS.Plugin {

    scorer = null;

	async onCall(params) {
        if (params.body == "REMOVE" && this.scorer){
            // remove scorer
            await this.game.screenEffects.transition.FADEOUT(this.scorer)
            this.scorer.destroy();
            this.game.resolveAction();
            return;
        }
        // I want to add different exit fade for the keywords REMOVE WITHNOFADE
        // if (params.body == "REMOVE WITHNOFADE" && this.scorer){
        //     // remove scorer
        //     await this.game.screenEffects.transition.FADEOUT(this.scorer)
        //     this.scorer.destroy();
        //     this.game.resolveAction();
        //     return;
        // }
		this.scorer = this.game.add.sprite(this.game.world.centerX+350, this.game.world.centerY-250, 'scorer'); //loads scorer gui under extras
        this.scorer.alpha = 0;
        this.scorer.anchor.set(0.5);
        const style = {...this.game.gui.hud.cHandlers.default.config.text.style};
        const message = this.game.managers.logic.parseVars(params.body);
        const text = this.game.add.text(0, 0, message, style);
        text.anchor.set(0.5);
        this.scorer.addChild(text);
        await this.game.screenEffects.transition.FADEIN(this.scorer);
        this.game.resolveAction();
	}
}

RenJSGame.addPlugin('Scorer',Scorer);
