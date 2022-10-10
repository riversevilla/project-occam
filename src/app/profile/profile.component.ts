import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editMode: boolean = true;
  imgUrl: string = '';
  slimData: any;
  slim: any;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }

  slimOptions = {
    ratio: '1:1',
    didInit: this.slimInit.bind(this),
    uploadBase64:true
  };

  slimInit( data: any, slim: any ) {
      this.slim = slim;
      this.slimData = data;
  };

  onSubmit() {
    let image = this.slim.dataBase64.output.image;

    fetch(image)
      .then(res => res.blob())
      .then(blob => {
        this.profileService.loginUser().subscribe( result => {
          if( result.status ) {
            this.profileService.uploadImage(blob, result.auth_token).subscribe( result => {
              this.editMode = false;
            });
          }
        });
    });
  }
}
