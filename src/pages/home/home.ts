import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { DropboxProvider } from '../../providers/dropbox/dropbox';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { HttpClient } from "@angular/common/http";
// import { Media, MediaObject } from '@ionic-native/media';

import firebase from 'firebase';

import { FileOpener } from '@ionic-native/file-opener';


declare var cordova:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    stimmgruppe="";

    meldung="nichts";
    musik="";
    imageUrl="";
    mp3file: any;
    mp3Link = "";
    pdfLink = "";
    LoadingDialog: any;

    fileTempLinks = {};

  depth: number = 0;
  folders: any;

    storageDirectory: string = '';



    duration: any = -1;
    position: any = 0;

    get_position_interval: any;
    get_duration_interval: any;

    message: any;

    is_playing: boolean = false;
    is_in_play: boolean = false;
    is_ready: boolean = false;
    is_device: boolean = true;

  constructor(public navCtrl: NavController, public dropbox: DropboxProvider, public loadingCtrl: LoadingController,
              private transfer: FileTransfer, private file: File,
              public platform: Platform, public alertCtrl: AlertController,
               private fileOpener: FileOpener
              ) {

      let userId = firebase.auth().currentUser.uid;
      let probeMitgliederRef = firebase.database().ref('users/' + userId + '/Stimmgruppe/');
      let that=this;
      probeMitgliederRef.on('value', function(snapshot) {
          if (snapshot.val()) that.stimmgruppe = snapshot.val();
      });

      this.platform.ready().then(() => {
          // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
          if(!this.platform.is('cordova')) {
              this.is_device = false;
          }

          if (this.platform.is('ios')) {
              this.storageDirectory = cordova.file.documentsDirectory;
          }
          else if(this.platform.is('android')) {
              this.storageDirectory = cordova.file.dataDirectory;
          }
          else {
              // exit otherwise, but you could add further types here e.g. Windows
              return false;
          }



      });

  }


    // Kopie der Datei von einem Server (scheint für Dropbox nicht geeignet)
    downloadImage(image) {

        this.platform.ready().then(() => {


            const fileTransfer: FileTransferObject = this.transfer.create();

            const imageLocation = `${cordova.file.applicationDirectory}www/assets/imgs/${image}`;

            fileTransfer.download(imageLocation, this.storageDirectory + image).then((entry) => {

                const alertSuccess = this.alertCtrl.create({
                    title: `Download Succeeded!`,
                    subTitle: `${image} was successfully downloaded to: ${entry.toURL()}`,
                    buttons: ['Ok']
                });
                this.imageUrl = entry.toURL();
                alertSuccess.present();

            }, (error) => {

                const alertFailure = this.alertCtrl.create({
                    title: `Download Failed!`,
                    subTitle: `${image} was not successfully downloaded. Error code: ${error.code}`,
                    buttons: ['Ok']
                });

                alertFailure.present();

            });

        });
    }

    /*
    downloadMusicFromDropbox(name)
    {
        this.platform.ready().then(() => {
            let loading = this.loadingCtrl.create({
                content: 'Download: '+name
            });
            loading.present();
            this.dropbox.download("/awomensworth/"+name).subscribe(data => {

                this.file.writeFile(this.storageDirectory,name,data,{ replace: true });
                this.musik= name;
                this.meldung = "" + this.musik;
                loading.dismiss();
                this.mp3file = new MediaObject(this.media.create(this.storageDirectory.replace(/^file:\/\//, '') + name));
                // this.mp3file = new MediaObject(this.media.create("https://dl.dropboxusercontent.com/apitl/1/AACf937tg-OADaHA-Mxlxzo9O6VjokuXf9wNhteHRVlfV7N1hhxqYPdXmM1By-n6mpzLYXTtYp4YGH66wCiliGKR26zlqw3hhkRsX-j1D-ITcrJ8u8_7OHR2A7uhwrzgAhdylJqXZGgatuAcHvjn43Cm22QpHfJCs5NKlo7avl9t5LL8t43uQMUufe5fuoCdIHN5G5ao-XGF_9FR9pqVBCLes3Qr_2izcyBXKoizH0iiiHwn_pc058RA1STjR4Wex3hNOEz3dXR0sC0ZiFKoPuDrTebFgjXVTosvC5Td09W4krDqlNtlqqIYGz4ZA-t1NkM"));
                this.getDurationAndSetToPlay();
            }, (err) => {
                this.meldung = "error: "+err;
                loading.dismiss();
                console.log(err);
            });
        });
    }
    */

    getDurationAndSetToPlay() {
        this.mp3file.play();
        this.mp3file.setVolume(0.0);  // you don't want users to notice that you are playing the file
        let self = this;
        this.get_duration_interval = setInterval(function() {
            if(self.duration == -1) {
                self.duration = ~~(self.mp3file.getDuration());  // make it an integer
                // self.duration_string = self.fmtMSS(self.duration);   // replaced by the Angular DatePipe
            } else {
                self.mp3file.stop();
                self.mp3file.release();
                self.setRecordingToPlay();
                clearInterval(self.get_duration_interval);
            }
        }, 100);
    }

    setRecordingToPlay() {

        this.mp3file.onStatusUpdate.subscribe(status => {
            // 2: playing
            // 3: pause
            // 4: stop
            this.message = status;
            switch(status) {
                case 1:
                    this.is_in_play = false;
                    break;
                case 2:   // 2: playing
                    this.is_in_play = true;
                    this.is_playing = true;
                    break;
                case 3:   // 3: pause
                    this.is_in_play = true;
                    this.is_playing = false;
                    break;
                case 4:   // 4: stop
                default:
                    this.is_in_play = false;
                    this.is_playing = false;
                    break;
            }
        })
        this.message = "audio file set";
        this.is_ready = true;
        this.getAndSetCurrentAudioPosition();
    }

    /*
    retrieveMusic() {
        this.file.checkFile(this.storageDirectory, "musik.mp3")
            .then(() => {

                const alertSuccess = this.alertCtrl.create({
                    title: `File retrieval Succeeded!`,
                    subTitle: `musik.mp3 was successfully retrieved from: ${this.storageDirectory}`,
                    buttons: ['Ok']
                });

                this.mp3file = new MediaObject(this.media.create(this.storageDirectory.replace(/^file:\/\//, '') + 'musik.mp3'));
                this.mp3file.play();
                return alertSuccess.present();

            })
            .catch((err) => {

                const alertFailure = this.alertCtrl.create({
                    title: `File retrieval Failed!`,
                    subTitle: `musik.mp3 was not successfully retrieved. Error Code: ${err.code}`,
                    buttons: ['Ok']
                });

                return alertFailure.present();

            });
    }
    */

    retrieveImage(image) {

        this.file.checkFile(this.storageDirectory, image)
            .then(() => {

                const alertSuccess = this.alertCtrl.create({
                    title: `File retrieval Succeeded!`,
                    subTitle: `${image} was successfully retrieved from: ${this.storageDirectory}`,
                    buttons: ['Ok']
                });

                return alertSuccess.present();

            })
            .catch((err) => {

                const alertFailure = this.alertCtrl.create({
                    title: `File retrieval Failed!`,
                    subTitle: `${image} was not successfully retrieved. Error Code: ${err.code}`,
                    buttons: ['Ok']
                });

                return alertFailure.present();

            });
    }

  ionViewDidLoad(){


      this.dropbox.setAccessToken("yuJf6AR8f2IAAAAAAABCb0luLfWJxFO-ceA0MuiaXuknRBcXE6_xbIAYFgvSLPdg");
      this.folders = [];

      let loading = this.loadingCtrl.create({
        content: 'Einen Moment bitte...'
      });

      loading.present();

      this.dropbox.getFolders('/Reportoire').subscribe(data => {
        this.folders = data.entries;
        this.folders.sort(this.compare);
        loading.dismiss();
      }, (err) => {
        console.log(err);
      });

  }

    // Wird für die Sortierung der Dateinamen benötigt.
    compare(a,b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

  openFolder(path){
 	  let loading = this.loadingCtrl.create({
	    content: 'Einen Moment bitte...'
	  });

	  loading.present();

	  this.dropbox.getFolders(path).subscribe(data => {
	    this.folders = data.entries;
	    let self = this;

        // console.log("Folder:");
        this.folders.forEach(function(folder) {

             console.log(folder);

            self.dropbox.getLink(folder.path_lower).subscribe(data => {
                self.fileTempLinks[folder.path_lower]= data.link;
            }, err => { console.log("Warum??");});


        });



	    this.depth++;
	    loading.dismiss();
	  }, err => {
	    console.log(err);
	  });
}



  goBack(){
	 	let loading = this.loadingCtrl.create({
	    content: 'Syncing from Dropbox...'
	  });

	  loading.present();

	  this.dropbox.goBackFolder().subscribe(data => {
	    this.folders = data.entries;
	    this.depth--;
	    loading.dismiss();
	  }, err => {
	    console.log(err);
	  });
  }




    fileIsViewable(name) {
      return  (name.substr(name.length-3,3) == "mp3" || name.substr(name.length-3,3) == "pdf");
    }


    downloadAllowed(name) {
      let isPDF=name.substr(name.length-3,3) == "pdf"
        let probemitglied=false;
        if (this.stimmgruppe=="Probemitglied") {
          probemitglied=true;
        }
      return !(probemitglied && isPDF);
    }

    openFile(name) {
        let dateityp =  name.substr(name.length-3,3)
        if (dateityp==="pdf") {
            this.LoadingDialog = this.loadingCtrl.create({
                content: 'PDF-Datei wird gleich unten angezeigt... '
            });
        }
        if (dateityp==="mp3") {
            this.LoadingDialog = this.loadingCtrl.create({
                content: 'Audio-Datei wird gleich oben angezeigt... '
            });
        }
        this.LoadingDialog.present();
        this.dropbox.getLink(name).subscribe(data => {
            if(dateityp == "pdf" ) {
                this.pdfLink = data.link;
            }
            else if (dateityp == "mp3") {
                this.mp3Link="";
                setTimeout(() => this.mp3Link = data.link, 0);
                this.LoadingDialog.dismiss();

            }
        }, err => {

        });




    }

    playMusic() {
        this.mp3file.play();
    }

    stopMusic() {
        this.mp3file.stop();
    }

    getAndSetCurrentAudioPosition() {

        let diff = 1;
        let self = this;
        this.get_position_interval = setInterval(function() {
            let last_position = self.position;
            self.mp3file.getCurrentPosition().then((position) => {
                if (position >= 0 && position < self.duration) {
                    if(Math.abs(last_position - position) >= diff) {
                        // set position
                        self.mp3file.seekTo(last_position*1000);
                    } else {
                        // update position for display
                        self.position = position;
                    }
                } else if (position >= self.duration) {
                    self.stopMusic();
                    //this.setRecordingToPlay();
                }
            });
        }, 100);
    }

    runterladen(path,name,type) {



        //download file from dropbox to local storage
        this.platform.ready().then(() => {
            let loading = this.loadingCtrl.create({
                content: 'Download: '+path
            });
            loading.present();
            this.dropbox.download(path).subscribe(data => {

                this.file.writeFile(this.storageDirectory,name,data,{ replace: true }).then(() => {



                    /*
                    var rect =  [0, 0, innerWidth / 2, 0];
                    cordova.plugins.fileOpener2.showOpenWithDialog(
                        decodeURIComponent(entry.toURL()),
                        'application/pdf',
                        {
                            error : function(e) {
                                console.log('Error opening file: ' + e.status + ' - Error message: ' + e.message);
                            },
                            success : function (e) {
                                log("success opening file");
                            },
                            rect: rect,
                        }
                    )
                    */



                    let rect =  [0, 0, innerWidth / 2, 0];
                    cordova.plugins.fileOpener2.showOpenWithDialog(this.storageDirectory+name, type,
                        {
                            error : function(e) {
                                console.log('Error opening file: ' + e.status + ' - Error message: ' + e.message);
                            },
                            success : function (e) {

                            },
                            rect: rect,
                        }
                        )
                        .then(() => {

                            /*
                            const alertSuccess = this.alertCtrl.create({
                                title: `File opened!`,

                                buttons: ['Ok']
                            });
                            return alertSuccess.present();
                            */
                        })
                        .catch(e => {
                            const alertFailure = this.alertCtrl.create({
                                title: `File open Failed!`,
                                subTitle: `Error Code: ${e.valueOf()}`,
                                buttons: ['Ok']
                            });
                            return alertFailure.present();
                        });

                });

                loading.dismiss();






            }, (err) => {
                this.meldung = "error: "+err;
                loading.dismiss();
                const alertFailure = this.alertCtrl.create({
                    title: `File download Failed!`,
                    subTitle: `Error Code: ${err.toString()}`,
                    buttons: ['Ok']
                });

                return alertFailure.present();
            });
        });
    }
    /*
    retrieveFile(path) {
        this.file.checkFile(this.storageDirectory,path)
            .then(() => {

                const alertSuccess = this.alertCtrl.create({
                    title: `File retrieval Succeeded!`,
                    subTitle: `musik.mp3 was successfully retrieved from: ${this.storageDirectory}`,
                    buttons: ['Ok']
                });

                return alertSuccess.present();

            })
            .catch((err) => {

                const alertFailure = this.alertCtrl.create({
                    title: `File retrieval Failed!`,
                    subTitle: `musik.mp3 was not successfully retrieved. Error Code: ${err.code}`,
                    buttons: ['Ok']
                });

                return alertFailure.present();

            });
    }
    */

    downloadLink(name) {
        return this.fileTempLinks[name];
    }
}
