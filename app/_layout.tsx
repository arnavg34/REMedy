import { TamaguiProvider, createTamagui } from '@tamagui/core' 
import { config } from '@tamagui/config/v3'
import { Stack } from 'expo-router'
const tamaguiConfig = createTamagui(config)
type Conf = typeof tamaguiConfig
declare module '@tamagui/core' { // or 'tamagui'
  interface TamaguiCustomConfig extends Conf {}
}
export default () => {

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack>
        <Stack.Screen name='index' options = {{headerShown: false }} />
      </Stack>      
    </TamaguiProvider>
  )
}
