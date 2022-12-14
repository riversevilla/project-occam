import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  editMode: boolean = false;
  slim: any;
  imageUrl: string;

  constructor(
    private userService: UserService
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

  slimInit(data: any, slim: any) {
      this.slim = slim;
  };

  onSubmit() {
    let image = this.slim.dataBase64.output.image;

    fetch(image).then(res => res.blob()).then(blob => {
      const userToken = sessionStorage.getItem('userToken');
      if( userToken ) {
        this.userService.uploadImage(blob, userToken).subscribe( result => {
          this.imageUrl = result.image_url;
          this.editMode = false;
        });
      }
    });
  }
}
