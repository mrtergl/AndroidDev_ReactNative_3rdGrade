import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet } from "react-native";
import { NativeBaseProvider, Button, Stack, Box, Input } from "native-base";
const Admin = (props) => {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Box mx="2">
                    <Input
                        variant="filled"
                        placeholder="Başvuru Ara"
                        bg="gray.100"
                        borderRadius="10"
                        fontSize="17"
                        borderWidth="0"
                        mt="10"
                        InputLeftElement={
                            <Icon name="search" size={25} />
                        }
                        _hover={{ bg: 'gray.200', borderWidth: 0 }}

                    />
                </Box>
                <Box mt="10" mx="2">
                    <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => props.navigation.navigate('Yaz Okulu Başvuruları')} >Yaz Okulu Başvuruları</Button>
                </Box>
                <Box mt="3" mx="2">
                    <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => props.navigation.navigate('Yatay Geçiş Başvuruları')}>Yatay Geçiş Başvuruları</Button>
                </Box>
                <Box mt="3" mx="2">
                    <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => props.navigation.navigate('ÇAP Başvuruları')}>ÇAP Başvuruları</Button>
                </Box>
                <Box mt="3" mx="2">
                    <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => props.navigation.navigate('Ders İntibakı Başvuruları')}>Ders İntibakı Başvuruları</Button>
                </Box>
                <Box mt="3" mx="2">
                    <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} onPress={() => props.navigation.navigate('DGS Başvuruları')} >DGS Başvuruları</Button>
                </Box>
                <Box mt="3" mx="2">
                    <Button rounded="xl" shadow={3} bg="green.300" _text={{ fontSize: "lg" }} >RAPOR</Button>
                </Box>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})

export default Admin;