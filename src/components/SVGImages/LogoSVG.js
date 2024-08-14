import React, { memo, useMemo } from 'react';
import { View, } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import AnimatedStroke from 'components/SVGImages/AnimatedStroke';

const LogoSVG = ({ animated = false, duration, customColor }) => {

    const width = useMemo(() => (175), []);
    const height = useMemo(() => (107), []);;
    const paths = useMemo(() => ([


    ]), [])

    return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Svg
                width={"100%"}
                height={"100%"}
                viewBox={[0, 0, width, height].join(" ")}
            >
                {paths.map((item, key) => {
                    let strokeColor = customColor || '#000000';
                    let strokeWidth = 2;

                    if (item.class === 's0') { strokeColor = customColor || '#000000'; }

                    return (
                        animated
                            ? <AnimatedStroke d={item.d} strokeColor={strokeColor} strokeWidth={strokeWidth} width={width} height={height} /* fill={strokeColor} */ index={key} key={key.toString()} duration={duration} />
                            : <Path
                                key={key.toString()}
                                fill={strokeColor}
                                d={item.d}
                            />
                    )
                })}
            </Svg>
        </View>
    )
}

export default memo(LogoSVG);
