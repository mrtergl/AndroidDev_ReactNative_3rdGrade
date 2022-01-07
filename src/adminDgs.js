import * as React from 'react';
import { useState } from 'react';
import { Animated, Dimensions, Pressable, View, Alert } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, Stack, Center, Text, Button, Modal } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const alertModal = () => {
    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
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
                            <Button mx="6" rounded="xl" variant="unstyled" _text={{ fontSize: "md", color: "#171717", fontWeight: "bold" }} onPress={() => props.navigation.goBack()} >TAMAM</Button>
                        </FormControl>
                    </Stack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}
const basvuruOnayla = () =>
    Alert.alert(
        "Emin Misiniz?",
        "Geçerli öğrencinin başvurusu onaylanacak. Devam etmek istiyor musunuz?",
        [
            {
                text: "EVET",
                onPress: () => console.log("Cancel Pressed"),
            },
            { text: "HAYIR", onPress: () => console.log("OK Pressed") }
        ]
    );

const basvuruReddet = () =>
    Alert.alert(
        "Emin Misiniz?",
        "Geçerli öğrencinin başvurusu rededilecek. Devam etmek istiyor musunuz?",
        [
            {
                text: "EVET",
                onPress: () => console.log("Cancel Pressed"),
            },
            { text: "HAYIR", onPress: () => console.log("OK Pressed") }
        ]
    );

const FirstRoute = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <View flex={1} backgroundColor="#fff" >
            <Stack
                mt="2"
                borderRadius="md"
                rounded="2xl"
                shadow={7}
                mx="3"
                h="120"
                alignItems="flex-start"
                backgroundColor="emerald.100">
                <Box mt="3" ml="1.5">
                    <Icon name="file-account-outline" size={27} color="green">
                        <Box>
                            <Text style={{ fontSize: 17, fontWeight: "600" }}> Öğrenci No          :
                                <Text style={{ fontSize: 17, fontWeight: "400" }}> 12345678 </Text></Text>
                        </Box>
                    </Icon>
                </Box>
                <Box mt="1" ml="1.5">
                    <Icon name="calendar-month-outline" size={27} color="green">
                        <Box>
                            <Text style={{ fontSize: 17, fontWeight: "600" }}> Başvuru Tarihi     :
                                <Text style={{ fontSize: 17, fontWeight: "400" }}> 13.10.2021 </Text>
                            </Text>
                        </Box>
                    </Icon>
                </Box>
                <Box mt="1" mx="5">
                    <Button variant="link"
                        _text={{ fontSize: 17, color: 'success.900', fontWeight: 'extrabold' }}
                        endIcon={<Icon name="folder-information" size={25} color="darkgreen" />}
                        onPress={() => setShowModal(true)}
                    >
                        Başvuru Detaylarını Görüntüle </Button>
                </Box>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
                    <Modal.Content height="400">
                        <Modal.CloseButton />
                        <Modal.Header _text={{ fontSize: "lg", textAlign: "center" }}>Başvuru Bilgileri</Modal.Header>
                        <Modal.Body>
                            <Stack space={2} px="2">
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Öğrenci No            :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Ad-Soyad               :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Fakülte                   :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "justify" }}>Bölüm                     :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "justify" }}>Sınıf                         :
                                        <Text style={{ fontSize: 15 }}> 1</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Tarihi        :
                                        <Text style={{ fontSize: 15 }}> 111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4" >
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Adı            :
                                        <Text style={{ fontSize: 15 }}> 111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4" >
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Belgeleri  :
                                        <Text style={{ fontSize: 15 }}> 111111</Text>
                                    </Text>
                                </Box>
                            </Stack>
                        </Modal.Body>
                        <Modal.Footer>
                            <Box>
                                <Button.Group>
                                    <Button colorScheme="green" onPress={basvuruOnayla}>Onayla</Button>
                                    <Button colorScheme="danger" onPress={basvuruReddet}> Reddet </Button>
                                </Button.Group>
                            </Box>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Stack>
        </View >
    )
}
const SecondRoute = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <View flex={1} backgroundColor="#fff" >
            <Stack
                mt="2"
                borderRadius="md"
                rounded="2xl"
                shadow={7}
                mx="3"
                h="120"
                alignItems="flex-start"
                backgroundColor="emerald.100">
                <Box mt="3" ml="1.5">
                    <Icon name="file-account-outline" size={27} color="green">
                        <Box>
                            <Text style={{ fontSize: 17, fontWeight: "600" }}> Öğrenci No          :
                                <Text style={{ fontSize: 17, fontWeight: "400" }}> 12345678 </Text></Text>
                        </Box>
                    </Icon>
                </Box>
                <Box mt="1" ml="1.5">
                    <Icon name="calendar-month-outline" size={27} color="green">
                        <Box>
                            <Text style={{ fontSize: 17, fontWeight: "600" }}> Başvuru Tarihi     :
                                <Text style={{ fontSize: 17, fontWeight: "400" }}> 13.10.2021 </Text>
                            </Text>
                        </Box>
                    </Icon>
                </Box>
                <Box mt="1" mx="5">
                    <Button variant="link"
                        _text={{ fontSize: 17, color: 'success.900', fontWeight: 'extrabold' }}
                        endIcon={<Icon name="folder-information" size={25} color="darkgreen" />}
                        onPress={() => setShowModal(true)}
                    >
                        Başvuru Detaylarını Görüntüle </Button>
                </Box>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
                    <Modal.Content height="300">
                        <Modal.CloseButton />
                        <Modal.Header _text={{ fontSize: "lg", textAlign: "center" }}>Başvuru Bilgileri</Modal.Header>
                        <Modal.Body>
                            <Stack space={2} px="2">
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Öğrenci No            :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Ad-Soyad               :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Fakülte                   :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "justify" }}>Bölüm                     :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "justify" }}>Sınıf                         :
                                        <Text style={{ fontSize: 15 }}> 1</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Tarihi        :
                                        <Text style={{ fontSize: 15 }}> 111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4" >
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Adı            :
                                        <Text style={{ fontSize: 15 }}> 111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4" >
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Belgeleri  :
                                        <Text style={{ fontSize: 15 }}> 111111</Text>
                                    </Text>
                                </Box>
                            </Stack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Stack>
        </View >
    )
}
const ThirdRoute = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <View flex={1} backgroundColor="#fff" >
            <Stack
                mt="2"
                borderRadius="md"
                rounded="2xl"
                shadow={7}
                mx="3"
                h="120"
                alignItems="flex-start"
                backgroundColor="emerald.100">
                <Box mt="3" ml="1.5">
                    <Icon name="file-account-outline" size={27} color="green">
                        <Box>
                            <Text style={{ fontSize: 17, fontWeight: "600" }}> Öğrenci No          :
                                <Text style={{ fontSize: 17, fontWeight: "400" }}> 12345678 </Text></Text>
                        </Box>
                    </Icon>
                </Box>
                <Box mt="1" ml="1.5">
                    <Icon name="calendar-month-outline" size={27} color="green">
                        <Box>
                            <Text style={{ fontSize: 17, fontWeight: "600" }}> Başvuru Tarihi     :
                                <Text style={{ fontSize: 17, fontWeight: "400" }}> 13.10.2021 </Text>
                            </Text>
                        </Box>
                    </Icon>
                </Box>
                <Box mt="1" mx="5">
                    <Button variant="link"
                        _text={{ fontSize: 17, color: 'success.900', fontWeight: 'extrabold' }}
                        endIcon={<Icon name="folder-information" size={25} color="darkgreen" />}
                        onPress={() => setShowModal(true)}
                    >
                        Başvuru Detaylarını Görüntüle </Button>
                </Box>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
                    <Modal.Content height="300">
                        <Modal.CloseButton />
                        <Modal.Header _text={{ fontSize: "lg", textAlign: "center" }}>Başvuru Bilgileri</Modal.Header>
                        <Modal.Body>
                            <Stack space={2} px="2">
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Öğrenci No            :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Ad-Soyad               :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Fakülte                   :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "justify" }}>Bölüm                     :
                                        <Text style={{ fontSize: 15 }}> 1111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "justify" }}>Sınıf                         :
                                        <Text style={{ fontSize: 15 }}> 1</Text>
                                    </Text>
                                </Box>
                                <Box mx="4">
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Tarihi        :
                                        <Text style={{ fontSize: 15 }}> 111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4" >
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Adı            :
                                        <Text style={{ fontSize: 15 }}> 111111</Text>
                                    </Text>
                                </Box>
                                <Box mx="4" >
                                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Belgeleri  :
                                        <Text style={{ fontSize: 15 }}> 111111</Text>
                                    </Text>
                                </Box>
                            </Stack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Stack>
        </View >
    )
}
const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});

export default function AdminDGS() {
    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Gelen Başvurular' },
        { key: 'second', title: 'Kabul Edilen Başvurular' },
        { key: 'third', title: 'Reddedilen Başvurular' },
    ]);

    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <Box flexDirection="row" bg="#fff">
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });
                    const color = index === i ? '#1f2937' : '#a1a1aa';
                    const borderColor = index === i ? 'success.500' : 'coolGray.200';

                    return (
                        <Box
                            borderBottomWidth="5"
                            borderColor={borderColor}
                            flex={1}
                            alignItems="center"
                            p="1.5"
                            cursor="pointer">
                            <Pressable
                                onPress={() => {
                                    console.log(i);
                                    setIndex(i);
                                }}>
                                <Animated.Text style={{ color, fontWeight: "bold", fontSize: 17, textAlign: "center" }}>{route.title}</Animated.Text>
                            </Pressable>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    return (
        <NativeBaseProvider>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
        </NativeBaseProvider>
    );
}