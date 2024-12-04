import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth'; // Alterado para importar do pacote firebase/auth

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Método para obter o usuário autenticado
async getCurrentUser(): Promise<User | null> {
  const user = await this.afAuth.currentUser;
  return user as User | null; // Retorna o usuário ou null
}


  // Registro com salvamento no Firestore
  async register(
    email: string, 
    password: string, 
    fullName: string, 
    phoneNumber: string, 
    gender: string, 
    dateOfBirth: string, 
    weight: number, 
    height: number
  ): Promise<void> {
    try {
      // Criar o usuário no Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      
      // Salvar os dados adicionais no Firestore
      await this.firestore.collection('users').doc(userCredential.user?.uid).set({
        email: email,
        fullName: fullName,
        phoneNumber: phoneNumber,
        gender: gender,
        dateOfBirth: dateOfBirth,
        weight: weight,
        height: height,
        createdAt: new Date(),
      });
    } catch (error: any) {
      console.error('Erro ao registrar:', error.message);
      throw new Error(error.message); // Passa o erro para o componente
    }
  }

  // Login
  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Login bem-sucedido!');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.message);
      throw new Error(error.message); // Passa o erro para o componente
    }
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
