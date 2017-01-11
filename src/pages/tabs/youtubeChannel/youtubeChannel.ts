import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Network} from 'ionic-native';

import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

import { Platform } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';

/*  ============= Youtube Video ====================== */
@Component({
  selector: 'page-youtube-channel',
  templateUrl: 'youtubeChannel.html'
})
export class YoutubeChannelPage {
  videoUrl : any;
  window: any;
  cordova: any;
  
  constructor(public navCtrl: NavController, public sanitizer: DomSanitizer, private platform: Platform) {
    //let dangerousVideoUrl = 'https://www.youtube.com/user/tejgyan';
	//this.videoUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
    //let dangerousVideoUrl = 'https://www.youtube.com/embed/wRHBwykH_UU';
	
/*	  platform.ready().then(() => {
		if (cordova && cordova.InAppBrowser) {
		  window.open = cordova.InAppBrowser.open;
		}
	  }):
*/

let browser = new InAppBrowser('https://www.youtube.com/user/tejgyan', '_self');
//browser.executeScript(...);
//browser.insertCSS(...);
//browser.close();

  }

  ionViewDidLoad() {
    console.log('Hello Youtube Channel Page');
  }

  //============= check internet connection -----------------------------------------		
  noConnection() {
	/* states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);*/  
	return (Network.connection === 'none');
  } 
 
	
}
