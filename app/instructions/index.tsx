import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { commonStyles, buttonStyles } from '../../styles/commonStyles';

type PlatformType = 'ios' | 'android';

export default function InstructionsScreen() {
  const [platform, setPlatform] = useState<PlatformType>('ios');

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Icon
          name={platform === 'ios' ? 'logo-apple' : 'logo-android'}
          size={60}
        />
        <Text style={commonStyles.title}>
          {platform === 'ios' ? 'iOS' : 'Android'} Instructions
        </Text>

        <View style={commonStyles.section}>
          {platform === 'ios' ? (
            <>
              <View style={commonStyles.card}>
                <Icon name="download-outline" size={30} />
                <Text style={commonStyles.text}>1. Download Expo Go from the App Store</Text>
              </View>
              <View style={commonStyles.card}>
                <Icon name="camera-outline" size={30} />
                <Text style={commonStyles.text}>2. Open your iPhone&apos;s camera</Text>
              </View>

              <View style={commonStyles.card}>
                <Icon name="scan-outline" size={30} />
                <Text style={commonStyles.text}>3. Scan the QR code in the top right</Text>
              </View>
            </>
          ) : (
            <>
              <View style={commonStyles.card}>
                <Icon name="download-outline" size={30} />
                <Text style={commonStyles.text}>1. Download Expo Go from the Play Store</Text>
              </View>
              <View style={commonStyles.card}>
                <Icon name="open-outline" size={30} />
                <Text style={commonStyles.text}>2. Open Expo Go on your device</Text>
              </View>
              <View style={commonStyles.card}>
                <Icon name="qr-code-outline" size={30} />
                <Text style={commonStyles.text}>3. Tap "Scan QR Code" in the Expo Go app</Text>
              </View>
              <View style={commonStyles.card}>
                <Icon name="scan-outline" size={30} />
                <Text style={commonStyles.text}>4. Scan the QR code in the top right</Text>
              </View>
            </>
          )}
        </View>

        <View style={commonStyles.buttonContainer}>
          <Button
            text={`Switch to ${platform === 'ios' ? 'Android' : 'iOS'}`}
            onPress={() => setPlatform(p => p === 'ios' ? 'android' : 'ios')}
            style={buttonStyles.instructionsButton}
          />
          <Button
            text="Back to Main"
            onPress={() => router.push('/')}
            style={buttonStyles.backButton}
          />
        </View>
      </View>
    </View>
  );
}
