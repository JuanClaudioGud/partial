import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcpLayoutComponent } from './acp-layout.component';

describe('AcpLayoutComponent', () => {
  let component: AcpLayoutComponent;
  let fixture: ComponentFixture<AcpLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcpLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
