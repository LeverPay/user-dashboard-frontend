import Nav from 'react-bootstrap/Nav';

const NavComponent = () => {

    return (
        <Nav defaultActiveKey={"/home"} className="flex-column">
            <Nav.Link href='/home'> Dashboard </Nav.Link>
            <Nav.Link eventKey={"link-1"}> Transactions </Nav.Link>
            <Nav.Link eventKey={"link-2"}> Invoice </Nav.Link>
            <Nav.Link eventKey={"link-3"}> My Cards </Nav.Link>
            <Nav.Link eventKey={"link-4"}> Settings </Nav.Link>
        </Nav>
    );

}


export default NavComponent;