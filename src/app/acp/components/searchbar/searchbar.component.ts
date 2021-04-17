import { 
  Component, 
  OnInit, 
  OnDestroy, 
  Input,
  Output, 
  EventEmitter 
} from '@angular/core';
import { Subject } from 'rxjs';
import { 
  debounceTime, 
  distinctUntilChanged, 
  takeUntil 
} from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {

  private readonly componentDestroy: Subject<void> = new Subject<void>();

  private readonly changes: Subject<string> = new Subject<string>();

	@Output() 
  public readonly cancel: EventEmitter<void> = new EventEmitter<void>();

	@Output() 
  public readonly change: EventEmitter<string> = new EventEmitter<string>();

  @Input('placeholder') 
  public placeholderText: string = 'Buscar..';

  constructor() { }

  ngOnInit(): void {
  	this.changes.pipe(
  		debounceTime(500),
  		distinctUntilChanged(),
      takeUntil(this.componentDestroy)
  	).subscribe((value: string): void => 
  		this.change.emit(value)
    );
  }

  public onKeyUp(event: EventTarget | null): void {
    const target: HTMLInputElement = event as HTMLInputElement;
    if (target) {
      this.changes.next(target.value);
    }
  }

  public onCancel(): void {
    this.change.emit("");
  	this.cancel.emit();
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

}