export const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            height: "47px",
            padding: "11.28px 15.38px",
            borderWidth: "1.03px",
            borderRadius: "8.2px",
            marginTop: "8.2px",
            cursor: "pointer",
            boxShadow: "none",
            "&:hover": {
                borderColor: state.isFocused ? "#2684FF" : provided.borderColor,
            },
            "@media (min-width: 1024px)": {
                width: "100%",
            },
            "@media (min-width: 768px) and (max-width: 1023px)": {
                width: "100%",
            },
            "@media (min-width: 480px) and (max-width: 767px)": {
                width: "100%",
            },
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: "0",
            "@media (min-width: 1024px)": {
                width: "405px",
            },
            "@media (min-width: 768px) and (max-width: 1023px)": {
                width: "280px",
            },
            "@media (min-width: 480px) and (max-width: 767px)": {
                width: "220px",
            },
        }),
        input: (provided: any) => ({
            ...provided,
            margin: "0",
            padding: "0",
            outline: "none",
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            cursor: "pointer",
        }),
        menu: (provided: any) => ({
            ...provided,
            marginTop: "4px",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#9CA3AF', // Tailwind Gray-400
            fontSize: '16px',
        }),
    };