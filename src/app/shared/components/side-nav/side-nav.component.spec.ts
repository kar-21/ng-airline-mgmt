import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { SharedContants } from '../../shared.constant';

import { SideNavComponent } from './side-nav.component';

describe('SideNavComponent Admin', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SideNavComponent],
      providers: [{ provide: Store, useValue: { pipe: () => of(SharedContants.role.adminRole) } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with admin side nav', () => {
    expect(component).toBeTruthy();
    expect(component.navList).toEqual(SharedContants.sideNav.AdminSideNav);
  });

  it('should emit navigation selection', () => {
    const spyonEventEmitter = spyOn(component.navigationSelected, 'emit');
    component.emitNavigationSelected();
    expect(spyonEventEmitter).toHaveBeenCalledWith(true);
  });
});

describe('SideNavComponent Staff', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SideNavComponent],
      providers: [{ provide: Store, useValue: { pipe: () => of(SharedContants.role.staffRole) } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with staff side nav', () => {
    expect(component).toBeTruthy();
    expect(component.navList).toEqual(SharedContants.sideNav.StaffSideNav);
  });
});
