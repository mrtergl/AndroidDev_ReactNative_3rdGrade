import React, { Component, useState,Picker } from "react"
import {
    NativeBaseProvider, FormControl, Button, Box,
    Input, Select, CheckIcon, TextArea, ScrollView, Text, Stack,
    HStack, Center, Modal, Avatar
} from "native-base"
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import DatePicker from 'react-native-date-picker';
import {db} from './setup';
import { ThemeConsumer } from "styled-components";
import {Upload} from "./FileUpload"; 

class YazOkuluBelge extends Component {
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
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_TranskriptYAZ').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK1: todoItems,
        });
        
        });
    }
    getEK2(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_SinavSonucBelgesiYAZ').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK2: todoItems,
        });
        });
    }
    getEK3(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_AlınacakDersYAZ').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK3: todoItems,
        });
        });
    }
    getEK4(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_DerslerYAZ').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK4: todoItems,
        });
        });
    }
    getEK5(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_BasvuruFormuYAZ').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK5: todoItems,
        });
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
                        <Button bg="green.600" mt="2" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","TranskriptYAZ")} >Dosya Seç</Button>
                    </FormControl>
                    {console.log(this.state.data)}
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 2: Yaz döneminde ders almak istenilen Üniversite ve Kocaeli Üniversitesinin ilgili bölümlerinin, öğrencinin üniversiteye giriş yılındaki taban puanlarını gösteren belge</FormControl.Label>
                        <Text>{this.state.EK2.fileName}</Text>
                        <Button bg="green.600" mt="2" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","SinavSonucBelgesiYAZ")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 3: Alınmak istenilen derslerin karşı Üniversitedeki ders saati/kredi/AKTS ve ders içeriklerini gösteren belge </FormControl.Label>
                        <Text>{this.state.EK3.fileName}</Text>
                        <Button bg="green.600" mt="2" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","AlınacakDersYAZ")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 4: Yaz Öğretim boyunca sorumlu olunan dersler  </FormControl.Label>
                        <Text>{this.state.EK4.fileName}</Text>
                        <Button bg="green.600" mt="2" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","DerslerYAZ")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 5: Yatay Geçiş Başvuru Formu</FormControl.Label>
                        <Text>{this.state.EK5.fileName}</Text>
                        <Button bg="green.600" mt="2" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"Yatay Geçiş Başvurusu","BasvuruFormuYAZ")} >Dosya Seç</Button>
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

export default YazOkuluBelge;