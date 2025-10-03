import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';//webxtor.tradingview

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  FData: FormGroup;
  isSubmit: boolean = false;
  constructor(private builder: FormBuilder, private http: HttpClient,private _sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.FData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Comment: new FormControl('', [Validators.required])
      })
  }
  onSubmit(FData) {
    console.log(FData.Comment)
    
  
      var formData: any = new FormData();
      formData.append("Timestamp", "19/10/2015 16:42:01");
      formData.append("name", FData.Fullname);
      formData.append("message", FData.Comment);
      formData.append("email", FData.Email);
      formData.append("color", "blue");
      
      let headers = new HttpHeaders()
      headers = headers.set('content-type', 'application/json')
      headers = headers.set('Access-Control-Allow-Origin', '*');
  
      let options = { headers: headers };
      this.isSubmit = true;
      // this.isLoading = true; // sending the post request async so it's in progress
      // this.submitted = false; // hide the response message on multiple submits
      
      let safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://script.google.com/macros/s/AKfycbx07NoqMCvup4vOI3L2VLrkiSAMI98-ET-aJAEQaAI-KngVj9a5wZOinnFsZSCcDh8S/exec');

      let EMailURL = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeURL);
      this.http.post(EMailURL, formData,options).subscribe(
        (response) => {
          // choose the response message
          if (response["result"] == "success") {
            // this.responseMessage = "Thanks for the message! I'll get back to you soon!";
          } else {
            // this.responseMessage = "Oops! Something went wrong... Reload the page and try again.";
          }
          // this.form.enable(); // re enable the form after a success
          // this.submitted = true; // show the response message
          // this.isLoading = false; // re enable the submit button
          console.log(response);
        },
        (error) => {
          // this.responseMessage = "Oops! An error occurred... Reload the page and try again.";
          // this.form.enable(); // re enable the form after a success
          // this.submitted = true; // show the response message
          // this.isLoading = false; // re enable the submit button
          console.log(error);
        }
      );
    }
      }
