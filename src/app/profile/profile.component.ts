import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editMode: boolean = false;
  slimData: any;
  slim: any;
  imageUrl: string;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.imageUrl = 'assets/svg/profile-photo.svg';
  }

  slimOptions = {
    ratio: '1:1',
    didInit: this.slimInit.bind(this),
    uploadBase64:true,
    labelLoading: 'Uploading'
  };

  slimInit( data: any, slim: any ) {
      this.slim = slim;
      this.slimData = data;
  };

  onSubmit() {
    let image = this.slim.dataBase64.output.image;

    fetch(image).then(res => res.blob()).then(blob => {
      this.profileService.loginUser().subscribe( result => {
        if( result.status ) {
          this.profileService.uploadImage(blob, result.auth_token).subscribe( result => {
            this.imageUrl = result.image_url;
            this.editMode = false;
          });
        }
      });
    });
  }
}
