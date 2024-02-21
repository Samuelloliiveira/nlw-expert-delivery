import { Image, ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Feather } from "@expo/vector-icons"

import { useCartStore } from '@/stores/cart-store'

import { PRODUCTS } from '@/utils/data/products'

import { formatCurrency } from '@/utils/functions/format-currency'
import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'
import { Redirect } from 'expo-router'

export default function Product() {
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.find((item) => item.id === id)

  function handleAddToCart() {
    if (product) {
      cartStore.add(product)
      navigation.goBack()
    }
  }

  if (!product) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-5">
          <Text className="text-white text-xl font-heading">{product.title}</Text>

          <Text className="text-lime-400 text-2xl font-heading my-2">
            {formatCurrency(product.price)}
          </Text>

          <Text className="text-slate-400 font-body text-base leading-6 mb-6">
            {product.description}
          </Text>

          {product.ingredients.map((ingredient) => (
            <Text
              key={ingredient}
              className="text-slate-400 font-body text-base leading-6"
            >
              {"\u2022"} {ingredient}
            </Text>
          ))}
        </View>

      </ScrollView>
      <View className="px-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Text>Adicionar ao pedido</Button.Text>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}