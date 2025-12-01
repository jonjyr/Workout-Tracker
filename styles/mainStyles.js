import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from './theme';

const { width } = Dimensions.get('window');

export const mainStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60, // Safe area handling
  },

  // Header
  headingContainer: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
  },
  heading: {
    ...typography.header,
    marginBottom: spacing.l,
    textAlign: 'center',
  },

  // Action Bar
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.l,
    gap: spacing.m,
    paddingHorizontal: spacing.m,
  },
  actionButton: {
    flex: 1,
  },

  // Main List
  listContent: {
    paddingHorizontal: spacing.m,
  },

  // Exercise Card
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
    paddingBottom: spacing.s,
  },
  exerciseTitle: {
    ...typography.cardHeader,
  },

  // Set Rows
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: spacing.s,
    marginBottom: spacing.s,
    padding: spacing.s,
  },
  setLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    width: 50,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  inputText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: spacing.s,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.s,
    height: spacing.inputHeight,
  },
  inputField: {
    width: 50,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    padding: 0,
  },

  // Swipe Actions
  deleteAction: {
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
    borderRadius: spacing.borderRadius,
    paddingHorizontal: spacing.l,
    width: '33%',
  },
  deleteText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  setDeleteAction: {
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60',
    height: '100%',
    borderRadius: spacing.s,
  },

  // Floating Action Button
  fabContainer: {
    position: 'absolute',
    bottom: 40,
    left: spacing.m,
    right: spacing.m,
  },
  fabButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: spacing.m,
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});