export default function getBoardList(state, action) {
    switch (action.type) {
        case 'PROVIDE-LIST':
            return  { ...state, list: action.payload };
        default:
            return state;
    }
}