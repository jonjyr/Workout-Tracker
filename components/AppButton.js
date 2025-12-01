import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

export const AppButton = ({ onPress, title, style, textStyle, variant = 'primary' }) => {
  const backgroundColor = variant === 'secondary' ? colors.secondary
    : variant === 'danger' ? colors.danger
    : variant === 'outline' ? 'transparent'
    : colors.primary;

  const TextColor = variant === 'outline' ? colors.primary
    : colors.white;
  const border = variant === 'outline' ? {
    borderWidth: 1,
    borderColor: colors.primary,
  } : {};

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, { backgroundColor }, border, style]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: TextColor }, textStyle]}>{title}</Text>
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