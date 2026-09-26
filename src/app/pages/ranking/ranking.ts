import { Component, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

import { Ranking as RankingService } from '../../services/ranking';

@Component({
  imports: [BaseChartDirective],
  selector: 'app-ranking',
  styleUrl: './ranking.css',
  templateUrl: './ranking.html',
})
export class Ranking {
  private rankingService = inject(RankingService);

  ranking = signal<
    {
      user_id: number;
      user_name: string;
      total_duration: number;
    }[]
  >([]);

  public barChartType: 'bar' = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Tempo de estudo',
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y',

    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',
          font: {
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.08)',
        },
      },

      y: {
        ticks: {
          color: '#FFFFFF',
          font: {
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  ngOnInit() {
    this.rankingService.getRanking().subscribe({
      next: (response) => {
        this.ranking.set(response);

        this.barChartData = {
          labels: response.map((user) => user.user_name),
          datasets: [
            {
              data: response.map((user) => user.total_duration),
              label: 'Tempo de estudo (minutos)',
              backgroundColor: getComputedStyle(document.documentElement)
                .getPropertyValue('--danger'),
              barThickness: 12,
            },
          ],
        };
      },

      error: (error) => {
        console.error('Erro ao buscar ranking:', error);
      },
    });
  }
}
