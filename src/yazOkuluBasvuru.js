import React, { Component, useState } from "react"
import {
    NativeBaseProvider, FormControl, Button, Box,
    Input, Select, CheckIcon, TextArea, ScrollView, Avatar, Modal, Stack
} from "native-base"
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { db } from './setup';

class YazOkuluBasvuru extends Component {
    constructor(props) {
        super(props);
        this.getdataF = this.getdataF.bind(this);
        this.getdataB = this.getdataB.bind(this);
        this.state = {
            fakulteler: [],
            bolumler: [],
            showModal: false,
            ogrNo: this.props.route.params.ogr_no,
            ad_soyad: this.props.route.params.ad_soyad,
            tel_no: "",
            eposta: "",
            uni_puan: "",
            bolum: "",
            ogretim: "",
            adres: "",
            danısman: "",
            buni: "",
            ders_adi: this.setState(null),
            ders_kodu: this.setState(null),
            fakulte: this.setState(null),
            danisman: this.setState(null)
        };

    }
    basvuruEkle() {
        db.ref('/yazOkuluBasvurular').child(this.state.ogrNo)
            .set({
                ogr_no: this.state.ogrNo,
                ad_soyad: this.state.ad_soyad,
                tel_no: this.state.tel_no,
                eposta: this.state.eposta,
                adres: this.state.adres,
                bolum: this.state.bolum,
                fakulte: this.state.fakulte,
                uni_puan: this.state.uni_puan,
                ders_ad: this.state.ders_adi,
                ders_kod: this.state.ders_kodu,
                danisman: this.state.danisman,
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
                this.setState({ donem: " " }),
                this.setState({ bolum: "" }),
                this.setState({ fakulte: "" }),
                this.setState({ uni_puan: "" }),
                this.setState({ ders_adi: "" }),
                this.setState({ ders_kodu: "" }),

            )

    }
    async printPDF() {
        const results = await RNHTMLtoPDF.convert({
            html: '<head> <img src="https://lh3.googleusercontent.com/proxy/fnirSOgvOYPoEPHEjbaHRWINWIrnjEjh53K6UXmbeI4pqQrTZ5E-0Gozguep1y7cM_SR2Yrh-Q4ed8ipamVv" align="center" width="80" height="80">' +
                '<h1 style="text-align:center;">T.C. <br/> KOCAELİ ÜNİVERSİTESİ <br/>MÜHENDSİLİK FAKÜLTESİ<br/>………………….. BÖLÜM BAŞKANLIĞINA</h1>' +
                'Kocaeli Üniversitesi <b><i>' + this.state.bolum + '</i></b> Bölümü <b><i>' + this.state.ogretim + '</i></b>, <b><i>' + this.state.ogrNo + '</i></b> numaralı <b><i>' + this.state.ad_soyad + '</i></b> isimli öğrencisiyim.' +
                ' <br> 2020/2021 Eğitim Öğretim yılı yaz öğretimi kapsamında aşağıda bilgilerini verdiğim ders/dersleri almak istiyorum. Kontrol listesinde belirtilen adımları tamamladım. <br> Gereği için arz ederim.' +
                '<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; İmza' +
                '<br><br> Öğrenci E-mail: <b><i>' + this.state.eposta + '</i></b> <br> Öğrenci Adres: <b><i>' + this.state.adres + '</i></b> <br> Öğrenci GSM: <b><i>' + this.state.tel_no + '</i></b>' +
                '<br> Öğrenci Danışman Adı Soyadı: <b><i>' + this.state.danısman + '</i></b> <br><br> Yaz Okulu için Başvurulan Üniversite: <b><i>' + this.state.buni + '</i></b>' +
                '<br><br><br><br><b><i>Dilekçe Ekleri</i></b><p style=font-size:120%> 1- Yaz döneminde ders almak istenilen Üniversite ve Kocaeli Üniversitesinin ilgili bölümlerinin,' +
                'öğrencinin üniversiteye <b>giriş yılındaki</b> taban puanlarını gösteren belge ektedir. <br>2- Alınmak istenilen derslerin karşı Üniversitedeki ' +
                'ders saati/kredi/AKTS ve ders içeriklerini gösteren belge ektedir. <br> 3- Başvurulan dönem içinde alınmış transkript ektedir.<br><br>  4- Yaz Okulu başvuru formu ektedir.<p style=font-size:160%>' +
                '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp; İmza<br>',
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
        const veri = db.ref('bolumler').on("child_added", snapshot => {
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
                            <FormControl.Label fontSize='20px'>Ögrenci Numarası </FormControl.Label>
                            <Input isDisabled="true" value={this.state.ogrNo} onChangeText={val => this.setState({ ogrNo: val })} px="4" w="100%" h="35px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Ad Soyad </FormControl.Label>
                            <Input isDisabled="true" value={this.state.ad_soyad} onChangeText={val => this.setState({ ad_soyad: val })} px="4" w="100%" h="35px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Telefon Numarası </FormControl.Label>
                            <Input keyboardType="phone-pad" value={this.state.tel_no} onChangeText={val => this.setState({ tel_no: val })} px="4" w="100%" h="35px" />
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
                            <FormControl.Label fontSize='20px'> Fakülte </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="Fakülte Seçiniz"
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

                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'> Bölüm </FormControl.Label>
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

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Yaz Okulu için Başvurulan Üniversite </FormControl.Label>
                            <Input value={this.state.buni} onChangeText={val => this.setState({ buni: val })} px="4" w="100%" h="35px" />
                        </FormControl>
                        <FormControl mt="2" px="4">
                            <FormControl.Label fontSize='20px'>Öğrenci Danışmanı Adı Soyadı</FormControl.Label>
                            <Input value={this.state.danısman} onChangeText={val => this.setState({ danısman: val })} px="4" w="100%" h="35px" />
                        </FormControl>
                        <Box px="4">
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
                                                <Button mx="6" rounded="xl" variant="unstyled" _text={{ fontSize: "md", color: "#171717", fontWeight: "bold" }}
                                                    onPress={() => { this.props.navigation.navigate('Yaz Okulu Belge Yükleme', { ogrNo: this.state.ogrNo, ad_soyad: this.state.ad_soyad }); this.setState({ showModal: false }) }}>TAMAM</Button>
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
export default YazOkuluBasvuru;



