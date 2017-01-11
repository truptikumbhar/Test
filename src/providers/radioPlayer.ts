export class RadioPlayer {
  url:string;
  stream:any;
  promise:any;
  
 constructor() {
   //this.url = "http://akalmultimedia.net:8000/GDNSLDH";   // sample url >> working
   this.url = "http://38.107.243.226:8437/;stream.mp3//";
   this.stream = new Audio(this.url);
 };

 play() {
  console.log('--------- radioPlayer.ts ----------- play() -----------');
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
  console.log('--------- radioPlayer.ts ----------- pause() -----------');
  this.stream.pause();
};

}