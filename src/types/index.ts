export interface User {
  id: string;
  username: string;
  role: 'admin' | 'manager' | 'engineer' | 'technician' | 'operator';
  name: string;
  department: string;
  certifications?: string[];
}

export interface Asset {
  id: string;
  serialNumber: string;
  name: string;
  category: 'heavy_equipment' | 'vehicle' | 'tool' | 'plant' | 'machinery';
  type: string;
  location: string;
  status: 'active' | 'maintenance' | 'repair' | 'idle' | 'retired';
  purchaseDate: string;
  lastMaintenance: string;
  specifications: {
    manufacturer: string;
    model: string;
    year: number;
    capacity?: string;
    operatingHours?: number;
    fuelType?: string;
    lastCalibration?: string;
  };
  maintenanceSchedule: {
    nextService: string;
    serviceInterval: number;
    lastInspection: string;
  };
  documents: {
    manuals?: string[];
    certificates?: string[];
    inspectionReports?: string[];
  };
  operationalMetrics: {
    utilizationRate: number;
    fuelEfficiency?: number;
    performanceScore: number;
    downtime: number;
  };
}

export interface WorkOrder {
  id: string;
  type: 'maintenance' | 'repair' | 'inspection' | 'calibration' | 'overhaul';
  assetId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  assignedTo: string[];
  startDate: string;
  endDate?: string;
  location: string;
  requiredParts: {
    partId: string;
    quantity: number;
    status: 'available' | 'ordered' | 'pending';
  }[];
  laborHours: number;
  cost: {
    parts: number;
    labor: number;
    additional: number;
  };
  safetyRequirements: string[];
  attachments?: string[];
  comments: {
    userId: string;
    text: string;
    timestamp: string;
  }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'spare_parts' | 'materials' | 'consumables' | 'tools';
  subcategory: string;
  quantity: number;
  unit: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'ordered';
  location: string;
  minimumQuantity: number;
  reorderPoint: number;
  supplier: {
    id: string;
    name: string;
    leadTime: number;
    lastPurchasePrice: number;
  };
  specifications: {
    manufacturer: string;
    partNumber: string;
    compatibility: string[];
  };
  lastUpdated: string;
  batchNumber?: string;
  expiryDate?: string;
  certifications?: string[];
}

export interface MaintenanceSchedule {
  id: string;
  assetId: string;
  type: 'preventive' | 'predictive' | 'condition-based';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  lastPerformed: string;
  nextDue: string;
  tasks: {
    id: string;
    description: string;
    estimatedDuration: number;
    requiredSkills: string[];
    requiredParts: string[];
    safetyProcedures: string[];
  }[];
  assignedTeam: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
}

export interface Project {
  id: string;
  name: string;
  type: 'road' | 'bridge' | 'drilling' | 'maintenance' | 'asphalt' | 'crusher';
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  location: {
    site: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  assets: {
    assetId: string;
    assignmentPeriod: {
      start: string;
      end: string;
    };
  }[];
  progress: number;
  budget: {
    allocated: number;
    spent: number;
    remaining: number;
  };
  milestones: {
    id: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'completed';
  }[];
}</content>