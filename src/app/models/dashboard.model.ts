export interface DashboardSummary {
  ordersInProgress: number;
  completedOrders: number;
  efficiency: number;
}

export interface OrdersOverview {
  labels: string[];
  values: number[];
}

export interface StatusBreakdown {
  labels: string[];
  values: number[];
}

export interface ProductionMetrics {
  averageCycleTime: string;
  defectRate: string;
  unitsProduced: string;
  downtime: string;
  linesRunning: number;
  urgentOrders: number;
}

export interface OrderRow {
  orderId: string;
  customer: string;
  status: string;
  dueDate: string;
  sku: string;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  ordersOverview: OrdersOverview;
  statusBreakdown: StatusBreakdown;
  recentOrders: OrderRow[];
  productionMetrics: ProductionMetrics;
}
