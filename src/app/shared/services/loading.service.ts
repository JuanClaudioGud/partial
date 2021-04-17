import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

	private readonly loading$: Subject<boolean> = new Subject<boolean>();

	private readonly overlayRef: OverlayRef = this.createOverlay();

  private readonly portal: ComponentPortal<MatSpinner> = new ComponentPortal(MatSpinner);

  constructor(private readonly overlay: Overlay) { 
  	this.loading$.subscribe((isLoading: boolean): void => {
  		if (isLoading && !this.overlayRef.hasAttached()) {
  			this.overlayRef.attach(this.portal);
  		} else if (!isLoading && this.overlayRef.hasAttached()) {
  			this.overlayRef.detach();
  		}
  	});
  }

  private createOverlay(): OverlayRef {
  	return this.overlay.create({
      hasBackdrop: true,
  		positionStrategy: this.overlay
  		.position()
  		.global()
  		.centerHorizontally()
  		.centerVertically(),
  	});
  }

  public start(): void {
  	this.loading$.next(true);
  }

  public stop(): void {
  	this.loading$.next(false);
  }

}
