import React, { Component, useState,Picker, useEffect } from "react"
import {
    NativeBaseProvider, FormControl, Button, Box,
    Input, Select, CheckIcon, TextArea, ScrollView, Text, Stack,
    HStack, Center, Modal, Avatar, List, ThreeDotsIcon
} from "native-base"
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import DatePicker from 'react-native-date-picker';
import {db} from './setup';
import { ThemeConsumer } from "styled-components";
import {Upload} from "./FileUpload"; 
import { file } from "@babel/types";



class YatayGecisBelge extends Component {
    constructor(props){
        super(props);
        this.getfile = this.getEK1.bind(this);
        this.getfile = this.getEK2.bind(this);
        this.getfile = this.getEK3.bind(this);
        this.getfile = this.getEK4.bind(this);
        this.getfile = this.getEK5.bind(this);
        this.state = {
            getfile: [],
            data: [],
            EK1:[],
            EK2:[],
            EK3:[],
            EK4:[],
            EK5:[],
            ad_soyad:this.props.route.params.ad_soyad,
            ogrNo: this.props.route.params.ogrNo
        }
    }
    componentDidMount(){
        this.getEK1();
        this.getEK2();
        this.getEK3();
        this.getEK4();
        this.getEK5();
    }
    getEK1(){
        const onchild = db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_Transkript').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK1: todoItems,
        });
        return() => db.ref('PDF').orderByChild('ogrno').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_Transkript').off('child_added', onchild)
        });
    }
    getEK2(){
        const onchild = db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_SinavSonucBelgesi').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK2: todoItems,
        });
        return() => db.ref('PDF').orderByChild('ogrno').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_SinavSonucBelgesi').off('child_added', onchild)
        });
    }
    getEK3(){
        const onchild = db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_YabancıDilBelgesi').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK3: todoItems,
        });
        return() => db.ref('PDF').orderByChild('ogrno').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_YabancıDilBelgesi').off('child_added', onchild)
        });
    }
    getEK4(){
        const onchild = db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_OgrenciBelgesi').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK4: todoItems,
        });
        return() => db.ref('PDF').orderByChild('ogrno').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_OgrenciBelgesi').off('child_added', onchild)
        });
    }
    getEK5(){
        const onchild = db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_BasvuruFormu').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK5: todoItems,
        });
        return() => db.ref('PDF').orderByChild('ogrno').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_BasvuruFormu').off('child_added', onchild)
        });
    }

    render(props) {
        return (
            <NativeBaseProvider>
                <ScrollView bg="#fff">
                 <Box bg="#fff" mt="10">
                    <FormControl mt="3" px="4" >
                        <FormControl.Label fontSize='20px'>EK 1: Transkript(Onaylı) </FormControl.Label>
                        <Text>{this.state.EK1.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","Transkript")} >Dosya Seç</Button>
                    </FormControl>
                    {console.log(this.state.data)}
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 2: ÖSYM Sınav Sonuç belgesinin İnternet çıktısı (PDF) </FormControl.Label>
                        <Text>{this.state.EK2.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","SinavSonucBelgesi")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 3: Yabancı  Dil  Hazırlık  veya  Yeterlik  belgesi (Yabancı dil ile eğitim yapan programlara başvuranlar için)  </FormControl.Label>
                        <Text>{this.state.EK3.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","YabancıDilBelgesi")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 4: Öğrenci belgesi  </FormControl.Label>
                        <Text>{this.state.EK4.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","OgrenciBelgesi")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 5: Yatay Geçiş Başvuru Formu</FormControl.Label>
                        <Text>{this.state.EK5.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","BasvuruFormu")} >Dosya Seç</Button>
                    </FormControl>
                </Box>
                <Box>
                </Box>
                  <Button mt="20" bg="green.600" mt="30" onPress={() => this.props.navigation.navigate('Ana Sayfa')}>KAYDET</Button>
                 
                </ScrollView>
            </NativeBaseProvider>
        )
    }
}

export default YatayGecisBelge;