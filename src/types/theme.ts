export type Theme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  wall: string;
  start: string;
  end: string;
  cell: string;
}

export const lightTheme: ThemeColors = {
  background: '#ffffff',
  foreground: '#1a1a1a',
  primary: '#4A90E2',
  secondary: '#666666',
  accent: '#4CAF50',
  wall: '#000000',
  start: '#4CAF50',
  end: '#F44336',
  cell: '#666666',
};

export const darkTheme: ThemeColors = {
  background: '#1a1a1a',
  foreground: '#ffffff',
  primary: '#64B5F6',
  secondary: '#9E9E9E',
  accent: '#81C784',
  wall: '#ffffff',
  start: '#81C784',
  end: '#EF5350',
  cell: '#9E9E9E',
}; 