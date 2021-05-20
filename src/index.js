// import React,{useState} from 'react'; 
import {storage} from "./firebase";
import ReactDOM from 'react-dom';
import './index.css';

import React, { useRef, useEffect} from 'react';
import WebViewer from '@pdftron/webviewer';
import Button from '@material-ui/core/Button';
 

import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

// import './App.css';
 

 
 
const PdfApp =()=>{


 

  // const viewer = useRef(null);
  const viewer = React.createRef();

  const showSignaturePanel=async()=> {
    if (viewer.current.querySelector('iframe').contentDocument)
      
      console.log("Hiiiii");
     // toolbarGroup-Insert

      viewer.current.querySelector('iframe').contentDocument.querySelector(
        'button[data-element="toolbarGroup-Insert"]'
      ).click();

      // viewer.current.querySelector('iframe').contentDocument.querySelector(
      //   'div[data-element="signatureToolGroupButton"]'
      // ).firstChild.click();

       viewer.current.querySelector('iframe').contentDocument.querySelector(
         'div[data-element="toolsOverlay"]'
       ).firstChild.firstChild.firstChild.firstChild.firstChild.click() ;


    //  console.log( viewer.current.querySelector('iframe').contentDocument.querySelector(
    //     'div[data-element="toolsOverlay"]'
    //   )) ;
  }

   
  

  useEffect(() => {

    
    
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
      },  
      viewer.current,
    ).then((instance) => {
      instance.setTheme('light');
      const { docViewer, Annotations ,   CoreControls} = instance;
      const annotManager = docViewer.getAnnotationManager();
 


  
  instance.setHeaderItems(header => {
    header.push({
        type: 'actionButton',
        img: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
        title: 'download',
        onClick: async () => {
          const xfdfString = await annotManager.exportAnnotations();
          const saveOptions = CoreControls.SaveOptions;
          const options = {
            filename: 'myDocument.pdf',
            xfdfString,
            flags: saveOptions.LINEARIZED,
            downloadType: 'pdf'
          };
          
          instance.downloadPdf(options);
        }
    });
  });
  

    ///disabled unuseful elements in tool bar
instance.disableElements(['zoomInButton','zoomOutButton','zoomOverlayButton','startFormEditingToolGroupButton','cropToolGroupButton','printButton','eraserToolButton','themeChangeButton','fullscreenButton','eraserToolButton','redoButton','undoButton','calloutToolGroupButton','fileAttachmentToolGroupButton','fileAttachmentToolGroupButton','stampToolGroupButton','rubberStampToolGroupButton','leftPanelButton','viewControlsButton','zoomOverlay','panToolButton','textSelectButton','selectToolButton','searchButton','toggleNotesButton','toolbarGroup-Annotate','toolbarGroup-Shapes','toolbarGroup-Edit','toolbarGroup-Annotate','menuButton']);

  
       instance.setHeaderItems(header => {
        header.push({
          
          type: 'actionButton',
          img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
          title: 'save button',
          onClick: async() => {
            console.log(await annotManager.exportAnnotations({ links: false, widgets: false }));
            // save the annotations
            //////////////
            const doc = docViewer.getDocument();
          const xfdfString = await annotManager.exportAnnotations();
          
          const data = await doc.getFileData({ xfdfString});
          const arr = new Uint8Array(data);
          const blob = new Blob([arr], { type: 'application/pdf' });
          let fileRef = storage.ref().child('https://www.eurofound.europa.eu/sites/default/files/ef_publication/field_ef_document/ef1710en.pdf' );
          fileRef.put(blob);
          

          }
        });
      });


    });
  }, []);
 
 
  return(
      <>
    <>
    
    </>
    <div className="App">
      
      <div className="webviewer" ref={viewer}></div>
    {/* <button onClick={showSignaturePanel}>E-sign</button>  */}
{/*      
      <Button className="btn-style"  onClick={showSignaturePanel} ><CreateRoundedIcon/>E-sign</Button> */}

    </div>
       
    
    
     </>
  );
};
 
ReactDOM.render(<><PdfApp/></>, document.getElementById('root'));


