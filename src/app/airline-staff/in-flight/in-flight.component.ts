import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetAirLineList } from 'src/app/core/store/actions/passanger.action';
import { selectorAirlineList } from 'src/app/core/store/selector/passanger.selector';
import { AppState } from 'src/app/core/store/states/app.state';
import { AirlineList } from 'src/app/shared/models/airline-list.model';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.scss'],
})
export class InFlightComponent implements OnInit {
  airlineList: AirlineList[];
  isLoaderShown = true;
  type = 'inflight';

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(selectorAirlineList)).subscribe((airlineList: AirlineList[]) => {
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
