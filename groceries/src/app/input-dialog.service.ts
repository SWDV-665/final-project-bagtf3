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
      message: item ? "Edit Review Here..." : "Add Review here..." ,
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'rating',
          placeholder: 'Rating',
          value: item ? item.rating : null
        },
        {
          name: 'review',
          placeholder: 'Review',
          value: item ? item.review : null
        },
        {
          name: 'user',
          placeholder: 'User',
          value: item ? item.user : null
        }
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
              item.rating = data.rating;
              item.review = data.review;
              item.user = data.user;

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
