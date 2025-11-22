import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from './dashboard.service';
import { DashboardResponse, DashboardSummary, OrderRow, ProductionMetrics } from './models/dashboard.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  summary: DashboardSummary = { ordersInProgress: 0, completedOrders: 0, efficiency: 0 };
  recentOrders: OrderRow[] = [];
  productionMetrics: ProductionMetrics = {
    averageCycleTime: '0 hrs',
    defectRate: '0%',
    unitsProduced: '0',
    downtime: '0 hrs',
    linesRunning: 0,
    urgentOrders: 0
  };

  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartOptions<'line'> = {};
  pieChartData: ChartData<'pie', number[], string> = { labels: [], datasets: [] };
  pieChartOptions: ChartOptions<'pie'> = {};

  loading = true;
  errorMessage = '';

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.dashboardService.getDashboard().subscribe({
      next: (dashboard: DashboardResponse) => {
        this.summary = dashboard.summary;
        this.recentOrders = dashboard.recentOrders;
        this.productionMetrics = dashboard.productionMetrics;
        this.configureCharts(dashboard);
        this.errorMessage = '';
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load dashboard data. Please ensure the API is running.';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    const normalized = status.toLowerCase();
    if (normalized.includes('progress')) {
      return 'inprogress';
    }
    if (normalized.includes('complete') || normalized.includes('commit')) {
      return 'completed';
    }
    return 'pending';
  }

  private configureCharts(dashboard: DashboardResponse): void {
    this.lineChartData = {
      labels: dashboard.ordersOverview.labels,
      datasets: [
        {
          data: dashboard.ordersOverview.values,
          label: 'Orders',
          fill: true,
          tension: 0.35,
          backgroundColor: 'rgba(75, 143, 216, 0.12)',
          borderColor: '#4b8fd8',
          pointBackgroundColor: '#4b8fd8',
          pointRadius: 4,
          pointHoverRadius: 5
        }
      ]
    };

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: '#6c7a86', font: { family: 'Inter, "Segoe UI", sans-serif' } },
          grid: { color: '#eef2f6' }
        },
        y: {
          ticks: { color: '#6c7a86', font: { family: 'Inter, "Segoe UI", sans-serif' } },
          grid: { color: '#eef2f6' },
          beginAtZero: true
        }
      }
    };

    this.pieChartData = {
      labels: dashboard.statusBreakdown.labels,
      datasets: [
        {
          data: dashboard.statusBreakdown.values,
          backgroundColor: ['#4b8fd8', '#47c18a', '#f5b041'],
          hoverBackgroundColor: ['#3c7fc3', '#3ba676', '#e6a135'],
          borderColor: '#ffffff',
          borderWidth: 2
        }
      ]
    };

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            color: '#4a5561',
            font: { family: 'Inter, "Segoe UI", sans-serif', size: 13 }
          }
        }
      }
    };
  }
}
