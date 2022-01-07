import React, { Component, useState } from "react"
import {
    NativeBaseProvider, FormControl, Button, TextArea, Box, Input,
    ScrollView, Stack, Avatar, Modal
} from "native-base"
import { StyleSheet, View } from 'react-native';
import { db } from './setup';
class OgrenciBilgiDuzenle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            tel_no: this.props.route.params.telno,
            eposta: this.props.route.params.eposta,
            adres: this.props.route.params.adres,
            ogrenci: this.props.route.params.ogr_no,
            sifre: this.setState(null)
        };
        this.telNoGuncelle = this.telNoGuncelle.bind(this);
        this.epostaGuncelle = this.epostaGuncelle.bind(this);
        this.adresGuncelle = this.adresGuncelle.bind(this);
        this.sifreGuncelle = this.sifreGuncelle.bind(this);
    }
    telNoGuncelle() {
        db.ref('ogrenciler/' + this.state.ogrenci)
            .update({ tel_no: this.state.tel_no })
        this.setState({ showModal: true })
    }
    epostaGuncelle() {
        db.ref('ogrenciler/' + this.state.ogrenci)
            .update({ eposta: this.state.eposta })
        this.setState({ showModal: true })
    }
    adresGuncelle() {
        db.ref('ogrenciler/' + this.state.ogrenci)
            .update({ adres: this.state.adres })
        this.setState({ showModal: true })
    }
    sifreGuncelle() {
        db.ref('ogrenciler/' + this.state.ogrenci)
            .update({ sifre: this.state.sifre })
        this.setState({ showModal: true })
    }
    render() {
        return (
            <NativeBaseProvider>
                <View style={styles.container}>
                    <ScrollView _contentContainerStyle={{
                        px: "15px",
                        mb: "4",
                    }}>
                        <FormControl mt="8" >
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>Telefon Numarası </FormControl.Label>
                            <Input value={this.state.tel_no} onChangeText={val => this.setState({ tel_no: val })}
                                keyboardType="numeric" mx="5" />
                            <Button bg="green.600" mt="3" mb="3" mx="5" onPress={this.telNoGuncelle}>GÜNCELLE</Button>
                        </FormControl>

                        <FormControl mt="3" >
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>E-posta </FormControl.Label>
                            <Input value={this.state.eposta} onChangeText={val => this.setState({ eposta: val })} mx="5" />
                            <Button bg="green.600" mt="3" mb="3" mx="5" onPress={this.epostaGuncelle}>GÜNCELLE</Button>
                        </FormControl>

                        <FormControl mt="3" >
                            <FormControl.Label fontSize='20px'>Adres </FormControl.Label>
                            <TextArea value={this.state.adres} onChangeText={val => this.setState({ adres: val })} mx="5" />
                            <Button bg="green.600" mt="3" mb="3" mx="5" onPress={this.adresGuncelle}>GÜNCELLE</Button>
                        </FormControl>

                        <FormControl mt="3" >
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 500 }}>Şifre </FormControl.Label>
                            <Input type="password" value={this.state.sifre} onChangeText={val => this.setState({ sifre: val })} mx="5" />
                            <Button bg="green.600" mt="3" mb="3" mx="5" onPress={this.sifreGuncelle}>GÜNCELLE</Button>
                        </FormControl>
                        <Box>
                            <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })} size="lg">
                                <Modal.Content maxWidth="260">
                                    <Modal.Header _text={{ fontSize: "2xl", textAlign: "center", fontWeight: "bold" }}>Bilgileriniz Güncellendi</Modal.Header>
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
                        </Box>
                    </ScrollView>
                </View >
            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
    }
})


export default OgrenciBilgiDuzenle;