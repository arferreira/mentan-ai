export interface Product {
  id?: string;
  title: string;
  description: string;
  type: string;
  niche: string;
  organizationId: string;
  done: boolean;
  createdAt: string;
  introduction?: string;
  chapters?: any;
}
