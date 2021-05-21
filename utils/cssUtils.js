export const calcAppBarSize = state => state.deviceWindow.breakpoint === 'xs' ? 56 : 64

export const evalDrawerWidth = (width) => {
    const drawerWidth = width * 15/100;
    const hdDrawer = width > 1900 ? width * 12/100 : false;
    const mobileDrawer = drawerWidth < 100 ? width * 45/100 : false;
    const tabletDrawer = drawerWidth < 120 ? width * 21/100 : false;

    return mobileDrawer ? mobileDrawer
    : tabletDrawer ? tabletDrawer
    : width < 1900 ? drawerWidth
    : hdDrawer;
}

export const handleOverflow = (id) => {
    const element = document.getElementById(id);
    return element.scrollHeight > element.clientHeight ? 'scroll' : 'auto';
};