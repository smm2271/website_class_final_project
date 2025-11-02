import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SakuraBackgroundComponent } from './sakura-background.component';

describe('SakuraBackgroundComponent', () => {
  let component: SakuraBackgroundComponent;
  let fixture: ComponentFixture<SakuraBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SakuraBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SakuraBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
