export type ControlCategory =
  | 'all'
  | 'indicators'
  | 'inputs'
  | 'navigation'
  | 'feedback'
  | 'containers'
  | 'loading'
  | 'scroll';

export interface CategoryInfo {
  id: ControlCategory;
  label: string;
  iconSvg: string;
  count?: number;
}

export interface ControlItem {
  id: string;
  name: string;
  ptName: string;
  category: Exclude<ControlCategory, 'all'>;
  categoryLabel: string;
  concept: string;
  purpose: string;
  goodPractice: string;
  commonPitfall: string;
  mnemonic: string;
  htmlSnippet: string;
  cssSnippet: string;
  renderInteractive: (container: HTMLElement) => void;
}
