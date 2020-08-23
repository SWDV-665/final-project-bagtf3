import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesProviderService } from './groceries-provider.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesProviderService) {
    console.log('Hello InputDialogService Provider');
  }

  async showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      message: item ? "Please edit item..." : "Please enter item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked', item);
            if (index !== undefined) {
              item.name = data.name;
              item.quantity = data.quantity;

              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(data);
            }
          }
        }
      ]
    });
    return (await prompt).present();
  }
  
}
