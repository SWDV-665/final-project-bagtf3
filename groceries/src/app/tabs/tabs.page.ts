import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tab1 = "Movie Search";
  tab2 = "My Reviews";
  tab3 = "Contact";

  constructor() {}

}
