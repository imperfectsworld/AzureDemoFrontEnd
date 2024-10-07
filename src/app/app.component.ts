import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackendService } from './services/backend.service';
import { Post } from './models/post';
import { FormsModule } from '@angular/forms';
import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, GoogleSigninButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  googleUser: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  formPost:Post = {} as Post;
  allPosts:Post[] = [];
  constructor (private backService:BackendService,  private socialAuthServiceConfig: SocialAuthService){}

  getAll(){
    this.backService.getAllPosts().subscribe(response => {
      console.log(response);
      this.allPosts = response;
    });

  }

//login component doesn't account for logging out.
signOut(): void {
  this.socialAuthServiceConfig.signOut();
}


  ngOnInit(){
    this.getAll();

    //authState is a custom observable that will run again any time changes are noticed.
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.googleUser = userResponse;
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);
      if(this.loggedIn == true){
        let u:User = {
          googleId: this.googleUser.id,
          userName: this.googleUser.name,
          pfp: this.googleUser.photoUrl
        }
        this.backService.addUser(u).subscribe(response => console.log(response));
      }
    });
  }

addPost(){
  //temp fix until login
  this.formPost.googleId = this.googleUser.id;
  this.backService.addPost(this.formPost).subscribe(response => {
    console.log(response);
    this.getAll();
  })
}
}
