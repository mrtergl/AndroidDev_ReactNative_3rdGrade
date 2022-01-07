import React, { Component } from 'react';
import { NativeBaseProvider, Button, Box, Stack, Text, Divider, Modal } from 'native-base';
import { Avatar } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from './setup';

class Ogrenci extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            ogrenciData: " ",
            ogrenci: this.props.route.params.ogr_no
        }
    }
    componentDidMount() {
        db.ref('ogrenciler/' + this.state.ogrenci).on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let todoItems = { ...data };
            this.setState({
                ogrenciData: todoItems,
            });
        });

    }
    render() {
        return (
            < NativeBaseProvider >
                <Stack bg="#fff">
                    <Box>
                        <Avatar mt="3"
                            size="2xl"
                            bg="purple.600"
                            alignSelf="center"
                            source={require("./img/logo.png")}>
                        </Avatar>
                    </Box>
                    <Stack
                        mt="5"
                        borderRadius="md"
                        rounded="2xl"
                        overflow="hidden"
                        px="1"
                        shadow={7}
                        mx="5"
                        h="200"
                        alignItems="center"
                        backgroundColor="emerald.100">
                        <Box mt="5" alignItems="center">
                            <Box>
                                <Text fontSize="lg">{this.state.ogrenciData.tc_no}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="lg">{this.state.ogrenciData.ad_soyad}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="lg" >{this.state.ogrenciData.ogr_no}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="lg" >{this.state.ogrenciData.fakulte}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="lg" >{this.state.ogrenciData.bolum}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="lg" > {this.state.ogrenciData.sinif}</Text>
                            </Box>
                        </Box>
                    </Stack>
                    <Divider />
                    <Stack mt="8" px="1">
                        <Box px="2">
                            <Icon.Button name="plus-circle-outline" backgroundColor="#22c55e" size={30} onPress={() => this.setState({ showModal: true })}><Text style={{ fontSize: 20, color: "white" }}> YENİ BAŞVURU YAP </Text></Icon.Button>
                        </Box>
                        <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })} size="xl" >
                            <Modal.Content maxWidth="450">
                                <Modal.CloseButton />
                                <Modal.Header _text={{ fontSize: "lg" }}>Başvurular</Modal.Header>
                                <Modal.Body>
                                    <Stack space={2} px="2">
                                        <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => { this.props.navigation.navigate('Yaz Okulu Basvurusu', { ogr_no: this.state.ogrenciData.ogr_no, ad_soyad: this.state.ogrenciData.ad_soyad }); this.setState({ showModal: false }) }} >Yaz Okulu Başvurusu</Button>
                                        <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => { this.props.navigation.navigate('Yatay Geciş Basvurusu', { ogr_no: this.state.ogrenciData.ogr_no, ad_soyad: this.state.ogrenciData.ad_soyad, tcno: this.state.ogrenciData.tc_no }); this.setState({ showModal: false }) }} >Yatay Geçiş Başvurusu</Button>
                                        <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => { this.props.navigation.navigate('ÇAP Başvurusu', { ogr_no: this.state.ogrenciData.ogr_no, ad_soyad: this.state.ogrenciData.ad_soyad }); this.setState({ showModal: false }) }}>ÇAP Başvurusu</Button>
                                        <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => { this.props.navigation.navigate('Ders İntibak Başvurusu', { ogr_no: this.state.ogrenciData.ogr_no, ad_soyad: this.state.ogrenciData.ad_soyad }); this.setState({ showModal: false }) }}>Ders İntibakı Başvurusu</Button>
                                        <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => { this.props.navigation.navigate('DGS Başvurusu', { ogr_no: this.state.ogrenciData.ogr_no, ad_soyad: this.state.ogrenciData.ad_soyad }); this.setState({ showModal: false }) }}>DGS Başvurusu</Button>
                                    </Stack>
                                </Modal.Body>
                            </Modal.Content>
                        </Modal>
                        <Box mt="3" px="2">
                            <Icon.Button name="file-document" _text={{ fontSize: 25 }} size={30} backgroundColor="#16a34a" onPress={() => this.props.navigation.navigate('Başvurularım')}><Text style={{ fontSize: 20, color: "white" }}> BAŞVURULARIM </Text></Icon.Button>
                        </Box>
                        <Box mt="3" px="2">
                            <Icon.Button name="account-edit" size={30} color="white" backgroundColor="#15803d" onPress={() => this.props.navigation.navigate('Bilgi Düzenleme', { ogr_no: this.state.ogrenciData.ogr_no, adres: this.state.ogrenciData.adres, telno: this.state.ogrenciData.tel_no, eposta: this.state.ogrenciData.eposta })} ><Text style={{ fontSize: 20, color: "white" }}> BİLGİLERİMİ DÜZENLE </Text>
                            </Icon.Button>
                        </Box>
                        <Box mt="3" px="2">
                            <Icon.Button name="close" size={30} color="white" backgroundColor="#166534" onPress={() => this.props.navigation.goBack()}><Text style={{ fontSize: 20, color: "white" }}> ÇIKIŞ</Text>
                            </Icon.Button>
                        </Box>
                    </Stack>
                </Stack>
            </NativeBaseProvider >
        );
    }
}
export default Ogrenci;
