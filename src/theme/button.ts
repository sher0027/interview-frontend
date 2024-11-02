const Button = {
    baseStyle: {
        borderRadius: '24px',    
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '14px',
        fontWeight: 'normal', 
    },
    variants: {
        solid: {
            bg: 'primary', 
            color: 'white',      
            _hover: {
                bg: 'background',
            },
        },
        outline: {
            border: '2px solid',
            borderColor: 'primary',
            color: 'primary',
            _hover: {
                bg: 'background',
                color: 'white',
            }
        },
    },
    defaultProps: {      
        variant: 'solid',      
    },
};
  
export default Button;
  