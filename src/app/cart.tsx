import { Alert, ScrollView, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { useCartStore } from '@/stores/cart-store'

import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'

export default function Cart() {
  const cartStore = useCartStore()

  const total = formatCurrency(cartStore.products.reduce((total, product) =>
    total + product.price * product.quantity, 0))

  return (
    <View className="flex-1 pt-16">
      <Header title="Seu carrinho" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {cartStore.products.length > 0 ?
          <View className="p-5 flex-1">
            {cartStore.products.map((product) => (
              <Product key={product.id} data={product} />
            ))}
          </View>
          :
          <Text className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio.</Text>
        }
      </ScrollView >

      <View className="flex-row items-center mb-4 pt-4 mx-5">
        <Text className="text-white text-xl font-subtitle mr-2">Total:</Text>
        <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
      </View>

      <Input
        placeholder="Informe o endereço de endrega com rua, bairro, CEP, número e complemento."
        className="mx-5"
      />

      <View className="p-5 gap-5">
        <Button>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}