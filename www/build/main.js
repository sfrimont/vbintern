webpackJsonp([10],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider() {
    }
    AuthProvider.prototype.signup = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().createUserWithEmailAndPassword(email, password);
    };
    AuthProvider.prototype.signin = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
    };
    AuthProvider.prototype.logout = function () {
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signOut();
    };
    AuthProvider.prototype.getActiveUser = function () {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser;
    };
    AuthProvider.prototype.resetPassword = function (password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().sendPasswordResetEmail(password);
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AndereTerminePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_kalender_kalender__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__anwesenheit_anwesenheit__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the AndereTerminePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AndereTerminePage = (function () {
    function AndereTerminePage(bvKalenderService, navCtrl, modalCtrl) {
        this.bvKalenderService = bvKalenderService;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.auswahl = "alleTermine"; // in dieser Variablen wird gespeichert welche Termine angezeigt werden sollen.
        this.user = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid;
        this.sopran = new Array();
        this.sopran2 = new Array();
        this.alt = new Array();
        this.alt2 = new Array();
        this.tenor1 = new Array();
        this.tenor2 = new Array();
        this.bariton = new Array();
        this.bass = new Array();
        this.probemitglied = new Array();
        // zur Speicherung der Vornamen. Nach einem späteren Refactoring gibt es nur noch ein Objekt pro Stimme...
        this.namen = {};
        this.anwesend = {};
        this.getCalData();
        this.dataReady = false;
        this.initAnwesendArray();
    }
    AndereTerminePage.prototype.changeAuswahl = function (auswahl) {
        this.auswahl = auswahl;
    };
    AndereTerminePage.prototype.terminAnzeigen = function (id) {
        if (this.auswahl == "unsicher")
            if (this.anwesend[id] && this.anwesend[id][this.user] == "unsicher")
                return true;
        if (this.auswahl == "alleTermine")
            return true;
        if (this.auswahl == "keineAuswahl")
            if (!(this.anwesend[id] && this.anwesend[id][this.user]) || this.anwesend[id] && this.anwesend[id][this.user] == 'vielleicht')
                return true;
        return false;
    };
    AndereTerminePage.prototype.terminNichtAuswgewaehlt = function (id) {
        if (this.auswahl == "keineAuswahl")
            if (!(this.anwesend[id] && this.anwesend[id][this.user]) || this.anwesend[id] && this.anwesend[id][this.user] == 'vielleicht')
                return true;
        return false;
    };
    AndereTerminePage.prototype.doRefresh = function (rf) {
        this.refreshCalData(rf);
    };
    AndereTerminePage.prototype.getCalData = function () {
        var _this = this;
        this.bvKalenderService.getData()
            .then(function (data) {
            _this.calenderData = data;
            _this.dataReady = true;
            _this.initVoiceArrays();
        });
    };
    AndereTerminePage.prototype.refreshCalData = function (refresher) {
        var _this = this;
        this.bvKalenderService.getData()
            .then(function (data) {
            _this.calenderData = data;
            refresher.complete();
        });
    };
    AndereTerminePage.prototype.setAnwesend = function (eventID, status) {
        //let database = firebase.database();
        var user = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser;
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('/termine/' + eventID + '/' + user.uid).set({
            anwesend: status
        });
    };
    AndereTerminePage.prototype.anzahlNichtsAusgewaehlt = function () {
        var counter = 0;
        if (this.calenderData) {
            for (var _i = 0, _a = this.calenderData.items; _i < _a.length; _i++) {
                var termin = _a[_i];
                if (!termin.summary.includes("Probe ")) {
                    if (!(this.anwesend[termin.id] && this.anwesend[termin.id][this.user]) || this.anwesend[termin.id] && this.anwesend[termin.id][this.user] == 'vielleicht') {
                        counter++;
                    }
                }
            }
        }
        return counter;
    };
    AndereTerminePage.prototype.anzahlUnsicherAusgewaehlt = function () {
        var counter = 0;
        if (this.calenderData) {
            for (var _i = 0, _a = this.calenderData.items; _i < _a.length; _i++) {
                var termin = _a[_i];
                if (!termin.summary.includes("Probe ")) {
                    if (this.anwesend[termin.id] && this.anwesend[termin.id][this.user] == 'unsicher') {
                        counter++;
                    }
                }
            }
        }
        return counter;
    };
    AndereTerminePage.prototype.initAnwesendArray = function () {
        var database = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database();
        var anwesend = database.ref('/termine/');
        var that = this;
        anwesend.on("value", function (snap) {
            snap.forEach(function (childSnap) {
                //console.log("termin: "+childSnap.key);// childSnap.child.val().anwesend;
                that.anwesend[childSnap.key] = {};
                childSnap.forEach(function (user) {
                    //console.log("user: "+user.key);
                    //console.log("anwesend: "+user.val().anwesend)
                    that.anwesend[childSnap.key][user.key] = user.val().anwesend;
                    return false;
                });
                return false;
            });
        });
    };
    AndereTerminePage.prototype.initVoiceArrays = function () {
        var database = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database();
        var users = database.ref('/users');
        var that = this;
        users.on("value", function (snap) {
            that.sopran = new Array();
            that.sopran2 = new Array();
            that.alt = new Array();
            that.alt2 = new Array();
            that.tenor1 = new Array();
            that.tenor2 = new Array();
            that.bariton = new Array();
            that.bass = new Array();
            snap.forEach(function (childSnap) {
                // Alle Namen in einer Hashtabelle merken (besser: gleich Objekte für User speichern..)
                that.namen[childSnap.key] = childSnap.val().Name;
                if (childSnap.val().Stimmgruppe == "Sopran 1") {
                    that.sopran.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Sopran 2") {
                    that.sopran2.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Alt 1") {
                    that.alt.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Alt 2") {
                    that.alt2.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Tenor 1") {
                    that.tenor1.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Tenor 2") {
                    that.tenor2.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Bass 1") {
                    that.bariton.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Bass 2") {
                    that.bass.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Probemitglied") {
                    that.probemitglied.push(childSnap.key);
                }
                return false;
            });
        });
    };
    AndereTerminePage.prototype.stimmen = function (terminID, terminTitel, anwesend, namen, sopran, sopran2, alt, alt2, tenor1, tenor2, bariton, bass, probemitglied) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__anwesenheit_anwesenheit__["a" /* AnwesenheitPage */], { id: terminID, anwesend: anwesend, terminTitel: terminTitel, namen: namen, sopran: sopran, sopran2: sopran2, alt: alt, alt2: alt2, tenor1: tenor1, tenor2: tenor2, bariton: bariton, bass: bass, probemitglied: probemitglied });
        modal.present({});
    };
    AndereTerminePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-andere-termine',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/andere-termine/andere-termine.html"*/'\n<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n	  <ion-title>Termine</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n		<ion-refresher-content\n				pullingIcon="arrow-dropdown"\n				pullingText="Zum Aktualisieren weiter ziehen"\n				refreshingSpinner="circles"\n				refreshingText="aktualisiere Kalender...">\n		</ion-refresher-content>\n	</ion-refresher>\n	<!--\n	<ion-card>\n		<ion-card-content>\n			<ul>\n				<li>Die Proben sind auf einer eigenen Seite aufgelistet</li>\n				<li>Auf der Seite "Rückblick" findest Du vergangene Probentermine</li>\n			</ul>\n		</ion-card-content>\n	</ion-card>\n	-->\n\n\n	<ion-row no-padding>\n\n		<ion-col>\n			<button  ion-button full outline small *ngIf="auswahl!=\'alleTermine\'" (click)="changeAuswahl(\'alleTermine\')">alle</button>\n			<button  ion-button full small *ngIf="auswahl==\'alleTermine\'" >alle</button>\n		</ion-col>\n		<ion-col>\n			<button ion-button full outline small *ngIf="auswahl!=\'keineAuswahl\'" (click)="changeAuswahl(\'keineAuswahl\')">neu ({{anzahlNichtsAusgewaehlt()}})</button>\n			<button ion-button full small *ngIf="auswahl==\'keineAuswahl\'" >neu ({{anzahlNichtsAusgewaehlt()}})</button>\n		</ion-col>\n\n		<ion-col>\n			<button ion-button full small outline *ngIf="auswahl!=\'unsicher\'" (click)="changeAuswahl(\'unsicher\')">unsicher ({{anzahlUnsicherAusgewaehlt()}})</button>\n			<button ion-button full small *ngIf="auswahl==\'unsicher\'" >unsicher ({{anzahlUnsicherAusgewaehlt()}})</button>\n		</ion-col>\n\n\n	</ion-row>\n\n	<ion-card>\n\n		<ion-card-content *ngIf="anzahlNichtsAusgewaehlt()==0 && auswahl==\'keineAuswahl\'">\n			Du hast für alle Termine eine Auswahl getroffen, vielen Dank!\n		</ion-card-content>\n	</ion-card>\n\n	<ion-card *ngIf="anzahlUnsicherAusgewaehlt()==0 && auswahl==\'unsicher\'">\n		<ion-card-content>\n			Du hast für alle Termine eine eindeutige Auswahl getroffen!\n		</ion-card-content>\n	</ion-card>\n\n<div *ngIf="dataReady"> \n\n   \n	<ion-list>\n\n		<ion-card *ngFor="let termin of calenderData.items | terminfilter text-wrap" >\n          <div *ngIf="terminAnzeigen(termin.id)">\n			<div (click)="stimmen(termin.id, termin.summary, anwesend,namen,sopran,sopran2,alt,alt2,tenor1,tenor2,bariton,bass,probemitglied)">\n			<ion-card-header>\n				<span *ngIf="termin.start.date">{{ termin.start.date | datum}}</span>\n				<span *ngIf="termin.start.dateTime"> {{ termin.start.dateTime | datum }} - {{ termin.start.dateTime | uhrzeit}}</span>\n				<span *ngIf="anwesend[termin.id] && anwesend[termin.id][user]==\'ja\'" style="color:green"> - anwesend!</span>\n				<span *ngIf="anwesend[termin.id] && anwesend[termin.id][user]==\'nein\'" style="color:red"> - abwesend!</span>\n				<span *ngIf="anwesend[termin.id] && anwesend[termin.id][user]==\'unsicher\'" style="color:#e0ac00"> - unsicher!</span>\n				<h2 text-wrap>{{ termin.summary }}</h2>\n			</ion-card-header>\n			<ion-card-content >\n				<!-- <p>{{ termin.description }}</p> -->\n\n				<table *ngIf="!terminNichtAuswgewaehlt()">\n					<tr>\n						<td>\n							Sopran &nbsp;\n						</td>\n						<td>\n							<span *ngFor="let voice of sopran">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: lightgrey; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n							|\n							<span *ngFor="let voice of sopran2">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: lightgrey; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n						</td>\n					</tr>\n					<tr>\n						<td>\n							Alt &nbsp;\n						</td>\n						<td>\n							<span *ngFor="let voice of alt">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: lightgrey; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n							|\n							<span *ngFor="let voice of alt2">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: lightgrey; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n						</td>\n					</tr>\n					<tr>\n						<td>\n							Tenor &nbsp;\n						</td>\n						<td>\n							<span *ngFor="let voice of tenor1">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: lightgrey; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n							|\n							<span *ngFor="let voice of tenor2">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: lightgrey; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n\n						</td>\n					</tr>\n					<tr>\n						<td>\n							Bass &nbsp;\n						</td>\n						<td>\n							<span *ngFor="let voice of bariton">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: lightgrey; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n                            |\n							<span *ngFor="let voice of bass">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: lightgrey; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n						</td>\n					</tr>\n\n				</table>\n			</ion-card-content>\n			</div>\n			<ion-row no-padding>\n				<ion-col>\n					<button (click)="setAnwesend(termin.id,\'ja\')"ion-button full outline small>zusagen</button>\n				</ion-col>\n				<ion-col>\n					<button (click)="setAnwesend(termin.id,\'unsicher\')"ion-button full outline small>unsicher</button>\n				</ion-col>\n				<ion-col>\n					<button (click)="setAnwesend(termin.id,\'nein\')" ion-button full block outline small>absagen</button>\n				</ion-col>\n\n			</ion-row>\n		  </div>\n			<!--\n			<ion-row no-padding>\n				<ion-col>\n					<button ion-button clear small color="danger" icon-start>\n						<ion-icon name=\'star\'></ion-icon>\n						Favorite\n					</button>\n				</ion-col>\n				<ion-col text-center>\n					<button ion-button clear small color="danger" icon-start>\n						<ion-icon name=\'musical-notes\'></ion-icon>\n						Listen\n					</button>\n				</ion-col>\n				<ion-col text-right>\n					<button ion-button clear small color="danger" icon-start>\n						<ion-icon name=\'share-alt\'></ion-icon>\n						Share\n					</button>\n				</ion-col>\n			</ion-row>\n			-->\n		</ion-card>\n\n\n\n\n\n\n\n	 </ion-list>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/andere-termine/andere-termine.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_kalender_kalender__["a" /* KalenderProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */]])
    ], AndereTerminePage);
    return AndereTerminePage;
}());

//# sourceMappingURL=andere-termine.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnwesenheitProbePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AnwesenheitProbePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AnwesenheitProbePage = (function () {
    function AnwesenheitProbePage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.terminID = this.navParams.get('id');
        this.anwesend = this.navParams.get('anwesend');
        this.namen = this.navParams.get('namen');
        this.sopran = this.navParams.get('sopran');
        this.sopran2 = this.navParams.get('sopran2');
        this.alt = this.navParams.get('alt');
        this.alt2 = this.navParams.get('alt2');
        this.tenor = this.navParams.get('tenor');
        this.bariton = this.navParams.get('bariton');
        this.bass = this.navParams.get('bass');
    }
    AnwesenheitProbePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AnwesenheitPage');
    };
    AnwesenheitProbePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AnwesenheitProbePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-anwesenheit-probe',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/anwesenheit-probe/anwesenheit-probe.html"*/'<!--\n  Generated template for the AnwesenheitPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n\n      <ion-title>Probenteilnahme</ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="dismiss()" end>\n        zurück\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h4>Sopran 1</h4>\n  <p>\n    <span *ngFor="let voice of sopran">\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: green;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n  </p>\n  <h4>Sopran 2</h4>\n  <p>\n\n    <span *ngFor="let voice of sopran2">\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: green;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n\n  </p>\n  <h4>Alt 1</h4>\n  <p>\n    <span *ngFor="let voice of alt">\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: green;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n  </p>\n  <h4>Alt 2</h4>\n  <p>\n    <span *ngFor="let voice of alt2">\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: green;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n  </p>\n\n  <h4>Tenor</h4>\n  <p>\n    <span *ngFor="let voice of tenor">\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: green;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n  </p>\n\n  <h4>Bariton</h4>\n  <p>\n\n    <span *ngFor="let voice of bariton">\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: green;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n\n  </p>\n  <h4>Bass</h4>\n  <p>\n    <span *ngFor="let voice of bass">\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: green;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n  </p>\n\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/anwesenheit-probe/anwesenheit-probe.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], AnwesenheitProbePage);
    return AnwesenheitProbePage;
}());

//# sourceMappingURL=anwesenheit-probe.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DuringLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the DuringLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DuringLoginPage = (function () {
    function DuringLoginPage(navCtrl, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loadingCtrl.create({
            content: 'Einen Moment bitte...'
        });
        this.loading.present();
    }
    DuringLoginPage.prototype.ionViewDidEnter = function () {
        this.loading.dismiss(); // Der Hinweis soll nur einen kurzen Moment sichtbar sein und wird gleich wieder entfernt..
    };
    DuringLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-during-login',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/during-login/during-login.html"*/'<!--\n  Generated template for the DuringLoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/during-login/during-login.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _c || Object])
    ], DuringLoginPage);
    return DuringLoginPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=during-login.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProbenProtokollPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_kalender_kalender__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ProbenProtokollPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProbenProtokollPage = (function () {
    function ProbenProtokollPage(bvKalenderService, navCtrl, navParams) {
        this.bvKalenderService = bvKalenderService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getCalData();
        this.dataReady = false;
    }
    ProbenProtokollPage.prototype.doRefresh = function (rf) {
        this.refreshCalData(rf);
    };
    ProbenProtokollPage.prototype.getCalData = function () {
        var _this = this;
        this.bvKalenderService.getPastProben()
            .then(function (data) {
            _this.calenderData = data;
            _this.dataReady = true;
        });
    };
    ProbenProtokollPage.prototype.refreshCalData = function (refresher) {
        var _this = this;
        this.bvKalenderService.getPastProben()
            .then(function (data) {
            _this.calenderData = data;
            refresher.complete();
        });
    };
    ProbenProtokollPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-proben-protokoll',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/proben-protokoll/proben-protokoll.html"*/'<!--\n  Generated template for the ProbenProtokollPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Rückblick</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content\n            pullingIcon="arrow-dropdown"\n            pullingText="Zum Aktualisieren weiter ziehen"\n            refreshingSpinner="circles"\n            refreshingText="aktualisiere Kalender...">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf="dataReady">\n\n  <ion-card *ngFor="let termin of calenderData.items.slice().reverse() ">\n\n    <ion-card-header>\n      <span *ngIf="termin.start.date">{{ termin.start.date | datum}}</span>\n      <span *ngIf="termin.start.dateTime"> {{ termin.start.dateTime | datum }} - {{ termin.start.dateTime | uhrzeit}}</span>\n\n      <h2 text-wrap>{{ termin.summary }}</h2>\n\n      <p text-wrap>{{ termin.description }}</p>\n    </ion-card-header>\n\n  </ion-card>\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/proben-protokoll/proben-protokoll.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_kalender_kalender__["a" /* KalenderProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ProbenProtokollPage);
    return ProbenProtokollPage;
}());

//# sourceMappingURL=proben-protokoll.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProbenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_kalender_kalender__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__anwesenheit_probe_anwesenheit_probe__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ProbenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProbenPage = (function () {
    function ProbenPage(bvKalenderService, navCtrl, modalCtrl) {
        this.bvKalenderService = bvKalenderService;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.user = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid;
        this.sopran = new Array();
        this.sopran2 = new Array();
        this.alt = new Array();
        this.alt2 = new Array();
        this.tenor1 = new Array();
        this.tenor2 = new Array();
        this.bariton = new Array();
        this.bass = new Array();
        // zur Speicherung der Vornamen. Nach einem späteren Refactoring gibt es nur noch ein Objekt pro Stimme...
        this.namen = {};
        this.anwesend = {};
        this.getCalData();
        this.dataReady = false;
        this.initAnwesendArray();
    }
    ProbenPage.prototype.doRefresh = function (rf) {
        this.refreshCalData(rf);
    };
    ProbenPage.prototype.getCalData = function () {
        var _this = this;
        this.bvKalenderService.getData()
            .then(function (data) {
            _this.calenderData = data;
            _this.dataReady = true;
            _this.initVoiceArrays();
        });
    };
    ProbenPage.prototype.refreshCalData = function (refresher) {
        var _this = this;
        this.bvKalenderService.getData()
            .then(function (data) {
            _this.calenderData = data;
            refresher.complete();
        });
    };
    ProbenPage.prototype.setAnwesend = function (eventID, status) {
        //let database = firebase.database();
        var user = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser;
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('/termine/' + eventID + '/' + user.uid).set({
            anwesend: status
        });
    };
    ProbenPage.prototype.initAnwesendArray = function () {
        var database = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database();
        var anwesend = database.ref('/termine/');
        var that = this;
        anwesend.on("value", function (snap) {
            snap.forEach(function (childSnap) {
                //console.log("termin: "+childSnap.key);// childSnap.child.val().anwesend;
                that.anwesend[childSnap.key] = {};
                childSnap.forEach(function (user) {
                    //console.log("user: "+user.key);
                    //console.log("anwesend: "+user.val().anwesend)
                    that.anwesend[childSnap.key][user.key] = user.val().anwesend;
                    return false;
                });
                return false;
            });
        });
    };
    ProbenPage.prototype.initVoiceArrays = function () {
        var database = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database();
        var users = database.ref('/users');
        var that = this;
        users.on("value", function (snap) {
            that.sopran = new Array();
            that.sopran2 = new Array();
            that.alt = new Array();
            that.alt2 = new Array();
            that.tenor1 = new Array();
            that.tenor2 = new Array();
            that.bariton = new Array();
            that.bass = new Array();
            snap.forEach(function (childSnap) {
                // Alle Namen in einer Hashtabelle merken (besser: gleich Objekte für User speichern..)
                that.namen[childSnap.key] = childSnap.val().Name;
                if (childSnap.val().Stimmgruppe == "Sopran 1") {
                    that.sopran.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Sopran 2") {
                    that.sopran2.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Alt 1") {
                    that.alt.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Alt 2") {
                    that.alt2.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Tenor 1") {
                    that.tenor1.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Tenor 2") {
                    that.tenor2.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Bass 1") {
                    that.bariton.push(childSnap.key);
                }
                if (childSnap.val().Stimmgruppe == "Bass 2") {
                    that.bass.push(childSnap.key);
                }
                return false;
            });
        });
    };
    ProbenPage.prototype.stimmen = function (terminID, anwesend, namen, sopran, sopran2, alt, alt2, tenor1, tenor2, bariton, bass) {
        console.log("hallo");
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__anwesenheit_probe_anwesenheit_probe__["a" /* AnwesenheitProbePage */], { id: terminID, anwesend: anwesend, namen: namen, sopran: sopran, sopran2: sopran2, alt: alt, alt2: alt2, tenor1: tenor1, tenor2: tenor2, bariton: bariton, bass: bass });
        modal.present({});
    };
    ProbenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-proben',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/proben/proben.html"*/'\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Proben</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content\n                pullingIcon="arrow-dropdown"\n                pullingText="Zum Aktualisieren weiter ziehen"\n                refreshingSpinner="circles"\n                refreshingText="aktualisiere Kalender...">\n        </ion-refresher-content>\n    </ion-refresher>\n    <ion-card>\n\n        <ion-card-content>\n            <ul>\n                <li>Alle Teilnehmer sind automatisch auf "anwesend" gesetzt</li>\n            </ul>\n        </ion-card-content>\n    </ion-card>\n\n    <div *ngIf="dataReady">\n\n\n        <ion-list>\n\n            <ion-card *ngFor="let termin of calenderData.items | probenfilter text-wrap">\n                <ion-card-header>\n                    <span *ngIf="termin.start.date">{{ termin.start.date | datum}}</span>\n                    <span *ngIf="termin.start.dateTime"> {{ termin.start.dateTime | datum }} - {{ termin.start.dateTime | uhrzeit}}</span>\n\n                    <span *ngIf="anwesend[termin.id] && anwesend[termin.id][user]==\'nein\'" style="color:red"> - abwesend!</span>\n                    <span *ngIf="anwesend[termin.id] && anwesend[termin.id][user]==\'unsicher\'" style="color:#e0ac00"> - unsicher!</span>\n                    <h2>{{ termin.summary }}</h2>\n                </ion-card-header>\n                <ion-card-content>\n                    <!-- <p>{{ termin.description }}</p> -->\n\n\n                    <table (click)="stimmen(termin.id,anwesend,namen,sopran,sopran2,alt,alt2,tenor1,tenor2,bariton,bass)">\n                        <tr>\n                            <td>\n                                Sopran &nbsp;\n                            </td>\n                            <td>\n							<span *ngFor="let voice of sopran">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: green; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n                                |\n                                <span *ngFor="let voice of sopran2">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: green; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                Alt &nbsp;\n                            </td>\n                            <td>\n							<span *ngFor="let voice of alt">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: green; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n                                |\n                                <span *ngFor="let voice of alt2">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: green; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                Tenor\n                            </td>\n                            <td>\n							<span *ngFor="let voice of tenor1">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: green; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n                                |\n                                <span *ngFor="let voice of tenor2">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: green; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                Bass &nbsp;\n                            </td>\n                            <td>\n							<span *ngFor="let voice of bariton">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: green; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n                                |\n                                <span *ngFor="let voice of bass">\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'nein\'" style="color: red; font-size: 2em">•</span>\n								<span *ngIf="!(anwesend[termin.id] && anwesend[termin.id][voice]) || anwesend[termin.id] && anwesend[termin.id][voice]==\'vielleicht\'" style="color: green; font-size:2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'ja\'" style="color: green; font-size: 2em">•</span>\n								<span *ngIf="anwesend[termin.id] && anwesend[termin.id][voice]==\'unsicher\'" style="color:#e0ac00; font-size: 2em">•</span>\n							</span>\n                            </td>\n                        </tr>\n                    </table>\n                </ion-card-content>\n                <ion-row no-padding>\n                    <ion-col>\n                        <button (click)="setAnwesend(termin.id,\'ja\')"ion-button full outline small>zusagen</button>\n                    </ion-col>\n                    <ion-col>\n                        <button (click)="setAnwesend(termin.id,\'unsicher\')"ion-button full outline small>unsicher</button>\n                    </ion-col>\n                    <ion-col>\n                        <button (click)="setAnwesend(termin.id,\'nein\')" ion-button full block outline small>absagen</button>\n                    </ion-col>\n\n                </ion-row>\n\n                <!--\n                <ion-row no-padding>\n                    <ion-col>\n                        <button ion-button clear small color="danger" icon-start>\n                            <ion-icon name=\'star\'></ion-icon>\n                            Favorite\n                        </button>\n                    </ion-col>\n                    <ion-col text-center>\n                        <button ion-button clear small color="danger" icon-start>\n                            <ion-icon name=\'musical-notes\'></ion-icon>\n                            Listen\n                        </button>\n                    </ion-col>\n                    <ion-col text-right>\n                        <button ion-button clear small color="danger" icon-start>\n                            <ion-icon name=\'share-alt\'></ion-icon>\n                            Share\n                        </button>\n                    </ion-col>\n                </ion-row>\n                -->\n            </ion-card>\n\n\n\n\n\n\n\n        </ion-list>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/proben/proben.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_kalender_kalender__["a" /* KalenderProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], ProbenPage);
    return ProbenPage;
}());

//# sourceMappingURL=proben.js.map

/***/ }),

/***/ 135:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 135;

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/adressliste/adressliste.module": [
		377,
		9
	],
	"../pages/andere-termine/andere-termine.module": [
		378,
		8
	],
	"../pages/anwesenheit-probe/anwesenheit-probe.module": [
		379,
		7
	],
	"../pages/aufgaben/aufgaben.module": [
		380,
		6
	],
	"../pages/bildergalerie/bildergalerie.module": [
		381,
		5
	],
	"../pages/during-login/during-login.module": [
		382,
		4
	],
	"../pages/kalender/kalender.module": [
		383,
		3
	],
	"../pages/proben-protokoll/proben-protokoll.module": [
		384,
		2
	],
	"../pages/proben/proben.module": [
		385,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 176;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnwesenheitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AnwesenheitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AnwesenheitPage = (function () {
    function AnwesenheitPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.zusagen = 0;
        this.absagen = 0;
        this.unsicher = 0;
        this.keineAngabe = 0;
        this.zusageSopran1 = 0;
        this.absageSopran1 = 0;
        this.unsicherSopran1 = 0;
        this.keineAngabeSopran1 = 0;
        this.zusageSopran2 = 0;
        this.absageSopran2 = 0;
        this.unsicherSopran2 = 0;
        this.keineAngabeSopran2 = 0;
        this.zusageAlt1 = 0;
        this.absageAlt1 = 0;
        this.unsicherAlt1 = 0;
        this.keineAngabeAlt1 = 0;
        this.zusageAlt2 = 0;
        this.absageAlt2 = 0;
        this.unsicherAlt2 = 0;
        this.keineAngabeAlt2 = 0;
        this.zusageTenor1 = 0;
        this.absageTenor1 = 0;
        this.unsicherTenor1 = 0;
        this.keineAngabeTenor1 = 0;
        this.zusageTenor2 = 0;
        this.absageTenor2 = 0;
        this.unsicherTenor2 = 0;
        this.keineAngabeTenor2 = 0;
        this.zusageBariton = 0;
        this.absageBariton = 0;
        this.unsicherBariton = 0;
        this.keineAngabeBariton = 0;
        this.zusageBass = 0;
        this.absageBass = 0;
        this.unsicherBass = 0;
        this.keineAngabeBass = 0;
        this.anwesendSopran2 = 0;
        this.anwesendAlt1 = 0;
        this.anwesendAlt2 = 0;
        this.anwesendTenor = 0;
        this.anwesendBariton = 0;
        this.anwesendBass = 0;
        this.terminID = this.navParams.get('id');
        this.terminTitel = this.navParams.get('terminTitel');
        this.anwesend = this.navParams.get('anwesend');
        this.namen = this.navParams.get('namen');
        this.sopran = this.navParams.get('sopran');
        this.sopran2 = this.navParams.get('sopran2');
        this.alt = this.navParams.get('alt');
        this.alt2 = this.navParams.get('alt2');
        this.tenor1 = this.navParams.get('tenor1');
        this.tenor2 = this.navParams.get('tenor2');
        this.bariton = this.navParams.get('bariton');
        this.bass = this.navParams.get('bass');
        this.probemitglied = this.navParams.get('probemitglied');
    }
    AnwesenheitPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AnwesenheitPage');
    };
    AnwesenheitPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AnwesenheitPage.prototype.zaehleSopran1 = function () {
        this.zusageSopran1 = 0;
        this.absageSopran1 = 0;
        this.unsicherSopran1 = 0;
        this.keineAngabeSopran1 = 0;
        for (var voice in this.sopran) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran[voice]] == "ja")
                this.zusageSopran1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran[voice]] == "nein")
                this.absageSopran1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran[voice]] == "unsicher")
                this.unsicherSopran1++;
            else
                this.keineAngabeSopran1++;
        }
        this.aktualisiereSummen();
    };
    AnwesenheitPage.prototype.zaehleSopran2 = function () {
        this.zusageSopran2 = 0;
        this.absageSopran2 = 0;
        this.unsicherSopran2 = 0;
        this.keineAngabeSopran2 = 0;
        for (var voice in this.sopran2) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran2[voice]] == "ja")
                this.zusageSopran2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran2[voice]] == "nein")
                this.absageSopran2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran2[voice]] == "unsicher")
                this.unsicherSopran2++;
            else
                this.keineAngabeSopran2++;
        }
        this.aktualisiereSummen();
    };
    AnwesenheitPage.prototype.zaehleAlt1 = function () {
        this.zusageAlt1 = 0;
        this.absageAlt1 = 0;
        this.unsicherAlt1 = 0;
        this.keineAngabeAlt1 = 0;
        for (var voice in this.alt) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt[voice]] == "ja")
                this.zusageAlt1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt[voice]] == "nein")
                this.absageAlt1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt[voice]] == "unsicher")
                this.unsicherAlt1++;
            else
                this.keineAngabeAlt1++;
        }
        this.aktualisiereSummen();
    };
    AnwesenheitPage.prototype.zaehleAlt2 = function () {
        this.zusageAlt2 = 0;
        this.absageAlt2 = 0;
        this.unsicherAlt2 = 0;
        this.keineAngabeAlt2 = 0;
        for (var voice in this.alt2) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt2[voice]] == "ja")
                this.zusageAlt2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt2[voice]] == "nein")
                this.absageAlt2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt2[voice]] == "unsicher")
                this.unsicherAlt2++;
            else
                this.keineAngabeAlt2++;
        }
        this.aktualisiereSummen();
    };
    AnwesenheitPage.prototype.zaehleTenor1 = function () {
        this.zusageTenor1 = 0;
        this.absageTenor1 = 0;
        this.unsicherTenor1 = 0;
        this.keineAngabeTenor1 = 0;
        for (var voice in this.tenor1) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor1[voice]] == "ja")
                this.zusageTenor1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor1[voice]] == "nein")
                this.absageTenor1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor1[voice]] == "unsicher")
                this.unsicherTenor1++;
            else
                this.keineAngabeTenor1++;
        }
        this.aktualisiereSummen();
    };
    AnwesenheitPage.prototype.zaehleTenor2 = function () {
        this.zusageTenor2 = 0;
        this.absageTenor2 = 0;
        this.unsicherTenor2 = 0;
        this.keineAngabeTenor2 = 0;
        for (var voice in this.tenor2) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor2[voice]] == "ja")
                this.zusageTenor2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor2[voice]] == "nein")
                this.absageTenor2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor2[voice]] == "unsicher")
                this.unsicherTenor2++;
            else
                this.keineAngabeTenor2++;
        }
        this.aktualisiereSummen();
    };
    AnwesenheitPage.prototype.zaehleBariton = function () {
        this.zusageBariton = 0;
        this.absageBariton = 0;
        this.unsicherBariton = 0;
        this.keineAngabeBariton = 0;
        for (var voice in this.bariton) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bariton[voice]] == "ja")
                this.zusageBariton++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bariton[voice]] == "nein")
                this.absageBariton++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bariton[voice]] == "unsicher")
                this.unsicherBariton++;
            else
                this.keineAngabeBariton++;
        }
        this.aktualisiereSummen();
    };
    AnwesenheitPage.prototype.zaehleBass = function () {
        this.zusageBass = 0;
        this.absageBass = 0;
        this.unsicherBass = 0;
        this.keineAngabeBass = 0;
        for (var voice in this.bass) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bass[voice]] == "ja")
                this.zusageBass++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bass[voice]] == "nein")
                this.absageBass++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bass[voice]] == "unsicher")
                this.unsicherBass++;
            else
                this.keineAngabeBass++;
        }
        this.aktualisiereSummen();
    };
    AnwesenheitPage.prototype.aktualisiereSummen = function () {
        this.zusagen = this.zusageSopran1 + this.zusageSopran2 + this.zusageAlt1 + this.zusageAlt2 + this.zusageTenor1 + this.zusageTenor2 + this.zusageBariton + this.zusageBass;
        this.absagen = this.absageSopran1 + this.absageSopran2 + this.absageAlt1 + this.absageAlt2 + this.absageTenor1 + this.absageTenor2 + this.absageBariton + this.absageBass;
        this.unsicher = this.unsicherSopran1 + this.unsicherSopran2 + this.unsicherAlt1 + this.unsicherAlt2 + this.unsicherTenor2 + this.unsicherTenor2 + this.unsicherBariton + this.unsicherBass;
        this.keineAngabe = this.keineAngabeSopran1 + this.keineAngabeSopran2 + this.keineAngabeAlt1 + this.keineAngabeAlt2 + this.keineAngabeTenor1 + this.keineAngabeTenor2 + this.keineAngabeBariton + this.keineAngabeBass;
    };
    AnwesenheitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-anwesenheit',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/anwesenheit/anwesenheit.html"*/'<!--\n  Generated template for the AnwesenheitPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n\n          <ion-title>{{terminTitel}}</ion-title>\n\n      <ion-buttons end>\n          <button ion-button (click)="dismiss()" end>\n              zurück\n          </button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding >\n\n          <ion-list>\n              <ion-list-header>Anzahl Chormitglieder: <span>{{ zusagen+absagen+unsicher+keineAngabe }}</span></ion-list-header>\n              <ion-item>Zusagen:<span item-content style="color: green">{{ zusagen }}</span></ion-item>\n              <ion-item>Absagen:<span item-content style="color: red">{{ absagen }}</span></ion-item>\n              <ion-item>unsicher:<span item-content style="color:#e0ac00">{{ unsicher }}</span></ion-item>\n              <ion-item>keine Angabe:<span item-content style="color: grey;">{{ keineAngabe }}</span></ion-item>\n          </ion-list>\n\n    <ion-list>\n        <ion-item-divider>Sopran 1 (<span style="color: green">{{ zusageSopran1 }}</span> von\n            {{ zusageSopran1 + absageSopran1 + unsicherSopran1 + keineAngabeSopran1 }}) <span item-right style="font-size:0.8em">(<span style="color: red">{{ absageSopran1 }}</span>/\n        <span style="color:#e0ac00">{{ unsicherSopran1 }}</span>/<span style="color: grey;">{{ keineAngabeSopran1 }}</span>)</span></ion-item-divider>\n    <ion-item text-wrap>\n    <span *ngFor="let voice of sopran" >\n        {{ zaehleSopran1() }}\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red" >{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: lightgrey;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n    </ion-item>\n    </ion-list>\n    <ion-list>\n    <ion-item-divider>Sopran 2 (<span style="color: green">{{ zusageSopran2 }}</span> von\n        {{ zusageSopran2 + absageSopran2 + unsicherSopran2 + keineAngabeSopran2 }}) <span item-right style="font-size:0.8em">(<span style="color: red">{{ absageSopran2 }}</span>/\n        <span style="color:#e0ac00">{{ unsicherSopran2 }}</span>/<span style="color: grey;">{{ keineAngabeSopran2 }}</span>)</span></ion-item-divider>\n        <ion-item text-wrap>\n    <span *ngFor="let voice of sopran2">\n        {{ zaehleSopran2() }}\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: lightgrey;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n</ion-item>\n    </ion-list>\n    <ion-list>\n    <ion-item-divider>Alt 1 (<span style="color: green">{{ zusageAlt1 }}</span> von\n        {{ zusageAlt1 + absageAlt1 + unsicherAlt1 + keineAngabeAlt1 }}) <span item-right style="font-size:0.8em">(<span style="color: red">{{ absageAlt1 }}</span>/\n        <span style="color:#e0ac00">{{ unsicherAlt1 }}</span>/<span style="color: grey;">{{ keineAngabeAlt1 }}</span>)</span></ion-item-divider>\n\n    <ion-item text-wrap>\n    <span *ngFor="let voice of alt">\n        {{ zaehleAlt1() }}\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: lightgrey;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n    </ion-item>\n    </ion-list>\n    <ion-list>\n    <ion-item-divider>Alt 2 (<span style="color: green">{{ zusageAlt2 }}</span> von\n        {{ zusageAlt2 + absageAlt2 + unsicherAlt2 + keineAngabeAlt2 }}) <span item-right style="font-size:0.8em">(<span style="color: red">{{ absageAlt2 }}</span>/\n        <span style="color:#e0ac00">{{ unsicherAlt2 }}</span>/<span style="color: grey;">{{ keineAngabeAlt2 }}</span>)</span></ion-item-divider>\n\n\n        <ion-item text-wrap>\n    <span *ngFor="let voice of alt2">\n        {{ zaehleAlt2() }}\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: lightgrey;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n    <ion-item-divider>Tenor 1 (<span style="color: green">{{ zusageTenor }}</span> von\n        {{ zusageTenor1 + absageTenor1 + unsicherTenor1 + keineAngabeTenor1 }}) <span item-right style="font-size:0.8em">(<span style="color: red">{{ absageTenor1 }}</span>/\n        <span style="color:#e0ac00">{{ unsicherTenor1 }}</span>/<span style="color: grey;">{{ keineAngabeTenor1 }}</span>)</span></ion-item-divider>\n    <ion-item text-wrap>\n    <span *ngFor="let voice of tenor1">\n        {{ zaehleTenor1() }}\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: lightgrey;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n    </ion-item>\n    </ion-list>\n    <ion-list>\n        <ion-item-divider>Tenor 2 (<span style="color: green">{{ zusageTenor2 }}</span> von\n            {{ zusageTenor2 + absageTenor2 + unsicherTenor2 + keineAngabeTenor2 }}) <span item-right style="font-size:0.8em">(<span style="color: red">{{ absageTenor2 }}</span>/\n        <span style="color:#e0ac00">{{ unsicherTenor2 }}</span>/<span style="color: grey;">{{ keineAngabeTenor2 }}</span>)</span></ion-item-divider>\n        <ion-item text-wrap>\n    <span *ngFor="let voice of tenor2">\n        {{ zaehleTenor2() }}\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: lightgrey;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n    <ion-item-divider>Bass 1 (<span style="color: green">{{ zusageBariton }}</span> von\n        {{ zusageBariton + absageBariton + unsicherBariton + keineAngabeBariton }}) <span item-right style="font-size:0.8em">(<span style="color: red">{{ absageBariton }}</span>/\n        <span style="color:#e0ac00">{{ unsicherBariton }}</span>/<span style="color: grey;">{{ keineAngabeBariton }}</span>)</span></ion-item-divider>\n\n        <ion-item text-wrap>\n\n    <span *ngFor="let voice of bariton">\n{{ zaehleBariton() }}\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: lightgrey;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n    </ion-item>\n    </ion-list>\n    <ion-list>\n    <ion-item-divider>Bass 2 (<span style="color: green">{{ zusageBass }}</span> von\n        {{ zusageBass + absageBass + unsicherBass + keineAngabeBass }}) <span item-right style="font-size:0.8em">(<span style="color: red">{{ absageBass }}</span>/\n        <span style="color:#e0ac00">{{ unsicherBass }}</span>/<span style="color: grey;">{{ keineAngabeBass }}</span>)</span></ion-item-divider>\n\n\n        <ion-item text-wrap>\n    <span *ngFor="let voice of bass">\n        {{ zaehleBass() }}\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'nein\'" style="color: red">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="!(anwesend[terminID] && anwesend[terminID][voice]) || anwesend[terminID] && anwesend[terminID][voice]==\'vielleicht\'" style="color: lightgrey;">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'ja\'" style="color: green">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n        <span *ngIf="anwesend[terminID] && anwesend[terminID][voice]==\'unsicher\'" style="color:#e0ac00">{{namen[voice]}}<span style="color:lightgrey"> | </span></span>\n    </span>\n        </ion-item>\n    </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/anwesenheit/anwesenheit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], AnwesenheitPage);
    return AnwesenheitPage;
}());

//# sourceMappingURL=anwesenheit.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SigninPage = (function () {
    function SigninPage(authService, loadingCtrl, alertCtrl) {
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    SigninPage.prototype.onSignin = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Einen Moment bitte...'
        });
        loading.present();
        this.authService.signin(form.value.email, form.value.password)
            .then(function (data) {
            loading.dismiss();
        })
            .catch(function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Login nicht möglich',
                message: 'Email-Adresse oder Passwort nicht bekannt! Passwort vergessen? Kein Problem! Für ein neues Passwort bitte nur die Email-Adresse eintragen und dann "Passwort einrichten oder zurücksetzen" auswählen.',
                //error.message,
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    SigninPage.prototype.onResetPassword = function (form) {
        var _this = this;
        var checking = this.loadingCtrl.create({
            content: 'Einen Moment bitte...'
        });
        checking.present();
        this.authService.resetPassword(form.value.email)
            .then(function (data) {
            var alert = _this.alertCtrl.create({
                title: 'Email mit Anweisungen versendet an:',
                message: form.value.email,
                buttons: ['Ok']
            });
            alert.present();
            checking.dismiss();
        })
            .catch(function (error) {
            checking.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Unbekanntes Login',
                message: "Die oben eingegebene Email-Adresse ist dem System unbekannt. Oder es gibt einen Tippfehler...",
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/signin/signin.html"*/'<!--\n  Generated template for the SigninPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" >\n    <ion-list>\n      <ion-item>\n        <ion-label floating>E-Mail-Adresse</ion-label>\n        <ion-input\n                type="email"\n                ngModel\n                name="email"\n                required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Passwort</ion-label>\n        <ion-input\n                type="password"\n                ngModel\n                name="password"\n                required></ion-input>\n      </ion-item>\n    </ion-list>\n    <button ion-button type="submit" [disabled]="!f.valid" (click)="onSignin(f)">anmelden</button><br>\n    <button ion-button (click)="onResetPassword(f)">Passwort einrichten oder zurücksetzen</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/signin/signin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropboxProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DropboxProvider = (function () {
    function DropboxProvider(http, http1, http3) {
        this.http = http;
        this.http1 = http1;
        this.http3 = http3;
        this.folderHistory = [];
    }
    DropboxProvider.prototype.setAccessToken = function (token) {
        this.accessToken = token;
    };
    DropboxProvider.prototype.download = function (path) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Dropbox-API-Arg', '{"path": "' + path + '"}');
        return this.http.post('https://content.dropboxapi.com/2/files/download', null, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers,
            responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* ResponseContentType */].ArrayBuffer
        })).map(function (res) { return res.arrayBuffer(); });
        /*
            .subscribe((res) => {
              return res;
            });
        */
    };
    DropboxProvider.prototype.getLink = function (path) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        var folderPath = {
            path: path
        };
        return this.http.post('https://api.dropboxapi.com/2/files/get_temporary_link', JSON.stringify(folderPath), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    /*
    download(path)
    {
        let headers = new Headers();
  
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Dropbox-API-Arg', '{"path":"/awomensworth/noten.pdf"}');
  
        let header = {
          'Authorization': 'Bearer ' + this.accessToken,
            'Dropbox-API-Arg': '{"path":"/awomensworth/noten.pdf"}'
        };
  
        let data = {
            'path': '/awomensworth/noten.pdf'
        };
  
        this.http1.setDataSerializer('json');
  
        return this.http3.post('https://content.dropboxapi.com/2/files/download', JSON.stringify(data),
            headers: new HttpHeaders().);
            ;
    }
  
    */
    /*
  
    this.http.post(this.apiUrl+'/users', JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
      params: new HttpParams().set('id', '3'),
    })
    .subscribe(res => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
     */
    DropboxProvider.prototype.getUserInfo = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('https://api.dropboxapi.com/2/users/get_current_account', "null", { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DropboxProvider.prototype.getFolders = function (path) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        var folderPath;
        if (typeof (path) == "undefined" || !path) {
            folderPath = {
                path: ""
            };
        }
        else {
            folderPath = {
                path: path
            };
            if (this.folderHistory[this.folderHistory.length - 1] != path) {
                this.folderHistory.push(path);
            }
        }
        return this.http.post('https://api.dropboxapi.com/2/files/list_folder', JSON.stringify(folderPath), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DropboxProvider.prototype.goBackFolder = function () {
        if (this.folderHistory.length > 0) {
            this.folderHistory.pop();
            var path = this.folderHistory[this.folderHistory.length - 1];
            return this.getFolders(path);
        }
        else {
            return this.getFolders();
        }
    };
    DropboxProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], DropboxProvider);
    return DropboxProvider;
}());

//# sourceMappingURL=dropbox.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdresslistePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AdresslistePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdresslistePage = (function () {
    function AdresslistePage(httpClient, navCtrl, navParams) {
        this.httpClient = httpClient;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // this.user = this.httpClient.get('http://h2821129.stratoserver.net/api.php/records/user');
    }
    AdresslistePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdresslistePage');
    };
    AdresslistePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-adressliste',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/adressliste/adressliste.html"*/'<!--\n  Generated template for the AdresslistePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Adressliste</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <!--\n    <p>HIer kommen die Lehrer:</p>\n    <ion-list  >\n        <ion-item *ngFor="let einUser of (user|async)?.records">{{einUser.name}}</ion-item>\n    </ion-list>\n    -->\n<div style="width:100%;height:100%;overflow:scroll !important;-webkit-overflow-scrolling:touch !important">\n      <iframe style="width:100%;height:100%" src="https://docs.google.com/spreadsheets/d/1z58V3f0aJ9X6T1af7UzKNS6cuX7Naf479psm0HP5m6g/pubhtml?widget=true&amp;headers=false" scrolling="yes" ></iframe>\n</div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/adressliste/adressliste.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], AdresslistePage);
    return AdresslistePage;
}());

//# sourceMappingURL=adressliste.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AufgabenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AufgabenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AufgabenPage = (function () {
    function AufgabenPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AufgabenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AufgabenPage');
    };
    AufgabenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-aufgaben',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/aufgaben/aufgaben.html"*/'<!--\n  Generated template for the AufgabenPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Aufgabenverteilung</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<div style="width:100%;height:100%;overflow:scroll !important;-webkit-overflow-scrolling:touch !important">\n      <iframe style="width:100%;height:100%" src="https://docs.google.com/document/d/1-BpiM8LemuA6eCOI9L_I2IqpjY-BVpP7LagZ3cCShx8/pub?embedded=true" scrolling="yes" ></iframe>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/aufgaben/aufgaben.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], AufgabenPage);
    return AufgabenPage;
}());

//# sourceMappingURL=aufgaben.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BildergaleriePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the BildergaleriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BildergaleriePage = (function () {
    function BildergaleriePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BildergaleriePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BildergaleriePage');
    };
    BildergaleriePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-bildergalerie',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/bildergalerie/bildergalerie.html"*/'<!--\n  Generated template for the BildergaleriePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bildergalerie</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<div style="width:100%;height:100%;overflow:scroll !important;-webkit-overflow-scrolling:touch !important">\n      <iframe style="width:100%;height:100%" src="https://docs.google.com/document/d/1RPI8JAZA56twxDKDBFARRXv0i6FjTHM_A2Nhq-aVnlk/pub?embedded=true" scrolling="yes" ></iframe>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/bildergalerie/bildergalerie.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], BildergaleriePage);
    return BildergaleriePage;
}());

//# sourceMappingURL=bildergalerie.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KalenderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the KalenderPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KalenderPage = (function () {
    function KalenderPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.probenRoot = 'ProbenPage';
        this.andereTermineRoot = 'AndereTerminePage';
    }
    KalenderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-kalender',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/kalender/kalender.html"*/'<ion-tabs>\n    <ion-tab [root]="probenRoot" tabTitle="Proben" tabIcon="information-circle"></ion-tab>\n    <ion-tab [root]="andereTermineRoot" tabTitle="Terminkalender" tabIcon="information-circle"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/kalender/kalender.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], KalenderPage);
    return KalenderPage;
}());

//# sourceMappingURL=kalender.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(265);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_module__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_aufgaben_aufgaben__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_bildergalerie_bildergalerie__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_adressliste_adressliste__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_kalender_kalender__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_andere_termine_andere_termine__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_proben_proben__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_proben_protokoll_proben_protokoll__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_anwesenheit_anwesenheit__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_anwesenheit_probe_anwesenheit_probe__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_kalender_kalender__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_dropbox_dropbox__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_http__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_http__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_transfer__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_file__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ng2_pdf_viewer__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_auth_auth__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_signin_signin__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_during_login_during_login__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_file_opener__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















// import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';


//import { Media  } from '@ionic-native/media';





/**
 * Sample custom factory function to use with ionic-audio
 */
/*
export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}
*/
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_kalender_kalender__["a" /* KalenderPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_aufgaben_aufgaben__["a" /* AufgabenPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_bildergalerie_bildergalerie__["a" /* BildergaleriePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_adressliste_adressliste__["a" /* AdresslistePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_andere_termine_andere_termine__["a" /* AndereTerminePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_proben_proben__["a" /* ProbenPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_during_login_during_login__["a" /* DuringLoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_anwesenheit_anwesenheit__["a" /* AnwesenheitPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_anwesenheit_probe_anwesenheit_probe__["a" /* AnwesenheitProbePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_proben_protokoll_proben_protokoll__["a" /* ProbenProtokollPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/adressliste/adressliste.module#AdresslistePageModule', name: 'AdresslistePage', segment: 'adressliste', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/andere-termine/andere-termine.module#AndereTerminePageModule', name: 'AndereTerminePage', segment: 'andere-termine', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/anwesenheit-probe/anwesenheit-probe.module#AnwesenheitProbePageModule', name: 'AnwesenheitProbePage', segment: 'anwesenheit-probe', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/aufgaben/aufgaben.module#AufgabenPageModule', name: 'AufgabenPage', segment: 'aufgaben', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/bildergalerie/bildergalerie.module#BildergaleriePageModule', name: 'BildergaleriePage', segment: 'bildergalerie', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/during-login/during-login.module#DuringLoginPageModule', name: 'DuringLoginPage', segment: 'during-login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/kalender/kalender.module#KalenderPageModule', name: 'KalenderPage', segment: 'kalender', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/proben-protokoll/proben-protokoll.module#ProbenProtokollPageModule', name: 'ProbenProtokollPage', segment: 'proben-protokoll', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/proben/proben.module#ProbenPageModule', name: 'ProbenPage', segment: 'proben', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_20__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_module__["a" /* PipesModule */],
                //   IonicAudioModule.forRoot(defaultAudioProviderFactory),
                __WEBPACK_IMPORTED_MODULE_24_ng2_pdf_viewer__["a" /* PdfViewerModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_proben_proben__["a" /* ProbenPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_kalender_kalender__["a" /* KalenderPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_aufgaben_aufgaben__["a" /* AufgabenPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_bildergalerie_bildergalerie__["a" /* BildergaleriePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_adressliste_adressliste__["a" /* AdresslistePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_andere_termine_andere_termine__["a" /* AndereTerminePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_proben_protokoll_proben_protokoll__["a" /* ProbenProtokollPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_during_login_during_login__["a" /* DuringLoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_anwesenheit_anwesenheit__["a" /* AnwesenheitPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_anwesenheit_probe_anwesenheit_probe__["a" /* AnwesenheitProbePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_18__providers_kalender_kalender__["a" /* KalenderProvider */],
                __WEBPACK_IMPORTED_MODULE_19__providers_dropbox_dropbox__["a" /* DropboxProvider */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_http__["a" /* HTTP */],
                //Media,
                __WEBPACK_IMPORTED_MODULE_25__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_file_opener__["a" /* FileOpener */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__datum_datum__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uhrzeit_uhrzeit__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__terminfilter_terminfilter__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__probenfilter_probenfilter__ = __webpack_require__(329);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__datum_datum__["a" /* DatumPipe */],
                __WEBPACK_IMPORTED_MODULE_2__uhrzeit_uhrzeit__["a" /* UhrzeitPipe */],
                __WEBPACK_IMPORTED_MODULE_3__terminfilter_terminfilter__["a" /* TerminfilterPipe */],
                __WEBPACK_IMPORTED_MODULE_4__probenfilter_probenfilter__["a" /* ProbenfilterPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__datum_datum__["a" /* DatumPipe */],
                __WEBPACK_IMPORTED_MODULE_2__uhrzeit_uhrzeit__["a" /* UhrzeitPipe */],
                __WEBPACK_IMPORTED_MODULE_3__terminfilter_terminfilter__["a" /* TerminfilterPipe */],
                __WEBPACK_IMPORTED_MODULE_4__probenfilter_probenfilter__["a" /* ProbenfilterPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatumPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the DatumPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var DatumPipe = (function () {
    function DatumPipe() {
    }
    /**
     * Konvertiert ein Datum in einen String
     */
    DatumPipe.prototype.transform = function (value) {
        if (value != undefined) {
            var wochentag = new Date(value).getDay();
            var wochentagBez = void 0;
            if (wochentag == 0)
                wochentagBez = "So, ";
            if (wochentag == 1)
                wochentagBez = "Mo, ";
            if (wochentag == 2)
                wochentagBez = "Di, ";
            if (wochentag == 3)
                wochentagBez = "Mi, ";
            if (wochentag == 4)
                wochentagBez = "Do, ";
            if (wochentag == 5)
                wochentagBez = "Fr, ";
            if (wochentag == 6)
                wochentagBez = "Sa, ";
            return (wochentagBez + new Date(value).toLocaleDateString());
        }
        else
            return null;
    };
    DatumPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'datum',
        })
    ], DatumPipe);
    return DatumPipe;
}());

//# sourceMappingURL=datum.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UhrzeitPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the UhrzeitPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var UhrzeitPipe = (function () {
    function UhrzeitPipe() {
    }
    /**
     * Extrahiert die Uhrzeit
     */
    UhrzeitPipe.prototype.transform = function (value) {
        if (value !== undefined)
            return value.substring(11, 16) + " Uhr";
        else
            return null;
    };
    UhrzeitPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'uhrzeit',
        })
    ], UhrzeitPipe);
    return UhrzeitPipe;
}());

//# sourceMappingURL=uhrzeit.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminfilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the TerminfilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var TerminfilterPipe = (function () {
    function TerminfilterPipe() {
    }
    // Keine Probentermine anzeigen deren Ort noch nicht feststehen
    TerminfilterPipe.prototype.transform = function (termin) {
        var neueTermine = termin.filter(function (item) { return (!item.summary.includes("Probe ")); });
        // console.log(neueTermine);
        return neueTermine;
    };
    TerminfilterPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'terminfilter',
        })
    ], TerminfilterPipe);
    return TerminfilterPipe;
}());

//# sourceMappingURL=terminfilter.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProbenfilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the ProbenfilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var ProbenfilterPipe = (function () {
    function ProbenfilterPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    ProbenfilterPipe.prototype.transform = function (termin) {
        var neueTermine = termin.filter(function (item) { return (item.summary.includes("Probe ")); });
        // console.log(neueTermine);
        return neueTermine;
    };
    ProbenfilterPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'probenfilter',
        })
    ], ProbenfilterPipe);
    return ProbenfilterPipe;
}());

//# sourceMappingURL=probenfilter.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_proben_protokoll_proben_protokoll__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_proben_proben__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_andere_termine_andere_termine__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_during_login_during_login__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//import { KalenderPage } from "../pages/kalender/kalender";




var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, auth, menuCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.auth = auth;
        this.menuCtrl = menuCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_during_login_during_login__["a" /* DuringLoginPage */];
        this.isAuthenticated = false;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Termine', component: __WEBPACK_IMPORTED_MODULE_8__pages_andere_termine_andere_termine__["a" /* AndereTerminePage */] },
            { title: 'Proben', component: __WEBPACK_IMPORTED_MODULE_7__pages_proben_proben__["a" /* ProbenPage */] },
            { title: 'Rückblick', component: __WEBPACK_IMPORTED_MODULE_6__pages_proben_protokoll_proben_protokoll__["a" /* ProbenProtokollPage */] },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBniZDN6biOh6cimoM8e26ZwkbAxFUzirU",
            authDomain: "vbintern-aa649.firebaseapp.com",
            databaseURL: "https://vbintern-aa649.firebaseio.com",
            projectId: "vbintern-aa649",
            storageBucket: "vbintern-aa649.appspot.com",
            messagingSenderId: "720228956949"
        };
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.initializeApp(config);
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.isAuthenticated = true;
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_andere_termine_andere_termine__["a" /* AndereTerminePage */];
                var that_1 = _this;
                var userId = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().currentUser.uid;
                return __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                    that_1.name = (snapshot.val() && snapshot.val().Name) || 'Anonymous';
                    that_1.stimmgruppe = (snapshot.val() && snapshot.val().Stimmgruppe) || 'Anonymous';
                });
            }
            else {
                _this.isAuthenticated = false;
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
            }
        });
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.onLogout = function () {
        this.auth.logout();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/app/app.html"*/'<ion-split-pane when="md" *ngIf="isAuthenticated">\n<ion-menu [content]="content" >\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Hallo {{ name }}!</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="menu-container">\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" class="transparent list-item">\n        {{p.title}}\n      </button>\n\n\n      <button\n              ion-item\n              icon-left\n              (click)="onLogout()"\n              *ngIf="isAuthenticated">\n        <ion-icon name="log-out"></ion-icon>\n        Logout\n      </button>\n\n\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n\n\n\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" main></ion-nav>\n\n</ion-split-pane>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" main *ngIf="!isAuthenticated"></ion-nav>'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dropbox_dropbox__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_opener__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { Media, MediaObject } from '@ionic-native/media';


var HomePage = (function () {
    function HomePage(navCtrl, dropbox, loadingCtrl, transfer, file, platform, alertCtrl, fileOpener) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.dropbox = dropbox;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
        this.file = file;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.fileOpener = fileOpener;
        this.stimmgruppe = "";
        this.meldung = "nichts";
        this.musik = "";
        this.imageUrl = "";
        this.mp3Link = "";
        this.pdfLink = "";
        this.fileTempLinks = {};
        this.depth = 0;
        this.storageDirectory = '';
        this.duration = -1;
        this.position = 0;
        this.is_playing = false;
        this.is_in_play = false;
        this.is_ready = false;
        this.is_device = true;
        var userId = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.uid;
        var probeMitgliederRef = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('users/' + userId + '/Stimmgruppe/');
        var that = this;
        probeMitgliederRef.on('value', function (snapshot) {
            if (snapshot.val())
                that.stimmgruppe = snapshot.val();
        });
        this.platform.ready().then(function () {
            // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
            if (!_this.platform.is('cordova')) {
                _this.is_device = false;
            }
            if (_this.platform.is('ios')) {
                _this.storageDirectory = cordova.file.documentsDirectory;
            }
            else if (_this.platform.is('android')) {
                _this.storageDirectory = cordova.file.dataDirectory;
            }
            else {
                // exit otherwise, but you could add further types here e.g. Windows
                return false;
            }
        });
    }
    // Kopie der Datei von einem Server (scheint für Dropbox nicht geeignet)
    HomePage.prototype.downloadImage = function (image) {
        var _this = this;
        this.platform.ready().then(function () {
            var fileTransfer = _this.transfer.create();
            var imageLocation = cordova.file.applicationDirectory + "www/assets/imgs/" + image;
            fileTransfer.download(imageLocation, _this.storageDirectory + image).then(function (entry) {
                var alertSuccess = _this.alertCtrl.create({
                    title: "Download Succeeded!",
                    subTitle: image + " was successfully downloaded to: " + entry.toURL(),
                    buttons: ['Ok']
                });
                _this.imageUrl = entry.toURL();
                alertSuccess.present();
            }, function (error) {
                var alertFailure = _this.alertCtrl.create({
                    title: "Download Failed!",
                    subTitle: image + " was not successfully downloaded. Error code: " + error.code,
                    buttons: ['Ok']
                });
                alertFailure.present();
            });
        });
    };
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
    HomePage.prototype.getDurationAndSetToPlay = function () {
        this.mp3file.play();
        this.mp3file.setVolume(0.0); // you don't want users to notice that you are playing the file
        var self = this;
        this.get_duration_interval = setInterval(function () {
            if (self.duration == -1) {
                self.duration = ~~(self.mp3file.getDuration()); // make it an integer
                // self.duration_string = self.fmtMSS(self.duration);   // replaced by the Angular DatePipe
            }
            else {
                self.mp3file.stop();
                self.mp3file.release();
                self.setRecordingToPlay();
                clearInterval(self.get_duration_interval);
            }
        }, 100);
    };
    HomePage.prototype.setRecordingToPlay = function () {
        var _this = this;
        this.mp3file.onStatusUpdate.subscribe(function (status) {
            // 2: playing
            // 3: pause
            // 4: stop
            _this.message = status;
            switch (status) {
                case 1:
                    _this.is_in_play = false;
                    break;
                case 2:// 2: playing
                    _this.is_in_play = true;
                    _this.is_playing = true;
                    break;
                case 3:// 3: pause
                    _this.is_in_play = true;
                    _this.is_playing = false;
                    break;
                case 4: // 4: stop
                default:
                    _this.is_in_play = false;
                    _this.is_playing = false;
                    break;
            }
        });
        this.message = "audio file set";
        this.is_ready = true;
        this.getAndSetCurrentAudioPosition();
    };
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
    HomePage.prototype.retrieveImage = function (image) {
        var _this = this;
        this.file.checkFile(this.storageDirectory, image)
            .then(function () {
            var alertSuccess = _this.alertCtrl.create({
                title: "File retrieval Succeeded!",
                subTitle: image + " was successfully retrieved from: " + _this.storageDirectory,
                buttons: ['Ok']
            });
            return alertSuccess.present();
        })
            .catch(function (err) {
            var alertFailure = _this.alertCtrl.create({
                title: "File retrieval Failed!",
                subTitle: image + " was not successfully retrieved. Error Code: " + err.code,
                buttons: ['Ok']
            });
            return alertFailure.present();
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dropbox.setAccessToken("yuJf6AR8f2IAAAAAAABCb0luLfWJxFO-ceA0MuiaXuknRBcXE6_xbIAYFgvSLPdg");
        this.folders = [];
        var loading = this.loadingCtrl.create({
            content: 'Einen Moment bitte...'
        });
        loading.present();
        this.dropbox.getFolders('/Reportoire').subscribe(function (data) {
            _this.folders = data.entries;
            _this.folders.sort(_this.compare);
            loading.dismiss();
        }, function (err) {
            console.log(err);
        });
    };
    // Wird für die Sortierung der Dateinamen benötigt.
    HomePage.prototype.compare = function (a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    };
    HomePage.prototype.openFolder = function (path) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Einen Moment bitte...'
        });
        loading.present();
        this.dropbox.getFolders(path).subscribe(function (data) {
            _this.folders = data.entries;
            var self = _this;
            // console.log("Folder:");
            _this.folders.forEach(function (folder) {
                console.log(folder);
                self.dropbox.getLink(folder.path_lower).subscribe(function (data) {
                    self.fileTempLinks[folder.path_lower] = data.link;
                }, function (err) { console.log("Warum??"); });
            });
            _this.depth++;
            loading.dismiss();
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.goBack = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Syncing from Dropbox...'
        });
        loading.present();
        this.dropbox.goBackFolder().subscribe(function (data) {
            _this.folders = data.entries;
            _this.depth--;
            loading.dismiss();
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.fileIsViewable = function (name) {
        return (name.substr(name.length - 3, 3) == "mp3" || name.substr(name.length - 3, 3) == "pdf");
    };
    HomePage.prototype.downloadAllowed = function (name) {
        var isPDF = name.substr(name.length - 3, 3) == "pdf";
        var probemitglied = false;
        if (this.stimmgruppe == "Probemitglied") {
            probemitglied = true;
        }
        return !(probemitglied && isPDF);
    };
    HomePage.prototype.openFile = function (name) {
        var _this = this;
        var dateityp = name.substr(name.length - 3, 3);
        if (dateityp === "pdf") {
            this.LoadingDialog = this.loadingCtrl.create({
                content: 'PDF-Datei wird gleich unten angezeigt... '
            });
        }
        if (dateityp === "mp3") {
            this.LoadingDialog = this.loadingCtrl.create({
                content: 'Audio-Datei wird gleich oben angezeigt... '
            });
        }
        this.LoadingDialog.present();
        this.dropbox.getLink(name).subscribe(function (data) {
            if (dateityp == "pdf") {
                _this.pdfLink = data.link;
            }
            else if (dateityp == "mp3") {
                _this.mp3Link = "";
                setTimeout(function () { return _this.mp3Link = data.link; }, 0);
                _this.LoadingDialog.dismiss();
            }
        }, function (err) {
        });
    };
    HomePage.prototype.playMusic = function () {
        this.mp3file.play();
    };
    HomePage.prototype.stopMusic = function () {
        this.mp3file.stop();
    };
    HomePage.prototype.getAndSetCurrentAudioPosition = function () {
        var diff = 1;
        var self = this;
        this.get_position_interval = setInterval(function () {
            var last_position = self.position;
            self.mp3file.getCurrentPosition().then(function (position) {
                if (position >= 0 && position < self.duration) {
                    if (Math.abs(last_position - position) >= diff) {
                        // set position
                        self.mp3file.seekTo(last_position * 1000);
                    }
                    else {
                        // update position for display
                        self.position = position;
                    }
                }
                else if (position >= self.duration) {
                    self.stopMusic();
                    //this.setRecordingToPlay();
                }
            });
        }, 100);
    };
    HomePage.prototype.runterladen = function (path, name, type) {
        var _this = this;
        //download file from dropbox to local storage
        this.platform.ready().then(function () {
            var loading = _this.loadingCtrl.create({
                content: 'Download: ' + path
            });
            loading.present();
            _this.dropbox.download(path).subscribe(function (data) {
                _this.file.writeFile(_this.storageDirectory, name, data, { replace: true }).then(function () {
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
                    var rect = [0, 0, innerWidth / 2, 0];
                    cordova.plugins.fileOpener2.showOpenWithDialog(_this.storageDirectory + name, type, {
                        error: function (e) {
                            console.log('Error opening file: ' + e.status + ' - Error message: ' + e.message);
                        },
                        success: function (e) {
                        },
                        rect: rect,
                    })
                        .then(function () {
                        /*
                        const alertSuccess = this.alertCtrl.create({
                            title: `File opened!`,

                            buttons: ['Ok']
                        });
                        return alertSuccess.present();
                        */
                    })
                        .catch(function (e) {
                        var alertFailure = _this.alertCtrl.create({
                            title: "File open Failed!",
                            subTitle: "Error Code: " + e.valueOf(),
                            buttons: ['Ok']
                        });
                        return alertFailure.present();
                    });
                });
                loading.dismiss();
            }, function (err) {
                _this.meldung = "error: " + err;
                loading.dismiss();
                var alertFailure = _this.alertCtrl.create({
                    title: "File download Failed!",
                    subTitle: "Error Code: " + err.toString(),
                    buttons: ['Ok']
                });
                return alertFailure.present();
            });
        });
    };
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
    HomePage.prototype.downloadLink = function (name) {
        return this.fileTempLinks[name];
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n\n    <ion-buttons start *ngIf="never">\n      <button ion-button (click)="playMusic()" color="secondary">Play</button>\n      <button ion-button (click)="stopMusic()" color="secondary">Stop</button>\n      <button ion-button *ngIf="depth" (click)="goBack()"><ion-icon name="arrow-back"></ion-icon> Back</button>\n    </ion-buttons>\n\n\n    <ion-range min="0" max="{{duration}}" [(ngModel)]="position" *ngIf="never"> <!--  [disabled]="is_in_play && is_playing"  -->\n      <ion-label range-left>{{ position*1000 | date:\'mm:ss\' }}</ion-label>\n      <ion-label range-right *ngIf="duration == -1" >--:--</ion-label>\n      <ion-label range-right *ngIf="duration != -1">{{ duration*1000 | date:\'mm:ss\' }}</ion-label>\n    </ion-range>\n\n    <audio *ngIf="mp3Link!=\'\'" controls style="width: 100%">\n      <source [src]="mp3Link" type="audio/mpeg">\n      Your browser does not support the audio tag.\n    </audio>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <ion-card-content *ngIf="stimmgruppe==\'Probemitglied\'">\n      Du bist in der BonnVoice-App als Probemitglied registriert und kannst aus Sicherheitsgründen keine Noten (PDF-Dateien) hier ansehen und herunterladen.\n      Bitte wende Dich bei fehlenden Noten an Tono :)\n    </ion-card-content>\n\n  </ion-card>\n  <!--<button ion-button *ngIf="depth" (click)="goBack()"><ion-icon name="arrow-back"></ion-icon>Reportoire</button>-->\n  <ion-list>\n    <div *ngFor="let folder of folders">\n      <ion-item *ngIf="folder[\'.tag\'] == \'folder\'" detail-push (click)="openFolder(folder.path_lower)">\n        {{folder.name}}\n      </ion-item>\n      <ion-item *ngIf="folder[\'.tag\'] == \'file\'" >\n        {{folder.name}}\n          <ion-icon *ngIf="(platform.is(\'ios\') || platform.is(\'android\')) && fileIsViewable(folder.name) && downloadAllowed(folder.name)" item-right name="eye" (click)="openFile(folder.path_lower)"></ion-icon>\n          <ion-icon *ngIf="platform.is(\'ios\') && downloadAllowed(folder.name)" item-right name="open-outline" (click)="runterladen(folder.path_lower,folder.name,folder.type)"></ion-icon>\n          <div *ngIf="!platform.is(\'ios\') && !platform.is(\'android\') && fileIsViewable(folder.name) && downloadAllowed(folder.name)" item-right (click)="openFile(folder.path_lower)"><img src="assets/imgs/viewIcon.svg" width="20px" height="20pxs"></div>\n          <div *ngIf="!platform.is(\'ios\') && !platform.is(\'android\') && downloadAllowed(folder.name)" item-right><a [href]="downloadLink(folder.path_lower)"><img src="assets/imgs/downloadIcon.svg" width="20px" height="20pxs"></a></div>\n      </ion-item>\n    </div>\n  </ion-list>\n\n    <!-- <button ion-button (click)="downloadMusicFromDropbox()" color="secondary">Download Music from Dropbox</button> -->\n   <!--\n    <p>{{meldung}}</p>\n    <button ion-button (click)="playMusic()" color="secondary">Play</button>\n    <button ion-button (click)="stopMusic()" color="secondary">Stop</button>\n   -->\n\n\n  <pdf-viewer [src]="pdfLink"\n              [render-text]="true"\n              [fit-to-page]="true"\n              (after-load-complete)="LoadingDialog.dismiss()"\n              style="display: block; width:100%">\n  </pdf-viewer>\n\n    <!--\n    <ion-card>\n        <ion-card-header>\n            Ionic 3 File Transfer Example\n        </ion-card-header>\n        <ion-card-content>\n            <img src="assets/imgs/pug.jpg" alt="Cute Pug">\n            <button ion-button (click)="downloadImage(\'pug.jpg\')" color="secondary">Download image</button>\n            <button ion-button (click)="downloadMusicFromDropbox()" color="secondary">Download Music from Dropbox</button>\n            <p>{{meldung}}</p>\n            <button ion-button (click)="retrieveImage(\'pug.jpg\')" color="secondary">Retrieve downloaded image</button>\n            <button ion-button (click)="retrieveMusic()" color="secondary">Retrieve downloaded music</button>\n        </ion-card-content>\n    </ion-card>\n    -->\n\n</ion-content>\n'/*ion-inline-end:"/Users/svenfrimont/BonnVoiceArbeitsGitKopie/voxBona/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_dropbox_dropbox__["a" /* DropboxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_opener__["a" /* FileOpener */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 346:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 365:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 366:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 367:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KalenderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import moment from 'moment';
/*
  Generated class for the KalenderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var KalenderProvider = (function () {
    function KalenderProvider(http) {
        this.http = http;
    }
    KalenderProvider.prototype.getData = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var heute = new Date();
            var year = heute.getFullYear();
            var month = heute.getMonth();
            var day = heute.getDate();
            var inZweiJahren = new Date(year + 2, month, day);
            var inEinemJahr = new Date(year + 1, month, day);
            _this.googleURL = "https://www.googleapis.com/calendar/v3/calendars/janlueth2201@gmail.com/events?key=AIzaSyBUfymwqsh1vimIuCjJhioO42MPH3Nk_FU&orderBy=startTime&singleEvents=true&maxResults=2500&timeMin=" + heute.toISOString() + "&timeMax=" + inEinemJahr.toISOString();
            _this.http.get(_this.googleURL).subscribe(function (data) {
                resolve(data);
                console.log("Daten erfolgreich geladen");
            }, function (err) {
                console.log(err);
            });
        });
    };
    KalenderProvider.prototype.getPastProben = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var heute = new Date();
            var year = heute.getFullYear();
            var month = heute.getMonth();
            var day = heute.getDate();
            var vorEinemJahr = new Date(year - 2, month, day);
            var gestern = new Date(year, month, day - 1);
            _this.googleURL = "https://www.googleapis.com/calendar/v3/calendars/janlueth2201@gmail.com/events?key=AIzaSyBUfymwqsh1vimIuCjJhioO42MPH3Nk_FU&orderBy=startTime&singleEvents=true&maxResults=2500&timeMin=" + vorEinemJahr.toISOString() + "&timeMax=" + heute.toISOString();
            _this.http.get(_this.googleURL).subscribe(function (data) {
                resolve(data);
                console.log("vorherige Proben erfolgreich geladen");
            }, function (err) {
                console.log(err);
            });
        });
    };
    KalenderProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], KalenderProvider);
    return KalenderProvider;
}());

//# sourceMappingURL=kalender.js.map

/***/ })

},[243]);
//# sourceMappingURL=main.js.map