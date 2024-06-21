import { Component } from '@angular/core';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public storageService: StorageService) {
     }

  ngOnInit(): void {
  }
  deslogar(){
    this.storageService.clean();
  }

}
