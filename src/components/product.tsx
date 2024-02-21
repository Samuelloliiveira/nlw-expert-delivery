import { forwardRef } from 'react'
import { Alert, Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Link } from 'expo-router'

import { useCartStore } from '@/stores/cart-store'

type ProductDataProps = {
  id: string
  title: string
  price: number
  description: string
  cover: any
  thumbnail: any
  ingredients: string[]
  quantity?: number
}

interface ProductProps extends TouchableOpacityProps {
  data: ProductDataProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(({ data, ...rest }, ref) => {
  const cartStore = useCartStore()

  function handleProductRemove(product: ProductDataProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id)
      }
    ])
  }

  return (
    <Link href={`/product/${data.id}`} asChild>
      <TouchableOpacity
        ref={ref}
        className="w-full flex-row items-end pb-4"
        activeOpacity={0.7}
        {...rest}
      >
        {data.quantity !== undefined ? (
          <View className="w-full gap-2">
            <View className="flex-row items-center gap-2">
              <Text className="text-slate-100 font-subtitle text-base">{data.title}</Text>
              {data.quantity &&
                <Text className="text-slate-400 font-subtitle text-sm">x {data.quantity}</Text>
              }
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center w-1/2">
                <Image source={data.thumbnail} className="w-20 h-20 rounded-md mr-2" />
                <Text className="text-slate-400 text-xs leading-5">{data.description}</Text>
              </View>
              <TouchableOpacity
                className="bg-red-500 p-2 rounded-full"
                activeOpacity={0.7}
                onPress={() => handleProductRemove(data)}
              >
                <Feather name="trash-2" size={20} className="w-1/2" color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />

            <View className="flex-1 ml-3">
              <Text className="text-slate-100 font-subtitle text-base flex-1">{data.title}</Text>
              <Text className="text-slate-400 text-xs leading-5 mt-0.5">{data.description}</Text>
            </View>
          </>
        )}
      </TouchableOpacity >
    </Link>
  )
})