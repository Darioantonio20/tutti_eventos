import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedNumber = ({ value, prefix = "", suffix = "" }) => {
    const springValue = useSpring(0, {
        mass: 1,
        stiffness: 100,
        damping: 30,
    });

    const displayValue = useTransform(springValue, (current) => {
        return `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
    });

    useEffect(() => {
        springValue.set(value);
    }, [value, springValue]);

    return <motion.span>{displayValue}</motion.span>;
};

export default AnimatedNumber;
