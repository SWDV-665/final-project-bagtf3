import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesProviderService } from '../groceries-provider.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery";
  items = [];
  errorMessage: string;


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController,
              public dataService: GroceriesProviderService, public inputDialogService: InputDialogService,
              public socialSharing: SocialSharing ) {

    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
    this.loadItems();
    });
  }

  ngOnInit() {
    console.log("Page loading...")
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error
        );
  }

  async removeItem(item, index) {
    console.log("Removing Item - ", item);
    //this.dataService.items.splice(index, 1);
    this.dataService.removeItem(item)

    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + item.name + " ...",
      duration: 3000
    });

    return (await toast).present();
  }

  async shareItem(item, index) {
    console.log("Sharing Item - ", item);

    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + item.name + " ...",
      duration: 3000
    });

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Grocery App";

    this.socialSharing.share().then(() => {
      console.log("Shared Successfully");
    }).catch((error) => {
      console.log("Error: ", error);
    });
    
    return (await toast).present();
  }

  async editItem(item, index) {
    console.log("Edit Item - ", item, index);
    this.inputDialogService.showPrompt(item, index);

    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    return (await toast).present();
  }

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

}
