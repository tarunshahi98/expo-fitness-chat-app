import { AppText } from "@/components/common";
import { useBanner } from "@/contexts/BannerContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { tabScreenStyles } from "@/styles/tabScreenStyles";
import { Heart, ShoppingBag } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
} from "react-native";

interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
}

const PRODUCTS: Product[] = [
  { id: "prod-1", name: "Minimalist Watch", price: 129, color: "Space Gray" },
  { id: "prod-2", name: "Wireless Earbuds", price: 89, color: "Matte White" },
  { id: "prod-3", name: "Leather Wallet", price: 45, color: "Classic Brown" },
  { id: "prod-4", name: "Smart Ring", price: 199, color: "Titanium" },
];

export default function ShoppingScreen() {
  const { theme } = useAppTheme();
  const { showBanner } = useBanner();
  const { headerTopPadding } = useHeaderInset({
    webPadding: 24,
    nativeOffset: 8,
  });

  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const lastBannerTimeRef = useRef<number>(0);

  const handleToggleWishlist = useCallback((id: string, name: string) => {
    setWishlist((prev) => {
      const next = !prev[id];
      const now = Date.now();
      if (now - lastBannerTimeRef.current > 1200) {
        lastBannerTimeRef.current = now;
        showBanner(
          next ? `Added ${name} to wishlist` : `Removed ${name} from wishlist`,
          "info",
        );
      }
      return { ...prev, [id]: next };
    });
  }, [showBanner]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      const now = Date.now();
      if (now - lastBannerTimeRef.current > 1200) {
        lastBannerTimeRef.current = now;
        showBanner(`Added ${product.name} to bag!`, "success");
      }
    },
    [showBanner],
  );

  const renderProductItem: ListRenderItem<Product> = useCallback(
    ({ item }) => {
      const isWishlisted = Boolean(wishlist[item.id]);

      return (
        <View
          style={[
            tabScreenStyles.productCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          {/* Product Image Area */}
          <View
            style={[
              tabScreenStyles.productImageWrapper,
              { backgroundColor: theme.muted },
            ]}
          >
            <ShoppingBag size={32} color={theme.mutedForeground} />
            <TouchableOpacity
              onPress={() => handleToggleWishlist(item.id, item.name)}
              style={[
                tabScreenStyles.wishlistBtn,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.borderSubtle,
                  borderWidth: 1,
                },
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={
                isWishlisted
                  ? `Remove ${item.name} from wishlist`
                  : `Add ${item.name} to wishlist`
              }
              accessibilityState={{ selected: isWishlisted }}
            >
              <Heart
                size={14}
                color={
                  isWishlisted ? theme.destructive : theme.mutedForeground
                }
                fill={isWishlisted ? theme.destructive : "transparent"}
              />
            </TouchableOpacity>
          </View>

          {/* Product Info */}
          <AppText
            variant="body"
            weight="bold"
            color={theme.foreground}
            numberOfLines={1}
          >
            {item.name}
          </AppText>
          <AppText
            variant="caption"
            color={theme.mutedForeground}
            style={{ marginTop: 2 }}
          >
            {item.color}
          </AppText>

          {/* Price & Add to Bag */}
          <View style={tabScreenStyles.priceRow}>
            <AppText
              variant="subheading"
              weight="heavy"
              color={theme.foreground}
            >
              ${item.price}
            </AppText>
            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={[
                tabScreenStyles.cartBtn,
                { backgroundColor: theme.primary },
              ]}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              accessibilityRole="button"
              accessibilityLabel={`Add ${item.name} to bag`}
            >
              <ShoppingBag size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [theme, wishlist, handleToggleWishlist, handleAddToCart],
  );

  return (
    <View
      style={[
        tabScreenStyles.screenContainer,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Header */}
      <View
        style={[
          tabScreenStyles.headerContainer,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
            paddingTop: headerTopPadding,
          },
        ]}
      >
        <View style={tabScreenStyles.headerRow}>
          <AppText variant="heading" weight="bold" color={theme.foreground}>
            Shopping
          </AppText>
        </View>
      </View>

      {/* 2-Column Product Grid */}
      <FlatList
        data={PRODUCTS}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={[
          tabScreenStyles.scrollContent,
          { paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
