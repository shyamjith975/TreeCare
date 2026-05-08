import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native'

export default function BookingScreen({ route, navigation }: any) {
  const serviceId = route.params?.serviceId
  const [trees, setTrees] = useState('5')
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('6-9')

  function handleConfirm() {
    Alert.alert('Booking created', `Service: ${serviceId}\nTrees: ${trees}\nSlot: ${slot}`)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Booking</Text>
      <Text style={styles.label}>Number of Trees</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={trees} onChangeText={setTrees} />

      <Text style={styles.label}>Preferred Slot</Text>
      <View style={{ marginBottom: 12 }}>
        <Button title="6-9 AM" onPress={() => setSlot('6-9')} />
        <View style={{ height: 8 }} />
        <Button title="9-12 PM" onPress={() => setSlot('9-12')} />
      </View>

      <Button title="Confirm Booking" onPress={handleConfirm} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 14, color: '#334155', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#E2E8F0', padding: 10, borderRadius: 8, marginTop: 6 }
})
