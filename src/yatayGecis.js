import React, { Component, useState, Picker } from "react"
import {
    NativeBaseProvider, FormControl, Button, Box,
    Input, Select, CheckIcon, TextArea, ScrollView, Text, Stack,
    HStack, Center, Modal, Avatar
} from "native-base"
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import DatePicker from 'react-native-date-picker';
import { db } from './setup';


class YatayGecis extends Component {
    constructor(props) {
        super(props);
        this.getdataF = this.getdataF.bind(this);
        this.getdataB = this.getdataB.bind(this);
        this.basvuruEkle = this.basvuruEkle.bind(this);
        this.state = {
            bolumler: [],
            fakulteler: [],
            basvuru_tur: "",
            ogrNo: this.props.route.params.ogr_no,
            ad_soyad: this.props.route.params.ad_soyad,
            tc_no: this.props.route.params.tcno,
            tel_no: "",
            eposta: "",
            fakulte: "",
            bolum: "",
            B_uni: "",
            B_fakulte: "",
            B_bolum: "",
            sınıf: "",
            adres: "",
            ogretim: "",
            not_ort: "",
            uniYerlesmeYili: "",
            uniPuan: "",
            uni: "",
            B_uniPuan: "",
            ybd_puan: "",

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
    basvuruEkle() {
        db.ref('/yatayGecisBasvurular').child(this.state.ogrNo)
            .set({
                ogr_no: this.state.ogrNo,
                ad_soyad: this.state.ad_soyad,
                tel_no: this.state.tel_no,
                eposta: this.state.eposta,
                adres: this.state.adres,
                universite: this.state.uni,
                bolum: this.state.bolum,
                fakulte: this.state.fakulte,
                uni_puan: this.state.uniPuan,
                genelNot: this.state.not_ort,
                kayıtYılı: this.state.uniYerlesmeYili,
                basvurulanFakulte: this.state.B_fakulte,
                basvurulanBolum: this.state.B_bolum,
                ogrenimTuru: this.state.ogretim,
                basvuruTuru: this.state.basvuru_tur,
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
                this.setState({ yıl: "" }),
                this.setState({ gNo: "" }),
                this.setState({ basvurulanFakulte: "" }),
                this.setState({ basvurulanBolum: "" }),
                this.setState({ ogrenimTuru: "" }),
                this.setState({ basvuruTuru: "" }),
            )
        this.setState({ showModal: true })

    }


    async printPDF() {
        const results = await RNHTMLtoPDF.convert({
            html: '<head> <img src="https://lh3.googleusercontent.com/proxy/fnirSOgvOYPoEPHEjbaHRWINWIrnjEjh53K6UXmbeI4pqQrTZ5E-0Gozguep1y7cM_SR2Yrh-Q4ed8ipamVv" align="center" width="80" height="80">' +
                '<h1 style="text-align:center;">YATAY GEÇİŞ BAŞVURUSU</h1><br/><p style=font-size:90%><b>I-BAŞVURU TÜRÜ</b> <br> BAŞVURU TÜRÜ: <b><i>' + this.state.basvuru_tur + '</i></b> <br><br> <b>II-KİŞİSEL BİLGİLER</b> <br> ADI SOYADI: <b><i>' + this.state.ad_soyad + '</i></b> <br> T.C KİMLİK NO: <b><i>' + this.state.tc_no + '</i></b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'
                + ' DOĞUM TARİHİ: <b><i>....</i></b>/<b><i>....</i></b>/<b><i>....</i></b> '
                + '<br> E-POSTA ADRESİ: <b><i>' + this.state.eposta + '</i></b> <br> TELEFON(GSM): <b><i>' + this.state.tel_no + '</i></b> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;TEBLİGAT ADRES: <b><i>' + this.state.adres + '</i></b>'
                + '<br><br> <b>III- ÖĞRENİMİNE İLİŞKİN BİLGİLER</b> <br> HALEN KAYITLI OLDUĞU ÜNİVERSİTE: <b><i>' + this.state.uni + '</i></b> <br> HALEN KAYITLI OLDUĞU FAKÜLTE/YÜKSEKOKUL: <b><i>' + this.state.fakulte + '</i></b>'
                + '<br> HALEN KAYITLI OLDUĞU BÖLÜM/PROGRAM: <b><i>' + this.state.bolum + '</i></b> <br><br> ÖĞRETİM TÜRÜ: <b><i>' + this.state.ogretim + '</i></b> &emsp;&emsp;&emsp;&emsp;SINIF/YARIYIL: <b><i>' + this.state.sınıf + '</i></b>'
                + '<br><br>GENEL AKADEMİK BAŞARI NOT ORTALAMASI: <b><i>' + this.state.not_ort + '</i></b> <br> ÖĞRENCİ NUMARASI(KOCAELİ ÜNİVERSİTESİ ÖĞRENCİLERİ İÇİN): <b><i>' + this.state.ogrNo + '</i></b>'
                + '<br> HALEN KAYITLI OLDUĞU YÜKSEKÖĞRETİM KURUMUNA YERLEŞTİRİLDİĞİ YIL: <b><i>' + this.state.uniYerlesmeYili + '</i></b> <br> HALEN KAYITLI OLUNAN PROGRAMA YERLEŞTİRMEDE KULLANILAN PUANI: <b><i>' + this.state.uniPuan + '</i></b>'
                + '<br> ZORUNLU HAZIRLIK SINIFI BULUNAN PROGRAMLARA BAŞVURAN ADAYLAR İÇİN '
                + '<br> YABANCI DİL PUANI VE SINAV TÜRÜ: <b><i>' + this.state.ybd_puan + '</i></b>'
                + '<br><br> <b>IV - ADAYIN BAŞVURDUĞU YÜKSEKÖĞRETİM PROGRAMINA İLİŞKİN BİLGİLER</b> <br> FAKÜLTE/YÜKSEKOKUL/MYO. ADI: <b><i>' + this.state.B_fakulte + '</i></b>'
                + '<br> BÖLÜM / PROGRAM ADI: <b><i>' + this.state.B_bolum + '</i></b> <br> ÖĞRETİM TÜRÜ: <b><i>' + this.state.ogretim + '</i></b>'
                + '<br> BAŞVURULAN PROGRAMIN HALEN KAYITLI OLUNAN PROGRAMA YERLEŞTİRME YAPILDIĞI'
                + '<br> PUANI: <b><i>' + this.state.B_uniPuan + '</i></b> '
                + '<br><br> Beyan ettiğim bilgilerin veya belgelerin gerçeğe aykırı olması veya daha önce yatay geçiş yapmış olmam'
                + 'halinde hakkımda cezai işlemlerin yürütüleceğini ve kaydım yapılmış olsa dahi silineceğini bildiğimi kabul ediyorum.'
                + '<br><br><br> Tarih: <b><i>....</i></b>/<b><i>....</i></b>/<b><i>....</i></b>' + '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;' + 'Adayın Adı Soyadı: <b><i>' + this.state.ad_soyad + '</i></b> </br>'
                + '<br> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;İmzası&nbsp;:</br>',
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
                            <FormControl.Label fontSize='20px'> BAŞVURU TÜRÜ </FormControl.Label>
                            <Select
                                minWidth="200"
                                onValueChange={val => this.setState({ basvuru_tur: val })}
                                placeholder="Başvuru Türü Seçiniz"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}
                                mt={2}>
                                <Select.Item label="KURUMİÇİ YATAY GEÇİŞ BAŞVURUSU" value="KURUMİÇİ YATAY GEÇİŞ BAŞVURUSU" />
                                <Select.Item label="KURUMLARARASI YATAY GEÇİŞ BAŞVURUS" value="KURUMLARARASI YATAY GEÇİŞ BAŞVURUS" />
                                <Select.Item label="MER. YER. PUANIYLA YATAY GEÇİŞ BAŞVURUSU" value="MER. YER. PUANIYLA YATAY GEÇİŞ BAŞVURUSU" />
                                <Select.Item label="YURT DIŞI YATAY GEÇİŞ BAŞVURUSU" value="YURT DIŞI YATAY GEÇİŞ BAŞVURUSU" />
                            </Select>
                        </FormControl>
                        <Text fontSize='16px' fontWeight='bold' textAlign='center'>KİŞİSEL BİLGİLER</Text>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Ad Soyad </FormControl.Label>
                            <Input isDisabled="true" value={this.state.ad_soyad} onChangeText={val => this.setState({ ad_soyad: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>T.C. Kimlik No</FormControl.Label>
                            <Input isDisabled="true" value={this.state.tc_no} onChangeText={val => this.setState({ tc_no: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Telefon Numarası </FormControl.Label>
                            <Input value={this.state.tel_no} onChangeText={val => this.setState({ tel_no: val })} keyboardType="phone-pad" px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>E-Posta </FormControl.Label>
                            <Input value={this.state.eposta} onChangeText={val => this.setState({ eposta: val })} px="4" w="100%" h="50px" />
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

                        <Text fontSize='16px' fontWeight='bold' textAlign='center'>ÖĞRENİMİNE İLİŞKİN BELGELER</Text>

                        <FormControl mt="3" px="4" >
                            <FormControl.Label fontSize='20px'>Öğrenim Türü </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="Öğrenim Türü seçiniz"
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

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Öğrenci Numarası(Kocaeli Üniversitesi Öğrencileri İçin) </FormControl.Label>
                            <Input isDisabled="true" value={this.state.ogrNo} onChangeText={val => this.setState({ ogrNo: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Halen Kayıtlı Olduğu Üniversite </FormControl.Label>
                            <Input value={this.state.uni} onChangeText={val => this.setState({ uni: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Halen Kayıtlı Olduğu Fakülte </FormControl.Label>
                            <Input value={this.state.fakulte} onChangeText={val => this.setState({ fakulte: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Halen Kayıtlı Olduğu Bölüm/Program </FormControl.Label>
                            <Input value={this.state.bolum} onChangeText={val => this.setState({ bolum: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Sınıf/Yarıyıl </FormControl.Label>
                            <Input value={this.state.sınıf} onChangeText={val => this.setState({ sınıf: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Genel Not Ortalaması</FormControl.Label>
                            <Input value={this.state.not_ort} onChangeText={val => this.setState({ not_ort: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Halen Kayıtlı Olduğu Yükseköğretim Kurumuna Yerleştirildiği Yıl</FormControl.Label>
                            <Input value={this.state.uniYerlesmeYili} onChangeText={val => this.setState({ uniYerlesmeYili: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'>Üniversiteye Giriş Puanı </FormControl.Label>
                            <Input value={this.state.uniPuan} onChangeText={val => this.setState({ uniPuan: val })} px="4" w="100%" h="50px" />
                        </FormControl>

                        <Text fontSize='16px' fontWeight='bold' textAlign='center'> ADAYIN BAŞVURDUĞU YÜKSEKÖĞRETİM PROGRAMINA İLİŞKİN BİLGİLER</Text>

                        <FormControl mt="3" px="4">
                            <FormControl.Label fontSize='20px'> Fakülte Adı </FormControl.Label>
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
                        <FormControl mt="3" px="4">
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
                            <FormControl.Label fontSize='20px'>Öğrenim Türü </FormControl.Label>
                            <Select
                                minWidth="200"
                                placeholder="Öğrenim Türü seçiniz"
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
                        <Box px="4">
                            <Button bg="green.600" mt="3" mb="3" onPress={() => { this.printPDF(); this.setState({ showModal: true }); }}>PDF Oluştur</Button>
                            <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: true })} size="lg" animationType="fade">
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
                                                    onPress={() => { this.props.navigation.navigate('Yatay Geçiş Belge Yükleme', { ogrNo: this.state.ogrNo, ad_soyad: this.state.ad_soyad }); this.setState({ showModal: false }) }} >TAMAM</Button>
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

export default YatayGecis;