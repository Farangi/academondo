import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
	window.addEventListener("scroll", function(event){

		let top = this.pageYOffset;

		let layers = document.getElementsByClassName("parallax");
		let layer;
    let speed;    
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
			speed = layer.getAttribute('data-speed');
			let yPos = -(top * speed / 100);
			layer.setAttribute('style', 'transform: translate3d(0px, ' + (yPos) + 'px, 0px)');

		}
	});    
  }

}
