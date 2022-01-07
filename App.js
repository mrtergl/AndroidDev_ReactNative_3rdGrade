import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./src/Home";
import OgrenciKayit from "./src/ogrenciKayıt";
import Ogrenci from "./src/ogrenci";
import YazOkuluBasvuru from "./src/yazOkuluBasvuru";
import YatayGecis from "./src/yatayGecis";
import OgrenciBasvuru from "./src/ogrenciBasvurular";
import OgrenciBilgiDuzenle from "./src/ogrenciBilgiDüzenle";
import Cap from './src/capBasvuru';
import Dgs from "./src/dgsBasvuru";
import Admin from "./src/admin";
import AdminYazOkulu from "./src/adminYazOkulu";
import AdminYatayGecis from "./src/adminYatayGecis";
import AdminCap from "./src/adminCap";
import AdminDgs from "./src/adminDgs";
import AdminDersIntibakı from "./src/adminDersIntibak";
import DersIntibak from "./src/dersintibak";
import YatayGecisBelge from "./src/yatayGecisBelge"
import DikeyGecisBelge from "./src/dgsBasvuruBelge"
import DersIntibakBelge from "./src/dersintibakBelge";
import yazokulubelge from "./src/yazOkuluBasvuruBelge";
import capBasvuruBelge from "./src/capBasvuruBelge";



const App = () => {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer initialRouteName="Home">
      <stack.Navigator>
        <stack.Screen name=" " component={Home} />
        <stack.Screen name="Ana Sayfa" component={Ogrenci} />
        <stack.Screen name="Kayıt Ol" component={OgrenciKayit} />
        <stack.Screen name="Yaz Okulu Basvurusu" component={YazOkuluBasvuru} />
        <stack.Screen name="Yatay Geciş Basvurusu" component={YatayGecis} />
        <stack.Screen name="ÇAP Başvurusu" component={Cap} />
        <stack.Screen name="DGS Başvurusu" component={Dgs} />
        <stack.Screen name="Başvurularım" component={OgrenciBasvuru} />
        <stack.Screen name="Admin" component={Admin} />
        <stack.Screen name="Yaz Okulu Başvuruları" component={AdminYazOkulu} />
        <stack.Screen name="Yatay Geçiş Başvuruları" component={AdminYatayGecis} />
        <stack.Screen name="ÇAP Başvuruları" component={AdminCap} />
        <stack.Screen name="Ders İntibakı Başvuruları" component={AdminDersIntibakı} />
        <stack.Screen name="DGS Başvuruları" component={AdminDgs} />
        <stack.Screen name="Bilgi Düzenleme" component={OgrenciBilgiDuzenle} />
        <stack.Screen name="Ders İntibak Başvurusu" component={DersIntibak} />
        <stack.Screen name="Yatay Geçiş Belge Yükleme" component={YatayGecisBelge}/>
        <stack.Screen name="ÇAP Belge Yükleme" component={capBasvuruBelge} />
        <stack.Screen name="Ders İntibak Belge Yükleme" component={DersIntibakBelge} />
        <stack.Screen name="DGS Belge Yükleme" component={DikeyGecisBelge} />
        <stack.Screen name="Yaz Okulu Belge Yükleme" component={yazokulubelge} />
        
      </stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
