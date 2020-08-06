import React,{ useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { ButtonLabelSelect } from '../PlacementSelectForms'
import CustomBoxes from './CustomBoxes';
import AdViewFb from './AdViewFb';


const FacebookPlacements = (props) => {
    // const [isFormSaved, setIsFormSaved] = useState(false)

    // Social media platforms user chose
    const [runOnFacebook, setRunOnFacebook] = useState(props.runOnPlatforms.includes("runOnFacebook") ? true : false)
    const [runOnInstagram, setRunOnInstagram] = useState(props.runOnPlatforms.includes("runOnInstagram") ? true : false)
    const [runOnGoogle, setRunOnGoogle] = useState(props.runOnPlatforms.includes("runOnGoogle") ? true : false)

    // Placements
    const [automaticPlacement, setAutomaticPlacement] = useState(true)
    const [customPlacement, setCustomPlacement] = useState(false)

    // Ad view state
    const [pictureOrVideo, setPictureOrVideo] = useState(null)
    const [headline, setHeadline] = useState("")
    const [description, setDescription] = useState("")
    const [buttonLabel, setButtonLabel] = useState("")


    const changeToAutomatic = () =>{
        // if(e.target.checked){
            
            setCustomPlacement(false)
            setAutomaticPlacement(true)
        // }
    }

    const changeToCustom = () =>{
        // if(e.target.checked){
            setCustomPlacement(true)
            setAutomaticPlacement(false)
        // }
    }

    useEffect(() => {
        if(props.selectedInfo.placements.automatic){
            changeToAutomatic()
        }else{
            changeToCustom()
        }

        // Update detail values with redux state
        if(props.selectedInfo.adDetails !== []){
            props.selectedInfo.adDetails.map( detailInfo => {
                switch(detailInfo.field){
                    case "headline":
                        setHeadline(detailInfo.value)
                    case "description":
                        setDescription(detailInfo.value)
                    case "buttonLabel":
                        setButtonLabel(detailInfo.value)
                }
            })
        }



    }, [props.selectedInfo.adDetails])

    

    const pictureChangeHandler = (event) => {
        const file = event.target.files[0]
        // console.log(event.target.files[0])


        // Save url of picture to state
        let pictureOrVideoUrl = URL.createObjectURL(event.target.files[0])
        setPictureOrVideo(pictureOrVideoUrl)

    }

    // const uploadPictureHandler = () => {
    //     // Validation
    //     //Save to redux state
        
    // }

    // console.log(picture)


    let customCheckboxes = null;
     
    if(customPlacement){
        customCheckboxes = (
            <div className="col-md-9">
               <CustomBoxes selectedCustomPlacements={props.selectedInfo.placements.custom}/>
            </div>
        )
    }


    let headlineAlert = null
    if(props.headlineError != "" && props.showErrors){
        headlineAlert = (
            <Alert className="alert" variant='danger'>
                {props.headlineError}
            </Alert>
        )
    }

    let descriptionAlert = null
    if(props.descriptionError != "" && props.showErrors){
        descriptionAlert = (
            <Alert className="alert" variant='danger'>
                {props.descriptionError}
            </Alert>
        )
    }

    // Picture or video
    let fileInput = null

    let title = null;
    if(runOnFacebook && runOnInstagram){
        title = "Facebook and Instagram"
    }else if(runOnFacebook){
        title = "Facebook"
    }else if(runOnInstagram){
        title = "Instagram"
    }

    return(
        <div className="fb-placements">
        <h1 className=" font-color">{title}</h1>
            <Form onSubmit={(e) => props.saveFbPlacements(e)} onChange={e => props.changeFbForm(e)} className="fb-palacements-form row">
           
               <div className="fb-placements-radioBtns col-md-3">
               <h3 className="fb-placements-label font-color ">Placements</h3>
                   <div className="">
                    <Form.Check
                            custom
                            block
                            label="Automatic"
                            type="radio"
                            id={`automatic-inline-radio-facebook`}
                            className="radio-fb"
                            name="automatic"
                            checked={automaticPlacement}
                            onChange={(e) => changeToAutomatic(e)}
                        />
                        <Form.Check
                            custom
                            block
                            label="Custom"
                            type="radio"
                            id={`custom-inline-radio-facebook`}
                            className="radio-fb"
                            name="custom"
                            checked={customPlacement}
                            onChange={(e) => changeToCustom(e)}
                        />
                   </div>
               </div>

               { customCheckboxes }

               <div className="container fb-ad-form">
                   <div className="row">
                        <h3 className="col-md-12 pb-2  fb-ad-form-label border-bottom font-color">Ad appearance</h3>
                        <div className="col-md-6">
                            <Form.Group>
                                <div className="fb-ad-form-field row">
                                    <input 
                                    name="pictureOrVideo"
                                    style={{display: "none"}} 
                                    type="file" 
                                    onChange={pictureChangeHandler} 
                                    ref={input => {fileInput = input}}/>

                                    <div onClick={() => fileInput.click()} className="media-box col text-center">
                                        <p className="">Select a picture</p>
                                        <i class="fas fa-images"></i>
                                    </div>
                                    
                                    {/* <button onClick={() => props.savePictureOrVideo(picture)}>Upload</button> */}
                                
                                
                                
                                </div>
                                
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Headline</Form.Label>
                                    {headlineAlert}
                                    <Form.Control name="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} type="text" placeholder="Enter headline" />
                                </div>
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Description</Form.Label>
                                    {descriptionAlert}
                                    <Form.Control name="description" value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter a description for your ad" />
                                    
                                </div>
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Button label</Form.Label>
                                    {/* {primaryTextAlert} */}
                                    <ButtonLabelSelect adDetails={props.selectedInfo.adDetails} saveButtonLabel={(buttonLabel) => props.saveButtonLabel(buttonLabel)}/>
                                   
                                </div>
                            
                            
                            </Form.Group>
                            <div className=" d-flex justify-content-center w-100">
                                <button type="submit" disabled={props.isFormSaved ? true : false} className="btn details-btn">{props.isFormSaved ? "Confirmed" : "Confirm details"}</button>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <AdViewFb 
                            runOnPlatforms={props.runOnPlatforms}
                            adDetails={props.selectedInfo.adDetails}
                            pictureOrVideo={pictureOrVideo}
                            headline={headline ? headline : "Example headline"}
                            description={description ? description : "Example description of your product"}
                            url={props.url ? props.url : "www.examplewebsite.com"}
                            />
                        </div>
                   </div>
               </div>

               
                
            </Form>
        
        </div>
    );
}

export default FacebookPlacements;