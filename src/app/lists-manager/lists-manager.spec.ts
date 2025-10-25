import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsManager } from './lists-manager';

describe('ListsManager', () => {
  let component: ListsManager;
  let fixture: ComponentFixture<ListsManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
