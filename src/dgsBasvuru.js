import React, { useState, Component } from "react"
import {
    NativeBaseProvider, FormControl, Button, Box, Avatar, Modal, Stack,
    Input, Select, CheckIcon, TextArea, ScrollView
} from "native-base"
import { Upload } from "./FileUpload";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { db } from './setup';

class Dgs extends Component {
    constructor(props) {
        super(props);
        this.getdataF = this.getdataF.bind(this);
        this.getdataB = this.getdataB.bind(this);
        this.state = {
            fakulteler: [],
            bolumler: [],
            ogrNo: this.props.route.params.ogr_no,
            ogretim: "",
            ad_soyad: this.props.route.params.ad_soyad,
            telNo: "",
            eposta: "",
            adres: "",
            fakulte: "",
            bolum: "",
            showModal: false
        };
    }
    componentDidMount() {
        this.getdataF();
        this.getdataB();
    }

    getdataF() {
        db.ref('fakulteler').on('child_added', snapshot => {
            let a = snapshot.key;
            this.state.fakulteler.push(a);
        });
    }
    getdataB() {
        db.ref('bolumler').on("child_added", snapshot => {
            let a = snapshot.key;
            this.state.bolumler.push(a);
        })
    }
    async printPDF() {
        const results = await RNHTMLtoPDF.convert({
            html: '<head> <img src="https://lh3.googleusercontent.com/proxy/fnirSOgvOYPoEPHEjbaHRWINWIrnjEjh53K6UXmbeI4pqQrTZ5E-0Gozguep1y7cM_SR2Yrh-Q4ed8ipamVv" align="center" width="80" height="80">' +
                '<h1 style="text-align:center;">KOCAELİ ÜNİVERSİTESİ REKTÖRLÜĞÜNE, <br/><br/>DİKEY GEÇİŞ BAŞVURUSU</h1><br/><p style=font-size:160%>' +
                'Kocaeli Üniversitesi Ön Lisans ve Lisans Eğitim ve Öğretim Yönetmeliğinin 43. maddesi uyarında, Fakülteniz <b><i>' + this.state.fakulte + '</i></b>,  <b><i>' + this.state.bolum + '</i></b> Bölümüne aşağıda belirtmiş olduğum Dikey Geçiş Sınavı sonuçlarım kapsamında öğrenim görme talebimin kabul edilmesini arz ederim.' +
                '<br/><br/><br/><br/></b> <br/>Ad Soyad :	<b><i>' + this.state.ad_soyad + '</i></b>  <br/>TC No	:	<b><i>' + this.state.ogrNo + '</i></b>	<br/>Adres 	:	<b><i>' + this.state.adres + '</i></b> <br/>GSM	:	<b><i>' + this.state.telNo + '</i></b> <br/>E-Posta Adresi	:	<b><i>' + this.state.eposta + '</i></b></p> <br/>' +
                '<p style=font-size:"200%">İMZA</p>',
            fileName: 'file',
            base64: true,
        })
        await RNPrint.print({ filePath: results.filePath })
    }
    render() {
        return (
            <NativeBaseProvider>
                <ScrollView>
                    <Box bg="#fff">

                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>TC Kimlik Numarası </FormControl.Label>
                            <Input isDisabled="true" value={this.state.ogrNo} onChangeText={val => this.setState({ ogrNo: val })} keyboardType='numeric' maxlength={11} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Ad Soyad </FormControl.Label>
                            <Input isDisabled="true" value={this.state.ad_soyad} onChangeText={val => this.setState({ ad_soyad: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4"  >
                            <FormControl.Label fontSize='20px'>Telefon Numarası </FormControl.Label>
                            <Input keyboardType="phone-pad" value={this.state.telNo} onChangeText={val => this.setState({ telNo: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>E-Posta </FormControl.Label>
                            <Input value={this.state.eposta} onChangeText={val => this.setState({ eposta: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4"  >
                            <FormControl.Label fontSize='20px'>Adres </FormControl.Label>
                            <TextArea placeHolder
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                                value={this.state.adres} onChangeText={val => this.setState({ adres: val })} />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'> Basvurulacak Fakülte Adı </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="Fakülte Seçiniz"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}
                                mt={2}
                                selectedValue={this.state.fakulte}
                                onValueChange={val => this.setState({ fakulte: val })}>
                                {this.state.fakulteler.map((item) => {
                                    return (<Select.Item label={item} value={item} />)
                                })}
                                <Select.Item />
                            </Select>
                        </FormControl>

                        <FormControl mt="3" px="4"  >
                            <FormControl.Label fontSize='20px'> Başvurulacak Bölüm </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="Bölüm Seçiniz"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}
                                mt={2}
                                selectedValue={this.state.bolum}
                                onValueChange={val => this.setState({ bolum: val })}>
                                {this.state.bolumler.map((item) => {
                                    return (<Select.Item label={item} value={item} />)
                                })}
                                <Select.Item />
                            </Select>
                        </FormControl>
                        <Box px="4">
                            <Button bg="green.600" mt="3" mb="3" onPress={() => { this.printPDF(); this.setState({ showModal: true }); }}>KAYDET</Button>
                            <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })} size="lg">
                                <Modal.Content maxWidth="260">
                                    <Modal.Header _text={{ fontSize: "2xl", textAlign: "center", fontWeight: "bold" }}>Kayıt İşleminiz Başarılı</Modal.Header>
                                    <Modal.Body>
                                        <Stack space={2} px="2">
                                            <Box>
                                                <Avatar mt="3"
                                                    size="2xl"
                                                    bg="#000"
                                                    alignSelf="center"
                                                    source={require("./img/basarili.png")}>
                                                </Avatar>
                                            </Box>
                                            <FormControl>
                                                <Button mx="6" rounded="xl" variant="unstyled" _text={{ fontSize: "md", color: "#171717", fontWeight: "bold" }}
                                                    onPress={() => { this.props.navigation.navigate('DGS Belge Yükleme', { ogrNo: this.state.ogrNo, ad_soyad: this.state.ad_soyad }); this.setState({ showModal: false }) }} >TAMAM</Button>
                                            </FormControl>
                                        </Stack>
                                    </Modal.Body>
                                </Modal.Content>
                            </Modal>
                        </Box>
                    </Box>
                </ScrollView>
            </NativeBaseProvider >
        )
    }
}

export default Dgs;