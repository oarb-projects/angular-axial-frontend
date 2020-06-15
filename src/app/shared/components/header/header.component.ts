import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() 
  toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();

    setTimeout(() => { 
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}