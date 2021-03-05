import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectorUserRole } from "../store/selector/user.selector";
import { AppState } from "../store/states/app.state";

@Injectable({
  providedIn: "root",
})
export class AdminStaffAuthGuard implements CanActivate {
  role: string;
  constructor(private router: Router, private store: Store<AppState>) {
    this.store.pipe(select(selectorUserRole)).subscribe((role: string) => {
      this.role = role;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | UrlTree
    | boolean {
    if (!this.role) {
      this.router.navigateByUrl("/login");
    }
    return true;
  }
}
