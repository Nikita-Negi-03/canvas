import React, {useState} from 'react'
import ReactSignatureCanvas from 'react-signature-canvas'

const SignaturePad = () => {

    const [sign, setSign] = useState();
    const [url,setUrl] = useState();

    const handleClear = () => {
        sign.clear()
        setUrl('')
    }

    const handleGenerate = () => {
        setUrl(sign.getTrimmedCanvas().toDataURL('/image/png'))
        const canvas = sign.getCanvas();

        if (canvas) {
            const imageURL = canvas.toDataURL('image/png');
            console.log('Image URL:', imageURL, url);
          }

    }
    console.log(sign)

  return (
    <div>
        <div style={{border:"2px solid black", width:500, height:200}}>
        <ReactSignatureCanvas
            canvasProps={{width:500, height:200, className:"sigCanvas"}}
            ref={data=> setSign(data)}
        />
        </div>

        <button onClick={handleClear}>Clear</button>
        <button onClick={handleGenerate}>Save</button>
        <img src={url} />
    </div>
  )
}

export default SignaturePad