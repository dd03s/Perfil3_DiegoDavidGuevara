//Lo quiero profe wilfredo
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

export default function LoadingView() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.purple} />
      <Text style={styles.text}>Cargando menú</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  text: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.purple,
    marginTop: SPACING.md,
  },
});
