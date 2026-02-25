import { lazy, ComponentType } from 'react';

// Lazy load all interactive components
const EOSGCalculator = lazy(() => import('@/components/EOSGCalculator').then(m => ({ default: m.EOSGCalculator })));
const ContractNegotiationChecklist = lazy(() => import('@/components/ContractNegotiationChecklist').then(m => ({ default: m.ContractNegotiationChecklist })));
const LaborRightsCalculator = lazy(() => import('@/components/LaborRightsCalculator').then(m => ({ default: m.LaborRightsCalculator })));
const VisaApplicationTracker = lazy(() => import('@/components/VisaApplicationTracker').then(m => ({ default: m.VisaApplicationTracker })));
const TaxSavingsCalculator = lazy(() => import('@/components/TaxSavingsCalculator').then(m => ({ default: m.TaxSavingsCalculator })));
const RentalPropertyROICalculator = lazy(() => import('@/components/RentalPropertyROICalculator').then(m => ({ default: m.RentalPropertyROICalculator })));
const SalaryCalculator = lazy(() => import('@/components/SalaryCalculator').then(m => ({ default: m.SalaryCalculator })));
const JobSearchStrategyGuide = lazy(() => import('@/components/JobSearchStrategyGuide'));
const CVTemplateGenerator = lazy(() => import('@/components/CVTemplateGenerator').then(m => ({ default: m.CVTemplateGenerator })));
const RentPriceComparison = lazy(() => import('@/components/RentPriceComparison'));
const CityCostComparison = lazy(() => import('@/components/CityCostComparison'));
const SchoolFeeCalculator = lazy(() => import('@/components/SchoolFeeCalculator'));
const SchoolComparisonTool = lazy(() => import('@/components/SchoolComparisonTool'));
const VisaChecklistGenerator = lazy(() => import('@/components/VisaChecklistGenerator'));
const DrivingLicenseChecker = lazy(() => import('@/components/DrivingLicenseChecker'));
const MentalHealthDirectory = lazy(() => import('@/components/MentalHealthDirectory'));
const TherapyCostCalculator = lazy(() => import('@/components/TherapyCostCalculator').then(m => ({ default: m.TherapyCostCalculator })));
const BankComparison = lazy(() => import('@/components/BankComparison').then(m => ({ default: m.BankComparison })));
const MobilePlanComparison = lazy(() => import('@/components/MobilePlanComparison').then(m => ({ default: m.MobilePlanComparison })));
const RoamingCostComparison = lazy(() => import('@/components/RoamingCostComparison').then(m => ({ default: m.RoamingCostComparison })));
const GroceryPriceComparison = lazy(() => import('@/components/GroceryPriceComparison').then(m => ({ default: m.GroceryPriceComparison })));
const WeeklyMealPlanner = lazy(() => import('@/components/WeeklyMealPlanner').then(m => ({ default: m.WeeklyMealPlanner })));
const MetroFareCalculator = lazy(() => import('@/components/MetroFareCalculator').then(m => ({ default: m.MetroFareCalculator })));
const PetImportChecklist = lazy(() => import('@/components/PetImportChecklist'));
const VeterinaryCostEstimator = lazy(() => import('@/components/VeterinaryCostEstimator'));
const DomesticWorkerCostCalculator = lazy(() => import('@/components/DomesticWorkerCostCalculator'));
const GymMembershipComparison = lazy(() => import('@/components/GymMembershipComparison'));
const RemoteWorkCafeFinder = lazy(() => import('@/components/RemoteWorkCafeFinder'));
const QDCPermitCalculator = lazy(() => import('@/components/QDCPermitCalculator'));
const HotelBarFinder = lazy(() => import('@/components/HotelBarFinder'));

export interface ComponentInjection {
  /** The h2 id where content is split. Content before this id is rendered first, then the component, then the rest. */
  splitAtId: string;
  /** The component to render */
  Component: ComponentType;
}

export interface SlugComponentConfig {
  injections: ComponentInjection[];
  /** If true, inject components in sequence (split content at each point) */
  sequential?: boolean;
}

/**
 * Maps blog post slugs to their interactive component injection configurations.
 * Each slug can have multiple components injected at specific content split points.
 */
export const blogComponentMap: Record<string, SlugComponentConfig> = {
  'end-of-service-gratuity-qatar-2025': {
    injections: [
      { splitAtId: 'calculation', Component: EOSGCalculator },
    ],
    // ContractNegotiationChecklist appended after all content
  },
  'qatar-labor-law-reforms-2025': {
    injections: [
      { splitAtId: 'protection', Component: LaborRightsCalculator },
    ],
  },
  'qatar-work-visa-guide-2025': {
    injections: [
      { splitAtId: 'phase-2', Component: VisaApplicationTracker },
    ],
  },
  'qatar-tax-guide-2025': {
    injections: [
      { splitAtId: 'corporate-tax', Component: TaxSavingsCalculator },
      { splitAtId: 'vat', Component: RentalPropertyROICalculator },
    ],
    sequential: true,
  },
  'expat-salaries-doha-2025': {
    injections: [
      { splitAtId: 'benchmarks', Component: TaxSavingsCalculator },
      { splitAtId: 'package', Component: SalaryCalculator },
    ],
    sequential: true,
  },
  'job-market-qatar-2025': {
    injections: [
      { splitAtId: 'trends', Component: JobSearchStrategyGuide },
    ],
  },
  'housing-rent-doha-2025': {
    injections: [
      { splitAtId: 'legal', Component: RentPriceComparison },
    ],
  },
  'cost-of-living-doha-dubai-riyadh': {
    injections: [
      { splitAtId: 'strategies', Component: CityCostComparison },
    ],
  },
  'international-schools-qatar-2025': {
    injections: [
      { splitAtId: 'fees', Component: SchoolFeeCalculator },
      { splitAtId: 'budget', Component: SchoolComparisonTool },
    ],
    sequential: true,
  },
  'qatar-visa-rules-expats-2025': {
    injections: [
      { splitAtId: 'family-visa', Component: VisaChecklistGenerator },
    ],
  },
  'driving-doha-2025-guide': {
    injections: [
      { splitAtId: 'rules', Component: DrivingLicenseChecker },
    ],
  },
  'lgbtq-experiences-qatar-2025': {
    injections: [
      { splitAtId: 'community', Component: MentalHealthDirectory },
    ],
  },
  'bank-account-qatar-guide': {
    injections: [
      { splitAtId: 'decision', Component: BankComparison },
    ],
  },
  'mobile-plans-qatar-guide': {
    injections: [
      { splitAtId: 'internet', Component: MobilePlanComparison },
      { splitAtId: '5g', Component: RoamingCostComparison },
    ],
    sequential: true,
  },
  'grocery-shopping-doha-guide': {
    injections: [
      { splitAtId: 'others', Component: GroceryPriceComparison },
      { splitAtId: 'delivery', Component: WeeklyMealPlanner },
    ],
    sequential: true,
  },
  'doha-metro-2025-guide': {
    injections: [
      { splitAtId: 'hours', Component: MetroFareCalculator },
    ],
  },
  'pet-import-qatar-guide': {
    injections: [
      { splitAtId: 'quarantine', Component: PetImportChecklist },
      { splitAtId: 'living', Component: VeterinaryCostEstimator },
    ],
    sequential: true,
  },
  'hiring-maid-nanny-qatar-guide': {
    injections: [
      { splitAtId: 'contracts', Component: DomesticWorkerCostCalculator },
    ],
  },
  'gyms-fitness-doha-guide': {
    injections: [
      { splitAtId: 'ladies', Component: GymMembershipComparison },
    ],
  },
  'remote-work-cafes-doha-guide': {
    injections: [
      { splitAtId: 'coworking', Component: RemoteWorkCafeFinder },
    ],
  },
  'alcohol-guide-doha': {
    injections: [
      { splitAtId: 'spending-limits', Component: QDCPermitCalculator },
      { splitAtId: 'prohibited', Component: HotelBarFinder },
    ],
    sequential: true,
  },
};

/**
 * Extra components appended after all content for specific slugs
 */
export const blogAppendComponents: Record<string, ComponentType[]> = {
  'end-of-service-gratuity-qatar-2025': [ContractNegotiationChecklist],
  'job-market-qatar-2025': [CVTemplateGenerator],
  'lgbtq-experiences-qatar-2025': [TherapyCostCalculator],
};
