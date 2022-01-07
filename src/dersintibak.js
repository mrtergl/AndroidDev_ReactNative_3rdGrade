import React, { Component } from "react"
import {
    NativeBaseProvider, FormControl, Button, Box,
    Input, Select, CheckIcon, TextArea, ScrollView, Avatar, Modal, Stack
} from "native-base"
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { db } from './setup';

class DersIntibak extends Component {
    constructor(props) {
        super(props);
        this.getdataF = this.getdataF.bind(this);
        this.getdataB = this.getdataB.bind(this);
        this.basvuruEkle = this.basvuruEkle.bind(this);

        this.state = {
            fakulteler: [],
            bolumler: [],
            textInput: [],
            inputData: [],
            ogrNo: this.props.route.params.ogr_no,
            ad_soyad: this.props.route.params.ad_soyad,
            tel_no: "",
            eposta: "",
            fakulte: "",
            bolum: "",
            O_uni: "",
            O_fakulte: "",
            sınıf: "",
            adres: "",
            ogretim: "",
            showModal: false
        }
    }


    basvuruEkle() {
        db.ref('/DersIntibakBasvurular').child(this.state.ogrNo)
            .set({
                ogr_no: this.state.ogrNo,
                ad_soyad: this.state.ad_soyad,
                tel_no: this.state.tel_no,
                eposta: this.state.eposta,
                adres: this.state.adres,
                bolum: this.state.bolum,
                fakulte: this.state.fakulte,
                ogretim: this.state.ogretim,
                oncekiFakulte: this.state.O_fakulte,
                oncekiUni: this.state.O_uni,
                basvuruDurumu: 'Onay Bekliyor',
                basvuruTarihi: '28-10-2021'
            })
            .then(
                this.setState({ ogr_no: "" }),
                this.setState({ ad_soyad: "" }),
                this.setState({ tc_no: "" }),
                this.setState({ tel_no: "" }),
                this.setState({ eposta: "" }),
                this.setState({ adres: "" }),
                this.setState({ bolum: "" }),
                this.setState({ fakulte: "" }),

            )
        this.setState({ showModal: true })

    }
    async printPDF() {
        const results = await RNHTMLtoPDF.convert({
            html: '<head> <img src="https://lh3.googleusercontent.com/proxy/fnirSOgvOYPoEPHEjbaHRWINWIrnjEjh53K6UXmbeI4pqQrTZ5E-0Gozguep1y7cM_SR2Yrh-Q4ed8ipamVv" align="center" width="80" height="80">' +
                '<h1 style="text-align:center;">DERS İNTİBAK BAŞVURUSU</h1><br/><p style=font-size:160%><b><i>' + this.state.fakulte + '</i></b>, <b><i>' + this.state.bolum + '</i></b> Bölümü  <b><i>' + this.state.ogretim + '</i></b> , <b><i>' + this.state.ogrNo + '</i></b> numaralı <b><i>' + this.state.ad_soyad + '</i></b> isimli öğrencisiyim.' +
                'Daha önce okumuş olduğum <b><i>' + this.state.O_uni + '</i></b> , <b><i>' + this.state.O_fakulte + '</i></b> Fakültesi / Yüksekokulu / Meslek Y.O. ait not durum belgesinde başarılı olduğum, aşağıda belirttiğim derslerden muaf olmak istiyorum.' +
                'Gereği için arz ederim.<br/><br/><br/><br/><br/>Ad Soyad : <b><i>' + this.state.ad_soyad + '</i></b> <br/> Öğrenci No : <b><i>' + this.state.ogrNo + '</i></b> <br/> Bölümü-Sınıfı	: <b><i>' + this.state.bolum + '</i></b> - <b><i>' + this.state.sınıf + '</i></b><br/>Cep Telefon No 	:	<b><i>' + this.state.tel_no + '</i></b> <br/>E-posta Adresi	:	<b><i>' + this.state.eposta + '</i></b> <br/>Adresi	:	<b><i>' + this.state.adres + '</i></b></p>' +
                '<p style=font-size:"200%">İMZA</p>',
            fileName: 'file',
            base64: true,
        })
        await RNPrint.print({ filePath: results.filePath })
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
    render() {
        return (
            <NativeBaseProvider>
                <ScrollView>
                    <Box bg="#fff">
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Öğrenci Numarası </FormControl.Label>
                            <Input isDisabled="true" value={this.state.ogrNo} onChangeText={val => this.setState({ ogrNo: val })} px="4" keyboardType='numeric' w="100%" h="50px" />
                        </FormControl>
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Ad Soyad </FormControl.Label>
                            <Input isDisabled="true" value={this.state.ad_soyad} onChangeText={val => this.setState({ ad_soyad: val })} px="4" w="100%" h="50px" />
                        </FormControl>
                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Telefon Numarası </FormControl.Label>
                            <Input value={this.state.tel_no} onChangeText={val => this.setState({ tel_no: val })} keyboardType="phone-pad" px="4" w="100%" h="50px" />
                        </FormControl>
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>E-Posta </FormControl.Label>
                            <Input value={this.state.eposta} onChangeText={val => this.setState({ eposta: val })} px="4" w="100%" h="50px" />
                        </FormControl>
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Adres </FormControl.Label>
                            <TextArea placeHolder
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                                value={this.state.adres} onChangeText={val => this.setState({ adres: val })} />
                        </FormControl>
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'> Fakülte </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="Fakülte Seçiniz"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}
                                mt={2}
                                selectedValue={this.state.fakulte}
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}
                                mt={2}
                                onValueChange={val => this.setState({ fakulte: val })}>
                                {this.state.fakulteler.map((item) => {
                                    return (<Select.Item label={item} value={item} />)
                                })}
                                <Select.Item label="Seçmek İçin Tıklayın" />
                            </Select>
                        </FormControl>
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'> Bölüm/Program Adı </FormControl.Label>
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
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'> Sınıf </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="Sınıf Seçiniz"
                                onValueChange={val => this.setState({ sınıf: val })}
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}
                                mt={2}>
                                <Select.Item label="1.Sınıf" value="1.Sınıf" />
                                <Select.Item label="2.Sınıf" value="2.Sınıf" />
                                <Select.Item label="3.Sınıf" value="3.Sınıf" />
                                <Select.Item label="4.Sınıf" value="4.Sınıf" />
                            </Select>
                        </FormControl>
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Öğretim Türü </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="Öğretim Türü seçiniz"
                                onValueChange={val => this.setState({ ogretim: val })}
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}
                                mt={2}>
                                <Select.Item label="1. Öğretim" value="1. Öğretim" />
                                <Select.Item label="2. Öğretim" value="2. Öğretim" />
                            </Select>
                        </FormControl>
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Önceki Üniversite </FormControl.Label>
                            <Input value={this.state.O_uni} onChangeText={val => this.setState({ O_uni: val })} px="4" w="100%" h="50px" />
                        </FormControl>
                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Önceki Fakulte </FormControl.Label>
                            <Input value={this.state.O_fakulte} onChangeText={val => this.setState({ O_fakulte: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <Box px="10">
                            <Button bg="green.600" mt="3" mb="3" onPress={() => { this.printPDF(); this.setState({ showModal: true }); }}>PDF Oluştur</Button>
                            <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })} size="lg">
                                <Modal.Content maxWidth="260">
                                    <Modal.Header _text={{ fontSize: "2xl", textAlign: "center", fontWeight: "bold" }}>Başvuru Formu Başarıyla Oluşturuldu</Modal.Header>
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
                                                <Button mx="6" rounded="xl" variant="unstyled" _text={{ fontSize: "md", color: "#171717", fontWeight: "bold" }} onPress={() => { this.props.navigation.navigate("Ders İntibak Belge Yükleme", { ogrNo: this.state.ogrNo, ad_soyad: this.state.ad_soyad }); this.setState({ showModal: false }) }}>TAMAM</Button>
                                            </FormControl>
                                        </Stack>
                                    </Modal.Body>
                                </Modal.Content>
                            </Modal>
                        </Box>
                    </Box>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
export default DersIntibak;