import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MasterBall from '../components/MasterBall';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, SHADOWS } from '../constants/theme';
import { STUDENT_NAME, STUDENT_CARNET, STUDENT_SECTION } from '../constants/config';

export default function StudentScreen({ navigation }) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const cardFade = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(40)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer1 = setTimeout(() => {
      Animated.parallel([
        Animated.timing(cardFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cardSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 300);

    const timer2 = setTimeout(() => {
      Animated.parallel([
        Animated.timing(buttonFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [floatAnim, cardFade, cardSlide, buttonFade, buttonSlide]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.yellow, COLORS.orange]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
            <View style={styles.ballWrapper}>
              <MasterBall size={160} />
            </View>
          </Animated.View>
          <Text style={styles.appTitle}>Pollo Pollón</Text>
          <Text style={styles.appSubtitle}>Evaluación práctica · React Native</Text>
        </LinearGradient>
      </View>

      <Animated.View
        style={[
          styles.card,
          {
            opacity: cardFade,
            transform: [{ translateY: cardSlide }],
          },
        ]}
      >
        <Text style={styles.cardLabel}>INFORMACIÓN DEL ESTUDIANTE</Text>

        <View style={styles.row}>
          <View style={styles.bar} />
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>NOMBRE</Text>
            <Text style={styles.rowValue}>{STUDENT_NAME}</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.bar} />
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>CARNET</Text>
            <Text style={styles.rowValue}>{STUDENT_CARNET}</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.bar} />
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>SECCIÓN Y GRUPO</Text>
            <Text style={styles.rowValue}>{STUDENT_SECTION}</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonWrapper,
          {
            opacity: buttonFade,
            transform: [{ translateY: buttonSlide }],
          },
        ]}
      >
        <PrimaryButton label="Ver menú" onPress={() => navigation.navigate('Menu')} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: '45%',
    borderBottomLeftRadius: RADIUS.xxl,
    borderBottomRightRadius: RADIUS.xxl,
    overflow: 'hidden',
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  ballWrapper: {
    ...SHADOWS.ball,
    marginBottom: SPACING.md,
  },
  appTitle: {
    ...TYPOGRAPHY.hero,
    color: COLORS.textPrimary,
  },
  appSubtitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textPrimary,
    opacity: 0.7,
    marginTop: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    marginTop: -SPACING.xxl,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
  cardLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  bar: {
    width: 4,
    height: 36,
    backgroundColor: COLORS.yellow,
    borderRadius: 2,
    marginRight: SPACING.md,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  rowValue: {
    ...TYPOGRAPHY.value,
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.xs,
  },
  buttonWrapper: {
    marginTop: SPACING.xl,
    marginHorizontal: SPACING.lg,
  },
});
