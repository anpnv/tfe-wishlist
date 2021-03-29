import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  @Input() isPrivate: boolean;

  createList: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private db: DatabaseService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  initForm() {
    this.createList = this.fb.group({
      name: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });

    console.log(this.createList.value);
  }

  submit() {
    const { name, date } = this.createList.value;
    const list = {
      authorId: this.auth.currentUser.uid,
      date: date,
      name: name,
    };

    this.db.createList(list).subscribe(l => {
      this.auth.currentUser.publicLists.push(l.id);
    });

    this.dismiss();
  }
}
