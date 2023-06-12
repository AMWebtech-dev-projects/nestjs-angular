import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketEventComponent } from './socket-event.component';

describe('SocketEventComponent', () => {
  let component: SocketEventComponent;
  let fixture: ComponentFixture<SocketEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocketEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
