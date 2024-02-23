import { useState } from 'react'
import { Alert, Linking, ScrollView, Text, View } from 'react-native'
import { useNavigation } from 'expo-router'
import { useCartStore } from '@/stores/cart-store'
import { Feather } from '@expo/vector-icons'

import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'

const PHONE_NUMBER = "5571999040682"

export default function Cart() {
  const [address, setAddress] = useState("")
  const cartStore = useCartStore()
  const navigation = useNavigation()

  const total = formatCurrency(cartStore.products.reduce((total, product) =>
    total + product.price * product.quantity, 0))

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega!")
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("")

    const message = `
      NOVO PEDIDO 😋
      
      \n Entregar em: ${address}

      ${products}

      \n Valor total: ${total}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

    cartStore.clear()
    setAddress("")

    navigation.goBack()
  }

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
        onChangeText={setAddress}
        value={address}
        blurOnSubmit={true}
        onSubmitEditing={handleOrder}
        returnKeyType="next"
      />

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
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