import { Component, OnInit } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { GetAirLineList } from '../core/store/actions/passanger.action';
import { selectorAirlineList } from '../core/store/selector/passanger.selector';
import { AppState } from '../core/store/states/app.state';
import { AirlineList } from '../shared/models/airline-list.model';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  airlineList: AirlineList[];
  isLoaderShown = true;
  isAdmin = true;

  constructor(private store: Store<AppState>) {
    this.store
      .pipe(select(selectorAirlineList))
      .subscribe((airlineList: AirlineList[]) => {
        if (airlineList) {
          this.airlineList = airlineList;
          this.isLoaderShown = false;
        }
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAirLineList());
  }
}
