import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormUser} from './form-user.component';

describe('FormGroupeComponent', () => {
  let component: FormUser;
  let fixture: ComponentFixture<FormUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
