import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../service/services/youtube.service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicio.page.html',
  styleUrls: ['./exercicio.page.scss'],
})
export class ExerciciosPage implements OnInit {
  videos: any[] = [];

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    const channelId = 'UCh__QxB4BrLCrw-Dp_SZh1g'; // Substitua pelo seu canal
    this.youtubeService.getVideosFromChannel(channelId).subscribe(
      (data: any) => {
        this.videos = data.items;
        console.log(this.videos);
      },
      (error) => {
        console.error('Erro ao buscar vídeos:', error);
      }
    );
  }
}
