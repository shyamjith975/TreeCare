import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {
  title: string
  subtitle?: string
}

export default function ServiceCard({ title, subtitle }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.tag}>
        <Text style={styles.tagText}>Book</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 12, color: '#64748B', marginTop: 4 },
  tag: { backgroundColor: '#0EA5A9', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  tagText: { color: '#fff', fontWeight: '700' }
})
