import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  checked = true;
  redirectURI: string;

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginService.sendGoogleRequest().subscribe(
      (res) => {
        this.redirectURI = res.redirectURI;
      },
      (error) => {
        this.snackBar.open("Server Error...!", null, { duration: 20000 });
      }
    );
  }
}
