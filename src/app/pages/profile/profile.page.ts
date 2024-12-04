import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};
  notificationsEnabled: boolean = true;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  // Método para carregar os dados do usuário
  async loadUserData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
      
      // Verificar se o documento existe antes de acessar os dados
      if (userDoc && userDoc.exists) {
        this.user = userDoc.data();
      } else {
        console.error("Usuário não encontrado");
      }
    } else {
      console.error("Usuário não autenticado");
    }
  }

  // Método para editar o perfil
  editProfile() {
    // Navegar para uma página de edição de perfil ou abrir um modal para editar
    this.router.navigate(['/edit-profile']);
  }

  // Método para atualizar os dados do usuário
  async updateUserData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      try {
        await this.firestore.collection('users').doc(userId).update({
          height: this.user.height,
          weight: this.user.weight,
          age: this.user.age,
          fullName: this.user.fullName,
        });
      } catch (error) {
        console.error("Erro ao atualizar dados:", error);
      }
    } else {
      console.error("Usuário não autenticado");
    }
  }

  // Método para fazer upload da imagem de perfil
  async uploadProfileImage(event: any) {
    const file = event.target.files[0];
    const user = await this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      const filePath = `users/${userId}/profile.jpg`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      // Aguardar o upload da imagem e atualizar a URL do perfil
      task.snapshotChanges().toPromise().then(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.user.photoUrl = url;
          this.firestore.collection('users').doc(userId).update({ photoUrl: url });
        });
      });
    } else {
      console.error("Usuário não autenticado");
    }
  }
}
