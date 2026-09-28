import {Alert,Pressable,SafeAreaView,StyleSheet,Text,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {subscriptionConfig} from '../../src/config/subscription';
import {theme} from '../../src/theme';

export default function Pro(){
  const {pro}=subscriptionConfig;
  const subscribe=()=>{
    if(!pro.checkoutEnabled){
      Alert.alert('PayPal coming soon','Secure PayPal checkout is not connected yet. This placeholder cannot unlock Pro access.');
      return;
    }
    Alert.alert('Checkout unavailable','The production PayPal checkout URL must be created by the backend.');
  };
  return <SafeAreaView style={s.safe}><View style={s.content}>
    <View style={s.badge}><Ionicons name="sparkles" size={18}/><Text style={s.badgeText}>PRO</Text></View>
    <Text style={s.title}>{pro.name}</Text>
    <Text style={s.price}>{pro.displayPrice}<Text style={s.period}> / {pro.billingPeriod}</Text></Text>
    <Text style={s.copy}>Unlock the paid MicroTools experience. Payment will be handled securely by {pro.provider} once the production account is connected.</Text>
    <View style={s.card}><Text style={s.item}>✓ Higher usage limits</Text><Text style={s.item}>✓ Premium tools</Text><Text style={s.item}>✓ Priority processing</Text></View>
    <Pressable onPress={subscribe} style={s.button}><Text style={s.buttonText}>Continue with PayPal</Text></Pressable>
    <Text style={s.note}>Placeholder only. No payment is taken and Pro access is never granted by the app itself.</Text>
  </View></SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:theme.bg},content:{padding:24},badge:{alignSelf:'flex-start',flexDirection:'row',gap:6,alignItems:'center',paddingHorizontal:10,paddingVertical:6,borderRadius:12,backgroundColor:'#F0F1F3'},badgeText:{fontWeight:'800'},title:{fontSize:34,fontWeight:'800',marginTop:22,color:theme.text},price:{fontSize:30,fontWeight:'800',marginTop:12,color:theme.text},period:{fontSize:16,fontWeight:'500',color:theme.muted},copy:{fontSize:15,lineHeight:22,color:theme.muted,marginTop:14},card:{backgroundColor:theme.card,borderWidth:1,borderColor:theme.line,borderRadius:theme.radius,padding:18,marginTop:24,gap:12},item:{fontSize:15,color:theme.text},button:{height:54,borderRadius:18,backgroundColor:theme.text,alignItems:'center',justifyContent:'center',marginTop:24},buttonText:{color:'#fff',fontWeight:'800',fontSize:16},note:{fontSize:12,lineHeight:18,color:theme.muted,textAlign:'center',marginTop:14}});
