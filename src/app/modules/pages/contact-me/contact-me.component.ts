import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ContactMeComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
  ) {}

  composeForm: FormGroup;
  copyFields: { cc: boolean; bcc: boolean } = {
    cc: false,
    bcc: false
  };
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{align: []}, {list: 'ordered'}, {list: 'bullet'}],
      ['clean']
    ]
  };

  ngOnInit(): void {
    // Create the form
    this.composeForm = this._formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      cc: ['', [Validators.email]],
      bcc: ['', [Validators.email]],
      subject: [''],
      body: ['', [Validators.required]]
    });
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Show the copy field with the given field name
   *
   * @param name
   */
  showCopyField(name: string): void {
    // Return if the name is not one of the available names
    if (name !== 'cc' && name !== 'bcc') {
      return;
    }

    // Show the field
    this.copyFields[name] = true;
  }

  /**
   * Save and close
   */
  saveAndClose(): void {
    // Save the message as a draft
    this.saveAsDraft();

    // Close the dialog
  }

  /**
   * Discard the message
   */
  discard(): void {
    this.composeForm.reset();
  }

  /**
   * Save the message as a draft
   */
  saveAsDraft(): void {

  }

  /**
   * Send the message
   */
  send(): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this._httpClient.post('https://formspree.io/f/mpzbewyo',
      {replyTo: this.composeForm.get('to').value,
            subject: this.composeForm.get('subject').value,
            message: this.composeForm.get('body').value},
    {headers: headers}).subscribe(
        response => {
          this.composeForm.reset();
        }
    );
  }

  githubRef(): void {
    window.location.href = "https://github.com/tadam-m";
  }

  linkedinRef(): void {
    window.location.href = "https://www.linkedin.com/in/mathis-vialle-633b61220/";
  }

  instagramRef(): void {
    window.location.href = "https://www.instagram.com/thismammouth/";
  }
}
