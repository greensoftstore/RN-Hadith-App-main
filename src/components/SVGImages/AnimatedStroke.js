import React, { memo, useMemo } from 'react';
import { AnimatedSVGPath } from "react-native-svg-animations";

const AnimatedStroke = ({ strokeColor, strokeWidth, d, width, height, duration = 2500 }) => {

    return (
        <AnimatedSVGPath
            strokeColor={strokeColor}
            duration={duration ? duration : 2500}
            strokeWidth={strokeWidth}
            height={height}
            width={width}
            d={d}
            loop={false}
            delay={0}
        />
    )
}

export default memo(AnimatedStroke)