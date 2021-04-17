import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '@app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public readonly mediaService: MediaService,
    public readonly router: Router
  ) { }

  public ngOnInit(): void {

    const counters: NodeList = document.querySelectorAll('.value');
    const speed = 200;
    
    counters.forEach((node: Node): void => {

      const counter: HTMLElement = node as HTMLElement;

      const animate: any = (): void => {

        const attr: string | null = counter.getAttribute('akhi');
        const value: number = attr ? +attr : 0;
        const data: number = +counter.innerText;
        const time = value / speed;

        if (data < value) {
          counter.innerText = Math.ceil(data + time).toString();
          setTimeout(animate, 1);
        } else {
          counter.innerText = value.toString();
        }
         
      }
       
      animate();
    });
  }

}