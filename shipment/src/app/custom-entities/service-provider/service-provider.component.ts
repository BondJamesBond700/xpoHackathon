import { Component, OnInit } from '@angular/core';
import { PanelComponent } from 'rebirth-ng';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent implements OnInit {
  public selectedTab:any;
  public isCollapsed: boolean = true;
  constructor() { }

  ngOnInit() {
        this.selectedTab='initiated';

  }
  onCollapse(panel: PanelComponent, item: any) {
        if (panel.isCollapsed){
          
        }
            // this.getTransactionDetails(item);
    }

  showProductHistory(event) {
    // Loads list of trades when second tab is clicked
    console.log(event.index);
    if (event.index == 0) {
      console.log(event.index);
      this.selectedTab='initiated';
    }
    if(event.index == 1){
      console.log(event.index+'hello');
      this.selectedTab='history';
    }

    console.log(this.selectedTab)
      
  }
}
