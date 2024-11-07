import React from 'react';
import {
  MDBFooter, MDBContainer, MDBCol, MDBRow, MDBIcon, MDBBtn
} from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './style.css';

export default function App() {
  return (
    <div className="footer">
      <MDBFooter className=' text-center text-white' style={{ backgroundColor: 'rgba(60, 36, 100, 0.2)'}}>
        <MDBContainer className='p-4 pb-0'>
          <section className='mb-4 socials'>
            <MDBBtn outline active color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='facebook' />
            </MDBBtn>

            <MDBBtn outline active color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn outline active color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon animate='flip' size='10px' fab icon='google' />
            </MDBBtn>
            <MDBBtn outline active color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='instagram' />
            </MDBBtn>

            <MDBBtn outline active color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

            <MDBBtn outline active color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </section>
        </MDBContainer>
      </MDBFooter>
      <section className='middle-part'>
        <MDBContainer className='text-center text-md-start mt-5' >
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Soul Motion
              </h6>
              <p>
                Here you can put some important info about the company! Or not.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  
                </a>
              </p>
              <p>
                <a href='/lessons' className='text-reset'>
                  Classes
                </a>
              </p>
              <p>
                <a href='/merch' className='text-reset'>
                  Merch
                </a>
              </p>
              <p>
                {/* <a href='#!' className='text-reset'>
                  Laravel
                </a> */}
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Somewhere in Porto, Porto 4150, PT
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                soulmotion@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 912 345 678
              </p>
              {/* <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p> */}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(60, 36, 100, 0.5)'}}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </div>
  );
}