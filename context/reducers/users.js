export default function getWindow(state, action) {
    switch (action.type) {
        case 'PROVIDE-USER':
            return  { ...state, user: action.payload };
        default:
            return state;
    }
}