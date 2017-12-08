import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../service/message.service';
import { LeasingContract } from '../models/contract.model';

@Component({
  selector: 'app-xpo',
  templateUrl: './xpo.component.html',
  styleUrls: ['./xpo.component.css']
})
export class XpoComponent implements OnInit {
  public selectedTab;
  public baseUrl;

  public contractData = new LeasingContract();
  public addEquipmentData = new LeasingContract();

  offer: any = { price: '',picDate:'',picLocation:'',delDate:'',delLocation:'' };
  public fileUploader: FileUploader;
  constructor(public messageService: MessageService) { this.baseUrl = environment.serverProtocol + '://'
      + environment.serverName + ':'
      + environment.serverPort;}

  ngOnInit() {
    this.selectedTab='initiated';
    this.fileUploader = new FileUploader({
      url: this.baseUrl + '/bcf/doc-mgmt/docs',
      removeAfterUpload: true,
      itemAlias: 'files'
    });
    this.fileUploader.onBuildItemForm = (item, form) => {
      form.append("remarks", "meta");
     
    }
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
  createOffer(offer)
  {

    
  }

  createOffer1(offer)
  {

    console.log(offer);
    let self = this;
    // console.log(this.equipmentArray.selectedValue);
    if (this.fileUploader.queue == undefined || this.fileUploader.queue.length == 0) {
      // self.createLeasingContract(equipment, operator, meta);
      console.log('yo');
    }
    if (this.fileUploader.queue.length > 0){
      this.fileUploader.onSuccessItem = function (item, response, status, headers) {
        try {
        //   meta.contractId = JSON.parse(response).response[0].attchmentId;
        //   meta.contractHash = JSON.parse(response).response[0].docHash;
        //   meta.contractName = JSON.parse(response).response[0].documentName;
        //   meta.attachmentMeta[0].attachmentId = JSON.parse(response).response[0].attchmentId;
        //   meta.attachmentMeta[0].docHash = JSON.parse(response).response[0].docHash;
        //   meta.attachmentMeta[0].docName = JSON.parse(response).response[0].documentName;
        //   console.log(meta)
        // }
        }
        catch (e) {
          self.messageService.error('FileUpload', 'Some error occured!');
        }
        // self.createLeasingContract(equipment, operator, meta);
      }
      self.fileUploader.onErrorItem = function (item, response, status, headers) {
        console.log('item :' + JSON.stringify(item.file));
        console.log('response :' + JSON.stringify(response));
        console.log('status :' + status);
        console.log('headers :' + JSON.stringify(headers));
        self.fileUploader.queue = [];
      };
      this.fileUploader.onCompleteAll = function () {
        self.fileUploader.queue = [];
        // self.fileInput.nativeElement.value="";
        //self.messageService.info('Transaction Submitted !', 'Successfully');

      }
      
    }
    
      console.log('hello')
  }


}
