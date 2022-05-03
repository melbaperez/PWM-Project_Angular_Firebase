import { Component, OnInit } from '@angular/core';
import firebase from "firebase/compat";
import {initializeApp} from "@angular/fire/app";
import {environment} from "../../environments/environment";
import {getStorage} from "firebase/storage";
import {ref} from "@angular/fire/storage";
import {FormGroup} from "@angular/forms";
import {GalleryImagesService} from "../serviceImagesGallery/gallery-images.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import {FileUpload} from "../models/file-upload";

@Component({
  selector: 'app-upload-gallery',
  templateUrl: './upload-gallery.component.html',
  styleUrls: ['./upload-gallery.component.css']
})
export class UploadGalleryComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage: number | undefined;

  constructor(private galleryService: GalleryImagesService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.currentFileUpload.description = (<HTMLInputElement>document.getElementById("description")).value;
        this.galleryService.pushFileToStorage(this.currentFileUpload)
          .subscribe(
            percentage => {
              this.percentage = Math.round(percentage ? percentage : 0);
            },
            error => {
              console.log(error);
            }
          );
      }
    }
  }
}
