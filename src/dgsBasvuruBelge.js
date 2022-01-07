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
        this.getfile = this.getEK4.bind(this);
        this.state = {
            EK1:[],
            EK2:[],
            EK3:[],
            EK4:[],
            ad_soyad:this.props.route.params.ad_soyad,
            ogrNo: this.props.route.params.ogrNo
        }
    }
    componentDidMount(){
        this.getEK1();
        this.getEK2();
        this.getEK3();
        this.getEK4();
    }
    getEK1(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_DilYeterlilikDGS').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK1: todoItems,
        });
        return() => db.ref('PDF').orderByChild('ogrno').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_DilYeterlilikDGS').off('child_added', onchild)
        });
    }
    getEK2(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_TranskriptDGS').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK2: todoItems,
        });
        return() => db.ref('PDF').orderByChild('ogrno').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_TranskriptDGS').off('child_added', onchild)
        });
    }
    getEK3(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_DersIcerikleriDGS').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK3: todoItems,
        });
        return() => db.ref('PDF').orderByChild('ogrno').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_DersIcerikleriDGS').off('child_added', onchild)
        });
    }
    getEK4(){
        db.ref('PDF').orderByChild('fileName').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_BasvuruFormuDGS').on('child_added', (snapshot) =>{
            var a = snapshot.val();
           let todoItems= {...a};
           this.setState({
            EK4: todoItems,
        });
        return() => db.ref('PDF').orderByChild('ogrno').equalTo(this.state.ogrNo+'_'+this.state.ad_soyad+'_BasvuruFormuDGS').off('child_added', onchild)
        });
    }
    render(props) {
        return (
            <NativeBaseProvider>
                <ScrollView bg="#fff">
                 <Box bg="#fff" mt="10">
                    <FormControl mt="3" px="4" >
                        <FormControl.Label fontSize='20px'>EK 1: Yabancı Dil Yeterlilik Belgesi </FormControl.Label>
                        <Text>{this.state.EK1.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"DGS Başvurusu","DilYeterlilikDGS")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="8" px="4" >
                        <FormControl.Label fontSize='20px'>EK 2: Not Durum Belgesi (Transkript) (onaylanmış olmalıdır)</FormControl.Label>
                        <Text>{this.state.EK2.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"DGS Başvurusu","TranskriptDGS")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="3" px="4" >
                        <FormControl.Label fontSize='20px'>EK 3: Ders İçerikleri (onaylanmış olmalıdır, her sayfasının onaylandığından emin olunuz) </FormControl.Label>
                        <Text>{this.state.EK3.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"DGS Başvurusu","DersIcerikleriDGS")} >Dosya Seç</Button>
                    </FormControl>
                    <FormControl mt="3" px="4" >
                        <FormControl.Label fontSize='20px'>EK 4: Ders İntibak Başvuru Formu </FormControl.Label>
                        <Text>{this.state.EK4.fileName}</Text>
                        <Button bg="green.600" mt="1" onPress={() => Upload(this.state.ad_soyad,this.state.ogrNo,"DGS Başvurusu","BasvuruFormuDGS")} >Dosya Seç</Button>
                    </FormControl>
                </Box>
                  <Button mt="20" bg="green.600" mt="30" onPress={() =>this.props.navigation.navigate('Ana Sayfa')}>KAYDET</Button>
                 
                </ScrollView>
            </NativeBaseProvider>
        )
    }
}

export default capBasvuruBelge;
