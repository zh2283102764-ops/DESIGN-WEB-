export type CategoryId = 'ui' | 'brand' | 'visual' | 'packaging' | '3d';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface DesignSystemSpecs {
  gridSystem: string;
  spacingUnit: string;
  typography: {
    heading: string;
    body: string;
    scaling: string;
  };
  colorPalette: {
    name: string;
    hex: string;
    usage: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  chineseTitle: string;
  category: CategoryId;
  year: string;
  description: string;
  chineseDescription: string;
  imageUrl: string;
  images?: string[];
  tags: string[];
  metrics: ProjectMetric[];
  specs: DesignSystemSpecs;
  interactiveLogic: {
    objective: string;
    scientificApproach: string;
    userFlowSteps: string[];
  };
}
