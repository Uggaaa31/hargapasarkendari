// src/layouts/Dashboard.js

// ... imports Anda yang lain
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';
// ...

export default function Dashboard(props) {
    const { ...rest } = props;

    const [ sidebarVariant, setSidebarVariant ] = useState('transparent');
    // Hapus state `fixed` jika Anda ingin Navbar selalu fixed, atau setel ke true secara default
    // const [ fixed, setFixed ] = useState(false); // Bisa dihapus atau diubah ke useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setIsLoggedIn(!!token);

        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem('userToken'));
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // ... fungsi getRoute, getActiveRoute, getActiveNavbar, getRoutes tetap sama ...

    document.documentElement.dir = 'ltr';

    return (
        <ChakraProvider theme={theme} resetCss={false}>
            <Sidebar
                routes={routes}
                logoText={'HARGA PASAR KENDARI'}
                display='none'
                sidebarVariant={sidebarVariant}
                isLoggedIn={isLoggedIn}
                {...rest}
            />
            <MainPanel
                w={{
                    base: '100%',
                    xl: 'calc(100% - 275px)'
                }}>
                <Portal>
                    <AdminNavbar
                        onOpen={onOpen}
                        logoText={'harga-pasar-kendari'}
                        brandText={getActiveRoute(routes)}
                        secondary={getActiveNavbar(routes)}
                        // UBAH INI: Agar Navbar selalu fixed
                        fixed={true} // <-- Pastikan ini true
                        {...rest}
                    />
                </Portal>
                {getRoute() ? (
                    // TERAPKAN PADDING TOP DI SINI
                    <PanelContent
                        // Tambahkan padding-top untuk membersihkan Navbar
                        // Tinggi Navbar: 18px (top) + 75px (minH) = 93px
                        // Tambahkan sedikit ruang ekstra.
                        // Sesuaikan nilai ini sesuai pengamatan visual
                        pt={{ base: '95px', md: '100px', lg: '110px' }} // <--- PENTING: SESUAIKAN INI!
                        pb='20px' // Contoh padding-bottom, sesuaikan
                    >
                        <PanelContainer>
                            <Switch>
                                {getRoutes(routes)}
                                {/* Pastikan rute manifest Anda sudah ada di 'routes.js' */}
                                <Redirect from='/admin' to='/admin/dashboard' />
                            </Switch>
                        </PanelContainer>
                    </PanelContent>
                ) : null}
                <Footer />
            </MainPanel>
        </ChakraProvider>
    );
}