import React, { Component } from "react"
import {
    NativeBaseProvider, FormControl, Button, TextArea, Input, Box,
    ScrollView, Select, CheckIcon, Stack, HStack, Center, Modal, Avatar, WarningOutlineIcon
} from "native-base"
import { Alert } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from './setup';
import {Upload} from "./imageUpload";

class OgrenciKayıt extends Component {
    constructor() {
        super();
        this.state = {
            ogr_no: this.setState(null),
            showModal: false,
            ad_soyad: this.setState(null),
            tc_no: this.setState(null),
            tel_no: this.setState(null),
            eposta: this.setState(null),
            adres: this.setState(null),
            universite: this.setState(null),
            bolum: this.setState(null),
            dogumT: this.setState(null),
            sifre: this.setState(null),
            sinif: this.setState(null),
            fakulteler: [],
            bolumler: [],
            showCalender: false,
            tarih: new Date(),
        }
        this.addStudent = this.addStudent.bind(this);
        this.onChange = this.onChange.bind(this);
        this.infoControl = this.infoControl.bind(this);
    }
    componentDidMount() {
        this.getdataF();
        this.getdataB();
    }
    infoControl() {
        let karakter = /[A-z]/;
        let ozelKarakter = /[^A-Za-z0-9_]/;
        let numara = /[0-9]/;
        console.log(this.state.sifre.search(ozelKarakter))
        if (this.state.sifre.search(karakter) != -1 && this.state.sifre.search(ozelKarakter) == -1 && this.state.sifre.search(numara) != -1 && this.state.sifre.length > 7) {
            if (this.state.eposta != null) {
                if ((this.state.eposta.includes('@hotmail.com') || this.state.eposta.includes('@gmail.com') || this.state.eposta.includes('@kocaeli.edu.tr')) != -1) {
                    if (this.state.tc_no.length != 11) {
                        Alert.alert("Geçersiz kimlik numarası ", "Lütfen TC kimlik numaranızı kontrol ediniz", [{ text: "TAMAM" }])
                    }
                    else {
                        this.addStudent();
                    }

                }
                else {
                    Alert.alert("Geçersiz Eposta Adresi", "Lütfen eposta adresinizi kontrol ediniz", [{ text: "TAMAM" }])
                }
            }
            else {
                if (this.state.tc_no.length != 11) {
                    Alert.alert("Geçersiz kimlik numarası ", "Lütfen TC kimlik numaranızı kontrol ediniz", [{ text: "TAMAM" }])
                }
                else {
                    this.addStudent();
                }
            }
        }
        else {
            Alert.alert("Lütfen şifrenizi kontrol edin", "En az 8 karakter olmalı, özel karakter içermemeli ve bir harf içermeli", [{ text: "TAMAM" }])
        }
    }
    addStudent() {
        db.ref('ogrenciler').child(this.state.ogr_no)
            .set({
                ogr_no: this.state.ogr_no,
                ad_soyad: this.state.ad_soyad,
                tc_no: this.state.tc_no,
                tel_no: this.state.tel_no,
                eposta: this.state.eposta,
                adres: this.state.adres,
                sifre: this.state.sifre,
                dogumT: this.state.dogumT,
                universite: this.state.universite,
                bolum: this.state.bolum,
                sinif: this.state.sinif,
                fakulte: this.state.fakulte
            })
            .then(
                this.setState({ ogr_no: "" }),
                this.setState({ ad_soyad: "" }),
                this.setState({ tc_no: "" }),
                this.setState({ tel_no: "" }),
                this.setState({ eposta: "" }),
                this.setState({ adres: "" }),
                this.setState({ sifre: "" }),
                this.setState({ dogumT: "" }),
                this.setState({ universite: "" }),
                this.setState({ bolum: "" }),
                this.setState({ sinif: "" }),
                this.setState({ fakulte: "" })
            )
        this.setState({ showModal: true })
    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({ tarih: currentDate });
        this.setState({ showCalender: false })
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
    render() {

        return (
            <NativeBaseProvider>
                <Stack bg="#fff">
                    <ScrollView _contentContainerStyle={{
                        px: "15px",
                        mb: "4",
                    }}>
                        <FormControl mt="3" isRequired="true">
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>Öğrenci Numarası</FormControl.Label>
                            <Input keyboardType="numeric" value={this.state.ogr_no} mx="5" onChangeText={val => this.setState({ ogr_no: val })} />
                            {console.log("ogrenci NO", this.state.ogr_no)}
                        </FormControl>
                        <FormControl mt="3" isRequired="true">
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>Ad-Soyad</FormControl.Label>
                            <Input value={this.state.ad_soyad} mx="5" onChangeText={val => this.setState({ ad_soyad: val })} />
                        </FormControl>
                        {console.log("ad_soyad", this.state.ad_soyad)}
                        <FormControl mt="3" isRequired="true">
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>TC Kimlik Numarası </FormControl.Label>
                            <Input value={this.state.tc_no} onChangeText={val => this.setState({ tc_no: val })} mx="5" maxLength={11} />
                        </FormControl>
                        <FormControl mt="3" >
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>Telefon Numarası </FormControl.Label>
                            <Input keyboardType="phone-pad" value={this.state.tel_no} onChangeText={val => this.setState({ tel_no: val })} mx="5" />
                        </FormControl>
                        <FormControl mt="3" >
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>E-posta </FormControl.Label>
                            <Input value={this.state.eposta} onChangeText={val => this.setState({ eposta: val })} mx="5" />
                        </FormControl>

                        <FormControl mt="3" >
                            <FormControl.Label fontSize='20px'>Adres </FormControl.Label>
                            <TextArea value={this.state.adres} onChangeText={val => this.setState({ adres: val })} mx="5" />
                        </FormControl>

                        <FormControl mt="3" >
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>Doğum Tarihi</FormControl.Label>
                            <Stack mx="5" space={2}>
                                <HStack space={1}>
                                    <Input w="75%" onChangeText={val => this.setState({ dogumT: val })} >{this.state.tarih.getDate() + '/' + this.state.tarih.getMonth() + '/' + this.state.tarih.getFullYear()}</Input>
                                    <Button onPress={() => this.setState({ showCalender: true })}>Tarih Seç</Button>
                                    <Modal isOpen={this.state.showCalender}>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={this.state.tarih}
                                            display="default"
                                            locale="tr-TR"
                                            mode="date"
                                            onChange={this.onChange}
                                        />
                                    </Modal>

                                </HStack>
                            </Stack>
                        </FormControl>
                        <FormControl mt="3" >
                            <FormControl.Label fontSize='20px'> Üniversite </FormControl.Label>
                            <Select
                                selectedValue={this.state.universite}
                                minWidth="200"
                                placeholder="Üniversite Seçiniz"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}
                                onValueChange={val => this.setState({ universite: val })}>
                                <Select.Item label="Kocaeli Üniversitesi" value="Kocaeli Üniversitesi" />
                            </Select>
                            {console.log(this.state.universite)}
                        </FormControl>
                        <FormControl mt="3" >
                            <FormControl.Label fontSize='20px'> Fakülte </FormControl.Label>
                            <Select
                                selectedValue={this.state.fakulte}
                                minWidth="200"
                                placeholder="Fakülte Seçiniz"
                                onValueChange={val => this.setState({ fakulte: val })}
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}>
                                {this.state.fakulteler.map((item) => {
                                    return (<Select.Item label={item} value={item} />)
                                })}
                                <Select.Item />
                            </Select>
                        </FormControl>
                        <FormControl mt="3" >
                            <FormControl.Label fontSize='20px'> Bölüm </FormControl.Label>
                            <Select
                                selectedValue={this.state.bolum}
                                onValueChange={val => this.setState({ bolum: val })}
                                minWidth="200"
                                placeholder="Bölüm Seçiniz"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}>
                                {this.state.bolumler.map((item) => {
                                    return (<Select.Item label={item} value={item} />)
                                })}
                                <Select.Item />
                            </Select>
                        </FormControl>
                        <FormControl mt="3" >
                            <FormControl.Label fontSize='20px'> Sınıf </FormControl.Label>
                            <Select
                                selectedValue={this.state.sinif}
                                onValueChange={val => this.setState({ sinif: val })}
                                minWidth="200"
                                placeholder="Sınıf Seçiniz"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="3" />,
                                }}>
                                <Select.Item label="1.sınıf" value="1.sınıf" />
                                <Select.Item label="2.sınıf" value="2.sınıf" />
                                <Select.Item label="3.sınıf" value="3.sınıf" />
                                <Select.Item label="4.sınıf" value="4.sınıf" />
                            </Select>
                        </FormControl>
                        <FormControl mt="3" isRequired>
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }} >Şifre  </FormControl.Label>
                            <Input type="password" value={this.state.sifre} onChangeText={val => this.setState({ sifre: val })} mx="5" />
                        </FormControl>
                        <FormControl mt="3" >
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>Fotoğraf</FormControl.Label>
                            <Button onPress={() => Upload()}>Fotoğraf Seç</Button>
                        </FormControl>
                        <Button bg="green.600" mt="3" mb="2" onPress={this.infoControl} isDisabled={(this.state.ogr_no && this.state.sifre && this.state.tc_no && this.state.ad_soyad) == null}>KAYDET</Button>
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
                                            <Button mx="6" rounded="xl" variant="unstyled" _text={{ fontSize: "md", color: "#171717", fontWeight: "bold" }} onPress={() => this.props.navigation.goBack()} >TAMAM</Button>
                                        </FormControl>
                                    </Stack>
                                </Modal.Body>
                            </Modal.Content>
                        </Modal>
                    </ScrollView>
                </Stack >
            </NativeBaseProvider >
        )
    }
}

export default OgrenciKayıt;