import React, { Component, useState } from "react"
import {
    NativeBaseProvider, FormControl, Button, Box, Avatar, Modal, Stack,
    Input, Select, CheckIcon, TextArea, ScrollView
} from "native-base"
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { db } from './setup';


class Cap extends Component {
    constructor(props) {
        super(props);
        this.getdataF = this.getdataF.bind(this);
        this.getdataB = this.getdataB.bind(this);
        this.basvuruEkle = this.basvuruEkle.bind(this);
        this.state = {
            fakulteler: [],
            bolumler: [],
            showModal: false,
            ogrNo: this.props.route.params.ogr_no,
            ad_soyad: this.props.route.params.ad_soyad,
            tel_no: "",
            eposta: "",
            fakulte: "",
            bolum: "",
            ogretim: "",
            adres: "",
            B_fakulte: "",
            B_bolum: "",
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
        console.log(this.state.fakulteler[1])
        const veri = db.ref('bolumler').on("child_added", snapshot => {
            let a = snapshot.key;
            this.state.bolumler.push(a);
        })
    }
    basvuruEkle() {
        db.ref('/CAPBasvurular').child(this.state.ogrNo)
            .set({
                ogr_no: this.state.ogrNo,
                ad_soyad: this.state.ad_soyad,
                tel_no: this.state.tel_no,
                eposta: this.state.eposta,
                adres: this.state.adres,
                bolum: this.state.bolum,
                fakulte: this.state.fakulte,
                basvuruDurumu: 'Onay Bekliyor',
                basvuruTarihi: '28-10-2021',
                ogretim_turu: this.state.ogretim,
                basvurulanFakulte: this.state.B_fakulte,
                basvurulanBolum: this.state.B_bolum
            })
            .then(
                this.setState({ ogr_no: "" }),
                this.setState({ ad_soyad: "" }),
                this.setState({ tc_no: "" }),
                this.setState({ tel_no: "" }),
                this.setState({ eposta: "" }),
                this.setState({ adres: "" }),
                this.setState({ donem: " " }),
                this.setState({ bolum: "" }),
                this.setState({ fakulte: "" }),
                this.setState({ uni_puan: "" }),

            )
        this.setState({ showModal: true })

    }
    async printPDF() {
        const results = await RNHTMLtoPDF.convert({
            html: '<head> <img src="https://lh3.googleusercontent.com/proxy/fnirSOgvOYPoEPHEjbaHRWINWIrnjEjh53K6UXmbeI4pqQrTZ5E-0Gozguep1y7cM_SR2Yrh-Q4ed8ipamVv" align="center" width="80" height="80">' +
                '<h1 style="text-align:center;">T.C. <br/> KOCAEL?? ??N??VERS??TES?? <br/> M??HENDS??L??K FAK??LTES?? <br/> <b><i>' + this.state.B_fakulte + '</i></b> B??L??M BA??KANLI??INA </h1><br/><p style=font-size:160%><b><i>' + this.state.fakulte + '</i></b>, <b><i>' + this.state.bolum + '</i></b> B??l??m?? <b><i>' + this.state.ogretim + '</i></b> Program??, <b><i>' + this.state.ogrNo + '</i></b> numaral?? <b><i>' + this.state.ad_soyad + '</i></b>. isimli ????rencisiyim.' +
                'Kocaeli ??niversitesi ??n Lisans ve Lisans E??itim ve ????retim Y??netmeli??inin 43. maddesi uyar??nda, Fak??lteniz <b><i>' + this.state.B_bolum + '</i></b> B??l??m?? a??a????da belirtmi?? oldu??um (I. ????r / II. ????r.) ??ift Anadal Program?? (??AP) kapsam??nda ????renim g??rme talebimin kabul edilmesini arz ederim.' +
                '<br/><br/><br/><br/></b>	<br/>Adres 	:	<b><i>' + this.state.adres + '</i></b> <br/>GSM	:	<b><i>' + this.state.tel_no + '</i></b> <br/>E-Posta Adresi	:	<b><i>' + this.state.eposta + '</i></b></p> <br/>Eki	:	<b><i>Transkript, <br/>     ??kinci anadal taban puan?? ile ????rencinin ald?????? puan?? g??steren belge <br/>     (Ba??ar?? s??ralamas?? ilk %20' + '' + "bulunmayan ????renciler i??in)</i></b></p>'" +
                '<p style=font-size:"200%">??MZA</p>',
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
                            <FormControl.Label fontSize='20px'>??grenci Numaras??</FormControl.Label>
                            <Input isDisabled="true" value={this.state.ogrNo} onChangeText={val => this.setState({ ogrNo: val })} px="4" w="100%" h="35px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Ad Soyad </FormControl.Label>
                            <Input isDisabled="true" value={this.state.ad_soyad} onChangeText={val => this.setState({ ad_soyad: val })} px="4" w="100%" h="35px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Telefon Numaras?? </FormControl.Label>
                            <Input value={this.state.tel_no} onChangeText={val => this.setState({ tel_no: val })} keyboardType="phone-pad" px="4" w="100%" h="35px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>E-Posta </FormControl.Label>
                            <Input value={this.state.eposta} onChangeText={val => this.setState({ eposta: val })} px="4" w="100%" h="35px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Adres </FormControl.Label>
                            <TextArea placeHolder
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                                value={this.state.adres} onChangeText={val => this.setState({ adres: val })} />
                        </FormControl>

                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>????retim T??r?? </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="????retim T??r?? se??iniz"
                                onValueChange={val => this.setState({ ogretim: val })}
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}
                                mt={2}>
                                <Select.Item label="1. ????retim" value="1. ????retim" />
                                <Select.Item label="2. ????retim" value="1. ????retim" />
                            </Select>
                        </FormControl>

                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Kendi Fak??lteniz </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="Fak??lte Se??iniz"
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
                                <Select.Item />
                            </Select>
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Ba??vurulacak Fak??lte </FormControl.Label>
                            <Input value={this.state.B_fakulte} onChangeText={val => this.setState({ B_fakulte: val })} px="4" w="100%" h="35px" />
                        </FormControl>

                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'> Kendi B??l??m??n??z </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="B??l??m Se??iniz"
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

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Ba??vurulacak B??l??m </FormControl.Label>
                            <Input value={this.state.B_bolum} onChangeText={val => this.setState({ B_bolum: val })} px="4" w="100%" h="35px" />
                        </FormControl>


                        <Box px="4">
                            <Button bg="green.600" mt="3" mb="3" onPress={() => { this.printPDF(); this.setState({ showModal: true }); }}>PDF Olu??tur</Button>
                            <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })} size="lg">
                                <Modal.Content maxWidth="260">
                                    <Modal.Header _text={{ fontSize: "2xl", textAlign: "center", fontWeight: "bold" }}>Ba??vuru Formu Ba??ar??yla Olu??turuldu</Modal.Header>
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
                                                <Button mx="6" rounded="xl" variant="unstyled" _text={{ fontSize: "md", color: "#171717", fontWeight: "bold" }} onPress={() => { this.props.navigation.navigate("??AP Belge Y??kleme", { ogrNo: this.state.ogrNo, ad_soyad: this.state.ad_soyad }); this.setState({ showModal: false }) }} >DEVAM ET</Button>
                                            </FormControl>
                                        </Stack>
                                    </Modal.Body>
                                </Modal.Content>
                            </Modal>
                        </Box>
                    </Box>
                </ScrollView>
            </NativeBaseProvider>
        )
    }
}
export default Cap;


