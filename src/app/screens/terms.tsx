// src/screens/TermsScreen.tsx
import React, { useState } from "react";
import { H4, H5, H6, YStack, XStack } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
import { Checkbox } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';
import Background from "../../components/background";

export default function TermsScreen() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  return (
    <Background>
      <YStack width={300} alignItems="center" space="$2" padding="$3" borderRadius="$4">
        <H4 color="white">We classify our users' data as health data.</H4>
        <H6 color="lightgrey">Your privacy is important to us. That's why we want to make sure that your use of REMedy happens in a safe way.</H6>
        <H6 color="lightgrey">For more information on how we use your data and your rights, read our Privacy Policy and Terms of use.</H6>
        
        <XStack alignItems="center" space="$2">
          <Checkbox 
            size="$4" 
            checked={isChecked1} 
            onCheckedChange={() => setIsChecked1(!isChecked1)}
            style={{ 
              width: 24, 
              height: 24, 
              borderRadius: 12, 
              borderColor: '#ADD8E6', 
              borderWidth: 2, 
              backgroundColor: isChecked1 ? '#ADD8E6' : 'white' 
            }}
          >
            <Checkbox.Indicator style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: 12, 
              alignItems: "center", 
              justifyContent: "center" 
            }}>
              {isChecked1 && <Check color="black" />}
            </Checkbox.Indicator>
          </Checkbox>
          <H5 color="white">Yes, you have my permission to store my health data on REMedy's secure servers.</H5>
        </XStack>
        
        <XStack alignItems="center" space="$2">
          <Checkbox 
            size="$4" 
            checked={isChecked2} 
            onCheckedChange={() => setIsChecked2(!isChecked2)}
            style={{ 
              width: 24, 
              height: 24, 
              borderRadius: 12, 
              borderColor: '#ADD8E6', 
              borderWidth: 2, 
              backgroundColor: isChecked2 ? '#ADD8E6' : 'white' 
            }}
          >
            <Checkbox.Indicator style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: 12, 
              alignItems: "center", 
              justifyContent: "center" 
            }}>
              {isChecked2 && <Check color="black" />}
            </Checkbox.Indicator>
          </Checkbox>
          <H5 color="white">Yes, REMedy may process my health data to improve the app's functionality.</H5>
        </XStack>
      </YStack>
    </Background>
  );
}
