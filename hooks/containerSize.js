export default function useContainerSize(bp) {
    switch (bp) {
        case 'xl':
            return 'lg';
        case 'lg':
            return 'md';
        case 'md':
            return 'md';
        case 'sm':
            return 'sm';
    };
};