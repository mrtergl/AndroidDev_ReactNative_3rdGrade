import React, { Component } from 'react';
import { NativeBaseProvider, Button, FormControl, Input, Box, Link, Stack, Text, Modal, ScrollView, Divider } from 'native-base';
import { Avatar } from 'native-base';
import { View, StyleSheet, Alert } from 'react-native';
import { db } from './setup';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            kullanici: this.setState(null),
            sifre: this.setState(null),
            showAdminModal: false,
            admin: this.setState(null),
            adminSifre: this.setState(null)
        };
        this.girisYap = this.girisYap.bind(this);
        this.adminGiris = this.adminGiris.bind(this);
    }
    adminGiris() {
        let admin = {}
        db.ref('adminler')
            .orderByChild("adminNo")
            .equalTo(this.state.admin)
            .on("child_added", querySnapShot => {
                let data = querySnapShot.val() ? querySnapShot.val() : {};
                console.log(data)
                admin = { ...data }
                if (this.state.adminSifre == admin.sifre) {
                    this.props.navigation.navigate('Admin')
                }
                else {
                    Alert.alert("Şifrenizi Yanlış Girdiniz", "Lütfen yeniden giriş yapmayı deneyiniz", [{ text: "TAMAM" }])
                }
            });
    }
    girisYap() {

        let ogrenci = {}
        db.ref('ogrenciler')
            .orderByChild("ogr_no")
            .equalTo(this.state.kullanici)
            .on("child_added", querySnapShot => {
                let data = querySnapShot.val() ? querySnapShot.val() : {};
                console.log(data)
                ogrenci = { ...data }
                if (this.state.sifre == ogrenci.sifre) {
                    this.props.navigation.navigate('Ana Sayfa', { ogr_no: this.state.kullanici })
                    this.setState({ kullanici: "" })
                    this.setState({ sifre: "" })
                }
                else {
                    Alert.alert("Şifrenizi Yanlış Girdiniz", "Lütfen yeniden giriş yapmayı deneyiniz", [{ text: "TAMAM" }])
                }
            });
    }

    render() {
        return (
            <NativeBaseProvider>
                <View style={styles.container}>
                    <ScrollView _contentContainerStyle={{
                        px: "15px",
                        mb: "4",
                    }}>
                        <Box>
                            <Avatar mt="5"
                                size="2xl"
                                bg="purple.600"
                                alignSelf="center"
                                source={require("./img/logo.png")}>
                            </Avatar>
                        </Box>
                        <Text mt="6" fontSize="3xl" textAlign='center' fontWeight="bold" color="green.800">
                            KOCAELİ ÜNİVERSİTESİ BAŞVURU KAYIT SİSTEMİ
                        </Text>
                        <Box mt="8" px="2">
                            <FormControl mb="3">
                                <Input value={this.state.kullanici} size="lg" placeholder="Öğrenci Numarası" variant="rounded" color="#171717"
                                    onChangeText={val => this.setState({ kullanici: val })} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>
                                </FormControl.Label>
                                <Input value={this.state.sifre} size="lg" placeholder="Şifre" variant="rounded" type="password" color="#171717"
                                    onChangeText={val => this.setState({ sifre: val })} />
                                <Link
                                    _text={{
                                        fontSize: 'sm',
                                        fontWeight: 'bold',
                                        color: '#14532d',
                                    }}
                                    alignSelf="flex-end"
                                    mt="3"
                                    onPress={() => this.setState({ showModal: true })}>
                                    Şifremi Unuttum
                                </Link>
                                <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })} size="lg">
                                    <Modal.Content maxWidth="350">
                                        <Modal.CloseButton />
                                        <Modal.Header _text={{ fontSize: "lg" }}>Şifremi Unuttum</Modal.Header>
                                        <Modal.Body>
                                            <Stack space={2} px="2">
                                                <FormControl>
                                                    <Input size="lg" placeholder="E-Posta Adresi" variant="underlined" color="#171717" name='email' />
                                                    <Button mx="6" rounded="xl" bg="#15803d" _text={{ fontSize: "xl" }} onPress={() => this.setState({ showModal: false }, sendMail())} >GÖNDER</Button>
                                                </FormControl>
                                            </Stack>
                                        </Modal.Body>
                                    </Modal.Content>
                                </Modal>
                            </FormControl>
                        </Box>
                        <Box>
                            <Button
                                mt="17"
                                mx="10"
                                bg="green.600"
                                w="200"
                                h="60"
                                rounded="xl"
                                alignSelf="center"
                                _text={{ color: '#fff', fontWeight: 'bold', fontSize: "xl" }}
                                onPress={this.girisYap}>
                                {''}
                                Giriş Yap {''}
                            </Button>
                        </Box>
                        <Button
                            mt="5"
                            alignSelf="center"
                            variant="unstyled"
                            _text={{ color: '#107d12', fontSize: 'lg' }}
                            onPress={() => this.props.navigation.navigate('Kayıt Ol')}>
                            Üye Ol
                        </Button>
                        <Button variant="link" _text={{ color: '#107d12', fontSize: 'lg' }} onPress={() => this.setState({ showAdminModal: true })}>Admin Girişi </Button>
                        <Modal isOpen={this.state.showAdminModal} onClose={() => this.setState({ showAdminModal: false })} size="lg">
                            <Modal.Content maxWidth="350">
                                <Modal.CloseButton />
                                <Modal.Header _text={{ fontSize: "lg" }}>ADMİN GİRİŞ</Modal.Header>
                                <Modal.Body>
                                    <Stack space={2} px="2">
                                        <FormControl>
                                            <Input size="lg" placeholder="Admin Numarası" variant="underlined" color="#171717" value={this.state.admin} onChangeText={val => this.setState({ admin: val })} />
                                            <Input size="lg" placeholder="Şifre" variant="underlined" color="#171717" type="password" value={this.state.adminSifre} onChangeText={val => this.setState({ adminSifre: val })} />
                                            <Button mt="3" mx="6" rounded="xl" bg="#15803d" _text={{ fontSize: "xl" }} onPress={this.adminGiris} >GİRİŞ YAP</Button>
                                        </FormControl>
                                    </Stack>
                                </Modal.Body>
                            </Modal.Content>
                        </Modal>
                    </ScrollView>
                </View>
            </NativeBaseProvider >
        );
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
    }
})

export default Home;