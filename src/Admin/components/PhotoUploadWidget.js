import React, { useEffect, useState } from 'react'
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';


function PhotoUploadWidget({loading, setFiles, files, uploadPhoto}) {
    const [cropper, setCropper] = useState();

    async function onCrop(e) {
        e.preventDefault();
        if (cropper) {
            const dataURI = cropper.getCroppedCanvas().toDataURL('image/jpeg');
            const blob = await (await fetch(dataURI)).blob();
            uploadPhoto(blob);
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Segment style={{width: '100%', margin: '0 0px', padding: '20px', paddingBottom: '30px'}} loading={loading}>
            <Grid stackable>
                <Grid.Column width={5}>
                    <Header sub color='teal' content='Step 1 - Add Photo' />
                    <PhotoWidgetDropzone setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={5}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {files && files.length > 0 && (
                        <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                    )}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files && files.length > 0 &&
                        <>
                            <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                            <Button.Group widths={2} style={{paddingTop: '20px'}}>
                                <Button disabled={loading} onClick={e => onCrop(e)} positive icon='check' />
                                <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                            </Button.Group>
                        </>
                    }
                </Grid.Column>
            </Grid>
        </Segment>
        
    )
}

export default PhotoUploadWidget
