import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { RadioPlayer } from '../../../providers/radioPlayer';

@Component({
  selector: 'page-internetRadio',
  templateUrl: 'internetRadio.html'
})
export class InternetRadioPage {
	player:any;
	playing: boolean = false;
	
	constructor(player: RadioPlayer) {
		this.player = player;
	}

	play() {
		this.playing = true;
		this.player.play().then(() => {
			console.log('Playing');
		});
	}

	pause() {
		this.playing = false;
		this.player.pause();
	}

}
