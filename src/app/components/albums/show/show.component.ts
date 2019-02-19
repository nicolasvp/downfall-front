import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../../interfaces/album';
declare var $ :any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  @Input() album_child: Album;

  constructor() { }

  ngOnInit() {
  }

  // Cierra modal
  closeModal(){
    $("#show_modal").modal('hide');
  }

}
