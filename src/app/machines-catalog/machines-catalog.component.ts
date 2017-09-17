import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-machines-catalog',
  templateUrl: './machines-catalog.component.html',
  styleUrls: ['./machines-catalog.component.css']
})
export class MachinesCatalogComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

}
