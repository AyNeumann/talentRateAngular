import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderServiceService } from 'src/app/services/loader-service.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderServiceService) { }

  ngOnInit() {
  }

}
