import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Check } from '@tamagui/lucide-icons'
import { Checkbox } from 'tamagui'

const Profile = () => {
  return (
    <Checkbox size="$4">
      <Checkbox.Indicator>
        <Check />
      </Checkbox.Indicator>
    </Checkbox>
  )
}

export default Profile

const styles = StyleSheet.create({})