import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

/**
 * Reusable button component with predefined style variants
 * @param {Object} props
 * @param {function} props.onPress - Function to call on press event
 * @param {string} props.title - Text displayed on the button
 * @param {string} [props.variant='primary'] - Style variants: 'primary', 'secondary', 'danger', 'outline', 'primaryDark', 'success', 'cancel'
 * @param {Object} [props.style] - Additional container styles
 * @param {Object} [props.textStyle] - Additional text styles
 * @returns {JSX.Element} - TouchableOpacity button component
 */
export const AppButton = ({
  onPress,
  title,
  style,
  textStyle,
  variant = 'primary',
}) => {
  const backgroundColor =
    variant === 'secondary'
      ? colors.secondary
      : variant === 'danger'
        ? colors.danger
        : variant === 'outline'
          ? 'transparent'
          : variant === 'primaryDark'
            ? colors.primaryDark
            : variant === 'success'
              ? colors.success
              : variant === 'cancel'
                ? colors.background
                : colors.primary;

  const TextColor =
    variant === 'outline'
      ? colors.primary
      : variant === 'cancel'
        ? colors.textSecondary
        : colors.white;

  const border =
    variant === 'outline'
      ? {
          borderWidth: 1,
          borderColor: colors.primary,
        }
      : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, border, style]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: TextColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: spacing.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    ...typography.buttonText,
  },
});
