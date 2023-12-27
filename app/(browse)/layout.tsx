import { Sidebar } from "./_component/sidebar";
import { NavBar } from "./_component/navbar";
import { Container } from "./_component/container";
const BrowseLayout = ({
    children 
}:{
    children: React.ReactNode;
}) => {
    return (
        <>
            <NavBar />
            <div className="flex h-full pt-20">
                <Sidebar/>
                <Container>
                    {children}
                </Container>
                
            </div>
        </>
        
    )
}
export default BrowseLayout;