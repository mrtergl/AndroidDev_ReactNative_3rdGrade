import * as React from 'react';
import {
    Dimensions,
    Animated,
    Pressable,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, Center, Text, Stack, Flex, Space } from 'native-base';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FirstRoute = () => <View flex={1} backgroundColor="#fff"><Stack
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
                <Text style={{ fontSize: 17, fontWeight: "600" }}> Başvuru Adı         :
                    <Text style={{ fontSize: 17, fontWeight: "400" }}> Yaz Okulu Başvurusu </Text></Text>
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
    <Box mt="1" ml="1.5">
        <Icon name="information-outline" size={27} color="green">
            <Box>
                <Text style={{ fontSize: 17, fontWeight: "600" }}> Başvuru Durumu :
                    <Text style={{ fontSize: 17, fontWeight: "400" }}> Onay Bekliyor </Text>
                </Text>
            </Box>
        </Icon>
    </Box>
</Stack>
    <Stack
        mt="2"
        borderRadius="md"
        rounded="2xl"
        shadow={7}
        mx="3"
        h="120"
        alignItems="flex-start"
        backgroundColor="emerald.100">
        <Box mt="2" ml="1.5">
            <Icon name="file-account-outline" size={27} color="black">
                <Box>
                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Adı         :
                        <Text style={{ fontSize: 17, fontWeight: "400" }}> Yatay Geçiş Başvurusu </Text></Text>
                </Box>
            </Icon>
        </Box>
        <Box mt="1" ml="1.5">
            <Icon name="calendar-month-outline" size={30} color="#000">
                <Box>
                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Tarihi     :
                        <Text style={{ fontSize: 17, fontWeight: "400" }}> 13.10.2021 </Text>
                    </Text>
                </Box>
            </Icon>
        </Box>
        <Box mt="1" ml="1.5">
            <Icon name="information-outline" size={30} color="#000">
                <Box>
                    <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Durumu :
                        <Text style={{ fontSize: 17, fontWeight: "400" }}> Onay Bekliyor </Text>
                    </Text>
                </Box>
            </Icon>
        </Box>
    </Stack>
</View>;

const SecondRoute = () => <View flex={1} backgroundColor="#fff"><Stack
    mt="2"
    borderRadius="md"
    rounded="2xl"
    shadow={7}
    mx="3"
    h="120"
    alignItems="flex-start"
    backgroundColor="emerald.100">
    <Box mt="2" ml="1.5">
        <Icon name="file-account-outline" size={30} color="green">
            <Box>
                <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Adı         :
                    <Text style={{ fontSize: 17, fontWeight: "400" }}> Yaz Okulu Başvurusu </Text></Text>
            </Box>
        </Icon>
    </Box>
    <Box mt="1" ml="1.5">
        <Icon name="calendar" size={30} color="#000">
            <Box>
                <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Tarihi     :
                    <Text style={{ fontSize: 17, fontWeight: "400" }}> 13.10.2021 </Text>
                </Text>
            </Box>
        </Icon>
    </Box>
    <Box mt="1" ml="1.5">
        <Icon name="information-outline" size={30} color="#000">
            <Box>
                <Text style={{ fontSize: 17, fontWeight: "600" }}>Başvuru Durumu :
                    <Text style={{ fontSize: 17, fontWeight: "400" }}> Tamamlandı </Text>
                </Text>
            </Box>
        </Icon>
    </Box>
</Stack>
</View>;


const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export default function OgrenciBasvuru() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Devam Eden Başvurular' },
        { key: 'second', title: 'Başvurusu Bitenler' },
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
                    const borderColor = index === i ? 'green.500' : 'coolGray.200';

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


