import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss']
})
export class RegisterEmailComponent implements OnInit {

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private auth:AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onResend(){
    console.log("===resending email")
    const correo=this.activatedroute.snapshot.queryParamMap.get('correo')
    console.log(correo)
    this.auth.resendEmail(correo).subscribe(
      information => {
        console.log(information)
        if(information.status==="Email sent"){
          alert("El correo electronico fue enviado");
        }
      },
      err => {
        console.error(err);
      }
    )
  }

}
