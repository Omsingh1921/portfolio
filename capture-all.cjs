const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const TARGET_DIR_1 = path.resolve('public/projects/salestracker');
const TARGET_DIR_2 = path.resolve('public/projects/sales-tracker');

[TARGET_DIR_1, TARGET_DIR_2].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Mock DTOs based on Spring Boot Entities
const mockUser = {
  id: 1,
  name: 'System Administrator',
  email: 'superadmin@salestracker.com',
  phone: '+91 93029 75212',
  status: 'ACTIVE',
  role: 'SUPER_ADMIN',
  roleName: 'SUPER_ADMIN',
  roleId: 1,
  parentUserId: null,
  parentUserName: 'None (Root Authority)',
  permissions: [
    'USER_CREATE', 'USER_READ', 'USER_UPDATE', 'USER_DELETE', 'USER_DEACTIVATE',
    'ROLE_CREATE', 'ROLE_READ', 'ROLE_UPDATE', 'ROLE_DELETE', 'PERMISSION_READ',
    'LEAD_CREATE', 'LEAD_READ', 'LEAD_UPDATE', 'LEAD_DELETE', 'LEAD_ASSIGN',
    'DEAL_CREATE', 'DEAL_READ', 'DEAL_UPDATE', 'DEAL_DELETE', 'DEAL_ASSIGN', 'DEAL_STAGE_UPDATE',
    'SALE_CREATE', 'SALE_READ', 'SALE_UPDATE', 'SALE_DELETE',
    'TARGET_CREATE', 'TARGET_READ', 'TARGET_UPDATE', 'TARGET_DELETE',
    'REPORT_READ', 'AUDIT_READ'
  ]
};

const mockDashboard = {
  totalRevenue: 2845000,
  monthlyRevenue: 642000,
  activeDealsCount: 28,
  totalLeadsCount: 142,
  conversionRate: 34.2,
  averageDealSize: 101607,
  stageBreakdown: {
    QUALIFICATION: 8,
    NEEDS_ANALYSIS: 7,
    VALUE_PROPOSITION: 5,
    PROPOSAL_PRICE_QUOTE: 4,
    NEGOTIATION_REVIEW: 4,
    CLOSED_WON: 19,
    CLOSED_LOST: 5
  },
  recentActivities: [
    { id: 1, type: 'CALL', details: 'Executive pitch with Acme Corp CTO', leadName: 'Sarah Jenkins', time: '10 mins ago' },
    { id: 2, type: 'DEAL_STAGE', details: 'Advanced enterprise tier agreement to Negotiation', leadName: 'Michael Chen', time: '42 mins ago' },
    { id: 3, type: 'INVOICE', details: 'Generated invoice INV-2026-089 ($120,000)', leadName: 'David Miller', time: '2 hours ago' },
  ],
  monthlyTrend: [
    { month: 'Jan', revenue: 420000, target: 400000 },
    { month: 'Feb', revenue: 510000, target: 450000 },
    { month: 'Mar', revenue: 642000, target: 550000 }
  ]
};

const mockLeads = {
  content: [
    { id: 101, firstName: 'Sarah', lastName: 'Jenkins', email: 's.jenkins@acmecorp.com', phone: '+1 555-0192', company: 'Acme Technologies', status: 'QUALIFIED', source: 'INBOUND_WEB', assignedToUserName: 'Om Thakur', createdAt: '2026-03-12' },
    { id: 102, firstName: 'David', lastName: 'Miller', email: 'dmiller@nexuscloud.io', phone: '+1 555-0283', company: 'Nexus Cloud Systems', status: 'CONTACTED', source: 'REFERRAL', assignedToUserName: 'Om Thakur', createdAt: '2026-03-14' },
    { id: 103, firstName: 'Elena', lastName: 'Rostova', email: 'elena@hyperion.de', phone: '+49 30 901820', company: 'Hyperion Analytics', status: 'NEW', source: 'OUTBOUND_LINKEDIN', assignedToUserName: 'Sarah Manager', createdAt: '2026-03-18' },
    { id: 104, firstName: 'Arjun', lastName: 'Mehta', email: 'arjun.m@fintechglobal.in', phone: '+91 98200 11223', company: 'FinTech Global Pvt', status: 'IN_PROGRESS', source: 'CONFERENCE', assignedToUserName: 'Om Thakur', createdAt: '2026-03-20' },
    { id: 105, firstName: 'Claire', lastName: 'Dubois', email: 'claire@vortexmedia.fr', phone: '+33 1 4268 5500', company: 'Vortex Digital Media', status: 'UNQUALIFIED', source: 'ORGANIC_SEARCH', assignedToUserName: 'John Rep', createdAt: '2026-03-22' }
  ],
  totalElements: 5,
  totalPages: 1
};

const mockDeals = {
  content: [
    { id: 201, title: 'Enterprise Cloud Migration Agreement', value: 185000, stage: 'NEGOTIATION_REVIEW', leadName: 'Sarah Jenkins (Acme Corp)', assignedToUserName: 'Om Thakur', probability: 85, expectedCloseDate: '2026-04-15' },
    { id: 202, title: 'Annual Multi-Seat Security License', value: 92000, stage: 'PROPOSAL_PRICE_QUOTE', leadName: 'David Miller (Nexus Cloud)', assignedToUserName: 'Om Thakur', probability: 70, expectedCloseDate: '2026-04-20' },
    { id: 203, title: 'AI Analytics Pipeline Deployment', value: 240000, stage: 'VALUE_PROPOSITION', leadName: 'Elena Rostova (Hyperion)', assignedToUserName: 'Sarah Manager', probability: 55, expectedCloseDate: '2026-05-01' },
    { id: 204, title: 'Payment Gateway Integration Tier', value: 125000, stage: 'CLOSED_WON', leadName: 'Arjun Mehta (FinTech Global)', assignedToUserName: 'Om Thakur', probability: 100, expectedCloseDate: '2026-03-10' },
    { id: 205, title: 'Legacy Monolith Refactoring', value: 65000, stage: 'CLOSED_LOST', lostReason: 'Competitor price undercut by 20%', leadName: 'Claire Dubois (Vortex)', assignedToUserName: 'John Rep', probability: 0, expectedCloseDate: '2026-02-28' }
  ],
  totalElements: 5,
  totalPages: 1
};

const mockSales = {
  content: [
    { id: 301, invoiceNumber: 'INV-2026-0041', dealTitle: 'Payment Gateway Integration Tier', amount: 125000, paymentStatus: 'PAID', salespersonName: 'Om Thakur', saleDate: '2026-03-10', customerName: 'FinTech Global Pvt' },
    { id: 302, invoiceNumber: 'INV-2026-0042', dealTitle: 'Microservices Architecture Overhaul', amount: 210000, paymentStatus: 'PAID', salespersonName: 'Sarah Manager', saleDate: '2026-03-05', customerName: 'Omni Retail Corp' },
    { id: 303, invoiceNumber: 'INV-2026-0043', dealTitle: 'Security Compliance Auditing Suite', amount: 78000, paymentStatus: 'PENDING', salespersonName: 'Om Thakur', saleDate: '2026-03-18', customerName: 'CyberGuard Labs' },
    { id: 304, invoiceNumber: 'INV-2026-0044', dealTitle: 'Cloud Infrastructure Optimization', amount: 145000, paymentStatus: 'OVERDUE', salespersonName: 'John Rep', saleDate: '2026-02-15', customerName: 'Apex Logistics' }
  ],
  totalElements: 4,
  totalPages: 1
};

const mockTargets = {
  content: [
    { id: 401, userName: 'Om Thakur', userEmail: 'omsinghthakur930@gmail.com', targetAmount: 500000, achievedAmount: 485000, targetMonth: 3, targetYear: 2026, achievementPercentage: 97.0, status: 'ON_TRACK' },
    { id: 402, userName: 'Sarah Manager', userEmail: 'sarah.manager@salestracker.com', targetAmount: 750000, achievedAmount: 642000, targetMonth: 3, targetYear: 2026, achievementPercentage: 85.6, status: 'ON_TRACK' },
    { id: 403, userName: 'John Rep', userEmail: 'john.rep@salestracker.com', targetAmount: 350000, achievedAmount: 180000, targetMonth: 3, targetYear: 2026, achievementPercentage: 51.4, status: 'AT_RISK' },
    { id: 404, userName: 'Emma Watson', userEmail: 'emma.w@salestracker.com', targetAmount: 400000, achievedAmount: 412000, targetMonth: 3, targetYear: 2026, achievementPercentage: 103.0, status: 'EXCEEDED' }
  ],
  totalElements: 4,
  totalPages: 1
};

const mockUsers = {
  content: [
    { id: 1, name: 'System Administrator', email: 'superadmin@salestracker.com', phone: '+91 93029 75212', roleName: 'SUPER_ADMIN', status: 'ACTIVE', parentUserName: 'Root', createdAt: '2026-01-01' },
    { id: 2, name: 'Operations Admin', email: 'admin@salestracker.com', phone: '+91 98765 43210', roleName: 'ADMIN', status: 'ACTIVE', parentUserName: 'System Administrator', createdAt: '2026-01-05' },
    { id: 3, name: 'Sarah Regional Manager', email: 'sarah.manager@salestracker.com', phone: '+91 91234 56789', roleName: 'SALES_MANAGER', status: 'ACTIVE', parentUserName: 'Operations Admin', createdAt: '2026-01-10' },
    { id: 4, name: 'Om Thakur', email: 'omsinghthakur930@gmail.com', phone: '+91 93029 75212', roleName: 'SALES_EXECUTIVE', status: 'ACTIVE', parentUserName: 'Sarah Regional Manager', createdAt: '2026-01-15' },
    { id: 5, name: 'Compliance Officer', email: 'viewer@salestracker.com', phone: '+91 94567 89012', roleName: 'VIEWER', status: 'ACTIVE', parentUserName: 'Operations Admin', createdAt: '2026-02-01' }
  ],
  totalElements: 5,
  totalPages: 1
};

const mockRoles = [
  { id: 1, name: 'SUPER_ADMIN', description: 'Root system administrator with unrestricted architectural, permission, and audit privileges', parentRoleName: 'None', permissionsCount: 27 },
  { id: 2, name: 'ADMIN', description: 'Enterprise operations administrator managing organization quotas, reporting, and operational users', parentRoleName: 'SUPER_ADMIN', permissionsCount: 22 },
  { id: 3, name: 'SALES_MANAGER', description: 'Regional sales manager scoped to branch reporting hierarchy, lead delegation, and team pipeline review', parentRoleName: 'ADMIN', permissionsCount: 15 },
  { id: 4, name: 'SALES_EXECUTIVE', description: 'Frontline commercial sales representative managing assigned leads, deals, and quota milestones', parentRoleName: 'SALES_MANAGER', permissionsCount: 9 },
  { id: 5, name: 'VIEWER', description: 'Read-only financial auditor and stakeholder monitoring pipeline health without mutation authority', parentRoleName: 'None', permissionsCount: 5 }
];

const mockPermissions = [
  { id: 1, name: 'USER_CREATE', category: 'USER_MANAGEMENT', description: 'Create new user accounts across authorized organizational tree' },
  { id: 2, name: 'USER_READ', category: 'USER_MANAGEMENT', description: 'Inspect user profiles and reporting hierarchy' },
  { id: 3, name: 'USER_UPDATE', category: 'USER_MANAGEMENT', description: 'Modify user details, status, or reporting parent' },
  { id: 4, name: 'USER_DELETE', category: 'USER_MANAGEMENT', description: 'Soft-delete user accounts from active directory' },
  { id: 5, name: 'ROLE_CREATE', category: 'ROLE_SECURITY', description: 'Define new role templates with bound permissions' },
  { id: 6, name: 'ROLE_READ', category: 'ROLE_SECURITY', description: 'View role hierarchy and authority definitions' },
  { id: 7, name: 'LEAD_CREATE', category: 'LEADS', description: 'Ingest prospect leads and log contact activities' },
  { id: 8, name: 'DEAL_CREATE', category: 'DEALS', description: 'Initialize commercial deal opportunities from qualified leads' },
  { id: 9, name: 'SALE_CREATE', category: 'SALES', description: 'Generate unique invoices and synchronize deal progression' },
  { id: 10, name: 'TARGET_CREATE', category: 'TARGETS', description: 'Allocate representative revenue quotas' },
  { id: 11, name: 'REPORT_READ', category: 'ANALYTICS', description: 'Inspect executive dashboards and period revenue charts' },
  { id: 12, name: 'AUDIT_READ', category: 'COMPLIANCE', description: 'Query immutable security and operational event logs' }
];

const mockAuditLogs = {
  content: [
    { id: 501, actorName: 'System Administrator', action: 'USER_ROLE_ASSIGNED', entityType: 'USER', entityId: '4', timestamp: '2026-03-24 14:32:10', details: 'Assigned role SALES_EXECUTIVE to user Om Thakur' },
    { id: 502, actorName: 'Om Thakur', action: 'DEAL_STAGE_ADVANCED', entityType: 'DEAL', entityId: '201', timestamp: '2026-03-24 11:20:45', details: 'Transitioned Acme Corp Cloud Migration to NEGOTIATION_REVIEW' },
    { id: 503, actorName: 'Sarah Manager', action: 'LEAD_ASSIGNED', entityType: 'LEAD', entityId: '102', timestamp: '2026-03-23 16:05:00', details: 'Assigned Nexus Cloud Systems lead to Om Thakur' },
    { id: 504, actorName: 'System Administrator', action: 'TARGET_ALLOCATED', entityType: 'TARGET', entityId: '401', timestamp: '2026-03-01 09:00:00', details: 'Allocated $500,000 quota for March 2026 to Om Thakur' },
    { id: 505, actorName: 'Om Thakur', action: 'INVOICE_GENERATED', entityType: 'SALE', entityId: '301', timestamp: '2026-03-10 18:45:22', details: 'Issued invoice INV-2026-0041 ($125,000) for FinTech Global Pvt' }
  ],
  totalElements: 5,
  totalPages: 1
};

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();

    if (url.includes('/api/v1/auth/login')) {
      req.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            accessToken: 'mock-jwt-access-token-om-thakur',
            refreshToken: 'mock-jwt-refresh-token-single-use',
            user: mockUser
          }
        })
      });
    } else if (url.includes('/api/v1/reports/dashboard')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockDashboard }) });
    } else if (url.includes('/api/v1/reports')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockDashboard }) });
    } else if (url.includes('/api/v1/leads')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockLeads }) });
    } else if (url.includes('/api/v1/deals')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockDeals }) });
    } else if (url.includes('/api/v1/sales')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockSales }) });
    } else if (url.includes('/api/v1/targets')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockTargets }) });
    } else if (url.includes('/api/v1/users')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockUsers }) });
    } else if (url.includes('/api/v1/roles')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockRoles }) });
    } else if (url.includes('/api/v1/permissions')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockPermissions }) });
    } else if (url.includes('/api/v1/audit-logs')) {
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: mockAuditLogs }) });
    } else {
      req.continue();
    }
  });

  const saveBoth = async (filename) => {
    const p1 = path.join(TARGET_DIR_1, filename);
    const p2 = path.join(TARGET_DIR_2, filename);
    await page.screenshot({ path: p1 });
    fs.copyFileSync(p1, p2);
    console.log(`Saved screenshot: ${filename} to both directories`);
  };

  // 1. Capture Login Page
  console.log('Navigating to Login page...');
  await page.goto('http://localhost:5190', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await saveBoth('salestracker-login.png');

  // Inject session into localStorage and reload
  await page.evaluate((u) => {
    localStorage.setItem('accessToken', 'mock-jwt-token');
    localStorage.setItem('refreshToken', 'mock-refresh-token');
    localStorage.setItem('user', JSON.stringify(u));
  }, mockUser);

  // Reload to activate session
  await page.goto('http://localhost:5190', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 2. Capture Dashboard
  console.log('Capturing Dashboard...');
  await saveBoth('salestracker-dashboard.png');

  // Helper to click sidebar nav and wait
  const navigateTo = async (viewId, filename, waitMs = 1200) => {
    console.log(`Navigating to view: ${viewId}...`);
    await page.evaluate((id) => {
      // Find button in sidebar
      const buttons = Array.from(document.querySelectorAll('aside button, .sidebar button'));
      const btn = buttons.find(b => b.innerText.toLowerCase().includes(id.replace('-', ' ')));
      if (btn) btn.click();
    }, viewId);
    await new Promise(r => setTimeout(r, waitMs));
    await saveBoth(filename);
  };

  // 3. Leads Pipeline
  await navigateTo('leads', 'salestracker-leads.png');

  // 4. Deals & Stages
  await navigateTo('deals', 'salestracker-deals.png');

  // 5. Sales & Invoicing
  await navigateTo('sales', 'salestracker-sales.png');

  // 6. Sales Targets Quotas
  await navigateTo('targets', 'salestracker-targets.png');

  // 7. Analytics & Reports
  await navigateTo('reports', 'salestracker-reports.png');

  // 8. Team Hierarchy / Users
  await navigateTo('users', 'salestracker-users.png');

  // 9. Role Hierarchy
  await navigateTo('roles', 'salestracker-roles.png');

  // 10. Authorities / Permissions
  await navigateTo('authorities', 'salestracker-permissions.png');

  // 11. Audit Trail
  await navigateTo('audit', 'salestracker-audit.png');

  // 12. User Profile
  console.log('Navigating to User Profile...');
  await page.evaluate(() => {
    // Look for profile button in header or user badge
    const headerBtns = Array.from(document.querySelectorAll('header button, .header-user-btn, [aria-label*="Profile"]'));
    if (headerBtns.length > 0) headerBtns[headerBtns.length - 1].click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await saveBoth('salestracker-profile.png');

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
