import {Colors, responsiveHeight, responsiveWidth} from '@resources';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#64e1f2',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  title: {
    color: Colors.black,
    fontWeight: '600',
  },
  line: {
    marginHorizontal: 10,
    color: Colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContainer: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    overflow: 'hidden',
  },
  titleContainer: {
    width: responsiveWidth(95),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#64e1f2',
    borderRadius: 5,
  },

  detailsContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: '#64e1f2',
    borderRadius: 5,
  },
  details: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  imageStyle: {
    width: responsiveWidth(5),
    height: responsiveHeight(3),
    resizeMode: 'contain',
  },
  editImage: {
    width: responsiveWidth(5),
    height: responsiveHeight(5),
    resizeMode: 'contain',
  },
  listBtnView: {
    flexDirection: 'row',
    width: responsiveWidth(40),
    height: responsiveHeight(4),
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
});

export {styles};
