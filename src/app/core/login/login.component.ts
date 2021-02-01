import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  checked = true;
  redirectURI: string;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.sendGoogleRequest().subscribe(res => {
      this.redirectURI = res.redirectURI;
    })
  }
}
