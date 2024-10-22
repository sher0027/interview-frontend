const Input = {
    baseStyle: {
        field: {
            fontFamily: 'Montserrat, sans-serif', 
            borderRadius: '24px',                
            borderColor: '#D6D6D6',         
            _hover: {
                borderColor: 'secondary',        
            },
            _focus: {
                borderColor: 'primary',       
                boxShadow: '0 0 0 1px primary',
            },
        },
    },
    variants: {
        filled: {
            field: {
                bg: 'gray.100',                     
                _hover: {
                    bg: 'gray.200',
                },
                _focus: {
                    bg: 'white',
                },
            },
        },
    },
    defaultProps: {       
        variant: 'outline',                     
    },
};
  
export default Input;
  