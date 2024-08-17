import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './style.css';

function ButtonDarkExample() {
    return (
        <>
        
            <DropdownButton
                className='dpd-btn'
                id="dropdown-button-dark-example1"
                variant="terciary"
                title="CLASSES"
                data-bs-theme="dark"
                drop='down-centered'
            >
                <Dropdown.Item className='dpd-item' href="Individual Class" active>
                    INDIVIDUAL CLASS
                </Dropdown.Item>
                <Dropdown.Item className='dpd-item' href="Group Class">GROUP CLASS</Dropdown.Item>
                <Dropdown.Item className='dpd-item' href="Street Style">STREET MOVEMENT</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className='dpd-item' href="*New* Tango">*NEW* TANGO</Dropdown.Item>
            </DropdownButton>
        </>
    );
}

export default ButtonDarkExample;