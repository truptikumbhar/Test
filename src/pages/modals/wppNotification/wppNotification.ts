import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LocalNotifications } from 'ionic-native';

/* ---------------- World Peace Prayer Notification Modal----------------------- */
@Component({
  selector: 'page-wppNotification',
  templateUrl: 'wppNotification.html'
})
export class WppNotificationPage {
	src:string;
	stream:any;
	promise:any;
	playing:boolean;

	constructor(public navCtrl : NavController) {
		//this.src = "http://38.107.243.226:8437/;stream.mp3//";
		this.src = "//audio/wpprayer";
		this.stream = new Audio(this.src);
		this.play().then(() => {
			console.log('Playing');
		});
	}

	play() {
	  console.log('--------- wppNotification.ts ----------- play() -----------');
		this.playing = true;
	   this.stream.play();
	   this.promise = new Promise((resolve,reject) => {
		 this.stream.addEventListener('playing', () => {
		   resolve(true);
		 });

		 this.stream.addEventListener('error', () => {
		   reject(false);
		 });
	   });

	  return this.promise;
	};

	pause() {
	  console.log('--------- wppNotification.ts ----------- pause() -----------');
	  this.playing = false;
	  this.stream.pause();
	};
  
	dismiss() {
		this.pause;
		this.navCtrl.pop();
	}
}
