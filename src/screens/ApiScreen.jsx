//Lo quiero profe wilfredo
import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ProductCard from '../components/ProductCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { useProducts } from '../hooks/useProducts';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants/theme';

export default function ApiScreen({ navigation }) {
  const { products, loading, error, refetch } = useProducts();
  const [backPressed, setBackPressed] = useState(false);

  const renderHeader = () => (
    <View style={styles.header}>
      <LinearGradient
        colors={[COLORS.yellow, COLORS.orange]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          onPressIn={() => setBackPressed(true)}
          onPressOut={() => setBackPressed(false)}
          style={[styles.backButton, backPressed && styles.backButtonPressed]}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Menú</Text>
        <Text style={styles.headerSubtitle}>
          {loading ? 'Cargando...' : `${products.length} productos cargados`}
        </Text>
      </LinearGradient>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <ProductCard product={item} index={index} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      {loading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView message={error} onRetry={refetch} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
    overflow: 'hidden',
  },
  headerGradient: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginBottom: SPACING.md,
  },
  backButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  backButtonText: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  headerTitle: {
    ...TYPOGRAPHY.hero,
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textPrimary,
    opacity: 0.7,
    marginTop: SPACING.xs,
  },
  list: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
});
