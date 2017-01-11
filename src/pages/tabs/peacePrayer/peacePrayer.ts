import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Network, LocalNotifications} from 'ionic-native';
import { WppNotificationPage } from '../../modals/wppNotification/wppNotification';

/* ---------------- World Peace Prayer ----------------------- */
@Component({
  selector: 'page-peace-prayer',
  templateUrl: 'peacePrayer.html'
})
export class PeacePrayerPage {
  wantReminder: boolean = false;
  wantPrayer: boolean = false;
  wantTestReminder: boolean = false;
  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage,
			  public modalCtrl: ModalController) {
      //console.log("----- peacePrayer.ts ---- constructor ---- LocalNotifications.getScheduled(859) --:" + JSON.stringify(LocalNotifications.getScheduled(859) ));
  	  

/*
	  LocalNotifications.isScheduled(859).then((isScheduled) => {
		if(isScheduled){
          this.wantReminder = true;
	  	}
	  });
      console.log("----- peacePrayer.ts ---- constructor ---- wantReminder --:" + this.wantReminder );
      
	  LocalNotifications.isScheduled(909).then((isScheduled) => {
		if(isScheduled){
          this.wantPrayer = true;
		}
	  });
      console.log("----- peacePrayer.ts ---- constructor ---- wantPrayer --:" + this.wantPrayer );
	  
	  LocalNotifications.isScheduled(3).then((isScheduled) => {
		if(isScheduled){
          this.wantTestReminder = true;
		}
	  });
      console.log("----- peacePrayer.ts ---- constructor ---- wantTestReminder --:" + this.wantTestReminder );



      LocalNotifications.on("trigger", (notification, state) => {
		  console.log('------peacePrayer.ts -------- constructor ------ Notification Trigged for ---- ' + notification.id);
		  
			if(notification.id == 909 || notification.id == 2109 || notification.id == 3) {
			    this.openWppNotificationPage();
			}
      });*/
    
      
  }

	openWppNotificationPage() {
		let modal = this.modalCtrl.create(WppNotificationPage);
		modal.present();
	}

  ionViewDidLoad() {
    //console.log('Hello Peace Prayer Page');
  }
  
  // =================== setAdvanceReminder ==========================
  setAdvanceReminder() {
      let dt = new Date();
      //this.wantReminder = !this.wantReminder;
      console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- wantReminder --:" + this.wantReminder );
    
      if(this.wantReminder == true){
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Scheduling Advance Reminder -----");
          let addToAM = 0;
          let addToPM = 0;
          if(dt.getHours() > 9 && dt.getHours() < 21) {
              addToAM = 1;
          }else{
              addToAM = 1;
              addToPM = 1;
          }
          let advRmdrAM = Date.parse( dt.getFullYear() +"-" + (dt.getMonth() + 1) + "-" + (dt.getDate() + addToAM) + "T03:29:00"); //8:59 - 5:30
          let advRmdrPM = Date.parse( dt.getFullYear() +"-" + (dt.getMonth() + 1) + "-" + (dt.getDate() + addToPM) + "T15:29:00"); //20:59 - 5:30
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- dt --:" + dt );
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- advRmdrAM --:" + new Date(advRmdrAM));
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- advRmdrPM --:" + new Date(advRmdrPM));
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Existing Scheduled IDs --:" + LocalNotifications.getScheduledIds().toString() );

      	  
          LocalNotifications.schedule([{
              id: 859,
              title: 'World Peace Prayer',
              text: '10 Mins to World Peace Prayer.',
              firstAt: advRmdrAM,
              every: 'day',
              led: '0000FF',
              sound: 'res://platform_default'
          },{
              id: 2059,
              title: 'World Peace Prayer',
              text: '10 Mins to World Peace Prayer.',
              firstAt: advRmdrPM,
              every: "day",
              led: '0000FF',
              sound: 'res://platform_default'
          }]);
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Scheduled IDs --:" + JSON.stringify(LocalNotifications.getScheduledIds()));
          
        
      }else{
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Canceling Scheduled Advance Reminder -----");
          LocalNotifications.cancel([859,2059]);
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Scheduled IDs --:" + JSON.stringify(LocalNotifications.getScheduledIds()));


      }
  }
  
  // =================== setReminderWithPrayer ==========================
  setReminderWithPrayer() {
      let dt = new Date();
      //this.wantPrayer = !this.wantPrayer;
      console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- wantReminder --:" + this.wantPrayer );
    
      if(this.wantPrayer == true){
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Scheduling Advance Reminder -----");
          let addToAM = 0;
          let addToPM = 0;
        if(dt.getHours() == 9) {
              if(dt.getMinutes() > 9) {
                  addToAM = 1;
              }
          }else if(dt.getHours() > 9 && dt.getHours() <= 20) {
              addToAM = 1;
          }else if(dt.getHours() == 21) {
              if(dt.getMinutes() < 9) {
                  addToAM = 1;
              }else {
                  addToAM = 1;
                  addToPM = 1;
              }
          }else if(dt.getHours() > 21) {
              addToAM = 1;
              addToPM = 1;
          }
          let prayerRmdrAM = Date.parse( dt.getFullYear() +"-" + (dt.getMonth() + 1) + "-" + (dt.getDate() + addToAM) + "T03:39:00"); //9:09-5:30
          let prayerRmdrPM = Date.parse( dt.getFullYear() +"-" + (dt.getMonth() + 1) + "-" + (dt.getDate() + addToPM) + "T15:39:00"); //21:09-5:30
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- dt --:" + dt );
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- advRmdrAM --:" + new Date(prayerRmdrAM));
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- advRmdrPM --:" + new Date(prayerRmdrPM));
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Existing Scheduled IDs --:" + JSON.stringify(LocalNotifications.getScheduledIds() ));

      	  
          LocalNotifications.schedule([{
              id: 909,
              title: 'World Peace Prayer',
              text: '9:9 >> Time to World Peace Prayer.',
              firstAt: prayerRmdrAM,
              every: 'day',
              led: '0000FF',
              sound: 'file://audio/wpprayer'
          },{
              id: 2109,
              title: 'World Peace Prayer',
              text: '9:9 >> Time to World Peace Prayer.',
              firstAt: prayerRmdrPM,
              every: 'day',
              led: '0000FF',
              sound: 'file://audio/wpprayer'
          }]);
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Scheduled IDs --:" + JSON.stringify(LocalNotifications.getScheduledIds()) );
                
        
        
      }else{
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Canceling Scheduled Advance Reminder -----");
          LocalNotifications.cancel([909,2109]);
          console.log("----- peacePrayer.ts ---- setAdvanceReminder() ---- Scheduled IDs --:" + JSON.stringify(LocalNotifications.getScheduledIds()) );
        
      }
  }
  
  // =================== setReminderWithPrayer ==========================
  set3MinReminder() {
      let dt = new Date();
      let addHr = 0;
      if(dt.getMinutes() > 30)
      {
        addHr = 1;
      }
	  let prayerTime1 = Date.parse( dt.getFullYear() +"-" + (dt.getMonth() + 1) + "-" + dt.getDate() + "T" + (dt.getHours() + 1) + ":00:00");
	  let prayerTime2 = Date.parse( dt.getFullYear() +"-" + (dt.getMonth() + 1) + "-" + dt.getDate() + "T" + (dt.getHours() + addHr) + ":30:00");
      //this.wantTestReminder = !this.wantTestReminder;
      console.log("----- peacePrayer.ts ---- set3MinReminder() ---- wantTestReminder --:" + this.wantTestReminder );
    
      if(this.wantTestReminder == true){
          console.log("----- peacePrayer.ts ---- set3MinReminder() ---- Scheduling 3 Min Reminder -----");
		  LocalNotifications.schedule([{
              id: 3,
              title: 'Hourly Reminder',
              text: 'This is hourly reminder to World Peace Prayer.',
              firstAt: prayerTime1,
              every: 'hour',
              led: '0000FF',
              sound: 'file://audio/wpprayer'
          },{
              id: 31,
              title: 'Hourly Reminder',
              text: 'This is hourly reminder to World Peace Prayer.',
              firstAt: prayerTime2,
              every: 'hour',
              led: '0000FF',
              sound: 'file://audio/wpprayer'
          }]);
          console.log("----- peacePrayer.ts ---- set3MinReminder() ---- Scheduled IDs --:" + JSON.stringify(LocalNotifications.getScheduledIds()) );
        
        
        
      }else{
          console.log("----- peacePrayer.ts ---- set3MinReminder() ---- Canceling Scheduled Advance Reminder -----");
          LocalNotifications.cancel(3);
		  LocalNotifications.cancel(31);
          console.log("----- peacePrayer.ts ---- set3MinReminder() ---- Scheduled IDs --:" + JSON.stringify(LocalNotifications.getScheduledIds()) );

      }
  }
  
}
