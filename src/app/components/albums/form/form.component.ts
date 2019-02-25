import { Component, OnInit } from '@angular/core';
import { Album } from '../../../interfaces/album';
import { Artist } from '../../../interfaces/Artist';
import { AlbumService } from '../../../services/album.service';
import { ArtistService } from '../../../services/artist.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'app-album-form',
  templateUrl: './form.component.html'
})

export class AlbumFormComponent implements OnInit {

  private album: Album = new Album();
  artists: Artist[] = [];
  private errors: string[]; // Maneja los errores que son devueltos desde el service
  private fileSelected: File;

  constructor(private _albumService: AlbumService, private _artistService: ArtistService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Se consulta por el id en url para saber si se está actualizando o creando un nuevo Album, esto se sabe por la url ya que si va un id entonces está editando
    this.loadAlbum();
    this.loadArtists();
  }

  // Guarda el nuevo album y la imagen y luego redirige hacia todos los albums
  store(): void {

    if(this.album.artist){
      // Quita el atributo album de artist del json de album, ya que sino causa error en el backend
      delete this.album.artist["albums"]
      delete this.album.artist["genre"]
    }

    // Guarda el nuevo album
    this._albumService.store(this.album).subscribe(
      response => {
        // Luego de guardar el album guarda la imagen y finalmente retorna al index de albums
        let storedAlbum = response.album;
        // Guarda la imagen
        this._albumService.uploadFile(this.fileSelected, storedAlbum.id).subscribe(
          response => {
            this._router.navigate(['/albums'])
            $.toast({
               heading: 'Éxito',
               text: `El Album ${storedAlbum.name} se ha creado.`,
               position: 'top-right',
               loaderBg:'#ff6849',
               icon: 'success',
               hideAfter: 3500,
               stack: 6
            });
          },
          err => {
           this.errors = err.error.errors as string[];
             console.log(err);
          }
        );
     },
     err => {
       this.errors = err.error.errors as string[];
         console.log(err);
     }
    );


  }

  // Carga la información del Album para mostrarla en el formulario
  // Toma el parametro id de la url para solicitar la información, se consulta sólo si existe el parametro id
  loadAlbum(): void {
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this._albumService.getAlbum(id).subscribe(
          album => {
            this.album = album
          }
        )
      }
    })
  }

  // Carga la lista de artistas para rellenar el select del formulario
  loadArtists(): void {
    this._artistService.getArtists().subscribe(
      artists => {
        this.artists = artists
      }
    )
  }

  // Actualiza los datos del album enviando el objeto Album al servicio, luego redirige hacia todos los albums
  update(): void {
    if(this.album.artist){
      // Quita el atributo album de artist del json de album, ya que sino causa error en el backend
      delete this.album.artist["albums"]
      delete this.album.artist["genre"]
    }

    this._albumService.update(this.album).subscribe(
      response => {
        this._router.navigate(['/albums'])
        $.toast({
         heading: 'Éxito',
         text: `El Album ${response.album.name} se ha actualizado.`,
         position: 'top-right',
         loaderBg:'#ff6849',
         icon: 'success',
         hideAfter: 3500,
         stack: 6
       });
      },
      err => {
        this.errors = err.error.errors as string[];
        console.log(this.errors);
      }
    )
  }

  // Guarda la imagen seleccionada en la variable fileSelected del tipo File
  // Nota: No se puede asignar el archivo al album.image por que solo acepta strings
  selectFile(event: any): void{
    this.fileSelected = event.target.files[0];

    // Validación para que el archivo sea una imagen, se lee el type a traves del indexOf que debe ser del tipo image
    if(this.fileSelected.type.indexOf('image') < 0){
      this.errors = ["El archivo debe ser una imagen."];
      this.fileSelected = null;
      this.album.image = null;
    }else{
      this.errors = [];
    }
  }

  // Compara y setea el artista del Album con la lista de los artistas para dejarlo como seleccionado (selected) al editar
  compareGenre(input1: Artist, input2: Artist): boolean {
    if(input1 === undefined && input2 === undefined){
      return true
    }
    return input1 === null || input2 === null || input1 === undefined || input2 === undefined ? false : input1.id === input2.id;
  }
}
