import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, SHADOWS } from '../constants/theme';

const MAX_DELAY = 300;

export default function ProductCard({ product, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const delay = Math.min(index * 80, MAX_DELAY);
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, index]);

  const rating = product.rating ? product.rating.rate : null;
  const ratingText = rating ? `${rating} / 5` : '';
  const formattedPrice = `$${Number(product.price).toFixed(2)}`;

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.info}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formattedPrice}</Text>
          {ratingText ? <Text style={styles.rating}>{ratingText}</Text> : null}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.card,
  },
  imageWrapper: {
    width: 104,
    height: 104,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.imageBg,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 92,
    height: 92,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'space-between',
  },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.categoryBg,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  categoryText: {
    ...TYPOGRAPHY.label,
    color: COLORS.categoryText,
    fontSize: 9,
  },
  title: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    ...TYPOGRAPHY.price,
    color: COLORS.purple,
  },
  rating: {
    ...TYPOGRAPHY.subtitle,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
