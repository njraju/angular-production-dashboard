const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

const dashboardData = {
  summary: {
    ordersInProgress: 128,
    completedOrders: 87,
    efficiency: 92
  },
  ordersOverview: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    values: [74, 86, 83, 95, 104, 97, 110, 121, 118]
  },
  statusBreakdown: {
    labels: ['In Progress', 'Completed', 'Pending'],
    values: [34, 34, 32]
  },
  recentOrders: [
    { orderId: 'SO-43125', customer: 'Northwind Retail', status: 'In Progress', dueDate: 'Jun 22', sku: 'Cushion Crew – Navy' },
    { orderId: 'SO-43108', customer: 'Stride Athletics', status: 'Committed', dueDate: 'Jul 19', sku: 'Compression – Black' },
    { orderId: 'SO-43099', customer: 'Heath & Co', status: 'Pending', dueDate: 'Jun 15', sku: 'Wool Thermal – Grey' },
    { orderId: 'SO-43077', customer: 'Everyday Essentials', status: 'In Progress', dueDate: 'Jun 13', sku: 'Quarter – White' },
    { orderId: 'SO-43065', customer: 'Metro Sports', status: 'Completed', dueDate: 'Jun 14', sku: 'Ankle – Assorted' },
    { orderId: 'SO-43045', customer: 'Trail Co.', status: 'Pending', dueDate: 'Jun 13', sku: 'Hiker – Olive' }
  ],
  productionMetrics: {
    averageCycleTime: '8.2 hrs',
    defectRate: '1.5%',
    unitsProduced: '12,385',
    downtime: '8.7 hrs',
    linesRunning: 12,
    urgentOrders: 5
  }
};

const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const sendJson = (res, statusCode, payload) => {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (requestUrl.pathname === '/api/dashboard') {
    sendJson(res, 200, dashboardData);
    return;
  }

  if (requestUrl.pathname === '/api/health') {
    sendJson(res, 200, { status: 'ok' });
    return;
  }

  sendJson(res, 404, { message: 'Not found' });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Dashboard API running on http://localhost:${PORT}`);
});
