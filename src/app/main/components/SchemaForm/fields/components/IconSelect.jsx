import React, {useState} from 'react';
import { lang } from "@helpers/theme";
import {
    TextField,
    Button,
    Typography,
    InputAdornment
} from '@material-ui/core';
import {
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'


export default ({ onChange,iconList,iconSelected, ...rest }) => {
  
  const [iconItem, setIconItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);


  const handleOpenIconModal = (e) => {
    if( e.target.getAttribute("action") == 'clear_icon'){
        console.log("Clear Icon!"); 
    }
    else{
        setOpenModal(true);
    }
  }

  const handleCloseIconModal = () =>{
      setOpenModal(false);
  }

  const handleSetIcon = (e) => {
    /*
    onChange(iconItem);
    setOpenModal(false);
    */
   console.log("Click target: ", e.target.getAttribute("icon-type"));
  }

  const handleClearIcon = () => {
    
    console.log("Clear Icon!");
  }

  const defaultIcons = iconList || [];


  return (
        <>
        <TextField 
            {...rest}
            onClick={handleOpenIconModal}
            InputProps={{
                endAdornment: <InputAdornment position="end" >
                        <CIcon name="cil-trash" size="xl" style={{color: '#c4c4c4',marginRight:'5px', cursor:'pointer'}} action="clear_icon"/>
                        <CIcon name="cis-touch-app" size="xl" style={{color: '#20a8d8',cursor:'pointer'}}/>
                    </InputAdornment>,
                 startAdornment: <InputAdornment position="start" >
                 <i className={iconSelected} style={{ fontSize: "20px"}}></i>
             </InputAdornment>
            }}/>

        { openModal && (
            <CModal 
                size="xl" 
                show={openModal} 
                onClose={handleCloseIconModal}
            >   
                <CModalHeader closeButton>
                <CModalTitle>{lang("Icon Selector")}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCard>
                        <CCardBody>
                            <CRow className="text-center">
                            {
                                defaultIcons.map((icon, index)=>(
                                    <CCol xs="4" sm="3" md="2" xl="1" key={index} onClick={handleSetIcon} icon-type={icon} style={{cursor:'pointer', color:'#667b8e'}}>
                                        <i className={icon} style={{ fontSize: "30px"}}></i> 
                                    </CCol>
                                ))
                            }
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CModalBody>
            </CModal>
        )}
    </>
  )
};
