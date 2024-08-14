// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
// ===================================================================

const CustomIcon = ({ type, name, color, style }) => {
    if (type === 'Feather')
        return <Feather name={name} color={color} style={style} />
    if (type === 'MaterialIcons')
        return <MaterialIcons name={name} color={color} style={style} />
    if (type === 'FontAwesome5')
        return <FontAwesome5 name={name} color={color} style={style} />
    if (type === 'FontAwesome')
        return <FontAwesome name={name} color={color} style={style} />
    if (type === 'MaterialCommunityIcons')
        return <MaterialCommunityIcons name={name} color={color} style={style} />
    if (type === 'AntDesign')
        return <AntDesign name={name} color={color} style={style} />
    if (type === 'Entypo')
        return <Entypo name={name} color={color} style={style} />
    if (type === 'SimpleLineIcons')
        return <SimpleLineIcons name={name} color={color} style={style} />
    if (type === 'Ionicons')
        return <Ionicons name={name} color={color} style={style} />
    if (type === 'Fontisto')
        return <Fontisto name={name} color={color} style={style} />
    if (type === 'Octicons')
        return <Octicons name={name} color={color} style={style} />
    if (type === 'FontAwesome6')
        return <FontAwesome6 name={name} color={color} style={style} />

    return null
}

export default memo(CustomIcon);
