import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-happyThoughts',
  templateUrl: 'happyThoughts.html'
})
export class HappyThoughtsPage {

  constructor(public navCtrl: NavController) {

  }
 mySlideOptions = {
    initialSlide: 1,
    loop: true
  };
}
