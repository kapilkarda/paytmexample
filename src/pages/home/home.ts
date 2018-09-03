import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions,RequestMethod, Response, URLSearchParams } from '@angular/http';


declare var PaytmPlugin: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private http: Http, public platform: Platform) {
    

  }

  callbutton(){
      this.platform.ready().then(() => {
        let orderId = "karda12345";
        let email = "kkarda77@gmail.com";
        let mobile = "9981101934";
        let callbackURL = "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID="+orderId;
        this.http.get("https://www.mahakaalstore.com/Paytm_Web_Sample_Kit_PHP-master/PaytmKit/generateChecksum.php?MID=Engine57819657649623&ORDER_ID="+orderId+"&CUST_ID="+orderId+"&INDUSTRY_TYPE_ID=Retail109&CHANNEL_ID=WEB&TXN_AMOUNT=1&WEBSITE=Engineerwap&EMAIL="+email+"&MOBILE_NO="+mobile,{}).subscribe((response: Response) => {
            let res = response.json();
            console.log(res);
            PaytmPlugin.payWithPaytm(orderId, orderId, email, mobile, '1', callbackURL, res.CHECKSUMHASH, 'production', function (success) { 
              console.log(success); 
            }, function (failure) { 
              alert(failure); 
            });
        });
      });
    }

}
