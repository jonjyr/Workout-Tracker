/**
 * Global constants for application theme
 * Contains styling for colors, spacing, and typography
 */

export const colors = {
  // --- Main Colors ---
  primary: '#4a3780',
  primaryDark: '#362a60',
  secondary: '#FF9F1C',
  success: '#2EC4B6',
  danger: '#DC3545',
  // --- Utility Colors ---
  border: '#DEE2E6',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  white: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
  // --- Text Colors ---
  textPrimary: '#212529',
  textSecondary: '#6c757d',
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  borderRadius: 12,
  inputHeight: 48,
};

export const typography = {
  header: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  subheader: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    opacity: 0.5,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
};
