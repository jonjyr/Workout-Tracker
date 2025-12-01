import {StyleSheet} from 'react-native';
import { colors, spacing, typography } from './theme';

export const mainStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.m,
    paddingTop: 60, // Safe area handling
  },

  // Header
  headingContainer: {
    marginBottom: spacing.l,
    alignItems: 'center',
  },
  heading: {
    ...typography.header,
    textAlign: 'center',
  },

  // Button Containers
  topButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.m,
  },
  buttonStyle: {
    width: '48%',
  },
  bottomButtonContainer: {
    marginTop: spacing.s,
    marginBottom: spacing.l,
    width: '100%',
  },

  // List Styling
  listStyle: {
    flex: 1,
  },
  listItem: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: colors.secondary,
  },

  // Exercise header inside card
  listExercise: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
    paddingBottom: spacing.s,
  },
  exerciseName: {
    ...typography.subHeader,
    color: colors.primary,
  },

  // Set row
  setListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: spacing.s,
    marginTop: spacing.s,
  },
  setNumber: {
    ...typography.body,
    fontWeight: 'bold',
    width: 50,
  },

  // Inputs
  setInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inputLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: 4,
  },
  input: {
    width: 50,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    color: colors.textPrimary,
    fontSize: 16,
  },

  // Swipe action
  deleteButton: {
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '85%',
    borderRadius: spacing.borderRadius,
    marginTop: 0,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  }
});