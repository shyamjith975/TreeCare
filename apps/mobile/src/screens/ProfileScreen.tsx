import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://placehold.co/100x100' }} style={styles.avatar} />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.role}>Customer</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Properties</Text>
        <Text style={styles.cardText}>You have 2 properties registered</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC', alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginTop: 20 },
  name: { fontSize: 20, fontWeight: '700', marginTop: 12 },
  role: { fontSize: 14, color: '#64748B', marginBottom: 20 },
  card: { width: '100%', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginTop: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardText: { fontSize: 14, color: '#475569', marginTop: 6 }
})
