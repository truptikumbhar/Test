import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

import { HappyThoughtsPage } from '../tabs/happyThoughts/happyThoughts';
import { YoutubeChannelPage } from '../tabs/youtubeChannel/youtubeChannel';
import { InternetRadioPage } from '../tabs/internetRadio/internetRadio';
import { PeacePrayerPage } from '../tabs/peacePrayer/peacePrayer';
import { SignUpPage } from '../auth/signUp/signUp';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HappyThoughtsPage;
  tab2Root: any = InternetRadioPage;
  tab3Root: any = YoutubeChannelPage;
  tab4Root: any = PeacePrayerPage;

  constructor(public events: Events) {

  }
  
  tabChanged() {
    this.events.publish('functionCall:tabChanged', true);
  }
}
