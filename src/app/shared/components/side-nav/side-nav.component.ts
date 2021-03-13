import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectorUserRole } from 'src/app/core/store/selector/user.selector';
import { SharedContants } from '../../shared.constant';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  activeLink: string;
  navList;
  @Output() navigationSelected: EventEmitter<boolean> = new EventEmitter();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(selectorUserRole)).subscribe((role: string) => {
      if (role === SharedContants.role.staffRole) {
        this.navList = SharedContants.sideNav.StaffSideNav;
      } else {
        this.navList = SharedContants.sideNav.AdminSideNav;
      }
    });
  }

  emitNavigationSelected() {
    this.navigationSelected.emit(true);
  }
}
