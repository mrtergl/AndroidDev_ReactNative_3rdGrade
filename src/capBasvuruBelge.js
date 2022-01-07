import React, { Component, useState,Picker } from "react"
import {
    NativeBaseProvider, FormControl, Button, Box,
    Input, Select, CheckIcon, TextArea, ScrollView, Text, Stack,
    HStack, Center, Modal, Avatar
} from "native-base"
import {Upload} from "./FileUpload";
import {db} from "./setup";

class capBasvuruBelge extends Component {
    constructor(props){
        super(props);
        this.getfile = this.getEK1.bind(this);
        this.getfile = this.getEK2.bind(this);
        this.getfile = this.getEK3.bind(this);
        this.state = {
            EK1:[],
            EK2:[],
            EK3:[],
            ad_soyad:this.props.route.params.ad_soyad,
            ogrNo: this.props.route.params.ogrNo
        }
    }
    componentDidMount(){
        this.getEK1();
        this.getEK2();
        this.getEK3();
    }
    getEK1(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_TranskriptCAP').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK1: todoItems,
        });
        });
    }
    getEK2(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_IkinciAnadalCAP').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK2: todoItems,
        });
        });
    }
    getEK3(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_BasvuruFormuCAP').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK3: todoItems,
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
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"ÇAP Başvurusu","TranskriptCAP")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 2: İkinci anadal taban puanı ile öğrencinin aldığı puanı gösteren belge  (Başarı 
                            sıralaması ilk %20’de bulunmayan öğrenciler için) </FormControl.Label>
                        <Text>{this.state.EK2.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"ÇAP Başvurusu","IkinciAnadalCAP")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="3" px="4" >
                        <FormControl.Label fontSize='20px'>EK 3: ÇAP Başvuru Formu </FormControl.Label>
                        <Text>{this.state.EK3.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"ÇAP Başvurusu","BasvuruFormuCAP")} >Dosya Seç</Button>
                    </FormControl>
                </Box>
                  <Button mt="20" bg="green.600" mt="30" onPress={() =>this.props.navigation.navigate('Ana Sayfa')}>KAYDET</Button>
                 
                </ScrollView>
            </NativeBaseProvider>
        )
    }
}

export default capBasvuruBelge;