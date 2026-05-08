import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import ServiceCard from '../components/ServiceCard'

const services = [
  { id: 'harvest', name: 'Harvesting', price: 25 },
  { id: 'clean', name: 'Cleaning', price: 15 },
  { id: 'shell', name: 'Shell Removal', price: 10 }
]

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TreeCare</Text>
      <Text style={styles.subtitle}>Book trusted climbers and rural workers</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Booking', { serviceId: item.id })}>
            <ServiceCard title={item.name} subtitle={`Starting ₹${item.price}`} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7FAFC' },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  subtitle: { fontSize: 14, color: '#64748B', marginTop: 6 }
})
