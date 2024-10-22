// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import colors from './colors';
import Button from './button';
import Input from './input';
import { FormLabel } from './form';
import { Text, Heading } from './texts';
import Link from './link';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ 
    config,
    colors,
    components: {
        Button,
        Input,
        FormLabel,
        Text,
        Heading,
        Link,
    },
})

export default theme