import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  FlatList,
  Text,
  View,
  Animated,
  Easing,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {IRootReduxState} from '@types';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {responsiveHeight, responsiveWidth, textStyle} from '@resources';
import {CommonButton} from '@components';
import {localize} from '@languages';
import {images} from '@assets';
import {getData, storeData} from '@utils';

type Props = {
  navigation: any;
};
const data = [
  {id: '1', title: 'Buy Milk', details: 'Details of Item 1'},
  {id: '2', title: 'Buy bread', details: 'Details of Item 2'},
  {id: '3', title: 'Buy eggs', details: 'Details of Item 3'},
];
const HomeScreen = (props: Props) => {
  const colors = useTheme().colors;
  const ass = useSelector((state: IRootReduxState) => state.userDetails);
  const [expandedItems, setExpandedItems] = useState({});
  const animatedValues = useRef<any>({}).current;
  const arrowRotations = useRef({});
  const [list, setList] = useState([]);
  const [itemHeights, setItemHeights] = useState({});
  useFocusEffect(
    useCallback(() => {
      getList();
    }, []),
  );
  const onSubmitSignIn = () => {
    props.navigation.navigate('ToDoScreen');
  };

  const getList = async () => {
    let getlist = await getData('list');
    if (getlist?.length >= 1) {
      setList(getlist);
    } else {
      setList([]);
    }
  };
  const toggleExpand = id => {
    if (!animatedValues[id]) {
      animatedValues[id] = new Animated.Value(0);
      arrowRotations[id] = new Animated.Value(0);
    }

    const isExpanding = !expandedItems[id];

    Animated.timing(animatedValues[id], {
      toValue: isExpanding ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    Animated.timing(arrowRotations[id], {
      toValue: isExpanding ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    setExpandedItems(prev => ({...prev, [id]: isExpanding}));
  };
  const itemSave = async (item, index) => {
    let tempList = [...list];
    tempList[index].isSave = true;
    setList(tempList);
    await storeData('list', tempList);
    Alert.alert('Save', 'Todo Added sucessfully');
  };
  const deleteItem = async (item, index) => {
    let tempListDelete = [...list].filter((_item, _index) => {
      if (_index != index) return _item;
    });

    setList(tempListDelete);
    await storeData('list', tempListDelete);
    Alert.alert('Delete', 'Todo delete sucessfully');
  };
  const _renderItem = ({item, index}) => {
    if (!animatedValues[item.id]) {
      animatedValues[item.id] = new Animated.Value(0);
      arrowRotations[item.id] = new Animated.Value(0);
    }

    const heightInterpolation = animatedValues[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100], // Adjust expanded height
    });

    const opacityInterpolation = animatedValues[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1], // Fade in effect
    });

    const rotateInterpolation = arrowRotations[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'], // Rotate arrow
    });

    return (
      <View style={styles.itemContainer}>
        {/* Title & Arrow */}
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Animated.Image
            source={images.ic_triangle}
            style={[
              styles.imageStyle,
              {
                transform: [{rotate: rotateInterpolation}],
              },
            ]}
          />
        </TouchableOpacity>

        {/* Expandable Details Section */}
        <Animated.View
          style={[
            styles.detailsContainer,
            {height: heightInterpolation, opacity: opacityInterpolation},
          ]}>
          <Text style={styles.details}>{item.details}</Text>

          <View style={styles.listBtnView}>
            {!item.isSave && (
              <Pressable
                onPress={() => {
                  itemSave(item, index);
                }}>
                <Image source={images.ic_save} style={[styles.editImage]} />
              </Pressable>
            )}
            <Pressable
              onPress={() => {
                deleteItem(item, index);
              }}>
              <Image source={images.ic_delete} style={[styles.editImage]} />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    );
  };
  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.item}>
        <Text style={[textStyle(15, 'Roboto200', 'left'), styles.title]}>
          {item.title}
        </Text>
      </View>
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[textStyle(20, 'Roboto400', 'center'), styles.title]}>
        {'Add New ToDo'}
      </Text>
      <View style={styles.line} />
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={_renderItem}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={textStyle(18, 'Roboto400', 'center')}>
                {'Please Add Todo List'}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.line} />
      <CommonButton
        buttonStyle={{marginBottom: 20}}
        title={'ADD NEW TODO'}
        onPress={() => {
          onSubmitSignIn();
        }}
        isLoading={false}
        image_icons={'ic_plus'}
      />
    </View>
  );
};

export {HomeScreen};
